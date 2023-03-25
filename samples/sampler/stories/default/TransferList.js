import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';

import TransferList, {TransferListBase, TransferListDecorator} from '@enact/sandstone/TransferList';

TransferList.displayName = 'TransferList';

export default {
	title: 'Sandstone/TransferList',
	component: 'TransferList'
};

const Config = mergeComponentMetadata('TransferList', TransferListBase, TransferList, TransferListDecorator);

export const _TransferList = (args) => (
	<TransferList
		disabled={args['disabled']}
		firstList={['BBC World News', 'CNN International', 'CNBC', 'Fox News', 'MTV', 'Euro News', 'ESPN', 'Fox Sports']}
		firstListMaxCapacity={args['firstListMaximumCapacity']}
		firstListMinCapacity={args['firstListMinCapacity']}
		firstListOperation={args['firstListOperation']}
		itemSize={args['itemSize']}
		listComponent={args['listComponent']}
		moveOnSpotlight={args['moveElementOnSpotlightDirections']}
		noMultipleDrag={args['noMultipleDrag']}
		orientation={args['orientation']}
		secondList={['HBO', 'Comedy Central', 'HGTV', 'CBS', 'Cartoon Network', 'AXN', 'Disney Channel', 'BBC Food']}
		secondListMaxCapacity={args['secondListMaxCapacity']}
		secondListMinCapacity={args['secondListMinCapacity']}
		secondListOperation={args['secondListOperation']}
		showSelectionOrder={args['showSelectionOrder']}
	/>
);

boolean('disabled', _TransferList, Config, false);
number('firstListMinCapacity', _TransferList, Config);
number('firstListMaxCapacity', _TransferList, Config);
select('firstListOperation', _TransferList, ['move', 'copy', 'delete'], Config, 'move');
number('itemSize', _TransferList, Config, 201);
select('listComponent', _TransferList, ['VirtualList', 'VirtualGridList'], Config, 'VirtualList');
boolean('moveElementOnSpotlightDirections', _TransferList, Config, false);
boolean('noMultipleDrag', _TransferList, Config, false);
select('orientation', _TransferList, ['horizontal', 'vertical'], Config, 'horizontal');
number('secondListMinCapacity', _TransferList, Config);
number('secondListMaxCapacity', _TransferList, Config);
select('secondListOperation', _TransferList, ['move', 'copy', 'delete'], Config, 'move');
boolean('showSelectionOrder', _TransferList, Config, false);

_TransferList.storyName = 'TransferList';
_TransferList.parameters = {
	info: {
		text: 'Basic usage of TransferList'
	}
};
