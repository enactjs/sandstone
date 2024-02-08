/* eslint-disable react/jsx-no-bind */

import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Scroller from '@enact/sandstone/Scroller';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import Layout, {Cell} from '@enact/ui/Layout';
import LS2Request from '@enact/webos/LS2Request';
import {useCallback, useEffect, useState} from 'react';

import css from './ScrollerWithBodyTextFocus.module.less';

const ScrollerWithBodyTextFocusView = () => {
	const [audioGuidance, setAudioGuidance] = useState(false);
	const [toggleDisabled, setToggleDisabled] = useState(true);

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
					setToggleDisabled(false);
				}
			});
		}
	}, []);

	const onToggle = useCallback(({selected}) => {
		if (window.WebOSServiceBridge ?? window.PalmServiceBridge) {
			setAudioGuidance(selected);
			new LS2Request().send({
				service: 'luna://com.webos.settingsservice/',
				method: 'setSystemSettings',
				parameters: {
					category: 'option',
					settings: {
						audioGuidance: selected ? 'on' : 'off'
					}
				}
			});
		}
	}, []);

	const bodyText = [
		<>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
			Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.<br />
			Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.<br />
		</>,
		<>
			Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur<br />
			sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.<br />
		</>,
		<>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
			Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.<br />
			Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.<br />
		</>,
		<>
			Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur<br />
			sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.<br />
		</>,
		<>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
			Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.<br />
			Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.<br />
		</>,
		<>
			Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur<br />
			sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.<br />
		</>,
		<>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
			Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.<br />
			Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.<br />
		</>,
		<>
			Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur<br />
			sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.<br />
		</>,
		<>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
			Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.<br />
			Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.<br />
		</>,
		<>
			Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur<br />
			sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.<br />
		</>,
		<>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
			Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.<br />
			Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.<br />
		</>,
		<>
			Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur<br />
			sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.<br />
		</>
	];

	const Container = SpotlightContainerDecorator('div');
	const SpottableDiv = Spottable('div');

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<CheckboxItem
					alt="Toggle"
					selected={audioGuidance}
					disabled={toggleDisabled}
					onToggle={onToggle}
				>
					Audio guidance
				</CheckboxItem>
			</Cell>
			<Cell
				component={Scroller}
				focusableScrollbar={audioGuidance ? true : "byEnter"}
			>
				<div>
					{audioGuidance ? <Container>{bodyText.map((x) => <SpottableDiv className={css.focusableBodyText}>{x}</SpottableDiv>)}</Container> : bodyText.map((x) => <>{x}</>)}
				</div>
			</Cell>
		</Layout>
	);
};

export default ScrollerWithBodyTextFocusView;
