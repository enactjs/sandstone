import Gallery3D from '../../../../Gallery3D';
import Spinner from '@enact/sandstone/Spinner';
import {Suspense} from 'react';

Gallery3D.displayName = 'Gallery3D';

export default {
	title: 'Sandstone/Gallery3D',
	component: 'Gallery3D'
};

export const _Gallery3D = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Gallery3D />
		</Suspense>
	);
};

_Gallery3D.storyName = 'Gallery3D';
_Gallery3D.parameters = {
	info: {
		text: 'The basic 3D Gallery'
	}
};
