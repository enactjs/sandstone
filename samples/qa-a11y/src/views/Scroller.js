/* eslint-disable react/jsx-no-bind */

import Scroller from '@enact/sandstone/Scroller';
import ToggleButton from '@enact/sandstone/SwitchItem';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import LS2Request from '@enact/webos/LS2Request';
import {useEffect, useState} from 'react';

import css from './Scroller.module.less';

const ScrollerView = () => {
	const [audioGuidance, setAudioGuidance] = useState(false);
	const [native, setNative] = useState(true);
	const [customAriaLabel, setCustomAriaLabel] = useState(false);
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
				onSuccess: (res) => {
					setAudioGuidance(res.settings.audioGuidance === 'on');
				}
			});
		}
	}, []);

	const handleChangeJSNativeButton = () => setNative(!native);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);

	const bodyText = [
		'Foo', 'Bar', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar',
		'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.',
		'Foo', 'Bar', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar',
		'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.',
		'Foo', 'Bar', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar',
		'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.',
		'Foo', 'Bar', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar', 'Boom boom pow',
		'Foo', 'Bar',
		'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.'
	];

	const Container = SpotlightContainerDecorator('div');
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
			</Cell>
			<Cell
				component={Scroller}
				focusableScrollbar={audioGuidance ? true : "byEnter"}
				scrollMode={scrollMode}
				verticalScrollThumbAriaLabel={customAriaLabel ? 'This is vertical scroll thumb' : null}
				horizontalScrollThumbAriaLabel={customAriaLabel ? 'This is horizontal scroll thumb' : null}
			>
				<div style={{width: ri.scaleToRem(6000)}}>
					{audioGuidance ? <Container>{bodyText.map((x) => <SpottableDiv className={css.focusableBodyText}>{x}<br /></SpottableDiv>)}</Container> : bodyText.map((x) => <>{x}<br /></>)}
				</div>
			</Cell>
		</Layout>
	);
};

export default ScrollerView;
