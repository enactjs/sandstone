import Button from '@enact/sandstone/Button';
import ProgressButton from '@enact/sandstone/ProgressButton';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

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
			<Section title="Default">
				<div>
					<div className={appCss.controls}>
						<Button aria-label="This is Decrease." icon="minus" onClick={this.handleDecreaseButtonValue} />
						<Button aria-label="This is Increase." icon="plus" onClick={this.handleIncreaseButtonValue} />
					</div>
					<ProgressButton
						aria-label={buttonAriaLabel}
						aria-live={progressButtonValue > 0 ? 'assertive' : null}
						showProgress={progressButtonValue > 0}
						progress={progressButtonValue}
					>
						Update
					</ProgressButton>
				</div>
			</Section>
		);
	};
}

export default ProgressButtonView;
