import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Alert, {AlertBase, AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';

Alert.displayName = 'Alert';
AlertImage.displayName = 'AlertImage';
const Config = mergeComponentMetadata('Alert', AlertBase, Alert);
const ImageConfig = mergeComponentMetadata('AlertImage', AlertImage);

const prop = {
	buttons: {
		'no buttons': null,
		'1 button': (
			<buttons>
				<Button>Button Label</Button>
			</buttons>
		),
		'2 buttons': (
			<buttons>
				<Button>Button Label</Button>
				<Button>Button Label</Button>
			</buttons>
		),
		'3 buttons': (
			<buttons>
				<Button>Button Label</Button>
				<Button>Button Label</Button>
				<Button>Button Label</Button>
			</buttons>
		)
	}
};

export default {
	title: 'Sandstone/Alert',
	component: 'Alert'
};

export const _Alert = (args) => (
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
		{prop.buttons[args['buttons']]}
		{args['children']}
	</Alert>
);

boolean('open', _Alert, Config);
select('buttons', _Alert, ['no buttons', '1 button', '2 buttons', '3 buttons'], Config, '2 buttons');
text('title', _Alert, Config, 'Fullscreen Alert Title');
select('type', _Alert, ['fullscreen', 'overlay'], Config);
text('children', _Alert, Config, 'Additional text content for Alert');
boolean('image', _Alert, ImageConfig);
select('type (image)', _Alert, ['icon', 'thumbnail'], ImageConfig, 'icon');
text('src', _Alert, ImageConfig, "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240' class='img-fluid rounded mx-auto d-block' width='240' height='240'%3E%3Crect width='240' height='240' fill='%23d8d8d8'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%236e6e6e'%3Eimage%3C/text%3E%3C/svg%3E");

_Alert.storyName = 'Alert';
_Alert.parameters = {
	info: {
		text: 'Basic usage of Alert'
	}
};
