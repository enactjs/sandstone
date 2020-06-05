import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import React from 'react';
import {mount} from 'enzyme';
import {FlexiblePopupPanels, Panel} from '../';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('FlexiblePopupPanels Specs', () => {

	test('should hide previous and next buttons when there is only one panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 0;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should show previous and next buttons when there is more than one panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel />
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 2;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should show previous button when using `prevButton` on the only panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel prevButton />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should show previous button when using `nextButton` on the only panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel nextButton />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should hide previous button on all panels when `prevButtonVisibility` is set to "never"', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels prevButtonVisibility="never" open>
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should hide next button on all panels when `nextButtonVisibility` is set to "never"', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels nextButtonVisibility="never" open>
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should show previous button on the only panel when `prevButtonVisibility` set to "always"', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels prevButtonVisibility="always" open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should show next button on the only panel when `nextButtonVisibility` set to "always"', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels nextButtonVisibility="always" open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should hide previous button on panels that override using `prevButton={false}`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} open>
					<Panel />
					<Panel prevButton={false} />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should hide next button on panels that override using `nextButton={false}`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} open>
					<Panel nextButton={false} />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should hide previous button when `prevButtonVisibility` prop is set to always and panel overrides using `prevButton={false}`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} prevButtonVisibility="always" open>
					<Panel />
					<Panel prevButton={false} />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test('should hide next button when `nextButtonVisibility` prop is set to always and panel overrides using `nextButton={false}`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} nextButtonVisibility="always" open>
					<Panel nextButton={false} />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('Button').length;

		subject.unmount();
		expect(actual).toBe(expected);
	});

	test(
		'should close on back key when on first panel',
		() => {
			const map = {};

			window.addEventListener = jest.fn((event, cb) => {
				map[event] = cb;
			});
			const spy = jest.fn();

			const subject = mount(
				<FloatingLayerController>
					<FlexiblePopupPanels index={0} onClose={spy} open>
						<Panel />
					</FlexiblePopupPanels>
				</FloatingLayerController>
			);

			map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});

			const expected = 1;
			const actual = spy.mock.calls.length;

			subject.unmount();
			expect(actual).toBe(expected);
		}
	);

	test(
		'should go back on back key when not on first panel',
		() => {
			const map = {};

			window.addEventListener = jest.fn((event, cb) => {
				map[event] = cb;
			});
			const spy = jest.fn();

			const subject = mount(
				<FloatingLayerController>
					<FlexiblePopupPanels index={1} onBack={spy} open>
						<Panel />
						<Panel />
					</FlexiblePopupPanels>
				</FloatingLayerController>
			);

			map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});

			const expected = 1;
			const actual = spy.mock.calls.length;

			subject.unmount();
			expect(actual).toBe(expected);
		}
	);
});
