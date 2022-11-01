import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import {ImageItem} from '../../ImageItem';
import Item from '../../Item';
import VirtualList, {VirtualGridList} from '../VirtualList';

const focus = (elm) => fireEvent.focus(elm);

const keyDownUp = (keyCode) => (elm) => {
	fireEvent.keyDown(elm, {keyCode});
	return fireEvent.keyUp(elm, {keyCode});
};

const leftKey = keyDownUp(37);
const rightKey = keyDownUp(39);
const upKey = keyDownUp(38);
const downKey = keyDownUp(40);
const pageDownKey = keyDownUp(34);

describe('VirtualList useEvent', () => {
	let
		clientSize,
		currentFocusIndex,
		dataSize,
		handlerOnFocus,
		imageItemSize,
		items,
		itemSize,
		renderImageItem,
		renderItem,
		svgGenerator;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		currentFocusIndex = -1;
		dataSize = 200;
		imageItemSize = {minWidth: 300, minHeight: 240};
		items = [];
		itemSize = 60;

		handlerOnFocus = (index) => () => {
			currentFocusIndex = index;
		};

		renderImageItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name
			const {name, subText, source} = items[index];

			return (
				<ImageItem {...rest} label={subText} src={source} onFocus={handlerOnFocus(index)}>
					{name}
				</ImageItem>
			);
		};

		renderItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name
			return (
				<Item {...rest} onFocus={handlerOnFocus(index)}>
					{items[index].name}
				</Item>
			);
		};

		svgGenerator = (width, height, bgColor, textColor, customText) => (
			`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
			`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
			`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
		);

		for (let i = 0; i < dataSize; i++) {
			const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);

			items.push({
				name: 'Account ' + i,
				// For VirtualGridList
				subText: 'SubText ' + i,
				source: svgGenerator(300, 300, color, 'ffffff', `Image ${i}`)
			});
		}
	});

	afterEach(() => {
		clientSize = null;
		dataSize = null;
		imageItemSize = null;
		items = [];
		itemSize = 60;
		items = null;
		renderImageItem = null;
		renderItem = null;
		svgGenerator = null;
	});

	describe('VirtualList useEvent', () => {
		test('should navigate focus using arrow-up/down key', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="translate"
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

		test('should not navigate focus using arrow-up/down key when \'direction\'is horizontal', () => {
			render(
				<VirtualList
					direction="horizontal"
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item0 = list.children.item(0).children.item(0);

			focus(item0);
			expect(currentFocusIndex).toBe(0);

			downKey(item0);
			expect(currentFocusIndex).toBe(0);

			upKey(item0);
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
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item0 = list.children.item(0).children.item(0);
			const item1 = list.children.item(1).children.item(0);
			const item2 = list.children.item(2).children.item(0);

			focus(item0);
			expect(currentFocusIndex).toBe(0);

			rightKey(item0);
			expect(currentFocusIndex).toBe(1);

			rightKey(item1);
			expect(currentFocusIndex).toBe(2);

			leftKey(item2);
			expect(currentFocusIndex).toBe(1);
		});

		test('should be scroll by focus navigation using arrow-down key', () => {
			const spy = jest.fn(() => {});

			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStart={spy}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item13 = list.children.item(13).children.item(0);

			focus(item13);
			expect(currentFocusIndex).toBe(13);

			downKey(item13);
			expect(currentFocusIndex).toBe(14);

			expect(spy).toHaveBeenCalled();
		});

		test('should be scroll by page-down key', () => {
			const spy = jest.fn(() => {});

			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStart={spy}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item9 = list.children.item(9).children.item(0);
			const item10 = list.children.item(10).children.item(0);

			focus(item9);
			expect(currentFocusIndex).toBe(9);

			downKey(item9);
			expect(currentFocusIndex).toBe(10);

			pageDownKey(item10);

			expect(spy).toHaveBeenCalled();
		});
	});

	describe('VirtualGridList translate useEvent', () => {
		test('should navigate focus using arrow-up/down key', () => {
			render(
				<VirtualGridList
					clientSize={clientSize}
					direction="vertical"
					dataSize={dataSize}
					itemRenderer={renderImageItem}
					itemSize={imageItemSize}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item0 = list.children.item(0).children.item(0);
			const item4 = list.children.item(4).children.item(0);
			const item8 = list.children.item(8).children.item(0);

			focus(item0);
			expect(currentFocusIndex).toBe(0);

			downKey(item0);
			downKey(item0);
			expect(currentFocusIndex).toBe(4);

			downKey(item4);
			expect(currentFocusIndex).toBe(8);

			upKey(item8);
			expect(currentFocusIndex).toBe(4);
		});

		test('should navigate focus using arrow-up/down key when \'direction\'is horizontal', () => {
			render(
				<VirtualGridList
					direction="horizontal"
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderImageItem}
					itemSize={imageItemSize}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item0 = list.children.item(0).children.item(0);
			const item1 = list.children.item(1).children.item(0);

			focus(item0);
			expect(currentFocusIndex).toBe(0);

			downKey(item0);
			expect(currentFocusIndex).toBe(1);

			upKey(item1);
			expect(currentFocusIndex).toBe(0);
		});

		test('should navigate focus using arrow-left/right key when \'direction\'is horizontal', () => {
			render(
				<VirtualGridList
					direction="horizontal"
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderImageItem}
					itemSize={imageItemSize}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item0 = list.children.item(0).children.item(0);
			const item3 = list.children.item(3).children.item(0);
			const item6 = list.children.item(6).children.item(0);

			focus(item0);
			expect(currentFocusIndex).toBe(0);

			rightKey(item0);
			expect(currentFocusIndex).toBe(3);

			rightKey(item3);
			expect(currentFocusIndex).toBe(6);

			leftKey(item6);
			expect(currentFocusIndex).toBe(3);
		});

		test('should be scroll by focus navigation using arrow-down key', () => {
			const spy = jest.fn(() => {});

			render(
				<VirtualGridList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderImageItem}
					itemSize={imageItemSize}
					onScrollStart={spy}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item13 = list.children.item(13).children.item(0);

			focus(item13);
			expect(currentFocusIndex).toBe(13);

			downKey(item13);
			expect(currentFocusIndex).toBe(17);

			expect(spy).toHaveBeenCalled();
		});

		test('should be scroll by page-down key', () => {
			const spy = jest.fn(() => {});

			render(
				<VirtualGridList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderImageItem}
					itemSize={imageItemSize}
					onScrollStart={spy}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			const item9 = list.children.item(9).children.item(0);
			const item10 = list.children.item(10).children.item(0);

			focus(item9);
			expect(currentFocusIndex).toBe(9);

			downKey(item9);
			expect(currentFocusIndex).toBe(13);

			pageDownKey(item10);

			expect(spy).toHaveBeenCalled();
		});
	});
});
