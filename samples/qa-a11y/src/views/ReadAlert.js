import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import LS2Request from '@enact/webos/LS2Request';
import {readAlert} from '@enact/webos/speech';
import {useCallback, useEffect, useState} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ReadAlertView = () => {
	const [audioGuidance, setAudioGuidance] = useState(false);
	const [toggleDisabled, setToggleDisabled] = useState(true);

	const onClick = (clear) => () => readAlert('Enact is a framework designed to be performant, customizable and well structured.', clear);

	const onClick1 = onClick(true);
	const onClick2 = onClick(false);

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

	return (
		<>
			<Section title="AudioGuidance On or Off">
				<CheckboxItem
					alt="Toggle"
					selected={audioGuidance}
					disabled={toggleDisabled}
					onToggle={onToggle}
				>
					Audio guidance
				</CheckboxItem>
			</Section>

			<Section className={appCss.marginTop} title="readAlert">
				<Button alt="Clear of true" onClick={onClick1}>readAlert test(clear true)</Button>
				<Button alt="Clear of false" onClick={onClick2}>readAlert test(clear false)</Button>
			</Section>
		</>
	);

};

export default ReadAlertView;
