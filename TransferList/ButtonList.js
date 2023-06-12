import {Cell} from '@enact/ui/Layout';

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
	console.log(orientation)
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
}
export default ButtonList;
