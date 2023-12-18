import '@testing-library/jest-dom';
import {render, fireEvent, screen} from '@testing-library/react';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Button from '../../Button';
import IconItem from '../../IconItem';
import Scroller from '../Scroller';
import css from '../Scroller.module.less';

const keyDownUp = (keyCode) => (elm) => {
	fireEvent.keyDown(elm, {keyCode});
	return fireEvent.keyUp(elm, {keyCode});
};

const pressEnterKey = keyDownUp(13);

const populateItems = ({index}) => {
	const iconItemProps = {
		background: '#ffffff',
		bordered: true,
		icon: '',
		image: null,
		label: null,
		labelColor: null,
		labelOn: null,
		disabled: false
	};

	return {index, iconItemProps};
};

const ContainerDivWithLeaveForConfig = SpotlightContainerDecorator({leaveFor: {left: '', right: ''}}, 'div');

describe('Editable Scroller', () => {
	let items;
	let editableScroller;

	beforeEach(() => {
		items = [];

		for (let i = 0; i < 20; i++) {
			items.push(populateItems({index: i}));
		}

		editableScroller = (
			<Scroller
				direction="horizontal"
				editable={{
					css,
					onComplete: jest.fn(),
					removeItemFuncRef: jest.fn(),
					hideItemFuncRef: jest.fn(),
					showItemFuncRef: jest.fn(),
					focusItemFuncRef: jest.fn(),
					selectItemBy: 'press'
				}}
			>
				{
					items.map((item, index) => {
						return (
							<div key={item.index} aria-label={`Icon ${item.index}`} data-index={item.index} style={{order: index + 1}}>
								<ContainerDivWithLeaveForConfig>
									{item.disabled ? null : <Button aria-label="Delete" icon="trash" />}
									{item.disabled ? null : <Button aria-label="Hide" icon="minus" />}
									{item.disabled ? <Button aria-label="Show" icon="plus" /> : null}
								</ContainerDivWithLeaveForConfig>
								<IconItem
									{...item.iconItemProps}
									disabled={item.iconItemProps['disabled'] || item.hidden}
								/>
							</div>
						);
					})
				}
			</Scroller>
		);
	});

	afterEach(() => {
		items = null;
		editableScroller = null;
	});

	describe('Select Item', () => {
		test(
			'should have "selected" class when item is selected',
			() => {
				render(editableScroller);
                const item = screen.getByLabelText('Icon 0');
                pressEnterKey(item);
				expect(item).toHaveClass('selected');
			}
		);
		test(
			'should not have "selected" class when item is unselected',
			() => {
				render(editableScroller);
				const item = screen.getByLabelText('Icon 0');
				pressEnterKey(item);
				pressEnterKey(item);
				expect(item).not.toHaveClass('selected');
			}
		);
	});
});
