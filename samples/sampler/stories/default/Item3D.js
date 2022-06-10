import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Item3D, {Item3DBase} from '@enact/sandstone/Item3D';
import UIItem, {ItemBase as UIItemBase} from '@enact/ui/Item';

import {Canvas} from '@react-three/fiber';


Item3D.displayName = 'Item3D';
const Config = mergeComponentMetadata('Item3D', UIItemBase, UIItem, Item3DBase, Item3D);

export default {
	title: 'Sandstone/Item3D',
	component: 'Item3D'
};

export const _Item3D = (args) => (
	<Canvas>
		<ambientLight />
		<pointLight position={[10, 10, 10]} />
		<Item3D  />
	</Canvas>
);


_Item3D.storyName = 'Item3D';
_Item3D.parameters = {
	info: {
		text: 'The basic 3D Item'
	}
};