import  Button3D from '@enact/sandstone/Button3D';
import Spinner from '@enact/sandstone/Spinner';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {VRCanvas} from '@react-three/xr';
import {Suspense} from 'react';

import iconNames from '../helper/icons';

Button3D.displayName = 'Button3D';
const Config = mergeComponentMetadata('Button3D', Button3D);

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
	<Suspense fallback={<Spinner />}>
		<VRCanvas>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 30, 10]} intensity={3} />
			<pointLight position={[10, -30, -10]} intensity={1} />
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
	</Suspense>
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
