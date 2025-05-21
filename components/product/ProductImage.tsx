import Image from 'next/legacy/image';
import {getProductImg, IImagePartial} from '../../lib/imgs';
import React,{useEffect,useState} from 'react';

export default function ProductImage({image, alt, maxSize = 800, preserveRatio = false}: IProductImageProps) {
	const [imgData, setImgData] = useState<{src: string, blurSrc?: string, width?: number, height?: number} | null>(null);

	useEffect(() => {
		let cancelled = false;
		async function fetchImg() {
			const result = await getProductImg(image, maxSize, preserveRatio);
			if (!cancelled) setImgData(result);
		}
		fetchImg();
		return () => { cancelled = true; };
	}, [image, maxSize, preserveRatio]);

	if (!imgData) return null;

	const {src, blurSrc, width, height} = imgData;

	return (
		<>
			{width && height
				? (
					<Image
						src={src}
						width={width}
						height={height}
						{...(blurSrc
							? {placeholder: 'blur', blurDataURL: blurSrc}
							: {})}
						quality={100}
						alt={alt}
						priority
					/>
				)
				: <img src={src}
					alt={alt}
					itemProp='image'
				/>}
		</>
	);
}

interface IProductImageProps {
	image: IImagePartial;
	alt: string;
	maxSize?: number;
	preserveRatio?: boolean;
}