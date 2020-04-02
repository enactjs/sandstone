import Button from '../../../../../Button';
import LS2Request from '@enact/webos/LS2Request';
import React from 'react';
import {readAlert} from '@enact/webos/speech';
import ToggleButton from '../../../../../ToggleButton';

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

	onToggle = () => {
		if (window.PalmServiceBridge) {
			this.setState(
				(state) => ({audioGuidance: !state.audioGuidance}),
				() => {
					new LS2Request().send({
						service: 'luna://com.webos.settingsservice/',
						method: 'setSystemSettings',
						parameters: {
							category: 'option',
							settings: {
								audioGuidance: this.state.audioGuidance ? 'on' : 'off'
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
				<ToggleButton
					size="small"
					disabled={this.state.toggleDisabled}
					onToggle={this.onToggle}
					selected={this.state.audioGuidance}
				>
					Audio guidance
				</ToggleButton>
				<Button size="small" onClick={this.onClick1}>readAlert test(clear true)</Button>
				<Button size="small" onClick={this.onClick2}>readAlert test(clear false)</Button>
			</div>
		);
	}
}

export default ReadAlertView;
