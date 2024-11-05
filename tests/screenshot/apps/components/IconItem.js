import ri from '@enact/ui/resolution';

import IconItem from '../../../../IconItem';

import {withConfig, withProps} from './utils';

import img from '../../images/200x200.png';

const style = {width: ri.scale(156), height: ri.scale(120)};
const styleWithTitle = {width: ri.scale(160), height: ri.scale(160)};
const imageProp = {src: img, size: {width: ri.scale(75), height: ri.scale(75)}};

const defaultIconItemTests = [
	// Icon type
	<IconItem background="#000000" icon="usb" style={style} />,
	<IconItem background="#000000" icon="usb" label="Label" style={style} />,
	<IconItem background="#000000" icon="usb" label="This is very long label" style={style} />,
	<IconItem background="#000000" icon="usb" label="This is very long label" labelOn="focus" style={style} />,
	<IconItem background="#000000" icon="usb" title="App title" style={styleWithTitle} />,
	<IconItem background="#000000" icon="usb" title="This is very long title" style={styleWithTitle} />,
	<IconItem background="#000000" icon="usb" title="This is very long title" titleOn="focus" style={styleWithTitle} />,
	<IconItem background="#000000" icon="usb" label="Label" title="App title" style={styleWithTitle} />,
	<IconItem background="#000000" icon="usb" label="Label" labelOn="focus" title="App title" style={styleWithTitle} />,
	<IconItem background="#000000" icon="usb" label="Label" title="App title" titleOn="focus" style={styleWithTitle} />,
	<IconItem background="#000000" icon="usb" label="Label" labelOn="focus" title="App title" titleOn="focus" style={styleWithTitle} />,

	// Image type
	<IconItem background="#ffffff" image={imageProp} style={style} />,
	<IconItem background="radial-gradient(crimson, skyblue)" image={imageProp} style={style} />,
	<IconItem background={`url(${img})`} image={imageProp} style={style} />,
	<IconItem background="#ffffff" image={imageProp} label="Label" style={style} />,
	<IconItem background="#ffffff" image={imageProp} label="This is very long label" style={style} />,
	<IconItem background="#ffffff" image={imageProp} label="This is very long label" labelOn="focus" style={style} />,
	<IconItem background="#ffffff" image={imageProp} title="App title" style={styleWithTitle} />,
	<IconItem background="#ffffff" image={imageProp} title="This is very long title" style={styleWithTitle} />,
	<IconItem background="#ffffff" image={imageProp} title="This is very long title" titleOn="focus" style={styleWithTitle} />,
	<IconItem background="#ffffff" image={imageProp} label="Label" title="App title" style={styleWithTitle} />,
	<IconItem background="#ffffff" image={imageProp} label="Label" labelOn="focus" title="App title" style={styleWithTitle} />,
	<IconItem background="#ffffff" image={imageProp} label="Label" title="App title" titleOn="focus" style={styleWithTitle} />,
	<IconItem background="#ffffff" image={imageProp} label="Label" labelOn="focus" title="App title" titleOn="focus" style={styleWithTitle} />,

	// Focused
	...withConfig({focus: true, wrapper: {light: true, padded: true}}, [
		// Icon type
		<IconItem background="#000000" icon="usb" style={style} />,
		<IconItem background="#000000" icon="usb" label="Label" style={style} />,
		<IconItem background="#000000" icon="usb" label="This is very long label" style={style} />,
		<IconItem background="#000000" icon="usb" label="This is very long label" labelOn="focus" style={style} />,
		<IconItem background="#000000" icon="usb" title="App title" style={styleWithTitle} />,
		<IconItem background="#000000" icon="usb" title="This is very long title" style={styleWithTitle} />,
		<IconItem background="#000000" icon="usb" title="This is very long title" titleOn="focus" style={styleWithTitle} />,
		<IconItem background="#000000" icon="usb" label="Label" title="App title" style={styleWithTitle} />,
		<IconItem background="#000000" icon="usb" label="Label" labelOn="focus" title="App title" style={styleWithTitle} />,
		<IconItem background="#000000" icon="usb" label="Label" title="App title" titleOn="focus" style={styleWithTitle} />,
		<IconItem background="#000000" icon="usb" label="Label" labelOn="focus" title="App title" titleOn="focus" style={styleWithTitle} />,

		// Image type
		<IconItem background="#ffffff" image={imageProp} style={style} />,
		<IconItem background="radial-gradient(crimson, skyblue)" image={imageProp} style={style} />,
		<IconItem background={`url(${img})`} image={imageProp} style={style} />,
		<IconItem background="#ffffff" image={imageProp} label="Label" style={style} />,
		<IconItem background="#ffffff" image={imageProp} label="This is very long label" style={style} />,
		<IconItem background="#ffffff" image={imageProp} label="This is very long label" labelOn="focus" style={style} />,
		<IconItem background="#ffffff" image={imageProp} title="App title" style={styleWithTitle} />,
		<IconItem background="#ffffff" image={imageProp} title="This is very long title" style={styleWithTitle} />,
		<IconItem background="#ffffff" image={imageProp} title="This is very long title" titleOn="focus" style={styleWithTitle} />,
		<IconItem background="#ffffff" image={imageProp} label="Label" title="App title" style={styleWithTitle} />,
		<IconItem background="#ffffff" image={imageProp} label="Label" labelOn="focus" title="App title" style={styleWithTitle} />,
		<IconItem background="#ffffff" image={imageProp} label="Label" title="App title" titleOn="focus" style={styleWithTitle} />,
		<IconItem background="#ffffff" image={imageProp} label="Label" labelOn="focus" title="App title" titleOn="focus" style={styleWithTitle} />
	])
];

const IconItemTests = [
	...defaultIconItemTests,

	// Bordered
	...withProps({bordered:true}, defaultIconItemTests),

	// Disabled
	...withProps({disabled: true}, defaultIconItemTests),

	// Bordered and disabled.
	...withProps({bordered: true, disabled: true}, defaultIconItemTests),

	...withConfig({
		focusRing: true,
		focus: true
	}, [
		<IconItem background="#1b1b1b" icon="usb" style={style} />,
		<IconItem background="#1b1b1b" icon="usb" label="Label" style={style} />
	])
];

export default IconItemTests;
