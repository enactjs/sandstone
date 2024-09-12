/* eslint-disable react/jsx-no-bind */

import Button from '@enact/sandstone/Button';
import ProgressButton from '@enact/sandstone/ProgressButton';
import {useState} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.scss';

const ProgressButtonView = () => {
	const [value, setValue] = useState(0);
	let ariaLabel;

	if (value === 0.5) {
		ariaLabel = '50% progressing';
	} else if (value === 1) {
		ariaLabel = 'Completed';
	}

	const handleDecreaseButtonValue = () => setValue(Math.max((value - 0.1).toFixed(1), 0));
	const handleIncreaseButtonValue = () => setValue(Math.min((value + 0.1).toFixed(1), 1));

	return (
		<Section title="Default">
			<div>
				<div className={appCss.controls}>
					<Button aria-label="This is Decrease." icon="minus" onClick={handleDecreaseButtonValue} />
					<Button aria-label="This is Increase." icon="plus" onClick={handleIncreaseButtonValue} />
				</div>
				<ProgressButton
					aria-label={ariaLabel}
					aria-live={value > 0 ? 'assertive' : null}
					showProgress={value > 0}
					progress={value}
				>
					Update
				</ProgressButton>
			</div>
		</Section>
	);
};

export default ProgressButtonView;
