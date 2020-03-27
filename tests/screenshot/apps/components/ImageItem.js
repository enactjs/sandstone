import ri from '@enact/ui/resolution';
import React from 'react';

import ImageItem from '../../../../ImageItem';

import img from '../../images/600x600.png';

// vertical ImageItem doesn't render well without defined styles right now.
const verticalStyle = {height: ri.scale(540), width: ri.scale(640)};

const ImageItemTests = [
	<ImageItem src={img} style={verticalStyle} orientation="vertical" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical">Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" imageIconSrc={img} />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short">Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" imageIconSrc={img}>Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" showSelection>Short</ImageItem>,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" label="Short" selected showSelection>Short</ImageItem>,

	<ImageItem src={img} orientation="horizontal" />,
	<ImageItem src={img} orientation="horizontal">Short</ImageItem>,
	<ImageItem src={img} orientation="horizontal" label="Short" />,
	<ImageItem src={img} orientation="horizontal" label="Short">Short</ImageItem>,
	<ImageItem src={img} orientation="horizontal" label="Short" showSelection>Short</ImageItem>,
	<ImageItem src={img} orientation="horizontal" label="Short" selected showSelection>Short</ImageItem>
];
export default ImageItemTests;
