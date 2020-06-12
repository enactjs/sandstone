import React from 'react';
import {mount} from 'enzyme';
import ThemeDecorator from '../';
import Spotlight from '@enact/spotlight';

import css from '../ThemeDecorator.module.less';

describe('ThemeDecorator', () => {

	const AppRoot = (props) => <div data-app {...props} />;
	const a11yConfig = {float: false, ri18n: false, ri: false, spotlight: false};
	const A11yApp = ThemeDecorator(a11yConfig, AppRoot);

	test('should add base classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		const subject = mount(
			<App />
		);

		Spotlight.terminate();

		const appRoot = subject.find('[data-app]');

		const expected = true;
		const actual = appRoot.hasClass('neutral') && appRoot.hasClass(css.bg);

		expect(actual).toBe(expected);
	});

	test('should add author classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		const subject = mount(
			<App className="author-class" />
		);

		Spotlight.terminate();

		const appRoot = subject.find('[data-app]');

		const expected = true;
		const actual = appRoot.hasClass('author-class');

		expect(actual).toBe(expected);
	});

	test(
		'should not add skin classname to wrapped component when float is enabled',
		() => {
			const config = {ri: false, i18n: false, spotlight: false, float: true, overlay: false};
			const App = ThemeDecorator(config, AppRoot);
			const subject = mount(
				<App />
			);

			Spotlight.terminate();

			const appRoot = subject.find('[data-app]');

			const expected = false;
			const actual = appRoot.hasClass('neutral');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not add .bg class to wrapped component when overlay is enabled',
		() => {
			const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: true};
			const App = ThemeDecorator(config, AppRoot);
			const subject = mount(
				<App />
			);

			Spotlight.terminate();

			const appRoot = subject.find('[data-app]');

			const expected = false;
			const actual = appRoot.hasClass(css.bg);

			expect(actual).toBe(expected);
		}
	);

	describe('AccessibilityDecorator', () => {
		test(
			'should add the highContrast class if passing the highContrast prop of true',
			() => {
				const subject = mount(
					<A11yApp highContrast />
				);

				const appRoot = subject.find('[data-app]');

				const expected = true;
				const actual = appRoot.hasClass('highContrast');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should add the largeText class if passing the textSize prop of `large`',
			() => {
				const subject = mount(
					<A11yApp textSize="large" />
				);

				const appRoot = subject.find('[data-app]');

				const expected = true;
				const actual = appRoot.hasClass('largeText');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should update the skinVariants based on the skinVariatns prop',
			() => {
				const subject = mount(
					<A11yApp skinVariants={['grayscale']} />
				);

				const appRoot = subject.find('[data-app]');

				const expected = true;
				const actual = appRoot.hasClass('grayscale');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should add the largeText class when the type of the skinVariants prop is a string',
			() => {
				const subject = mount(
					<A11yApp textSize="large" skinVariants="grayscale" />
				);

				const appRoot = subject.find('[data-app]');

				const expected = true;
				const actual = appRoot.hasClass('largeText') && appRoot.hasClass('grayscale');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should add largeText class when the type of the skinVariants prop is an array',
			() => {
				const subject = mount(
					<A11yApp textSize="large" skinVariants={['grayscale']} />
				);

				const appRoot = subject.find('[data-app]');

				const expected = true;
				const actual = appRoot.hasClass('largeText') && appRoot.hasClass('grayscale');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should add largeText class when the type of the skinVariants prop is an object',
			() => {
				const subject = mount(
					<A11yApp textSize="large" skinVariants={{grayscale: true}} />
				);

				const appRoot = subject.find('[data-app]');

				const expected = true;
				const actual = appRoot.hasClass('largeText') && appRoot.hasClass('grayscale');

				expect(actual).toBe(expected);
			}
		);
	});
});
