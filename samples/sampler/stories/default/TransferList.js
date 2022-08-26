import {boolean} from "@enact/storybook-utils/addons/controls";
import {mergeComponentMetadata} from "@enact/storybook-utils";

import TransferList, {TransferListBase, TransferListDecorator} from '../../../../TransferList';

TransferList.displayName = 'TransferList';

export default {
	title: 'Sandstone/TransferList',
	component: 'TransferList'
};
const Config = mergeComponentMetadata('TransferList', TransferListBase, TransferList, TransferListDecorator);

export const _TransferList = (args) => (
	<TransferList
		firstList={['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8']}
		moveOnSpotlight={args['moveElementOnSpotlightDirections']}
		secondList={['Item9', 'Item10', 'Item11', 'Item12', 'Item13', 'Item14', 'Item15', 'Item16']}
	/>
);

boolean('moveElementOnSpotlightDirections', _TransferList, Config, false);

_TransferList.storyName = 'TransferList';
_TransferList.parameters = {
	info: {
		text: 'Basic usage of TransferList'
	}
};
