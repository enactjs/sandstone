import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean} from '@enact/storybook-utils/addons/controls';

import TransferList from '../../../../TransferList';

const Config = mergeComponentMetadata('TransferList', TransferList);

TransferList.displayName = 'TransferList';

export default {
	title: 'Sandstone/TransferList',
	component: 'TransferList'
};

export const _TransferList = (args) => (
	<TransferList
		allowMultipleDrag={args['allowMultipleDrag']}
		firstList={['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8']}
		secondList={['Item9', 'Item10', 'Item11', 'Item12', 'Item13', 'Item14', 'Item15', 'Item16']}
	/>
);

boolean('allowMultipleDrag', _TransferList, Config, true);

_TransferList.storyName = 'TransferList';
_TransferList.parameters = {
	info: {
		text: 'Basic usage of TransferList'
	}
};
