import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import LS2Request from '@enact/webos/LS2Request';
import React from 'react';
import {readAlert} from '@enact/webos/speech';

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
			<div>
				<CheckboxItem
					defaultSelected={this.state.audioGuidance}
					disabled={this.state.toggleDisabled}
					onToggle={this.onToggle}
				>
					Audio guidance
				</CheckboxItem>
				<Button size="small" onClick={this.onClick1}>readAlert test(clear true)</Button>
				<Button size="small" onClick={this.onClick2}>readAlert test(clear false)</Button>
			</div>
		);
	}
}

export default ReadAlertView;
