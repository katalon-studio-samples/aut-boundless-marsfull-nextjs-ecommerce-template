import {useCart} from '../../hooks/cart';
import {startCheckout, StarterWrapper, resetCheckoutState} from '@hohuyhoangg/boundless-checkout-react-custom';
import {useRouter} from 'next/router';
import {apiClient} from '../../lib/api';
import {TCartInited} from '../../redux/reducers/cart';
import Loader from '../../components/Loader';
import logoImg from '../../assets/logo.png';
import Head from 'next/head';
import {useCallback, useEffect, useRef} from 'react';
import {createGetStr} from 'boundless-api-client/utils';

export default function CheckoutPage() {
	const {id: cartId, cartInited} = useCart();
	const router = useRouter();
	const checkoutStarter = useRef<StarterWrapper>();

	const checkoutRef = useCallback((node: HTMLDivElement) => {
		if (node && cartInited === TCartInited.yes && cartId) {
			checkoutStarter.current = startCheckout(node, {
				api: apiClient,
				cartId,
				onHide: (element: string, error?: string) => {
					resetCheckoutState();
					if (element === 'backToCart') {
						const query: {error?: string} = {};
						if (error) {
							query.error = error;
						}

						router.push(`/cart?${createGetStr(query)}`);
					} else if (element === 'logo') {
						router.push('/');
					} else {
						console.log('unknown element: ', element);
					}
				},
				onThankYouPage: (data) => {
					resetCheckoutState();
					window.location.assign(`/thank-you/${data.orderId}`);
				},
				basename: '/checkout',
				logoSrc: logoImg.src,
			});
		}
	}, [cartInited, cartId]);//eslint-disable-line
	useEffect(() => {
		return () => {
			if (checkoutStarter.current) {
				checkoutStarter.current.destroy();
			}
		};
	}, []);

	useEffect(() => {
		const observer = new MutationObserver(() => {
			const form = document.querySelector('.bdl-payment-form');
			if (form) {
				const button = Array.from(form.querySelectorAll('button')).find(
					// @ts-ignore
					(btn) => btn.textContent.trim().startsWith('Complete order')
				);
				if (button) {
					// @ts-ignore
					const handleClick = (event: Event) => {
						// @ts-ignore
						TrueTest.setSessionAttributes({
							complete_checkout: 'TRUE',
						});
					};
					button.addEventListener('click', handleClick);

					// Cleanup event listener and observer
					return () => {
						button.removeEventListener('click', handleClick);
						observer.disconnect();
					};
				}
			}
		});

		// Observe changes in the DOM
		observer.observe(document.body, {childList: true, subtree: true});
		// Cleanup observer on unmount
		return () => observer.disconnect();
	}, []);

	if (cartInited !== TCartInited.yes) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<meta name='robots' content='noindex' />
				<script
					// @ts-ignore
					src='https://static.katalon.com/libs/traffic-agent/v1/truetest-sdk.min.js'>
				</script>
			</Head>
			<div>
				<div ref={checkoutRef}></div>
			</div>
		</>
	);
}