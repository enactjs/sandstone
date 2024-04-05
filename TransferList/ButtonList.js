import {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {memo} from 'react';

import Button from '../Button';
import TooltipDecorator from '../TooltipDecorator';

import {handleSpotlightBounds} from './utils';

import componentCss from './TransferList.module.less';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const ButtonList = ({
	disabled,
	firstListMaxCapacity,
	firstListMinCapacity,
	handleRemoveItems,
	handleRemoveSelected,
	handleRestoreLists,
	moveIntoFirstSelected,
	moveIntoSecondSelected,
	moveOnSpotlight,
	onDragOver,
	orientation,
	removeButtonActive,
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
					<TooltipButton
						disabled={disabled || !!secondListMaxCapacity || !!firstListMinCapacity}
						icon={orientation === 'vertical' ? 'triangledown' : 'triangleright'}
						iconOnly
						onClick={selectIntoSecondAll}
						onSpotlightLeft={orientation === 'vertical' ? handleSpotlightBounds : null}
						onSpotlightUp={orientation === 'horizontal' ? handleSpotlightBounds : null}
						size="small"
						tooltipText="move all to second"
						tooltipPosition="right middle"
					/>
					<TooltipButton
						disabled={!(selectedItems?.find((item) => item.list === "first")) || disabled}
						icon={orientation === 'vertical' ? 'arrowlargedown' : 'arrowsmallright'}
						iconOnly
						onClick={moveIntoSecondSelected}
						size="small"
						tooltipText="move to second"
						tooltipPosition="right middle"
					/>
					<TooltipButton
						disabled={!(selectedItems?.find((item) => item.list === "second")) || disabled}
						icon={orientation === 'vertical' ? 'arrowlargeup' : 'arrowsmallleft'}
						iconOnly
						onClick={moveIntoFirstSelected}
						size="small"
						tooltipText="move to first"
						tooltipPosition="right middle"
					/>
					<TooltipButton
						disabled={disabled || !!firstListMaxCapacity || !!secondListMinCapacity}
						icon={orientation === 'vertical' ? 'triangleup' : 'triangleleft'}
						iconOnly
						onClick={selectIntoFirstAll}
						size="small"
						tooltipText="move all to first"
						tooltipPosition="right middle"
					/>
					<TooltipButton
						disabled={disabled || !removeButtonActive}
						icon="trash"
						iconOnly
						onClick={handleRemoveItems}
						onDragOver={onDragOver}
						onDrop={handleRemoveItems}
						size="small"
						tooltipText="delete"
						tooltipPosition="right middle"
					/>
					<TooltipButton
						disabled={disabled || !selectedItems.length}
						icon="circle"
						iconOnly
						onClick={handleRemoveSelected}
						size="small"
						tooltipText="deselect"
						tooltipPosition="right middle"
					/>
					<TooltipButton
						disabled={disabled}
						icon="refresh"
						iconOnly
						onClick={handleRestoreLists}
						onSpotlightDown={orientation === 'horizontal' ? handleSpotlightBounds : null}
						onSpotlightRight={orientation === 'vertical' ? handleSpotlightBounds : null}
						size="small"
						tooltipText="restore lists"
						tooltipPosition="right middle"
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
	 * A function that removes all selected items from the list.
	 *
	 * @type {Function}
	 * @private
	 */
	handleRemoveItems: PropTypes.func,

	/**
	 * A function that removes all the items from the selected list.
	 *
	 * @type {Function}
	 * @private
	 */
	handleRemoveSelected: PropTypes.func,

	/**
	 * A function that restores elements from both lists.
	 *
	 * @type {Function}
	 * @private
	 */
	handleRestoreLists: PropTypes.func,

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
	 * A function which indicates that the remove button is a draggable location.
	 *
	 * @type {Function}
	 * @private
	 */
	onDragOver: PropTypes.func,

	/**
	 * The orientation for the button list.
	 *
	 * @type {('horizontal', 'vertical')}
	 * @private
	 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	/**
	 * Disables Remove Button when items are not selected or dragged
	 *
	 * @type {Boolean}
	 * @private
	 */
	removeButtonActive: PropTypes.bool,

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

export default memo(ButtonList);
