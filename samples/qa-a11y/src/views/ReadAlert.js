import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {readAlert} from '@enact/webos/speech';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

class ReadAlertView extends React.Component {
	constructor () {
		super();

		this.onClick1 = this.onClick(true);
		this.onClick2 = this.onClick(false);
	}

	onClick = (clear) => () => readAlert('Enact is a framework designed to be performant, customizable and well structured.', clear)

	render = () => {
		const {audioGuidance, audioGuidanceDisabled, handleAudioGuidanceToggle} = this.props;

		return (
			<>
				<Section title="AudioGuidance On or Off">
					<CheckboxItem
						alt="Toggle"
						defaultSelected={audioGuidance}
						disabled={audioGuidanceDisabled}
						onToggle={handleAudioGuidanceToggle}
					>
						Audio guidance
					</CheckboxItem>
				</Section>

				<Section className={css.marginTop} title="readAlert">
					<Button alt="Clear of true" onClick={this.onClick1}>readAlert test(clear true)</Button>
					<Button alt="Clear of false" onClick={this.onClick2}>readAlert test(clear false)</Button>
				</Section>
			</>
		);
	}
}

export default ReadAlertView;
