import { mergeComponentMetadata } from '@enact/storybook-utils';
import { boolean, text } from '@enact/storybook-utils/addons/controls';
import Gallery3D from '../../../../Gallery3D';
import { Suspense } from 'react';
import Spinner from '@enact/sandstone/Spinner';
import { VRCanvas, DefaultXRControllers } from '@react-three/xr';

Gallery3D.displayName = 'Gallery3D';
const Config = mergeComponentMetadata('Gallery3D',Gallery3D);

export default {
	title: 'Sandstone/Gallery3D',
	component: 'Gallery3D'
};

export const _Gallery3D = (args) => {
	return (
		<Suspense fallback={<Spinner />}>
			<VRCanvas>
				<DefaultXRControllers />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Gallery3D />
			</VRCanvas>
		</Suspense>
	)
};

_Gallery3D.storyName = 'Gallery3D';
_Gallery3D.parameters = {
	info: {
		text: 'The basic 3D Gallery'
	}
};

boolean('centered', _Gallery3D, Config);
boolean('disabled', _Gallery3D, Config);
text('label', _Gallery3D, Config);
text('children', _Gallery3D, Config, 'Hello Item');
