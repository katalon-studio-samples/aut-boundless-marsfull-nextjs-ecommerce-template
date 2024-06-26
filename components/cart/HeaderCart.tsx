import Link from 'next/link';
import {useCart} from '../../hooks/cart';
import clsx from 'clsx';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import {ReactNode} from 'react';

export default function HeaderCart({className, icon}: {className?: string, icon?: ReactNode}) {
	const {total} = useCart();
	const {formatCurrency} = useFormatCurrency();
	const isEmpty = !total || !total.qty;
	const isDoubleQty = (total?.qty && total?.qty > 9) ? true : false;

	return (
		<Link title='Go to cart' href={'/cart'} className={clsx('cart-header', {
			'cart-header_empty': isEmpty,
			'cart-header_active': !isEmpty
		}, className)}>
			{icon ? icon : <span className={'cart-header__icon'} />}
			<b className={clsx('cart-header__qty', {
				'cart-header__qty_double': isDoubleQty
				})}>{total?.qty ?? 0}</b>
			<div className={'cart-header__total'}>{formatCurrency(total?.total || 0)}</div>
		</Link>
	);
}