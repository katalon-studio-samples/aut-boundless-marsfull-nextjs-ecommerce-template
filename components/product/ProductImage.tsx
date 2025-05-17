import Image from 'next/legacy/image';
import {productImgRatio} from '../../lib/imgs';
import {getProductImage} from '../../data/mockImageServices';
import NoImage from '../NoImage';
import {TThumbRatio} from 'boundless-api-client';

export default function ProductImage({alt, maxSize = 800, category}: IProductImageProps) {

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

	const mockImage = getProductImage(category);
	if (!mockImage) {
		return <NoImage ratio={productImgRatio || TThumbRatio['1-1']} />;
	}
	// @ts-ignore
	const {src, blurDataURL, width, height} = getProductImage(category);
	const maxWidth = width > maxSize ? maxSize : width;
	const maxHeight = height > maxSize ? maxSize : height;
	return (
		<div className='img text-center'>
			{renderImg(src, maxWidth, maxHeight, blurDataURL)}
		</div>
	);
}

interface IProductImageProps {
	alt: string;
	maxSize?: number;
	category?: string;
}