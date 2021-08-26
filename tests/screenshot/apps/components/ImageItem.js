import ri from '@enact/ui/resolution';

import ImageItem from '../../../../ImageItem';

import {withProps} from './utils';

import img from '../../images/600x600.png';

import {withConfig} from './utils';

import css from './ImageItem.module.less';

// vertical ImageItem doesn't render well without defined styles right now.
const verticalStyle = {height: ri.scale(540), width: ri.scale(640)};

const defaultImageItemTests = [
	// Vertical
	<ImageItem src={img} style={verticalStyle} orientation="vertical" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical">Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" imageIconSrc={img} />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short">Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" imageIconSrc={img}>Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" showSelection>Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" selected showSelection>Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" imageIconSrc={img} css={css}>Short</ImageItem>,

	// Horizontal
	<ImageItem src={img} orientation="horizontal" />,
	<ImageItem src={img} orientation="horizontal">Short</ImageItem>,
	<ImageItem src={img} orientation="horizontal" label="Short" />,
	<ImageItem src={img} orientation="horizontal" imageIconSrc={img} />,
	<ImageItem src={img} orientation="horizontal" label="Short">Short</ImageItem>,
	<ImageItem src={img} orientation="horizontal" label="Short" imageIconSrc={img}>Short</ImageItem>,
	<ImageItem src={img} orientation="horizontal" label="Short" showSelection>Short</ImageItem>,
	<ImageItem src={img} orientation="horizontal" label="Short" selected showSelection>Short</ImageItem>,

	// Focused
	...withConfig({focus: true, wrapper: {light: true, padded: true}}, [
		<ImageItem src={img} style={verticalStyle} orientation="vertical" />,
		<ImageItem src={img} style={verticalStyle} orientation="vertical">Focused</ImageItem>,
		<ImageItem src={img} orientation="horizontal" />
	])
];

const ImageItemTests = [
	...defaultImageItemTests,

	// Centered
	...withProps({centered:true}, defaultImageItemTests),

	// Disabled
	...withProps({disabled: true}, defaultImageItemTests),

	// Centered and disabled
	...withProps({centered: true, disabled: true}, defaultImageItemTests)
];

export default ImageItemTests;
