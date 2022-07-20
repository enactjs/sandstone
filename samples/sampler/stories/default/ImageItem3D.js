import ImageItem3D from '@enact/sandstone/ImageItem3D';
import Spinner from '@enact/sandstone/Spinner';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';
import {OrbitControls} from '@react-three/drei';
import {Suspense} from 'react';

ImageItem3D.displayName = 'ImageItem3D';
const Config = mergeComponentMetadata('ImageItem3D', ImageItem3D);

export default {
	title: 'Sandstone/ImageItem3D',
	component: 'ImageItem3D'
};

const imageArray = ['https://picsum.photos/200/300', 'https://picsum.photos/220/320', 'https://picsum.photos/400/500'];

export const _ImageItem3D = (args) => {
	return (
		<Suspense fallback={<Spinner />}>
			<VRCanvas>
				<OrbitControls />
				<DefaultXRControllers />
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 30, 10]} intensity={10} />
				<pointLight position={[10, -30, -30]} intensity={2} />
				<ImageItem3D src={args['src']} disabled={args.disabled} label={args.label}>{args.children}</ImageItem3D>
			</VRCanvas>
		</Suspense>
	);
};

_ImageItem3D.storyName = 'ImageItem3D';
_ImageItem3D.parameters = {
	info: {
		text: 'The basic 3D Item'
	}
};

boolean('centered', _ImageItem3D, Config);
boolean('disabled', _ImageItem3D, Config);
text('label', _ImageItem3D, Config);
text('children', _ImageItem3D, Config, 'Hello Item');
select('src', _ImageItem3D, imageArray, Config, imageArray[0]);
