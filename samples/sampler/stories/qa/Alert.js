import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Alert, {AlertBase, AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import ProgressBar from '@enact/sandstone/ProgressBar';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';

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

const svgGenerator = (width, height, bgColor, textColor, customText) => (
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' class='img-fluid rounded mx-auto d-block' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

export default {
	title: 'Sandstone/Alert',
	component: 'Alert'
};

export const WithLongTitle = (args) => (
	<Alert
		open={args['open']}
		onClose={action('onClose')}
		title={args['title']}
		type={args['type']}
	>
		{args['image'] ? (
			<image>
				<AlertImage src={args['src']} type={args['type (image)']} />
			</image>
		) : null}
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
		{args['children']}
	</Alert>
);

boolean('open', WithLongTitle, Config);
text('title', WithLongTitle, Config, inputData.longTitle);
select('type', WithLongTitle, ['fullscreen', 'overlay'], Config);
text('children', WithLongTitle, Config, 'Additional text content for Alert');
boolean('image', WithLongTitle, ImageConfig);
select('type (image)', WithLongTitle, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithLongTitle, ImageConfig, svgGenerator(240, 240, 'd8d8d8', '6e6e6e', 'image'));

WithLongTitle.storyName = 'with long title';

export const WithLongChildren = (args) => (
	<Alert
		open={args['open']}
		onClose={action('onClose')}
		title={args['title']}
		type={args['type']}
	>
		{args['image'] ? (
			<image>
				<AlertImage src={args['src']} type={args['type (image)']} />
			</image>
		) : null}
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
		{args['children']}
	</Alert>
);

boolean('open', WithLongChildren, Config);
text('title', WithLongChildren, Config, 'Fullscreen Alert Title');
select('type', WithLongChildren, ['fullscreen', 'overlay'], Config);
text('children', WithLongChildren, Config, inputData.longChildren);
boolean('image', WithLongChildren, ImageConfig);
select('type (image)', WithLongChildren, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithLongChildren, ImageConfig, svgGenerator(240, 240, 'd8d8d8', '6e6e6e', 'image'));

WithLongChildren.storyName = 'with long children';

export const WithLongTitleAndLongChildren = (args) => (
	<Alert
		open={args['open']}
		onClose={action('onClose')}
		title={args['title']}
		type={args['type']}
	>
		{args['image'] ? (
			<image>
				<AlertImage src={args['src']} type={args['type (image)']} />
			</image>
		) : null}
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
		{args['children']}
	</Alert>
);

boolean('open', WithLongTitleAndLongChildren, Config);
text('title', WithLongTitleAndLongChildren, Config, inputData.longTitle);
select('type', WithLongTitleAndLongChildren, ['fullscreen', 'overlay'], Config);
text('children', WithLongTitleAndLongChildren, Config, inputData.longChildren);
boolean('image', WithLongTitleAndLongChildren, ImageConfig);
select('type (image)', WithLongTitleAndLongChildren, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithLongTitleAndLongChildren, ImageConfig, svgGenerator(240, 240, 'd8d8d8', '6e6e6e', 'image'));

WithLongTitleAndLongChildren.storyName = 'with long title and long children';

export const WithDifferentTypesOfComponentsAndLongChildren = (args) => (
	<Alert
		open={args['open']}
		onClose={action('onClose')}
		title={args['title']}
		type={args['type']}
	>
		{args['image'] ?
			<image>
				<AlertImage src={args['src']} type={args['type (image)']} />
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
		<Scroller style={{height: ri.scaleToRem(800)}}>
			<div style={{height: ri.scaleToRem(1600)}}>
				{args['children']}
			</div>
		</Scroller>
	</Alert>
);

boolean('open', WithDifferentTypesOfComponentsAndLongChildren, Config, true);
text('title', WithDifferentTypesOfComponentsAndLongChildren, Config, 'Overlay Alert Title');
select('type', WithDifferentTypesOfComponentsAndLongChildren, ['fullscreen', 'overlay'], Config, 'overlay');
text('children', WithDifferentTypesOfComponentsAndLongChildren, Config, inputData.longChildren);
boolean('image', WithDifferentTypesOfComponentsAndLongChildren, ImageConfig);
select('type (image)', WithDifferentTypesOfComponentsAndLongChildren, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', WithDifferentTypesOfComponentsAndLongChildren, ImageConfig, svgGenerator(240, 240, 'd8d8d8', '6e6e6e', 'image'));

WithDifferentTypesOfComponentsAndLongChildren.storyName = 'with different types of components and long children';
