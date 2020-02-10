import Image from '../../../../Image';
import React from 'react';

import hd from '../../images/200x200.png';
import fhd from '../../images/300x300.png';
import uhd from '../../images/600x600.png';

const ImageTests = [

	// Change 'sizing' dynamically (LTR / RTL) - [GT-21214] - Step 10
	<Image src={hd} sizing="none" />,

	<Image src={fhd} sizing="none" />,
	<Image src={uhd} sizing="none" />,

	// Change 'sizing' dynamically (LTR / RTL) - [GT-21214] - Step 9
	<Image src={hd} sizing="fit" />,

	<Image src={fhd} sizing="fit" />,
	<Image src={uhd} sizing="fit" />,

	// Change 'sizing' dynamically (LTR / RTL) - [GT-21214] - Step 8
	<Image src={hd} sizing="fill" />,

	<Image src={fhd} sizing="fill" />,
	<Image src={uhd} sizing="fill"  />,

	<Image placeholder={hd} />,

	// This will return the image from 'src'
	<Image placeholder={hd} src={fhd} />,

	// This will return the image from 'placeholder'. "xyz" does not exist.
	<Image placeholder={hd} src="xyz" />,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// Change 'sizing' dynamically (LTR / RTL) - [GT-21214] - Step 6
	{
		locale: 'ar-SA',
		component: <Image src={hd} sizing="none" />
	},

	{
		locale: 'ar-SA',
		component: <Image src={fhd} sizing="none" />
	},
	{
		locale: 'ar-SA',
		component: <Image src={uhd} sizing="none" />
	},
	// Change 'sizing' dynamically (LTR / RTL) - [GT-21214] - Step 5
	{
		locale: 'ar-SA',
		component: <Image src={hd} sizing="fit" />
	},

	{
		locale: 'ar-SA',
		component: <Image src={fhd} sizing="fit" />
	},
	{
		locale: 'ar-SA',
		component: <Image src={uhd} sizing="fit" />
	},
	// Change 'sizing' dynamically (LTR / RTL) - [GT-21214] - Step 4
	{
		locale: 'ar-SA',
		component: <Image src={hd} sizing="fill" />
	},

	{
		locale: 'ar-SA',
		component: <Image src={fhd} sizing="fill" />
	},
	{
		locale: 'ar-SA',
		component: <Image src={uhd} sizing="fill"  />
	},
	{
		locale: 'ar-SA',
		component: <Image placeholder={hd} />
	},

	// This will return the image from 'src'
	{
		locale: 'ar-SA',
		component: <Image placeholder={hd} src={fhd} />
	},

	// This will return the image from 'placeholder'. "xyz" does not exist.
	{
		locale: 'ar-SA',
		component:<Image placeholder={hd} src="xyz" />
	}
];
export default ImageTests;
