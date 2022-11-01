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
		allowMultipleDrag={args['allowMultipleDrag']}
		disabled={args['disabled']}
		firstList={['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8']}
		firstListMaximumCapacity={args['firstListMaximumCapacity']}
		firstListMinimumCapacity={args['firstListMinimumCapacity']}
		itemSize={args['itemSize']}
		moveOnSpotlight={args['moveElementOnSpotlightDirections']}
		secondList={['Item9', 'Item10', 'Item11', 'Item12', 'Item13', 'Item14', 'Item15', 'Item16']}
		secondListMaximumCapacity={args['secondListMaximumCapacity']}
		secondListMinimumCapacity={args['secondListMinimumCapacity']}
	/>
);

boolean('allowMultipleDrag', _TransferList, Config, true);
boolean('disabled', _TransferList, Config, false);
number('firstListMinimumCapacity', _TransferList, Config);
number('firstListMaximumCapacity', _TransferList, Config);
number('itemSize', _TransferList, Config, 201);
boolean('moveElementOnSpotlightDirections', _TransferList, Config, false);
number('secondListMinimumCapacity', _TransferList, Config);
number('secondListMaximumCapacity', _TransferList, Config);

_TransferList.storyName = 'TransferList';
_TransferList.parameters = {
	info: {
		text: 'Basic usage of TransferList'
	}
};
