import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import ProgressBar from '@enact/sandstone/ProgressBar';
import ProgressButton from '@enact/sandstone/ProgressButton';
import React from 'react';

class ProgressView extends React.Component {
	constructor () {
		super();
		this.state = {
			progressBarValue: 0,
			progressButtonValue: 0
		};
	}

	handleDecreaseBarValue = () => this.setState((state) => ({progressBarValue: Math.max((state.progressBarValue - 0.1).toFixed(1), 0)}))
	handleIncreaseBarValue = () => this.setState((state) => ({progressBarValue: Math.min((state.progressBarValue + 0.1).toFixed(1), 1)}))
	handleDecreaseButtonValue = () => this.setState((state) => ({progressButtonValue: Math.max((state.progressButtonValue - 0.1).toFixed(1), 0)}))
	handleIncreaseButtonValue = () => this.setState((state) => ({progressButtonValue: Math.min((state.progressButtonValue + 0.1).toFixed(1), 1)}))

	render = () => {
		const {progressBarValue, progressButtonValue} = this.state;
		let barAriaLabel, buttonAriaLabel;

		if (progressBarValue === 0.5) {
			barAriaLabel = '50% progressing';
		} else if (progressBarValue === 1) {
			barAriaLabel = 'Completed';
		}

		if (progressButtonValue === 0.5) {
			buttonAriaLabel = '50% progressing';
		} else if (progressButtonValue === 1) {
			buttonAriaLabel = 'Completed';
		}

		return (
			<div>
				<Heading showLine>Progress Bar</Heading>
				<ProgressBar
					aria-live="assertive"
					aria-label={barAriaLabel}
					progress={progressBarValue}
				/>
				<br />
				<Button icon="plus" size="small" aria-label="Increase" onClick={this.handleIncreaseBarValue} />
				<Button icon="minus" size="small" aria-label="Decrease" onClick={this.handleDecreaseBarValue} />
				<Heading showLine>Progress Button</Heading>
				<ProgressButton
					aria-live={progressButtonValue > 0 ? 'assertive' : null}
					aria-label={buttonAriaLabel}
					showProgress={progressButtonValue > 0}
					progress={progressButtonValue}
				>
					Update
				</ProgressButton>
				<br />
				<br />
				<Button icon="plus" size="small" aria-label="Increase" onClick={this.handleIncreaseButtonValue} />
				<Button icon="minus" size="small" aria-label="Decrease" onClick={this.handleDecreaseButtonValue} />
			</div>
		);
	}
}

export default ProgressView;
