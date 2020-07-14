import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Alert, {AlertBase, AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';


Alert.displayName = 'Alert';
AlertImage.displayName = 'AlertImage';
const Config = mergeComponentMetadata('Alert', AlertBase, Alert);
const ImageConfig = mergeComponentMetadata('AlertImage', AlertImage);
const prop = {
	buttons: {
		'no buttons': null,
		'1 button': <buttons>
			<Button>Button Label</Button>
		</buttons>,
		'2 buttons': <buttons>
			<Button>Button Label</Button>
			<Button>Button Label</Button>
		</buttons>,
		'3 buttons': <buttons>
			<Button>Button Label</Button>
			<Button>Button Label</Button>
			<Button>Button Label</Button>
		</buttons>
	}
};

storiesOf('Sandstone', module)
	.add(
		'Alert',
		() => {
			const open = boolean('open', Config); // This is first so the Knob tabs are in a more intuitive order.
			const image = boolean('image', ImageConfig);
			const type = select('type', ['icon', 'thumbnail'], ImageConfig, 'icon');
			const src = text('src', ImageConfig, 'https://via.placeholder.com/240.png?text=image');
			const buttonsSelection = select('buttons', ['no buttons', '1 button', '2 buttons', '3 buttons'], Config, '2 buttons');
			const buttons = prop.buttons[buttonsSelection];

			return (
				<Alert
					open={open}
					onClose={action('onClose')}
					title={text('title', Config, 'Fullscreen Alert Title')}
					type={select('type', ['fullscreen', 'overlay'], Config)}
				>
					{image ?
						<image>
							<AlertImage
								src={src}
								type={type}
							/>
						</image> : null
					}
					{buttons}
					{text('children', Config, 'Additional text content for Alert')}
				</Alert>
			);
		},
		{
			info: {
				text: 'Basic usage of Alert'
			}
		}
	);
