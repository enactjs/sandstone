import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

describe('VirtualList with translate \'scrollMode\'', () => {
	let
		clientSize,
		dataSize,
		getScrollTo,
		handlerOnScroll,
		handlerOnScrollStart,
		handlerOnScrollStop,
		items,
		itemSize,
		myScrollTo,
		onScrollCount,
		onScrollStartCount,
		onScrollStopCount,
		renderItem,
		resultScrollLeft,
		resultScrollTop,
		startScrollTop;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		itemSize = 60;
		onScrollCount = 0;
		onScrollStartCount = 0;
		onScrollStopCount = 0;
		resultScrollLeft = 0;
		resultScrollTop = 0;
		startScrollTop = 0;

		getScrollTo = (scrollTo) => {
			myScrollTo = scrollTo;
		};
		handlerOnScroll = () => {
			onScrollCount++;
		};
		handlerOnScrollStart = (e) => {
			startScrollTop = e.scrollTop;
			onScrollStartCount++;
		};
		handlerOnScrollStop = (done, testCase) => (e) => {
			onScrollStopCount++;
			resultScrollLeft = e.scrollLeft;
			resultScrollTop = e.scrollTop;

			testCase();
			done();
		};
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
		getScrollTo = null;
		handlerOnScroll = null;
		handlerOnScrollStart = null;
		handlerOnScrollStop = null;
		items = null;
		itemSize = null;
		myScrollTo = null;
		onScrollCount = null;
		onScrollStartCount = null;
		onScrollStopCount = null;
		renderItem = null;
		resultScrollLeft = null;
		resultScrollTop = null;
		startScrollTop = null;
	});

	test('should render a list of \'items\'', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
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
				scrollMode="translate"
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
				scrollMode="translate"
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
				scrollMode="translate"
			/>
		);

		const newClientSize = {clientWidth: 1280, clientHeight: 360};

		rerender(
			<VirtualList
				clientSize={newClientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
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
				scrollMode="translate"
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
						scrollMode="translate"
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
						scrollMode="translate"
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
						scrollMode="translate"
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
		test('should scroll to the specific item of a given \'index\' with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 600;

				expect(resultScrollTop).toBe(expected);
			});

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({index: 10, animate: false}));
		});

		test('should scroll to the given \'x\' position with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 200;

				expect(resultScrollLeft).toBe(expected);
			});

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({position: {x: 200}, animate: false}));
		});

		test('should scroll to the given \'y\' position with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 200;

				expect(resultScrollTop).toBe(expected);
			});

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({position: {y: 200}, animate: false}));
		});

		test('should scroll to the given \'align\' with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = dataSize * itemSize - clientSize.clientHeight + 30;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({align: 'bottom', animate: false}));
		});

		test('should scroll to the given \'align\' with scrollTo after changing \'dataSize\'', (done) => {
			const newDataSize = 50;

			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = newDataSize * itemSize - clientSize.clientHeight + 30;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			const {rerender} = render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			rerender(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={newDataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({align: 'bottom', animate: false}));
		});

		test('should scroll to the given \'align\' with scrollTo after changing \'itemSize\'', (done) => {
			const newItemSize = 50;

			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = dataSize * newItemSize - clientSize.clientHeight + 30;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			const {rerender} = render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			rerender(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={newItemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({align: 'bottom', animate: false}));
		});

		test('should scroll to the given \'align\' with scrollTo after changing \'spacing\'', (done) => {
			const newSpacing = 30;

			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = dataSize * (itemSize + newSpacing) - clientSize.clientHeight - newSpacing + 30;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			const {rerender} = render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			rerender(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					spacing={newSpacing}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({align: 'bottom', animate: false}));
		});

		test('should warn if both \'minSize\' in \'itemSize\' prop and \'cbScrollTo\' prop are given', () => {
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const variableItemSize = {
				minSize: itemSize,
				size: [100, 200, 300, 400, 100, 200, 300, 400, 100, 200]
			};

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
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

		describe('scroll events', () => {
			test('should call onScrollStart once', () => {
				render(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={itemSize}
						onScrollStart={handlerOnScrollStart}
						scrollMode="translate"
					/>
				);

				act(() => myScrollTo({position: {y: 200}, animate: false}));

				const expected = 1;

				expect(onScrollStartCount).toBe(expected);
			});

			test('should call onScroll once', () => {
				render(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={itemSize}
						onScroll={handlerOnScroll}
						scrollMode="translate"
					/>
				);

				act(() => myScrollTo({position: {y: 200}, animate: false}));

				const expected = 1;

				expect(onScrollCount).toBe(expected);
			});

			test('should call onScrollStop once', (done) => {
				const onScrollStop = handlerOnScrollStop(done, () => {
					const expected = 1;

					expect(onScrollStopCount).toBe(expected);
				});

				render(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={itemSize}
						onScrollStop={onScrollStop}
						scrollMode="translate"
					/>
				);

				act(() => myScrollTo({position: {y: 200}, animate: false}));
			});
		});
	});

	describe('Scroll by event', () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		test('should scroll by wheel', (done) => {
			const fn = jest.fn();

			const onScrollStop = handlerOnScrollStop(done, () => {
				fn();
				expect(startScrollTop).toBe(0);
				expect(onScrollStartCount).toBe(1);
				expect(resultScrollTop).toBeGreaterThan(0);
			});

			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					onScrollStart={handlerOnScrollStart}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			fireEvent.wheel(list, {deltaY: 100});

			act(() => jest.advanceTimersByTime(1000)); // Wait onScrollStop

			expect(fn).toBeCalled();
		});

		test('should show overscroll effect by wheel', (done) => {
			const fn = jest.fn();

			const onScrollStop = handlerOnScrollStop(done, () => {
				fn();
				expect(startScrollTop).toBe(0);
				expect(onScrollStartCount).toBe(1);
				expect(resultScrollTop).toBe(0);

				const listRoot = screen.getByRole('list').parentElement;
				expect(listRoot).toHaveStyle({'--scroll-overscroll-translate-vertical': 'translateY(0px)'});
			});

			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					onScrollStart={handlerOnScrollStart}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			fireEvent.wheel(list, {deltaY: -100});

			act(() => jest.advanceTimersByTime(1000)); // Wait onScrollStop

			expect(fn).toBeCalled();
		});

		test('should not scroll by wheel when \'noScrollByWheel\' prop is true', (done) => {
			const fn = jest.fn();

			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					noScrollByWheel
					onScrollStop={fn}
					onScrollStart={handlerOnScrollStart}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			fireEvent.wheel(list, {deltaY: 100});

			act(() => jest.advanceTimersByTime(1000)); // Wait onScrollStop

			expect(fn).not.toHaveBeenCalled();

			done();
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
					scrollMode="translate"
				/>
			);

			itemArray.unshift({name: 'Password 0'});
			rerender(<VirtualList
				clientSize={clientSize}
				dataSize={itemArray.length}
				itemRenderer={renderItemArray}
				itemSize={itemSize}
				scrollMode="translate"
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
					scrollMode="translate"
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
					scrollMode="translate"
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
					scrollMode="translate"
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
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({position: {y: 200}, animate: false}));

			const expected = 2;
			const actual = screen.getByRole('list').parentElement.parentElement.children.length;

			expect(actual).toBe(expected);
		});

		test('should render two hoverToScroll nodes after scrolling when \'hoverToScroll\' prop is provided', () => {
			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					hoverToScroll
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({position: {y: 200}, animate: false}));

			const expected = 4;
			const actual = screen.getByRole('list').parentElement.parentElement.children.length;

			expect(actual).toBe(expected);
		});
	});
});
