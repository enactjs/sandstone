import Alert, {AlertBase, AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';

import {svgGenerator} from '../helper/svg';

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
	component: 'Alert',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
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
text('src', _Alert, ImageConfig, svgGenerator(240, 240, 'd8d8d8', '6e6e6e', 'image'));

_Alert.storyName = 'Alert';
_Alert.parameters = {
	info: {
		text: 'Basic usage of Alert'
	}
};
