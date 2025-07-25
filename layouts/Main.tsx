import dynamic from 'next/dynamic';
import {ReactNode, useEffect} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AlertWidget from '../components/Alert';
import {useAppSelector} from '../hooks/redux';
import {RootState} from '../redux/store';
import clsx from 'clsx';
const AsideMenu = dynamic(() => import('../components/AsideMenu'), {ssr: false});
import AsideBackdrop from '../components/asideMenu/Backdrop';
import HorizontalMenu from '../components/HorizontalMenu';
import CallToOrder from '../components/header/CallToOrder';
import {IMenuItem} from '../@types/components';
import {IBasicSettings} from '../@types/settings';
import {useDispatch} from 'react-redux';
import {setBasicSettings} from '../redux/reducers/app';

const shopBaseUrl = process.env.BOUNDLESS_BASE_URL || '';

export default function MainLayout({children, title, metaData, mainMenu, footerMenu, noIndex, basicSettings}: IMainLayoutProps) {
	const dispatch = useDispatch();
	const {canonicalUrl, imgUrl, description} = metaData || {};
	const asideIsOpened = useAppSelector((state: RootState) => state.asideMenu.isOpened);

	useEffect(() => {
		if (basicSettings) {
			dispatch(setBasicSettings(basicSettings));
		}
	}, [dispatch, basicSettings]);

	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta httpEquiv='X-UA-Compatible' content='ie=edge' />

				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				{canonicalUrl && <link rel='canonical' href={canonicalUrl} />}
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#ffffff' />

				<meta property='og:type' content='website' />
				<meta property='og:title' content={title || 'Cellphone Shop'} />
				<meta property='og:url' content={canonicalUrl || shopBaseUrl} />
				<meta property='og:image' content={imgUrl || (shopBaseUrl + '/og.jpeg')} />
				{description && <meta property='og:description' content={description} />}

				<title>{title || 'Cellphone Shop'}</title>

				<link rel='preconnect' href={process.env.BOUNDLESS_API_BASE_URL || 'https://api.boundless-commerce.com'} crossOrigin={'use-credentials'} />
				{noIndex && <meta name='robots' content='noindex' />}
				<script defer async
					// @ts-ignore
								client-code='KA-7584-46'
					// @ts-ignore
								src='https://static.qa.katalon.com/libs/traffic-agent/v1/traffic-agent.min.js'>
				</script>
				<script src='https://static.qa.katalon.com/libs/traffic-agent/v1/truetest-sdk.js'>
				</script>
			</Head>
			<AlertWidget />
			<div className={clsx('page-layout page-layout_main mars-full-theme', {'page-layout_aside-opened': asideIsOpened})}>
				<CallToOrder />
				<Header />
				{mainMenu && <HorizontalMenu menuList={mainMenu} />}
				<main className='page-layout__main'>
					{children}
				</main>
				<Footer menuList={footerMenu}/>
				<AsideBackdrop />
			</div>
			<AsideMenu menuList={mainMenu}/>
		</>
	);
}

interface IMainLayoutProps {
	children: ReactNode | ReactNode[];
	title?: string;
	metaData?: IMetaData;
	mainMenu: IMenuItem [];
	footerMenu: IMenuItem [];
	noIndex?: boolean;
	basicSettings?: IBasicSettings
}

interface IMetaData {
	canonicalUrl?: string;
	imgUrl?: string | null;
	description?: string | null;
}
