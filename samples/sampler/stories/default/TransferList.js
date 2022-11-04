import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number} from '@enact/storybook-utils/addons/controls';

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
		firstList={['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8']}
		firstListMaxCapacity={args['firstListMaximumCapacity']}
		firstListMinCapacity={args['firstListMinCapacity']}
		itemSize={args['itemSize']}
		moveOnSpotlight={args['moveElementOnSpotlightDirections']}
		noMultipleDrag={args['noMultipleDrag']}
		secondList={['Item9', 'Item10', 'Item11', 'Item12', 'Item13', 'Item14', 'Item15', 'Item16']}
		secondListMaxCapacity={args['secondListMaxCapacity']}
		secondListMinCapacity={args['secondListMinCapacity']}
		showSelectionOrder={args['showSelectionOrder']}
	/>
);

boolean('disabled', _TransferList, Config, false);
number('firstListMinCapacity', _TransferList, Config);
number('firstListMaxCapacity', _TransferList, Config);
number('itemSize', _TransferList, Config, 201);
boolean('noMultipleDrag', _TransferList, Config, false);
boolean('moveElementOnSpotlightDirections', _TransferList, Config, false);
number('secondListMinCapacity', _TransferList, Config);
number('secondListMaxCapacity', _TransferList, Config);
boolean('showSelectionOrder', _TransferList, Config, false);

_TransferList.storyName = 'TransferList';
_TransferList.parameters = {
	info: {
		text: 'Basic usage of TransferList'
	}
};
