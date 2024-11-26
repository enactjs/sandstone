import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import '@testing-library/jest-dom';
import {render, fireEvent, screen} from '@testing-library/react';

import Button from '../../Button';
import IconItem from '../../IconItem';
import Scroller from '../Scroller';

const keyDownUp = (keyCode) => (elm) => {
	fireEvent.keyDown(elm, {keyCode});
	return fireEvent.keyUp(elm, {keyCode});
};

const pressEnterKey = keyDownUp(13);

const populateItems = ({index}) => {
	const iconItemProps = {
		background: '#ffffff',
		bordered: true,
		disabled: false,
		label: `Icon ${index}`
	};

	return {index, iconItemProps};
};

const ContainerDivWithLeaveForConfig = SpotlightContainerDecorator({leaveFor: {left: '', right: ''}}, 'div');

describe('Editable Scroller', () => {
	let items;
	let editableScrollerContents;

	beforeEach(() => {
		items = [];

		for (let i = 0; i < 20; i++) {
			items.push(populateItems({index: i}));
		}

		editableScrollerContents = (
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
		);
	});

	afterEach(() => {
		items = null;
		editableScrollerContents = null;
	});

	describe('Select Item', () => {
		test(
			'should have selected class and custom selected class when item is selected',
			() => {
				render(<Scroller
					direction="horizontal"
					editable={{
						css: {
							'selected': 'customSelected'
						},
						onComplete: jest.fn(),
						removeItemFuncRef: jest.fn(),
						hideItemFuncRef: jest.fn(),
						showItemFuncRef: jest.fn(),
						focusItemFuncRef: jest.fn(),
						selectItemBy: 'press'
					}}
				>
					{editableScrollerContents}
				</Scroller>);
				const item = screen.getByLabelText('Icon 0');
				pressEnterKey(item);
				expect(item).toHaveClass('selected');
				expect(item).toHaveClass('customSelected');
			}
		);
		test(
			'should not have selected class and custom selected class and should have custom focused class when item is unselected',
			() => {
				render(<Scroller
					direction="horizontal"
					editable={{
						css: {
							'selected': 'customSelected',
							'focused': 'customFocused'
						},
						onComplete: jest.fn(),
						removeItemFuncRef: jest.fn(),
						hideItemFuncRef: jest.fn(),
						showItemFuncRef: jest.fn(),
						focusItemFuncRef: jest.fn(),
						selectItemBy: 'press'
					}}
				>
					{editableScrollerContents}
				</Scroller>);
				Spotlight.setPointerMode(false);

				const item = screen.getByLabelText('Icon 0');
				pressEnterKey(item);
				pressEnterKey(item);
				expect(item).not.toHaveClass('selected');
				expect(item).not.toHaveClass('customSelected');
				expect(item).toHaveClass('customFocused');
			}
		);
	});
});
