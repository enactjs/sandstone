import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ThemeDecorator from '../';

describe('ThemeDecorator', () => {
	const AppRoot = (props) => <div data-app {...props} />;
	const a11yConfig = {float: false, ri18n: false, ri: false, spotlight: false};
	const A11yApp = ThemeDecorator(a11yConfig, AppRoot);

	test('should add base classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		render(<App data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');

		expect(appRoot).toHaveClass('neutral');
		expect(appRoot).toHaveClass('bg');
	});

	test('should add author classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);

		render(<App className="author-class" data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');

		expect(appRoot).toHaveClass('author-class');
	});

	test('should not add skin classname to wrapped component when float is enabled', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: true, overlay: false};
		const App = ThemeDecorator(config, AppRoot);

		render(<App data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');

		expect(appRoot).not.toHaveClass('neutral');
	});

	test('should not add .bg class to wrapped component when overlay is enabled', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: true};
		const App = ThemeDecorator(config, AppRoot);

		render(<App data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');

		expect(appRoot).not.toHaveClass('bg');
	});

	describe('AccessibilityDecorator', () => {
		test('should add the highContrast class if passing the highContrast prop of true', () => {
			render(<A11yApp data-testid="app" highContrast />);

			const appRoot = screen.getByTestId('app');

			expect(appRoot).toHaveClass('highContrast');
		});

		test('should add the largeText class if passing the textSize prop of `large`', () => {
			render(<A11yApp data-testid="app" textSize="large" />);

			const appRoot = screen.getByTestId('app');

			expect(appRoot).toHaveClass('largeText');
		});

		test('should update the skinVariants based on the skinVariants prop', () => {
			render(<A11yApp data-testid="app" skinVariants={['grayscale']} />);

			const appRoot = screen.getByTestId('app');

			expect(appRoot).toHaveClass('grayscale');
		});

		test('should add the largeText class when the type of the skinVariants prop is a string', () => {
			render(<A11yApp data-testid="app" textSize="large" skinVariants="grayscale" />);

			const appRoot = screen.getByTestId('app');

			expect(appRoot).toHaveClass('largeText');
			expect(appRoot).toHaveClass('grayscale');
		});

		test('should add largeText class when the type of the skinVariants prop is an array', () => {
			render(<A11yApp data-testid="app" textSize="large" skinVariants={['grayscale']} />);

			const appRoot = screen.getByTestId('app');

			expect(appRoot).toHaveClass('largeText');
			expect(appRoot).toHaveClass('grayscale');
		});

		test('should add largeText class when the type of the skinVariants prop is an object', () => {
			render(<A11yApp data-testid="app" textSize="large" skinVariants={{grayscale: true}} />);

			const appRoot = screen.getByTestId('app');

			expect(appRoot).toHaveClass('largeText');
			expect(appRoot).toHaveClass('grayscale');
		});
	});
});
