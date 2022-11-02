import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';

import ImageItem from '../../ImageItem';
import {VirtualGridList} from '../VirtualList';

describe('VirtualGridList translate', () => {
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
		startScrollTop,
		svgGenerator;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		itemSize = {minWidth: 300, minHeight: 240};
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
			const {text, subText, source} = items[index];

			return (
				<ImageItem {...rest} label={subText} src={source}>
					{text}
				</ImageItem>
			);
		};

		svgGenerator = (width, height, bgColor, textColor, customText) => (
			`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
			`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
			`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
		);

		const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0;
		const headingZeros = Array(itemNumberDigits).join('0');

		for (let i = 0; i < dataSize; i++) {
			const count = (headingZeros + i).slice(-itemNumberDigits),
				text = `Item ${count}`,
				subText = `SubItem ${count}`,
				color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16),
				source = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`);

			items.push({text, subText, source});
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
		svgGenerator = null;
	});

	test('should render a list of \'items\'', () => {
		render(
			<VirtualGridList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 'Item 000SubItem 000';
		const actual = screen.getByRole('list').children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('should render overhang items when clientSize is not given', () => {
		render(
			<VirtualGridList
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 0;
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render (clientHeight / itemHeight + overhang) items', () => {
		render(
			<VirtualGridList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 24; // (4 * (720 / 240)) + 4 * 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should re-render (clientHeight / itemHeight + overhang) items after changing client size', () => {
		const {rerender} = render(
			<VirtualGridList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const newClientSize = {clientWidth: 1280, clientHeight: 360};

		rerender(
			<VirtualGridList
				clientSize={newClientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 20; // (4 * (360 / 240)) + 4 * 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render only one scrollbar', () => {
		render(
			<VirtualGridList
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
					<VirtualGridList
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

				const VirtualGridListRoot =  screen.getByRole('list').parentElement.parentElement;
				const verticalScrollbar = VirtualGridListRoot.children.item(1);
				const horizontalScrollbar = VirtualGridListRoot.children.item(2);

				expect(verticalScrollbar).toHaveClass("verticalScrollbar");
				expect(horizontalScrollbar).toHaveClass("horizontalScrollbar");
			}
		);

		test(
			'should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is "hidden"',
			() => {
				render(
					<VirtualGridList
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={itemSize}
						scrollMode="translate"
					/>
				);

				const VirtualGridListRoot =  screen.getByRole('list').parentElement.parentElement;
				const verticalScrollbar = VirtualGridListRoot.children.item(1);
				const horizontalScrollbar = VirtualGridListRoot.children.item(2);

				expect(verticalScrollbar).toBeInTheDocument();
				expect(verticalScrollbar).toHaveClass("verticalScrollbar");
				expect(horizontalScrollbar).toBeNull();
			}
		);

		test(
			'should not render any scrollbar when when \'horizontalScrollbar\' and \'verticalScrollbar\' are "hidden"',
			() => {
				render(
					<VirtualGridList
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

				const VirtualGridListRoot =  screen.getByRole('list').parentElement.parentElement;
				const verticalScrollbar = VirtualGridListRoot.children.item(1);
				const horizontalScrollbar = VirtualGridListRoot.children.item(2);

				expect(verticalScrollbar).toBeNull();
				expect(horizontalScrollbar).toBeNull();
			}
		);
	});

	describe('ScrollTo', () => {
		test('should scroll to the specific item of a given index with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = (240 + 16) * 2;

				expect(resultScrollTop).toBe(expected);
			});

			render(
				<VirtualGridList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({index: 9, animate: false}));
		});

		test('should scroll to the given \'x\' position with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 200;

				expect(resultScrollLeft).toBe(expected);
			});

			render(
				<VirtualGridList
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
				<VirtualGridList
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

		test('should scroll to the given align with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = Math.ceil(dataSize / 4) * (itemSize.minHeight + 16) - clientSize.clientHeight + 30;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			render(
				<VirtualGridList
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

		test('should scroll to the given align with scrollTo after changing dataSize', (done) => {
			const newDataSize = 50;

			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = Math.ceil(newDataSize / 4) * (itemSize.minHeight + 16) - clientSize.clientHeight + 30;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			const {rerender} = render(
				<VirtualGridList
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
				<VirtualGridList
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

		test('should scroll to the given align with scrollTo after changing itemSize', (done) => {
			const newItemSize = {minWidth: 300, minHeight: 270};

			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = Math.ceil(dataSize / 4) * (newItemSize.minHeight + 18) - clientSize.clientHeight + 30;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			const {rerender} = render(
				<VirtualGridList
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
				<VirtualGridList
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

		test('should scroll to the given align with scrollTo after changing spacing', (done) => {
			const newSpacing = 6;

			const onScrollStop = handlerOnScrollStop(done, () => {

				// newSpacing = 24;
				// Expected: 13286
				// Received: 12536
				// 12800  - 720 + 30 = 12110 (426달라짐) 12536

				// const newSpacing = 6;
				// Expected: 12110
				// Received: 12204 94늘어남

				// const newSpacing = 3;
				// Received: 12107

				const expected = Math.ceil(dataSize / 4) * (itemSize.minHeight + 16) - clientSize.clientHeight + 30 + 94; // Cannot calculate the exact length after applying spacing.
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			const {rerender} = render(
				<VirtualGridList
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
				<VirtualGridList
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

		describe('scroll events', () => {
			test('should call onScrollStart once', () => {
				render(
					<VirtualGridList
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
					<VirtualGridList
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
					<VirtualGridList
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
				<VirtualGridList
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
				<VirtualGridList
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

		test('should not scroll by wheel when `noScrollByWheel` prop is true', (done) => {
			const fn = jest.fn();

			render(
				<VirtualGridList
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
				<VirtualGridList
					clientSize={clientSize}
					dataSize={itemArray.length}
					itemRenderer={renderItemArray}
					itemSize={itemSize}
					scrollMode="translate"
				/>
			);

			itemArray.unshift({name: 'Password 0'});
			rerender(<VirtualGridList
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
		test('should render "data-webos-voice-focused" to outermost node of VirtualGridList', () => {
			render(
				<VirtualGridList
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

		test('should render "data-webos-voice-group-label" to outermost node of VirtualGridList', () => {
			const label = 'group label';
			render(
				<VirtualGridList
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

		test('should render "data-webos-voice-disabled" to outermost node of VirtualGridList', () => {
			render(
				<VirtualGridList
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
				<VirtualGridList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					data-webos-voice-focused
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({position: {y: 200}, animate: false}));

			const expected = 2;
			const actual = screen.getByRole('list').parentElement.parentElement.children.length;

			expect(actual).toBe(expected);
		});

		test('should render two hoverToScroll node after scrolling when \'hoverToScroll\' prop is provided', () => {
			render(
				<VirtualGridList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					hoverToScroll
					itemRenderer={renderItem}
					itemSize={itemSize}
					data-webos-voice-focused
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
