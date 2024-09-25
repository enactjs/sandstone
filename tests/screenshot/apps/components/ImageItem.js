import ri from '@enact/ui/resolution';

import ImageItem from '../../../../ImageItem';

import {withConfig, withProps} from './utils';

import img from '../../images/600x600.png';

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
		// Vertical
		<ImageItem src={img} style={verticalStyle} orientation="vertical" />,
		<ImageItem src={img} style={verticalStyle} orientation="vertical">Focused Short</ImageItem>,
		<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Focused Short" />,
		<ImageItem src={img} style={verticalStyle} orientation="vertical" imageIconSrc={img} />,
		<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Focused Short">Focused Short</ImageItem>,
		<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Focused Short" imageIconSrc={img}>Focused Short</ImageItem>,
		<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Focused Short" showSelection>Focused Short</ImageItem>,
		<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Focused Short" selected showSelection>Focused Short</ImageItem>,
		<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Focused Short" imageIconSrc={img} css={css}>Focused Short</ImageItem>,

		// Horizontal
		<ImageItem src={img} orientation="horizontal" />,
		<ImageItem src={img} orientation="horizontal">Focused Short</ImageItem>,
		<ImageItem src={img} orientation="horizontal" label="Focused Short" />,
		<ImageItem src={img} orientation="horizontal" imageIconSrc={img} />,
		<ImageItem src={img} orientation="horizontal" label="Focused Short">Focused Short</ImageItem>,
		<ImageItem src={img} orientation="horizontal" label="Focused Short" imageIconSrc={img}>Focused Short</ImageItem>,
		<ImageItem src={img} orientation="horizontal" label="Focused Short" showSelection>Focused Short</ImageItem>,
		<ImageItem src={img} orientation="horizontal" label="Focused Short" selected showSelection>Focused Short</ImageItem>
	])
];

const ImageItemTests = [
	...defaultImageItemTests,

	// Centered
	...withProps({centered:true}, defaultImageItemTests),

	// Disabled
	...withProps({disabled: true}, defaultImageItemTests),

	// Centered and disabled.
	...withProps({centered: true, disabled: true}, defaultImageItemTests),

	...withConfig({
		focusRing: true,
		focus: true
	}, [
		<ImageItem src={img} style={{height: ri.scale(360), width: ri.scale(480)}} orientation="vertical" />
	]),

	// RTL
	...withConfig({locale: 'ar-SA'}, defaultImageItemTests)
];

export default ImageItemTests;
