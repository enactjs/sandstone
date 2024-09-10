/* eslint-disable react/jsx-no-bind */

import Button from '@enact/sandstone/Button';
import ProgressBar from '@enact/sandstone/ProgressBar';
import {useState} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.scss';

const ProgressBarView = () => {
	const [value, setValue] = useState(0);
	let ariaLabel;

	if (value === 0.5) {
		ariaLabel = '50% progressing';
	} else if (value === 1) {
		ariaLabel = 'Completed';
	}

	const handleDecreaseBarValue = () => setValue(Math.max((value - 0.1).toFixed(1), 0));
	const handleIncreaseBarValue = () => setValue(Math.min((value + 0.1).toFixed(1), 1));

	return (
		<Section title="Default">
			<div>
				<div className={appCss.controls}>
					<Button aria-label="This is Decrease." icon="minus" onClick={handleDecreaseBarValue} />
					<Button aria-label="This is Increase." icon="plus" onClick={handleIncreaseBarValue} />
				</div>
				<ProgressBar
					aria-label={ariaLabel}
					aria-live="assertive"
					progress={value}
				/>
			</div>
		</Section>
	);
};

export default ProgressBarView;
