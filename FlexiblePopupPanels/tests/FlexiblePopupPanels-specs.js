import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import React from 'react';
import {mount} from 'enzyme';
import {FlexiblePopupPanels, Panel} from '../FlexiblePopupPanels';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('FlexiblePopupPanels Specs', () => {

	test('should hide prev and next buttons when on first and last panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 0;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should show prev and next buttons when not on first or last panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} open>
					<Panel />
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 2;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should show prev button on first view when using `prevButton` on first panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} open>
					<Panel prevButton />
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 2;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should show next button on last view when using `nextButton` on last panel', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={2} open>
					<Panel />
					<Panel />
					<Panel nextButton />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 2;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should hide previous button on all panels when `prevButtonVisibility` is set to never', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} prevButtonVisibility="never" open>
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 0;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should hide next button on all panels when `nextButtonVisibility` is set to never', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} nextButtonVisibility="never" open>
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 0;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should show previous button on first panel when `prevButtonVisibility` set to always', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} prevButtonVisibility="always" open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 1;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should show next button on last panel when `nextButtonVisibility` set to always', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels nextButtonVisibility="always" open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 1;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should hide previous button on panels that override `prevButton`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} open>
					<Panel />
					<Panel prevButton={false} />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 0;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should hide next button on panels that override `nextButton`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} open>
					<Panel nextButton={false} />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 0;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should hide previous button when `prevButtonVisibility` prop is set to always and panel overrides `prevButton`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} prevButtonVisibility="always" open>
					<Panel prevButton={false} />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 0;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});

	test('should hide next button when `nextButtonVisibility` prop is set to always and panel overrides `nextButton`', () => {
		const subject = mount(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} nextButtonVisibility="always" open>
					<Panel nextButton={false} />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const buttons = subject.find('Button');
		const expected = 0;
		const actual = buttons.length;

		expect(actual).toBe(expected);
	});
});
