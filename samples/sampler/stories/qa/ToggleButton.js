import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button, {ButtonBase} from '../../../../Button';
import ToggleButton from '../../../../ToggleButton';

ToggleButton.displayName = 'ToggleButton';
const Config = mergeComponentMetadata('ToggleButton', UIButtonBase, UiButton, ButtonBase, Button, ToggleButton);

// Set up some defaults for info and knobs
const prop = {
	backgroundOpacity: ['', 'translucent', 'lightTranslucent', 'transparent'],
	tallText:{'ฟิ้ ไั  ஒ  து': 'ฟิ้ ไั  ஒ  து', 'ÁÉÍÓÚÑÜ': 'ÁÉÍÓÚÑÜ', 'Bản văn': 'Bản văn'}
};

storiesOf('ToggleButton', module)
	.add(
		'with long text',
		() => (
			<ToggleButton
				onClick={action('onClick')}
				backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
				disabled={boolean('disabled', Config)}
				size={select('size', ['small', 'large'], Config)}
				toggleOnLabel={text('toggleOnLabel', Config, 'I am an extremely and particularly very long button with label On')}
				toggleOffLabel={text('toggleOffLabel', Config, 'I am an extremely and particularly very long button with label Off')}
			/>
		)
	)
	.add(
		'with tall characters',
		() => (
			<ToggleButton
				onClick={action('onClick')}
				backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
				disabled={boolean('disabled', Config)}
				size={select('size', ['small', 'large'], Config)}
				toggleOnLabel={select('toggleOnLabel', prop.tallText, Config, 'ฟิ้ ไั  ஒ  து')}
				toggleOffLabel={select('toggleOffLabel', prop.tallText, Config, 'ฟิ้ ไั  ஒ  து')}
			/>
		)
	);
