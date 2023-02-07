import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Alert, AlertBase, AlertImage} from '../Alert';
import Button from '../../Button';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Alert', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<Alert open />
			</FloatingLayerController>
		);
		const alert = screen.getByRole('alert');

		// expect(alert).toBeInTheDocument();
		expect(true).toBe(false);
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<Alert />
			</FloatingLayerController>
		);
		const alert = screen.queryByRole('alert');

		expect(alert).toBeNull();
	});

	test('should render title', () => {
		render(
			<FloatingLayerController>
				<AlertBase open title="alert title" />
			</FloatingLayerController>

		);
		const alert = screen.getByRole('alert');

		const expected = 'alert title';

		expect(alert).toHaveTextContent(expected);
	});

	test('should render content', () => {
		render(
			<FloatingLayerController>
				<AlertBase open title="alert title">
					{'alert message'}
				</AlertBase>
			</FloatingLayerController>

		);
		const alert = screen.getByRole('alert');

		const actual = alert.textContent;
		const expected = 'alert message';

		expect(actual).toContain(expected);
	});

	test('should render to empty string if children is not set', () => {
		render(
			<FloatingLayerController>
				<AlertBase open title="alert title" />
			</FloatingLayerController>

		);
		const alert = screen.getByRole('alert');

		const actual = alert.querySelector('#undefined_content').hasChildNodes();

		expect(actual).toBeFalsy();
	});

	test('should have `icon` className if `type` prop is set to `icon`', () => {
		render(
			<FloatingLayerController>
				<Alert open title="alert title">
					<image>
						<AlertImage src="testIconImage.png" type="icon" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const image = screen.getAllByRole('img')[0];

		const expectedClass = 'icon';

		expect(image).toHaveClass(expectedClass);
	});

	test('should have `thumbnail` className if `type` prop is set to `thumbnail`', () => {
		render(
			<FloatingLayerController>
				<Alert open title="alert title">
					<image>
						<AlertImage src="testThumbnailImage.png" type="thumbnail" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const image = screen.getAllByRole('img')[0];

		const expectedClass = 'thumbnail';

		expect(image).toHaveClass(expectedClass);
	});
});

describe('AlertOverlay specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<Alert open type="overlay" />
			</FloatingLayerController>
		);
		const alert = screen.getByRole('alert');

		expect(alert).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<Alert type="overlay" />
			</FloatingLayerController>
		);
		const alert = screen.queryByRole('alert');

		expect(alert).toBeNull();
	});

	test('should render content', () => {
		render(
			<FloatingLayerController>
				<Alert open type="overlay">
					<span>
						this is alert overlay.
					</span>
					<buttons>
						<Button>yes</Button>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const alert = screen.getByRole('alert');

		const actual = alert.textContent;
		const expected = 'this is alert overlay.';

		expect(actual).toContain(expected);
	});

	test('should render to empty string if children is not set', () => {
		render(
			<FloatingLayerController>
				<AlertBase open type="overlay" />
			</FloatingLayerController>

		);
		const alert = screen.getByRole('alert');

		const actual = alert.querySelector('#undefined_content').hasChildNodes();

		expect(actual).toBeFalsy();
	});

	test('should have `icon` classname if `type` prop is set to `icon`', () => {
		render(
			<FloatingLayerController>
				<Alert open type="overlay">
					<image>
						<AlertImage src="testIconImage.png" type="icon" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const image = screen.getAllByRole('img')[0];

		const expectedClass = 'icon';

		expect(image).toHaveClass(expectedClass);
	});

	test('should have `icon` classname if `type` prop is set to `thumbnail`', () => {
		render(
			<FloatingLayerController>
				<Alert open type="overlay">
					<image>
						<AlertImage src="testThumbnailImage.png" type="thumbnail" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const image = screen.getAllByRole('img')[0];

		const expectedClass = 'thumbnail';

		expect(image).toHaveClass(expectedClass);
	});
});
