import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

const focus = (elm) => fireEvent.focus(elm);

const keyDownUp = (keyCode) => (elm) => {
	fireEvent.keyDown(elm, {keyCode});
	return fireEvent.keyUp(elm, {keyCode});
};

const pressLeftKey = keyDownUp(37);
const pressRightKey = keyDownUp(39);
const pressUpKey = keyDownUp(38);
const pressDownKey = keyDownUp(40);
const pressPageDownKey = keyDownUp(34);

describe('VirtualList useEvent', () => {
	let
		clientSize,
		currentFocusIndex,
		dataSize,
		handlerOnFocus,
		items,
		itemSize,
		renderItem;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		currentFocusIndex = -1;
		dataSize = 200;
		items = [];
		itemSize = 60;

		handlerOnFocus = (index) => () => {
			currentFocusIndex = index;
		};

		renderItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name
			return (
				<Item {...rest} onFocus={handlerOnFocus(index)}>
					{items[index].name}
				</Item>
			);
		};

		for (let i = 0; i < dataSize; i++) {
			items.push({name: 'Account ' + i});
		}
	});

	afterEach(() => {
		clientSize = null;
		dataSize = null;
		items = [];
		itemSize = 60;
		items = null;
		renderItem = null;
	});

	test('should navigate focus using arrow-up/down key', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const list = screen.getByRole('list');
		const item0 = list.children.item(0).children.item(0);
		const item1 = list.children.item(1).children.item(0);
		const item2 = list.children.item(2).children.item(0);

		focus(item0);
		expect(currentFocusIndex).toBe(0);

		pressDownKey(item0);
		expect(currentFocusIndex).toBe(1);

		pressDownKey(item1);
		expect(currentFocusIndex).toBe(2);

		pressUpKey(item2);
		expect(currentFocusIndex).toBe(1);
	});

	test('should not navigate focus using arrow-up/down key when \'direction\'is horizontal', () => {
		render(
			<VirtualList
				direction="horizontal"
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const list = screen.getByRole('list');
		const item0 = list.children.item(0).children.item(0);

		focus(item0);
		expect(currentFocusIndex).toBe(0);

		pressDownKey(item0);
		expect(currentFocusIndex).toBe(0);

		pressUpKey(item0);
		expect(currentFocusIndex).toBe(0);
	});

	test('should navigate focus using arrow-left/right key when \'direction\'is horizontal', () => {
		render(
			<VirtualList
				direction="horizontal"
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const list = screen.getByRole('list');
		const item0 = list.children.item(0).children.item(0);
		const item1 = list.children.item(1).children.item(0);
		const item2 = list.children.item(2).children.item(0);

		focus(item0);
		expect(currentFocusIndex).toBe(0);

		pressRightKey(item0);
		expect(currentFocusIndex).toBe(1);

		pressRightKey(item1);
		expect(currentFocusIndex).toBe(2);

		pressLeftKey(item2);
		expect(currentFocusIndex).toBe(1);
	});

	test('should scroll by focus navigation using arrow-down key', () => {
		const spy = jest.fn(() => {});
		const scrollToFn = global.Element.prototype.scrollTo;
		global.Element.prototype.scrollTo = spy;

		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const list = screen.getByRole('list');
		const item13 = list.children.item(13).children.item(0);

		focus(item13);
		expect(currentFocusIndex).toBe(13);

		pressDownKey(item13);
		expect(currentFocusIndex).toBe(14);

		expect(spy).toHaveBeenCalled();

		global.Element.prototype.scrollTo = scrollToFn;
	});

	test('should scroll by page-down key', () => {
		const spy = jest.fn(() => {});
		const scrollToFn = global.Element.prototype.scrollTo;
		global.Element.prototype.scrollTo = spy;

		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const list = screen.getByRole('list');
		const item9 = list.children.item(9).children.item(0);
		const item10 = list.children.item(10).children.item(0);

		focus(item9);
		expect(currentFocusIndex).toBe(9);

		pressDownKey(item9);
		expect(currentFocusIndex).toBe(10);

		pressPageDownKey(item10);

		expect(spy).toHaveBeenCalled();

		global.Element.prototype.scrollTo = scrollToFn;
	});
});
