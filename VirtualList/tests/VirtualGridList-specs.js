import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';

import ImageItem from '../../ImageItem';
import {VirtualGridList} from '../VirtualList';

describe('VirtualGridList', () => {
	let
		clientSize,
		dataSize,
		items,
		itemSize,
		renderItem,
		svgGenerator;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		itemSize = {minWidth: 300, minHeight:240};

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
		items = null;
		itemSize = null;
		renderItem = null;
	});

	test('should render a list of \'items\'', () => {
		render(
			<VirtualGridList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		);

		const expected = 'Item 000SubItem 000';
		const actual = screen.getByRole('list').children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('should not render items when clientSize is not given', () => {
		render(
			<VirtualGridList
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
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
			/>
		);

		const newClientSize = {clientWidth: 1280, clientHeight: 360};

		rerender(
			<VirtualGridList
				clientSize={newClientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
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
				/>
			);

			itemArray.unshift({name: 'Password 0'});
			rerender(<VirtualGridList
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
		test('should render "data-webos-voice-focused" to outermost node of VirtualGridList', () => {
			render(
				<VirtualGridList
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

		test('should render "data-webos-voice-group-label" to outermost node of VirtualGridList', () => {
			const label = 'group label';
			render(
				<VirtualGridList
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

		test('should render "data-webos-voice-disabled" to outermost node of VirtualGridList', () => {
			render(
				<VirtualGridList
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
		describe('native', () => {
			test('should not render hoverToScroll node when \'hoverToScroll\' prop is not provided', () => {
				render(
					<VirtualGridList
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={itemSize}
						data-webos-voice-focused
					/>
				);

				const expected = 2;
				const actual = screen.getByRole('list').parentElement.parentElement.children.length;

				expect(actual).toBe(expected);
			});

			test('should render hoverToScroll node when \'hoverToScroll\' prop is provided', () => {
				render(
					<VirtualGridList
						clientSize={clientSize}
						dataSize={dataSize}
						hoverToScroll
						itemRenderer={renderItem}
						itemSize={itemSize}
						data-webos-voice-focused
					/>
				);

				const expected = 3;
				const actual = screen.getByRole('list').parentElement.parentElement.children.length;

				expect(actual).toBe(expected);
			});
		});
	});
});
