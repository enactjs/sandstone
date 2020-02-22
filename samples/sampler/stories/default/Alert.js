import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Alert, {AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';


Alert.displayName = 'Alert';
const Config = mergeComponentMetadata('Alert', Alert);
const ImageConfig = mergeComponentMetadata('AlertImage', AlertImage);

storiesOf('Sandstone', module)
	.add(
		'Alert',
		() => {
			const image = boolean('image', Config, false);
			const type = select('type', ['icon', 'thumbnail'], ImageConfig, 'icon');
			const src = text('src', ImageConfig, 'https://via.placeholder.com/240.png?text=image');

			return (
				<Alert
					open={boolean('open', Config, false)}
					onClose={action('onClose')}
					title={text('title', Config, 'This is title')}
					titleBelow={text('titleBelow', Config, 'This is titlebelow')}
					type={select('type', ['fullscreen', 'overlay'], Config, 'fullscreen')}
				>
					{image ?
						<image>
							<AlertImage
								src={src}
								type={type}
							/>
						</image> : null
					}
					<buttons>
						<Button>Yes</Button>
						<Button>No</Button>
					</buttons>
				</Alert>
			);
		},
		{
			info: {
				text: 'Basic usage of Alert'
			}
		}
	);
