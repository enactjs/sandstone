import {mount} from 'enzyme';
import React from 'react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

describe('VirtualList', () => {
	let
		clientSize,
		dataSize,
		getScrollTo,
		handlerOnScroll,
		handlerOnScrollStart,
		handlerOnScrollStop,
		items,
		myScrollTo,
		onScrollCount,
		onScrollStartCount,
		onScrollStopCount,
		renderItem,
		resultScrollLeft,
		resultScrollTop;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		onScrollCount = 0;
		onScrollStartCount = 0;
		onScrollStopCount = 0;
		resultScrollLeft = 0;
		resultScrollTop = 0;

		getScrollTo = (scrollTo) => {
			myScrollTo = scrollTo;
		};
		handlerOnScroll = () => {
			onScrollCount++;
		};
		handlerOnScrollStart = () => {
			onScrollStartCount++;
		};
		handlerOnScrollStop = (done, testCase) => (e) => {
			onScrollStopCount++;
			resultScrollLeft = e.scrollLeft;
			resultScrollTop = e.scrollTop;

			testCase();
			done();
		};
		renderItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name, enact/prop-types
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
		myScrollTo = null;
		onScrollCount = null;
		onScrollStartCount = null;
		onScrollStopCount = null;
		renderItem = null;
		resultScrollLeft = null;
		resultScrollTop = null;
	});

	test('should render a list of \'items\'', () => {
		const subject = mount(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={60}
			/>
		);

		const expected = 'Account 0';
		const actual = subject.find('[data-index]').at(0).text();

		expect(actual).toBe(expected);
	});

	test('should render (clientHeight / itemHeight + overhang) items', () => {
		const subject = mount(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={60}
			/>
		);

		const expected = 15; // 720 / 60 + 3
		const actual = subject.find('Item[data-index]').length;

		expect(actual).toBe(expected);
	});

	test(
		'should render only one scrollbar',
		() => {
			const subject = mount(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={60}
				/>
			);

			const expected = 1;
			const actual = subject.find('Scrollbar').length;

			expect(actual).toBe(expected);
		}
	);

	describe('ScrollTo', () => {
		test(
			'should scroll to the specific item of a given index with scrollTo',
			(done) => {
				const onScrollStop = handlerOnScrollStop(done, () => {
					const expected = 600;
					const actual = resultScrollTop;

					expect(actual).toBe(expected);
				});

				mount(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={60}
						onScrollStop={onScrollStop}
						scrollMode="translate"
					/>
				);

				myScrollTo({index: 10, animate: false});
			}
		);

		test('should scroll to the given \'x\' position with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 200;
				const actual = resultScrollLeft;

				expect(actual).toBe(expected);
			});

			mount(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={60}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			myScrollTo({position: {x: 200}, animate: false});
		});

		test('should scroll to the given \'y\' position with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 200;
				const actual = resultScrollTop;

				expect(actual).toBe(expected);
			});

			mount(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={60}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			myScrollTo({position: {y: 200}, animate: false});
		});

		describe('scroll events', () => {
			test('should call onScrollStart once', () => {
				mount(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={60}
						onScrollStart={handlerOnScrollStart}
						scrollMode="translate"
					/>
				);

				myScrollTo({position: {y: 200}, animate: false});

				const expected = 1;
				const actual = onScrollStartCount;

				expect(actual).toBe(expected);
			});

			test('should call onScroll once', () => {
				mount(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={60}
						onScroll={handlerOnScroll}
						scrollMode="translate"
					/>
				);

				myScrollTo({position: {y: 200}, animate: false});

				const expected = 1;
				const actual = onScrollCount;

				expect(actual).toBe(expected);
			});

			test('should call onScrollStop once', (done) => {
				const onScrollStop = handlerOnScrollStop(done, () => {
					const expected = 1;
					const actual = onScrollStopCount;

					expect(actual).toBe(expected);
				});

				mount(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={60}
						onScrollStop={onScrollStop}
						scrollMode="translate"
					/>
				);

				myScrollTo({position: {y: 200}, animate: false});
			});
		});
	});

	describe('Adding an item', () => {
		test(
			'should render an added item named \'Password 0\' as the first item',
			(done) => {
				const itemArray = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
				const renderItemArray = ({index, ...rest}) => { // eslint-disable-line enact/display-name, enact/prop-types, react/jsx-no-bind
					return (
						<div {...rest} id={'item' + index}>
							{itemArray[index].name}
						</div>
					);
				};

				const subject = mount(
					<VirtualList
						clientSize={clientSize}
						dataSize={itemArray.length}
						itemRenderer={renderItemArray} // eslint-disable-line react/jsx-no-bind
						itemSize={60}
					/>
				);

				itemArray.unshift({name: 'Password 0'});
				subject.setProps({dataSize: itemArray.length});

				setTimeout(() => {
					const expected = itemArray[0].name;
					const actual = subject.find('[data-index]').at(0).text();

					expect(actual).toBe(expected);
					done();
				}, 0);
			}
		);
	});
});
