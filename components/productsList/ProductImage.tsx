import Image from 'next/legacy/image';
import {getProductsListImg, IImagePartial, productImgRatio} from '../../lib/imgs';
import {getProductImage} from '../../data/mockImageServices';
import {TThumbRatio} from 'boundless-api-client';
import NoImage from '../NoImage';

interface ProductListImageProps {
	image?: IImagePartial;
	alt?: string;
	maxSize?: number;
	category?: string;
}

export default function ProductListImage({
	image,
	alt = 'Product image',
	maxSize = 300,
	category = 'default'
}: ProductListImageProps) {
	const renderImg = (
		src: string,
		width?: number | null,
		height?: number | null,
		blurSrc?: string
	) => (
		width && height ? (
			<Image
				src={src}
				width={width}
				height={height}
				placeholder={blurSrc ? 'blur' : undefined}
				blurDataURL={blurSrc}
				quality={100}
				itemProp='image'
				alt={alt}
			/>
		) : (
			<img src={src} alt={alt} itemProp='image' />
		)
	);

	if (!image) {
		const mockImage = getProductImage(category);
		if (!mockImage) {
			return <NoImage ratio={productImgRatio || TThumbRatio['1-1']} />;
		}
		// @ts-ignore
		const {src, blurDataURL, width, height} = getProductImage(category);
		return (
			<div className='img text-center'>
				{renderImg(src, width, height, blurDataURL)}
			</div>
		);
	}

	const {src, blurSrc, width, height} = getProductsListImg(image, maxSize);

	return (
		<div className='img text-center'>
			{renderImg(src, width, height, blurSrc)}
		</div>
	);
}