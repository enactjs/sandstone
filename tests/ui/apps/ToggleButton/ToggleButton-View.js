import ToggleButton from '../../../../ToggleButton';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<div>
			<ToggleButton
				id="toggleButton1"
			>
				Missing Toggle Label
			</ToggleButton>
		</div>

		<div>
			<ToggleButton
				id="toggleButton2"
				toggleOnLabel="On"
				toggleOffLabel="Off"
			/>
		</div>

		<div>
			<ToggleButton
				id="toggleButton3"
				toggleOnLabel="On"
			>
				Missing Toggle Off Label
			</ToggleButton>
		</div>

		<div>
			<ToggleButton
				id="toggleButton4"
				toggleOffLabel="Off"
			>
				Missing Toggle On Label
			</ToggleButton>
		</div>

		<div>
			<ToggleButton
				id="toggleButton5"
				toggleOnLabel="On"
				toggleOffLabel="Off"
				defaultSelected
			/>
		</div>

		<div>
			<ToggleButton
				id="toggleButton6"
				toggleOnLabel="On"
				toggleOffLabel="Off"
				defaultSelected
				disabled
			/>
		</div>

		<div>
			<ToggleButton
				id="toggleButton7"
				toggleOnLabel="Small On"
				toggleOffLabel="Small Off"
				small
			/>
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
