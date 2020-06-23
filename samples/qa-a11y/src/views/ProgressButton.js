import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import ProgressButton from '@enact/sandstone/ProgressButton';
import React from 'react';

class ProgressButtonView extends React.Component {
	constructor () {
		super();
		this.state = {
			progressButtonValue: 0
		};
	}

	handleDecreaseButtonValue = () => this.setState((state) => ({progressButtonValue: Math.max((state.progressButtonValue - 0.1).toFixed(1), 0)}))
	handleIncreaseButtonValue = () => this.setState((state) => ({progressButtonValue: Math.min((state.progressButtonValue + 0.1).toFixed(1), 1)}))

	render = () => {
		const {progressButtonValue} = this.state;
		let buttonAriaLabel;

		if (progressButtonValue === 0.5) {
			buttonAriaLabel = '50% progressing';
		} else if (progressButtonValue === 1) {
			buttonAriaLabel = 'Completed';
		}

		return (
			<>
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
				<Button icon="minus" size="small" aria-label="Decrease" onClick={this.handleDecreaseButtonValue} />
				<Button icon="plus" size="small" aria-label="Increase" onClick={this.handleIncreaseButtonValue} />
			</>
		);
	}
}

export default ProgressButtonView;
