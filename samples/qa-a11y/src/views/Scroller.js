/* eslint-disable react/jsx-no-bind */

import Scroller from '@enact/sandstone/Scroller';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import ToggleButton from '@enact/sandstone/SwitchItem';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import LS2Request from '@enact/webos/LS2Request';
import {Fragment, useEffect, useState} from 'react';

import css from './Scroller.module.less';

const ScrollerView = () => {
	const [audioGuidance, setAudioGuidance] = useState(false);
	const [audioGuidanceDisabled, setAudioGuidanceDisabled] = useState(true);
	const [customAriaLabel, setCustomAriaLabel] = useState(false);
	const [native, setNative] = useState(true);
	const scrollMode = native ? 'native' : 'translate';

	useEffect( () => {
		if (window.WebOSServiceBridge ?? window.PalmServiceBridge) {
			new LS2Request().send({
				service: 'luna://com.webos.settingsservice/',
				method: 'getSystemSettings',
				parameters: {
					category: 'option',
					keys: ['audioGuidance']
				},
				onSuccess: () => {
					setAudioGuidanceDisabled(false);
				}
			});
		}
	}, []);

	const handleChangeJSNativeButton = () => setNative(!native);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);
	const handleChangeAudioGuidance = () => {
		if (window.WebOSServiceBridge ?? window.PalmServiceBridge) {
			setAudioGuidance(!audioGuidance);
			new LS2Request().send({
				service: 'luna://com.webos.settingsservice/',
				method: 'setSystemSettings',
				parameters: {
					category: 'option',
					settings: {
						audioGuidance: !audioGuidance ? 'on' : 'off'
					}
				}
			});
		}
	};

	const bodyText = [
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>,
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>,
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>,
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>
	];

	const Container = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');
	const SpottableDiv = Spottable('div');

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<ToggleButton
					onClick={handleChangeAriaLabelButton}
					selected={customAriaLabel}
				>
					Customizable aria-labels on ScrollThumbs
				</ToggleButton>
				<ToggleButton
					onClick={handleChangeJSNativeButton}
					selected={native}
				>
					Native
				</ToggleButton>
				<ToggleButton
					onClick={handleChangeAudioGuidance}
					disabled={audioGuidanceDisabled}
					selected={audioGuidance}
				>
					Audio Guidance (Scroller with Spottable)
				</ToggleButton>
			</Cell>
			<Cell
				component={Scroller}
				focusableScrollbar={audioGuidance ? false : "byEnter"}
				scrollMode={scrollMode}
				verticalScrollThumbAriaLabel={customAriaLabel ? 'This is vertical scroll thumb' : null}
				horizontalScrollThumbAriaLabel={customAriaLabel ? 'This is horizontal scroll thumb' : null}
			>
				<div style={audioGuidance ? null : {width: ri.scaleToRem(6000)}}>
					{audioGuidance ?
						<Container>
							{bodyText.map((x, i) => <SpottableDiv className={css.focusableBodyText} key={i}>{x}</SpottableDiv>)}
						</Container> :
						bodyText.map((x, i) => <Fragment key={i}>{x}</Fragment>)
					}
				</div>
			</Cell>
		</Layout>
	);
};

export default ScrollerView;
