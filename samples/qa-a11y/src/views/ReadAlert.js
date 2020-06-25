import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import LS2Request from '@enact/webos/LS2Request';
import {readAlert} from '@enact/webos/speech';
import React from 'react';

class ReadAlertView extends React.Component {
	constructor () {
		super();
		this.state = {
			audioGuidance: false,
			toggleDisabled: true
		};

		if (window.PalmServiceBridge) {
			new LS2Request().send({
				service: 'luna://com.webos.settingsservice/',
				method: 'getSystemSettings',
				parameters: {
					category: 'option',
					keys: ['audioGuidance']
				},
				onSuccess: (res) => {
					this.setState({
						audioGuidance: res.settings.audioGuidance === 'on',
						toggleDisabled: false
					});
				}
			});
		}

		this.onClick1 = this.onClick(true);
		this.onClick2 = this.onClick(false);
	}

	onClick = (clear) => () => readAlert('Enact is a framework designed to be performant, customizable and well structured.', clear)

	onToggle = ({selected: audioGuidance}) => {
		if (window.PalmServiceBridge) {
			this.setState(
				() => ({audioGuidance}),
				() => {
					new LS2Request().send({
						service: 'luna://com.webos.settingsservice/',
						method: 'setSystemSettings',
						parameters: {
							category: 'option',
							settings: {
								audioGuidance: audioGuidance ? 'on' : 'off'
							}
						}
					});
				}
			);
		}
	}

	render = () => {
		return (
			<>
				<CheckboxItem
					defaultSelected={this.state.audioGuidance}
					disabled={this.state.toggleDisabled}
					onToggle={this.onToggle}
				>
					Audio guidance
				</CheckboxItem>
				<Button onClick={this.onClick1}>readAlert test(clear true)</Button>
				<Button onClick={this.onClick2}>readAlert test(clear false)</Button>
			</>
		);
	}
}

export default ReadAlertView;
