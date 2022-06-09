import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Button3D, {Button3DBase} from '@enact/sandstone/Button3D';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import { Canvas} from '@react-three/fiber'


Button3D.displayName = 'Button3D';
const Config = mergeComponentMetadata('Button3D', UIButtonBase, UIButton, Button3DBase, Button3D);

export default {
	title: 'Sandstone/Button3D',
	component: 'Button3D'
};

export const _Button3D = (args) => (
	<Canvas>
		<ambientLight />
		<pointLight position={[10, 10, 10]} />
		<Button3D  />
	</Canvas>
);


_Button3D.storyName = 'Button3D';
_Button3D.parameters = {
	info: {
		text: 'The basic Button'
	}
};
