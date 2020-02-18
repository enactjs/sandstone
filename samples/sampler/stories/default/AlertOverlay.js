import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {AlertImage, AlertOverlay} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';


AlertOverlay.displayName = 'AlertOverlay';
const Config = mergeComponentMetadata('AlertOverlay', AlertOverlay);
const ImageConfig = mergeComponentMetadata('AlertImage', AlertImage);

storiesOf('Sandstone', module)
	.add(
		'AlertOverlay',
		() => {
			const image = boolean('image', Config, false);
			const type = select('type', ['icon', 'thumbnail'], ImageConfig, 'icon');
			const src = text('src', ImageConfig, 'https://via.placeholder.com/240.png?text=image');

			return (
				<AlertOverlay
					open={boolean('open', Config, false)}
					onClose={action('onClose')}
				>
					{image ?
						<image>
							<AlertImage
								src={src}
								type={type}
							/>
						</image> : null
					}
					<span>{text('content', Config, 'this is AlertOverlay. You can show image, text and buttons.')}</span>
					<buttons>
						<Button>Yes</Button>
						<Button>No</Button>
					</buttons>
				</AlertOverlay>
			);
		},
		{
			info: {
				text: 'Basic usage of AlertOverlay'
			}
		}
	);
