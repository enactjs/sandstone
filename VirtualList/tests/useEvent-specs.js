import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

const focus = (elm) => fireEvent.focus(elm);

const keyDownUp = (keyCode) => (elm) => {
	fireEvent.keyDown(elm, {keyCode});
	return fireEvent.keyUp(elm, {keyCode});
};

const upKey = keyDownUp(38);
const downKey = keyDownUp(40);
const pageDownKey = keyDownUp(34);

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

	test('should navigate focus using arrow keys', () => {
		render(
			<VirtualList
				spotlightId="virtualList"
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

		downKey(item0);
		expect(currentFocusIndex).toBe(1);

		downKey(item1);
		expect(currentFocusIndex).toBe(2);

		upKey(item2);
		expect(currentFocusIndex).toBe(1);
	});

	test('should be scrolled by focus navigation using arrowdown key', () => {
		const scrollToFn = global.Element.prototype.scrollTo = jest.fn(() => {
			return true;
		});

		render(
			<VirtualList
				spotlightId="virtualList"
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

		downKey(item13);
		expect(currentFocusIndex).toBe(14);

		expect(scrollToFn).toHaveBeenCalled();
	});
});
