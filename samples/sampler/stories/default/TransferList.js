import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number} from '@enact/storybook-utils/addons/controls';

import TransferList, {TransferListBase, TransferListDecorator} from '@enact/sandstone/TransferList';

TransferList.displayName = 'TransferList';

export default {
	title: 'Sandstone/TransferList',
	component: 'TransferList'
};

const Config = mergeComponentMetadata('TransferList', TransferListBase, TransferList, TransferListDecorator);

export const _TransferList = (args) => {
	const disabled = args['disabled'];
	return (
		<section>
			{disabled ? (
				<p style={{fontSize: '70%', fontStyle: 'italic'}}>
					<sup>*</sup>Dragging items is not allowed while <code>disabled</code> is set to <code>true</code>.
				</p>
			) : (
				<p />
			)}
			<TransferList
				allowMultipleDrag={args['allowMultipleDrag']}
				disabled={disabled}
				firstList={['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8']}
				leftListMaximumCapacity={args['leftListMaxCapacity']}
				leftListMinimumCapacity={args['leftListMinCapacity']}
				moveOnSpotlight={args['moveElementOnSpotlightDirections']}
				secondList={['Item9', 'Item10', 'Item11', 'Item12', 'Item13', 'Item14', 'Item15', 'Item16']}
				rightListMinimumCapacity={args['rightListMinCapacity']}
				rightListMaximumCapacity={args['rightListMaxCapacity']}
			/>
		</section>
	)
};

boolean('allowMultipleDrag', _TransferList, Config, true);
boolean('disabled', _TransferList, Config, false);
number('leftListMinCapacity', _TransferList, Config);
number('leftListMaxCapacity', _TransferList, Config);
boolean('moveElementOnSpotlightDirections', _TransferList, Config, false);
number('rightListMinCapacity', _TransferList, Config);
number('rightListMaxCapacity', _TransferList, Config);

_TransferList.storyName = 'TransferList';
_TransferList.parameters = {
	info: {
		text: 'Basic usage of TransferList'
	}
};
