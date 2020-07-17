import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import ProgressBar from '@enact/sandstone/ProgressBar';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

class ProgressBarView extends React.Component {
	constructor () {
		super();
		this.state = {
			progressBarValue: 0
		};
	}

	handleDecreaseBarValue = () => this.setState((state) => ({progressBarValue: Math.max((state.progressBarValue - 0.1).toFixed(1), 0)}))
	handleIncreaseBarValue = () => this.setState((state) => ({progressBarValue: Math.min((state.progressBarValue + 0.1).toFixed(1), 1)}))

	render = () => {
		const {progressBarValue} = this.state;
		let barAriaLabel;

		if (progressBarValue === 0.5) {
			barAriaLabel = '50% progressing';
		} else if (progressBarValue === 1) {
			barAriaLabel = 'Completed';
		}

		return (
			<>
				<Heading showLine>Progress Bar</Heading>
				<ProgressBar
					aria-label={barAriaLabel}
					aria-live="assertive"
					progress={progressBarValue}
				/>

				<Section className={css.marginTop} title="Controls" vertical>
					<Button alt="Decrease" aria-label="This is Decrease" icon="minus" onClick={this.handleDecreaseBarValue} />
					<Button alt="Increase" aria-label="This is Increase" icon="plus" onClick={this.handleIncreaseBarValue} />
				</Section>
			</>
		);
	}
}

export default ProgressBarView;
