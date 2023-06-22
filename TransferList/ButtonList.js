import {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import Button from '../Button';

import {handleSpotlightBounds} from './utils';

import componentCss from './TransferList.module.less';

const ButtonList = ({
	disabled,
	firstListMaxCapacity,
	firstListMinCapacity,
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
	 * Disables TransferList and becomes non-interactive.
	 *
	 * @type {Boolean}
	 * @public
	 */
	disabled: PropTypes.bool,

	/**
	 * Sets the maximum number of items for the first list.
	 *
	 * @type {Number}
	 * @public
	 */
	firstListMaxCapacity: PropTypes.number,

	/**
	 * Sets the minimum number of items for the first list.
	 *
	 * @type {Number}
	 * @public
	 */
	firstListMinCapacity: PropTypes.number,

	/**
	 * A function that removes all the items from the selected list.
	 *
	 * @type {Function}
	 * @public
	 */
	handleRemoveSelected: PropTypes.func,

	/**
	 * A function that moves all the selected items into the first list.
	 *
	 * @type {Function}
	 * @public
	 */
	moveIntoFirstSelected: PropTypes.func,

	/**
	 * A function that moves all the selected items into the second list.
	 *
	 * @type {Function}
	 * @public
	 */
	moveIntoSecondSelected: PropTypes.func,

	/**
	 * Allows items to be transferred from one list to another using Spotlight Right and/or Spotlight Left.
	 *
	 * @type {Boolean}
	 * @public
	 */
	moveOnSpotlight: PropTypes.bool,

	/**
	 * The orientation for the transfer list.
	 *
	 * @type {('horizontal', 'vertical')}
	 * @public
	 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	/**
	 * Sets the maximum number of items for the second list.
	 *
	 * @type {Number}
	 * @public
	 */
	secondListMaxCapacity: PropTypes.number,

	/**
	 * Sets the minimum number of items for the second list.
	 *
	 * @type {Number}
	 * @public
	 */
	secondListMinCapacity: PropTypes.number,

	/**
	 * An array containing all the selected items.
	 *
	 * @type {Array}
	 * @public
	 */
	selectedItems: PropTypes.array,

	/**
	 * A function that moves all the items into the first list.
	 *
	 * @type {Function}
	 * @public
	 */
	selectIntoFirstAll: PropTypes.func,

	/**
	 * A function that moves all the items into the second list.
	 *
	 * @type {Function}
	 * @public
	 */
	selectIntoSecondAll: PropTypes.func
};

export default ButtonList;
