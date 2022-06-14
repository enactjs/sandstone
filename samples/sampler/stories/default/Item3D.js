import {Suspense} from 'react';
import { mergeComponentMetadata } from '@enact/storybook-utils';
import { boolean, select, text } from '@enact/storybook-utils/addons/controls';
import Item3D, { Item3DBase } from '@enact/sandstone/Item3D';
import Spinner from '@enact/sandstone/Spinner';

import { Canvas } from '@react-three/fiber';

Item3D.displayName = 'Item3D';
const Config = mergeComponentMetadata('Item3D', Item3DBase, Item3D);

export default {
	title: 'Sandstone/Item3D',
	component: 'Item3D'
};

export const _Item3D = (args) => {
	return (
		<Suspense fallback={<Spinner />}>
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Item3D disabled={args.disabled} label={args.label} size={args.size}>{args.children}</Item3D>
			</Canvas>
		</Suspense>
	)
};

_Item3D.storyName = 'Item3D';
_Item3D.parameters = {
	info: {
		text: 'The basic 3D Item'
	}
};

boolean('centered', _Item3D, Config); 
boolean('disabled', _Item3D, Config);
boolean('inline', _Item3D, Config);
text('label', _Item3D, Config); 
select('labelPosition', _Item3D, ['above', 'below', 'before', 'after'], Config);
select('size', _Item3D, ['small', 'large'], Config);
select('slotBefore', _Item3D, {'': '', '<Icon />': 'icon'}, Config);
select('slotAfter', _Item3D, {'': '', '<Icon />': 'icon'}, Config);
text('children', _Item3D, Config, 'Hello Item');