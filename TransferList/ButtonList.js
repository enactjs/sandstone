import {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import Button from '../Button';

import {handleSpotlightBounds} from './utils';

import componentCss from './TransferList.module.less';

const ButtonList = ({
	disabled,
	firstListOrderFixed,
	firstListMaxCapacity,
	firstListMinCapacity,
	handleRemoveItems,
	handleRemoveSelected,
	moveIntoFirstSelected,
	moveIntoSecondSelected,
	moveOnSpotlight,
	orientation,
	secondListMaxCapacity,
	secondListMinCapacity,
	selectIntoFirstAll,
	selectIntoSecondAll,
	selectedItems
}) => {
	return (
		<Cell className={componentCss.listButtons} style={{flexDirection: orientation === 'vertical' ? 'row' : 'column'}}>
			{!moveOnSpotlight ?
				<>
					<Button
						disabled={disabled || !!secondListMaxCapacity || !!firstListMinCapacity}
						icon={orientation === 'vertical' ? 'triangledown' : 'triangleright'}
						iconOnly
						onClick={selectIntoSecondAll}
						onSpotlightLeft={orientation === 'vertical' ? handleSpotlightBounds : null}
						onSpotlightUp={orientation === 'horizontal' ? handleSpotlightBounds : null}
						size="small"
					/>
					<Button
						disabled={!(selectedItems?.find((item) => item.list === "first")) || disabled}
						icon={orientation === 'vertical' ? 'arrowlargedown' : 'arrowsmallright'}
						iconOnly
						onClick={moveIntoSecondSelected}
						size="small"
					/>
					<Button
						disabled={!(selectedItems?.find((item) => item.list === "second")) || disabled}
						icon={orientation === 'vertical' ? 'arrowlargeup' : 'arrowsmallleft'}
						iconOnly
						onClick={moveIntoFirstSelected}
						size="small"
					/>
					<Button
						disabled={disabled || !!firstListMaxCapacity || !!secondListMinCapacity}
						icon={orientation === 'vertical' ? 'triangleup' : 'triangleleft'}
						iconOnly
						onClick={selectIntoFirstAll}
						size="small"
					/>
					<Button
						disabled={!(selectedItems?.find((item) => (item.list === 'first' && !firstListOrderFixed) || item.list === 'second')) || disabled}
						icon="trash"
						iconOnly
						onClick={handleRemoveItems}
						size="small"
					/>
					<Button
						disabled={disabled}
						icon="refresh"
						iconOnly
						onClick={handleRemoveSelected}
						onSpotlightDown={orientation === 'horizontal' ? handleSpotlightBounds : null}
						onSpotlightRight={orientation === 'vertical' ? handleSpotlightBounds : null}
						size="small"
					/>
				</> : ''
			}
		</Cell>
	);
};

ButtonList.propTypes = {
	/**
	 * Disables ButtonList and becomes non-interactive.
	 *
	 * @type {Boolean}
	 * @private
	 */
	disabled: PropTypes.bool,

	/**
	 * Sets the maximum number of items for the first list.
	 *
	 * @type {Number}
	 * @private
	 */
	firstListMaxCapacity: PropTypes.number,

	/**
	 * Sets the minimum number of items for the first list.
	 *
	 * @type {Number}
	 * @private
	 */
	firstListMinCapacity: PropTypes.number,

	/**
	 * A function that removes all the items from the selected list.
	 *
	 * @type {Function}
	 * @private
	 */
	handleRemoveSelected: PropTypes.func,

	/**
	 * A function that moves all the selected items into the first list.
	 *
	 * @type {Function}
	 * @private
	 */
	moveIntoFirstSelected: PropTypes.func,

	/**
	 * A function that moves all the selected items into the second list.
	 *
	 * @type {Function}
	 * @private
	 */
	moveIntoSecondSelected: PropTypes.func,

	/**
	 * Removes the buttons.
	 *
	 * @type {Boolean}
	 * @private
	 */
	moveOnSpotlight: PropTypes.bool,

	/**
	 * The orientation for the button list.
	 *
	 * @type {('horizontal', 'vertical')}
	 * @private
	 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	/**
	 * Sets the maximum number of items for the second list.
	 *
	 * @type {Number}
	 * @private
	 */
	secondListMaxCapacity: PropTypes.number,

	/**
	 * Sets the minimum number of items for the second list.
	 *
	 * @type {Number}
	 * @private
	 */
	secondListMinCapacity: PropTypes.number,

	/**
	 * An array containing all the selected items.
	 *
	 * @type {Array}
	 * @private
	 */
	selectedItems: PropTypes.array,

	/**
	 * A function that moves all the items into the first list.
	 *
	 * @type {Function}
	 * @private
	 */
	selectIntoFirstAll: PropTypes.func,

	/**
	 * A function that moves all the items into the second list.
	 *
	 * @type {Function}
	 * @private
	 */
	selectIntoSecondAll: PropTypes.func
};

export default ButtonList;
