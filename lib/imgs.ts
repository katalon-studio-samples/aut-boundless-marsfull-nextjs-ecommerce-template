import {TThumbRatio} from 'boundless-api-client';
import {apiClient} from './api';

//fixed aspect ratio for product images
export const productImgRatio = process.env.BOUNDLESS_PRODUCTS_IMAGE_PROPORTION as TThumbRatio || null;

export function getProductsListImg(image: IImagePartial, maxSize: number): IImageData {
	const {width, height, path: imgLocalPath} = image;

	const thumb = apiClient.makeThumb({imgLocalPath, maxSize});
	if (productImgRatio) {
		thumb
			.setRatio(productImgRatio)
			.setPad(true)
		;
	}

	if (!width || !height) {
		return {src: thumb.getSrc()};
	}

	thumb.setOriginalSize(width, height);

	const imgAttrs = thumb.getAttrs();

	thumb
		.setGrayscale(true)
		.setBlur(2)
	;

	return {
		...imgAttrs,
		blurSrc: thumb.getSrc()
	};
}

function getImageSize(src: string): Promise<{width: number, height: number}> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({width: img.width, height: img.height});
        img.onerror = reject;
        img.src = src;
    });
}

export async function getProductImg(
	image: IImagePartial,
	maxSize: number,
	preserveRatio: boolean = false
): Promise<IImageData & { width: number | undefined; height: number | undefined }> {
	const {width, height, path: imgLocalPath} = image;

	let result: IImageData & { width: number | undefined; height: number | undefined };

	if (height && width) {
		const thumb = apiClient.makeThumb({
			imgLocalPath,
			maxSize,
			originalWidth: width,
			originalHeight: height
		});

		if (productImgRatio && preserveRatio) thumb.setRatio(productImgRatio);

		const attrs = thumb.getAttrs();
		thumb.setGrayscale(true);
		thumb.setBlur(2);

		result = {
			...attrs,
			blurSrc: thumb.getSrc(),
			width,
			height
		};
	} else {
		const thumb = apiClient.makeThumb({
			imgLocalPath,
			maxSize
		});
		const src = thumb.getSrc();

		result = {
			src,
			width: undefined,
			height: undefined
		};
	}

	const srcForSize = (result.src ?? result.blurSrc) as string;
	const size = await getImageSize(srcForSize);
	return {
		...result,
		width: size.width,
		height: size.height
	};
}

export function getMetaImgUrl(image: IImagePartial): string {
	const thumb = apiClient.makeThumb({
		imgLocalPath: image.path,
		maxSize: 400
	});
	thumb.setRatio(TThumbRatio['1-1']);
	thumb.setPad(true);

	return thumb.getSrc();
}

export function getCategoryImg(image: IImagePartial, maxSize: number = 21): IImageData {
	const {width, height, path: imgLocalPath} = image;

	const thumb = apiClient.makeThumb({
		imgLocalPath,
		maxSize
	});

	if (width && height) {
		thumb.setOriginalSize(width, height);

		return thumb.getAttrs();
	}

	return {src: thumb.getSrc()};
}

export function getManufacturerImg(image: IImagePartial, maxSize: number = 200): IImageData {
	const {width, height, path: imgLocalPath} = image;

	const thumb = apiClient.makeThumb({
		imgLocalPath,
		maxSize
	});

	if (width && height) {
		thumb.setOriginalSize(width, height);

		return thumb.getAttrs();
	}

	return {src: thumb.getSrc()};
}


export function getCartImg(imgLocalPath: string, maxSize: number = 60): string {
	return apiClient.makeThumb({
		imgLocalPath,
		maxSize
	}).getSrc();
}

export interface IImagePartial {
	path: string;
	width?: number | null;
	height?: number | null;
}

export interface IImageData {
	src: string;
	width?: number;
	height?: number;
	blurSrc?: string;
}
