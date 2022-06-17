import Gallery3D from '../../../../Gallery3D';
import {Suspense} from 'react';
import Spinner from '@enact/sandstone/Spinner';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';

Gallery3D.displayName = 'Gallery3D';

export default {
	title: 'Sandstone/Gallery3D',
	component: 'Gallery3D'
};

export const _Gallery3D = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<VRCanvas>
				<DefaultXRControllers />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Gallery3D />
			</VRCanvas>
		</Suspense>
	);
};

_Gallery3D.storyName = 'Gallery3D';
_Gallery3D.parameters = {
	info: {
		text: 'The basic 3D Gallery'
	}
};
