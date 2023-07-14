import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

describe('VirtualList', () => {
	let
		clientSize,
		dataSize,
		items,
		itemSize,
		renderItem;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		itemSize = 60;

		renderItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name
			return (
				<Item {...rest}>
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
		items = null;
		itemSize = null;
		renderItem = null;
	});

	test('should render a list of \'items\'', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const expected = 'Account 0';
		const actual = screen.getByRole('list').children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('should render overhang items when \'clientSize\' and outer DOM size are not specified', () => {
		render(
			<VirtualList
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const expected = 3;
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render (clientHeight / itemHeight + overhang) items', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const expected = 15; // 720 / 60 + 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should re-render (clientHeight / itemHeight + overhang) items after changing \'clientSize\'', () => {
		const {rerender} = render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const newClientSize = {clientWidth: 1280, clientHeight: 360};

		rerender(
			<VirtualList
				clientSize={newClientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const expected = 9; // 360 / 60 + 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render only one scrollbar', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				direction="horizontal"
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const expected = 2; // One for the list and another for the horizontal scrollbar
		const actual = screen.getByRole('list').parentElement.parentElement.children.length;

		expect(actual).toBe(expected);
	});

	describe('Scrollbar visibility', () => {
		test(
			'should render both horizontal and vertical scrollbars when \'horizontalScrollbar\' and \'verticalScrollbar\' are "visible"',
			() => {
				render(
					<VirtualList
						clientSize={clientSize}
						dataSize={dataSize}
						direction="horizontal"
						itemRenderer={renderItem}
						itemSize={itemSize}
						horizontalScrollbar="visible"
						verticalScrollbar="visible"
					/>
				);

				const virtualListRoot =  screen.getByRole('list').parentElement.parentElement;
				const verticalScrollbar = virtualListRoot.children.item(1);
				const horizontalScrollbar = virtualListRoot.children.item(2);

				expect(verticalScrollbar).toHaveClass("verticalScrollbar");
				expect(horizontalScrollbar).toHaveClass("horizontalScrollbar");
			}
		);

		test(
			'should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is "hidden"',
			() => {
				render(
					<VirtualList
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={itemSize}
					/>
				);

				const virtualListRoot =  screen.getByRole('list').parentElement.parentElement;
				const verticalScrollbar = virtualListRoot.children.item(1);
				const horizontalScrollbar = virtualListRoot.children.item(2);

				expect(verticalScrollbar).toBeInTheDocument();
				expect(verticalScrollbar).toHaveClass("verticalScrollbar");
				expect(horizontalScrollbar).toBeNull();
			}
		);

		test(
			'should not render any scrollbar when \'horizontalScrollbar\' and \'verticalScrollbar\' are "hidden"',
			() => {
				render(
					<VirtualList
						clientSize={clientSize}
						dataSize={dataSize}
						direction="horizontal"
						itemRenderer={renderItem}
						itemSize={itemSize}
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					/>
				);

				const virtualListRoot =  screen.getByRole('list').parentElement.parentElement;
				const verticalScrollbar = virtualListRoot.children.item(1);
				const horizontalScrollbar = virtualListRoot.children.item(2);

				expect(verticalScrollbar).toBeNull();
				expect(horizontalScrollbar).toBeNull();
			}
		);
	});

	describe('ScrollTo', () => {
		test('should warn if both \'minSize\' in \'itemSize\' prop and \'cbScrollTo\' prop are given', () => {
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const variableItemSize = {
				minSize: itemSize,
				size: [100, 200, 300, 400, 100, 200, 300, 400, 100, 200]
			};

			render(
				<VirtualList
					cbScrollTo={() => {}}
					clientSize={clientSize}
					dataSize={10}
					itemRenderer={renderItem}
					itemSize={variableItemSize}
					scrollMode="translate"
				/>
			);

			const expectedErrorMsg = 'Warning: VirtualList with `minSize` in `itemSize` prop does not support `cbScrollTo` prop';
			expect(consoleSpy).toHaveBeenCalled();
			expect(consoleSpy.mock.calls[0][0]).toBe(expectedErrorMsg);
		});
	});

	describe('Adding an item', () => {
		test('should render an added item named \'Password 0\' as the first item', (done) => {
			const itemArray = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
			const renderItemArray = ({index, ...rest}) => {
				return (
					<div {...rest} id={'item' + index}>
						{itemArray[index].name}
					</div>
				);
			};

			const {rerender} = render(
				<VirtualList
					clientSize={clientSize}
					dataSize={itemArray.length}
					itemRenderer={renderItemArray}
					itemSize={itemSize}
				/>
			);

			itemArray.unshift({name: 'Password 0'});
			rerender(<VirtualList
				clientSize={clientSize}
				dataSize={itemArray.length}
				itemRenderer={renderItemArray}
				itemSize={itemSize}
			/>);

			jest.useFakeTimers();

			act(() => jest.advanceTimersByTime(0));
			const expected = itemArray[0].name;
			const actual = screen.getByRole('list').children.item(0).textContent;

			expect(actual).toBe(expected);
			done();

			jest.useRealTimers();
		});
	});

	describe('Voice Control', () => {
		test('should render \'data-webos-voice-focused\' to the outermost node of VirtualList', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					data-webos-voice-focused
				/>
			);

			const actual = screen.getByRole('list').parentElement;

			expect(actual).toHaveAttribute('data-webos-voice-focused', 'true');
		});

		test('should render \'data-webos-voice-group-label\' to the outermost node of VirtualList', () => {
			const label = 'group label';
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					data-webos-voice-group-label={label}
				/>
			);

			const actual = screen.getByRole('list').parentElement;

			expect(actual).toHaveAttribute('data-webos-voice-group-label', label);
		});

		test('should render \'data-webos-voice-disabled\' to the outermost node of VirtualList', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					data-webos-voice-disabled
				/>
			);

			const actual = screen.getByRole('list').parentElement;

			expect(actual).toHaveAttribute('data-webos-voice-disabled', 'true');
		});
	});

	describe('HoverToScroll', () => {
		test('should not render hoverToScroll node when \'hoverToScroll\' prop is not provided', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
				/>
			);

			const expected = 2;
			const actual = screen.getByRole('list').parentElement.parentElement.children.length;

			expect(actual).toBe(expected);
		});

		test('should render hoverToScroll node when \'hoverToScroll\' prop is provided', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					hoverToScroll
					itemRenderer={renderItem}
					itemSize={itemSize}
				/>
			);

			const expected = 3;
			const actual = screen.getByRole('list').parentElement.parentElement.children.length;

			expect(actual).toBe(expected);
		});
	});
});
