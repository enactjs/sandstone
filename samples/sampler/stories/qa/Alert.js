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
const inputData = {
	longTitle: 'Core, The building blocks of an Enact application. Sandstone, our touch-centric UI library.',
	longChildren: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. Sed ipsum felis, suscipit vel est quis, interdum pretium dolor. Curabitur sit amet purus ac massa ullamcorper egestas ornare vel lectus. Nullam quis velit sed ex finibus cursus. Duis porttitor congue cursus.'
};

storiesOf('Alert', module)
	.add(
		'with long title',
		() => {
			const open = boolean('open', Config); // This is first so the Knob tabs are in a more intuitive order.
			const image = boolean('image', ImageConfig);
			const type = select('type', ['icon', 'thumbnail'], ImageConfig, 'icon');
			const src = text('src', ImageConfig, 'https://via.placeholder.com/240.png?text=image');

			return (
				<Alert
					open={open}
					onClose={action('onClose')}
					title={text('title', Config, inputData.longTitle)}
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
					<buttons>
						<Button>Yes</Button>
						<Button>No</Button>
					</buttons>
					{text('children', Config, 'Additional text content for Alert')}
				</Alert>
			);
		}
	)
	.add(
		'with long children',
		() => {
			const open = boolean('open', Config); // This is first so the Knob tabs are in a more intuitive order.
			const image = boolean('image', ImageConfig);
			const type = select('type', ['icon', 'thumbnail'], ImageConfig, 'icon');
			const src = text('src', ImageConfig, 'https://via.placeholder.com/240.png?text=image');

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
					<buttons>
						<Button>Yes</Button>
						<Button>No</Button>
					</buttons>
					{text('children', Config, inputData.longChildren)}
				</Alert>
			);
		}
	)
	.add(
		'with long title and long children',
		() => {
			const open = boolean('open', Config); // This is first so the Knob tabs are in a more intuitive order.
			const image = boolean('image', ImageConfig);
			const type = select('type', ['icon', 'thumbnail'], ImageConfig, 'icon');
			const src = text('src', ImageConfig, 'https://via.placeholder.com/240.png?text=image');

			return (
				<Alert
					open={open}
					onClose={action('onClose')}
					title={text('title', Config, inputData.longTitle)}
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
					<buttons>
						<Button>Yes</Button>
						<Button>No</Button>
					</buttons>
					{text('children', Config, inputData.longChildren)}
				</Alert>
			);
		}
	);
