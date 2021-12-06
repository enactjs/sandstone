import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, range, select, text} from '@enact/storybook-utils/addons/controls';
import KeyGuide from '@enact/sandstone/KeyGuide';

const prop = {
	icon: ['red', 'green', 'yellow', 'blue', 'gear', 'trash', 'search']
};

const Config = mergeComponentMetadata('KeyGuide', KeyGuide);
KeyGuide.displayName = 'KeyGuide';

export default {
	title: 'Sandstone/KeyGuide',
	component: 'KeyGuide'
};

export const _KeyGuide = (args) => {
	const itemCount = args['items'];
	const icon = args['first item icon'];
	const items = [
		{icon, children: args['Item 1 children'], key: 1},
		{icon: 'plus', children: 'Item 1', key: 2},
		{icon: 'minus', children: 'Item 2', key: 3},
		{icon: 'music', children: 'Item 3', key: 4}
	];
	const children = items.slice(0, itemCount);

	return <KeyGuide open={args['open']}>{children}</KeyGuide>;
};

range('items', _KeyGuide, Config, {min: 0, max: 4}, 3);
select('first item icon', _KeyGuide, prop.icon, Config, prop.icon[0]);
text('Item 1 children', _KeyGuide, Config, 'This is long name item');
boolean('open', _KeyGuide, Config, true);

_KeyGuide.storyName = 'KeyGuide';
_KeyGuide.parameters = {
	info: {
		text: 'Explains the operation of remote keys'
	}
};
