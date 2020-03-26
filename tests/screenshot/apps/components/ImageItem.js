import ri from '@enact/core/resolution';
import React from 'react';

import ImageItem from '../../../../ImageItem';

import img from '../../images/600x600.png';

// vertical ImageItem doesn't render well without defined styles right now.
const verticalStyle = {height: ri.scale(540), width: ri.scale(640)};

const ImageItemTests = [
	<ImageItem src={img} style={verticalStyle} orientation="vertical" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" caption="Short" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" subCaption="Short" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" imageIconSrc={img} />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" caption="Short" subCaption="Short" />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" caption="Short" subCaption="Short" imageIconSrc={img} />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" caption="Short" subCaption="Short" showSelection />,
	<ImageItem src={img} style={verticalStyle} orientation="vertical" caption="Short" subCaption="Short" selected showSelection />,

	<ImageItem src={img} orientation="horizontal" />,
	<ImageItem src={img} orientation="horizontal" caption="Short" />,
	<ImageItem src={img} orientation="horizontal" subCaption="Short" />,
	<ImageItem src={img} orientation="horizontal" caption="Short" subCaption="Short" />,
	<ImageItem src={img} orientation="horizontal" caption="Short" subCaption="Short" showSelection />,
	<ImageItem src={img} orientation="horizontal" caption="Short" subCaption="Short" selected showSelection />
];
export default ImageItemTests;
