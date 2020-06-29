import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import ProgressBar from '@enact/sandstone/ProgressBar';
import React from 'react';

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
					aria-live="assertive"
					aria-label={barAriaLabel}
					progress={progressBarValue}
				/>
				<br />
				<Button icon="minus" aria-label="Decrease" onClick={this.handleDecreaseBarValue} />
				<Button icon="plus" aria-label="Increase" onClick={this.handleIncreaseBarValue} />
			</>
		);
	}
}

export default ProgressBarView;
