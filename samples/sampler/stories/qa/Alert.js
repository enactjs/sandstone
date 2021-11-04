import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Alert, {AlertBase, AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import ProgressBar from '@enact/sandstone/ProgressBar';

Alert.displayName = 'Alert';
AlertImage.displayName = 'AlertImage';
const Config = mergeComponentMetadata('Alert', AlertBase, Alert);
const ImageConfig = mergeComponentMetadata('AlertImage', AlertImage);

const inputData = {
	longTitle:
	'Core, The building blocks of an Enact application. Sandstone, our touch-centric UI library.',
	longChildren:
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. Sed ipsum felis, suscipit vel est quis, interdum pretium dolor. Curabitur sit amet purus ac massa ullamcorper egestas ornare vel lectus. Nullam quis velit sed ex finibus cursus. Duis porttitor congue cursus.'
};

export default {
	title: 'Sandstone/Alert',
	component: 'Alert'
};

export const WithLongTitle = (args) => {
	const open = args['open']; // This is first so the Knob tabs are in a more intuitive order.
	const image = args['image'];
	const type = args['type'];
	const src = args['src'];

	return (
		<Alert
			open={open}
			onClose={action('onClose')}
			title={args['title']}
			type={args['type']}
		>
			{image ? (
				<image>
					<AlertImage src={src} type={type} />
				</image>
			) : null}
			<buttons>
				<Button>Yes</Button>
				<Button>No</Button>
			</buttons>
			{args['children']}
		</Alert>
	);
};


boolean('open', WithLongTitle, Config);
boolean('image', WithLongTitle, ImageConfig);
select('type', WithLongTitle, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithLongTitle, ImageConfig, 'https://via.placeholder.com/240.png?text=image');
text('title', WithLongTitle, Config, inputData.longTitle);
select('type', WithLongTitle, ['fullscreen', 'overlay'], Config);
text('children', WithLongTitle, Config, 'Additional text content for Alert');

WithLongTitle.storyName = 'with long title';

export const WithLongChildren = (args) => {
	const open = args['open']; // This is first so the Knob tabs are in a more intuitive order.
	const image = args['image'];
	const type = args['type'];
	const src = args['src'];

	return (
		<Alert
			open={open}
			onClose={action('onClose')}
			title={args['title']}
			type={args['type']}
		>
			{image ? (
				<image>
					<AlertImage src={src} type={type} />
				</image>
			) : null}
			<buttons>
				<Button>Yes</Button>
				<Button>No</Button>
			</buttons>
			{args['children']}
		</Alert>
	);
};

boolean('open', WithLongChildren, Config);
boolean('image', WithLongChildren, ImageConfig);
select('type', WithLongChildren, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithLongChildren, ImageConfig, 'https://via.placeholder.com/240.png?text=image');
text('title', WithLongChildren, Config, 'Fullscreen Alert Title');
select('type', WithLongChildren, ['fullscreen', 'overlay'], Config);
text('children', WithLongChildren, Config, inputData.longChildren);

WithLongChildren.storyName = 'with long children';

export const WithLongTitleAndLongChildren = (args) => {
	const open = args['open']; // This is first so the Knob tabs are in a more intuitive order.
	const image = args['image'];
	const type = args['type'];
	const src = args['src'];

	return (
		<Alert
			open={open}
			onClose={action('onClose')}
			title={args['title']}
			type={args['type']}
		>
			{image ? (
				<image>
					<AlertImage
						src={src}
						type={type}
					/>
				</image>
			) : null}
			<buttons>
				<Button>Yes</Button>
				<Button>No</Button>
			</buttons>
			{args['children']}
		</Alert>
	);
};

boolean('open', WithLongTitleAndLongChildren, Config);
boolean('image', WithLongTitleAndLongChildren, ImageConfig);
select('type', WithLongTitleAndLongChildren, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithLongTitleAndLongChildren, ImageConfig, 'https://via.placeholder.com/240.png?text=image');
text('title', WithLongTitleAndLongChildren, Config, inputData.longTitle);
select('type', WithLongTitleAndLongChildren, ['fullscreen', 'overlay'], Config);
text('children', WithLongTitleAndLongChildren, Config, inputData.longChildren);

WithLongTitleAndLongChildren.storyName = 'with long title and long children';

export const WithDifferentTypesOfComponentsAndLongChildren = (args) => {
	const open = args['open']; // This is first so the Knob tabs are in a more intuitive order.
	const image = args['image'];
	const type = args['type'];
	const src = args['src'];

	return (
		<Alert
			open={open}
			onClose={action('onClose')}
			title={args['title']}
			type={args['type']}
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
			<div>
				<div>This is progressbar</div>
				<ProgressBar progress={0.5} />
			</div>
			<div>
				<CheckboxItem>This is CheckboxItem</CheckboxItem>
			</div>
			{args['children']}
		</Alert>
	);
};

boolean('open', WithDifferentTypesOfComponentsAndLongChildren, Config, true);
boolean('image', WithDifferentTypesOfComponentsAndLongChildren, ImageConfig);
select('type', WithDifferentTypesOfComponentsAndLongChildren, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithDifferentTypesOfComponentsAndLongChildren, ImageConfig, 'https://via.placeholder.com/240.png?text=image');
text('title', WithDifferentTypesOfComponentsAndLongChildren, Config, 'Overlay Alert Title');
select('type', WithDifferentTypesOfComponentsAndLongChildren, ['fullscreen', 'overlay'], Config, 'overlay');
text('children', WithDifferentTypesOfComponentsAndLongChildren, Config, inputData.longChildren);

WithDifferentTypesOfComponentsAndLongChildren.storyName = 'with different types of components and long children';
