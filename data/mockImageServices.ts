// Apple
import iphone1 from '../data/phone/apple/image1.jpeg';
import iphone2 from '../data/phone/apple/image2.jpeg';
import iphone3 from '../data/phone/apple/image3.jpeg';
import iphone4 from '../data/phone/apple/image4.jpeg';
import iphone5 from '../data/phone/apple/image5.jpeg';
import iphone6 from '../data/phone/apple/image6.jpeg';
import iphone7 from '../data/phone/apple/image7.jpeg';
import iphone8 from '../data/phone/apple/image8.jpeg';
import iphone9 from '../data/phone/apple/image9.jpeg';
import iphone10 from '../data/phone/apple/image10.jpeg';
import iphone11 from '../data/phone/apple/image11.jpeg';
import iphone12 from '../data/phone/apple/image12.jpeg';

// Samsung
import samsung1 from '../data/phone/samsung/image1.jpeg';
import samsung2 from '../data/phone/samsung/image2.jpeg';
import samsung3 from '../data/phone/samsung/image3.jpeg';
import samsung4 from '../data/phone/samsung/image4.jpeg';
import samsung5 from '../data/phone/samsung/image5.jpeg';
import samsung6 from '../data/phone/samsung/image6.jpeg';
import samsung7 from '../data/phone/samsung/image7.jpeg';
import samsung8 from '../data/phone/samsung/image8.jpeg';
import samsung9 from '../data/phone/samsung/image9.jpeg';
import samsung10 from '../data/phone/samsung/image10.jpeg';
import samsung11 from '../data/phone/samsung/image11.jpeg';
import samsung12 from '../data/phone/samsung/image12.jpeg';

// Google Pixel
import googlePixel1 from '../data/phone/google-pixel/image1.jpeg';
import googlePixel2 from '../data/phone/google-pixel/image2.jpeg';
import googlePixel3 from '../data/phone/google-pixel/image3.jpeg';
import googlePixel4 from '../data/phone/google-pixel/image4.jpeg';
import googlePixel5 from '../data/phone/google-pixel/image5.jpeg';
import googlePixel6 from '../data/phone/google-pixel/image6.jpeg';
import googlePixel7 from '../data/phone/google-pixel/image7.jpeg';
import googlePixel8 from '../data/phone/google-pixel/image8.jpeg';
import googlePixel9 from '../data/phone/google-pixel/image9.jpeg';
import googlePixel10 from '../data/phone/google-pixel/image10.jpeg';
import googlePixel11 from '../data/phone/google-pixel/image11.jpeg';
import googlePixel12 from '../data/phone/google-pixel/image12.jpeg';


const appleImages = [iphone1, iphone2, iphone3, iphone4, iphone5, iphone6, iphone7, iphone8, iphone9, iphone10, iphone11, iphone12];
const samsungImages = [samsung1, samsung2, samsung3, samsung4, samsung5, samsung6, samsung7, samsung8, samsung9, samsung10, samsung11, samsung12];
const googlePixelImages = [googlePixel1, googlePixel2, googlePixel3, googlePixel4, googlePixel5, googlePixel6, googlePixel7, googlePixel8, googlePixel9, googlePixel10, googlePixel11, googlePixel12];

const getProductImages = (category?: string) => {
	let images;
	if (category === 'Apple') images = appleImages;
	else if (category === 'Samsung') images = samsungImages;
	else if (category === 'Google Pixel') images = googlePixelImages;
	else return [];

	// Shuffle and pick 5
	const shuffled = [...images].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, 3);
};

const getProductImage = (category?: any) => {
	const random = Math.floor(Math.random() * 12);
	if (category === 'Apple' || category === 117) return appleImages[random];
	if (category === 'Samsung' || category === 118) return samsungImages[random];
	if (category === 'Google Pixel' || category === 119) return googlePixelImages[random];
	return null;
};

export {
	getProductImages,
	getProductImage,
};