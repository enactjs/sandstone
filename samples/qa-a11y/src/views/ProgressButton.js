import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import ProgressButton from '@enact/sandstone/ProgressButton';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

class ProgressButtonView extends React.Component {
	constructor () {
		super();
		this.state = {
			progressButtonValue: 0
		};
	}

	handleDecreaseButtonValue = () => this.setState((state) => ({progressButtonValue: Math.max((state.progressButtonValue - 0.1).toFixed(1), 0)}));
	handleIncreaseButtonValue = () => this.setState((state) => ({progressButtonValue: Math.min((state.progressButtonValue + 0.1).toFixed(1), 1)}));

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
					aria-label={buttonAriaLabel}
					aria-live={progressButtonValue > 0 ? 'assertive' : null}
					showProgress={progressButtonValue > 0}
					progress={progressButtonValue}
				>
					Update
				</ProgressButton>

				<Section className={css.marginTop} title="Controls" vertical>
					<Button alt="Decrease" aria-label="This is Decrease." icon="minus" onClick={this.handleDecreaseButtonValue} />
					<Button alt="Increase" aria-label="This is Increase." icon="plus" onClick={this.handleIncreaseButtonValue} />
				</Section>
			</>
		);
	};
}

export default ProgressButtonView;
