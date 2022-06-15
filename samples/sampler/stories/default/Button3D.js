import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Button3D, {Button3DBase} from '@enact/sandstone/Button3D';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import { Canvas} from '@react-three/fiber'
import { VRCanvas } from '@react-three/xr'
import iconNames from '../helper/icons';


Button3D.displayName = 'Button3D';
const Config = mergeComponentMetadata('Button3D', UIButtonBase, UIButton, Button3DBase, Button3D);

const prop = {
	iconPosition: ['', 'before', 'after'],
	icons: ['', ...iconNames],
	size: ['small', 'large']
};

export default {
	title: 'Sandstone/Button3D',
	component: 'Button3D'
};

export const _Button3D = (args) => (
	<VRCanvas>
		<ambientLight />
		<pointLight position={[10, 10, 10]} />
		<Button3D
			icon={args['icon']}
			iconPosition={args['iconPosition']}
			size={args['size']}
			showTooltip={args['showTooltip']}
			tooltipText={args['tooltipText']}
		>
			{args['children']}
		</Button3D>
	</VRCanvas>
);

text('children', _Button3D, Config, 'click me');
select('icon', _Button3D, prop.icons, Config);
select('iconPosition', _Button3D, prop.iconPosition, Config);
select('size', _Button3D, prop.size, Config, 'large');
boolean('showTooltip', _Button3D, Config, false);
text('tooltipText', _Button3D, Config, 'Button Tooltip');

_Button3D.storyName = 'Button3D';
_Button3D.parameters = {
	info: {
		text: 'The basic Button'
	}
};
