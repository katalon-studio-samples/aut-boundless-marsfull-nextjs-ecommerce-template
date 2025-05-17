import React, {useState} from 'react';
import clsx from 'clsx';
import ProductImage from './ProductImage';
import {IProductItem} from 'boundless-api-client';
import {Item, Gallery, useGallery} from 'react-photoswipe-gallery';

import 'photoswipe/dist/photoswipe.css';
import {getProductImages} from '../../data/mockImageServices';

export default function ProductImagesWrapper({product}: {product: IProductItem}) {
	return (
		<Gallery>
			<ProductImages product={product} />
		</Gallery>
	);
}

function ProductImages({product}: {product: IProductItem}) {
	const [activeImg, setActiveImg] = useState(0);
	const images = getProductImages(product.default_category?.title);
	const {open: openLighBox} = useGallery();

	const onImageClick = (index: number, e: React.MouseEvent) => {
		e.preventDefault();
		openLighBox(index);
	};
	return (
		<>
			<div className='product-gallery d-none d-md-flex'>
				<ul className='product-gallery__thumbs list-unstyled'>
					{images.map((image, i) => (
						<Item
							original={image.src}
							width={200}
							height={1800}
						>
							{({ref}) => (<li
								ref={ref as React.MutableRefObject<HTMLLIElement>}
								className={clsx('product-gallery__thumb', {active: activeImg === i})}
								onMouseEnter={() => setActiveImg(i)}
								onClick={() => setActiveImg(i)}
							>
								<a href='#' className='product-gallery__thumb-link' onClick={(e) => {
									e.preventDefault();
								}}>
									<ProductImage maxSize={100} alt={product.title} category={product.default_category?.title} />
								</a>
							</li>)}
						</Item>
					))}
				</ul>
				<figure className='product-gallery__big-img'>
					<a href='#' onClick={onImageClick.bind(null, activeImg)}>
						<ProductImage maxSize={800} alt={product.title} category={product.default_category?.title} />
					</a>
				</figure>
			</div>
		</>
	);
}