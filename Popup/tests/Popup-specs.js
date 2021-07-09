import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Popup} from '../Popup';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Popup specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const {getByText} = render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = getByText('popup');

		expect(popup).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<Popup><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.queryByText('popup');

		expect(popup).toBeNull();
	});

	test('should set role to alert by default', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = getByRole('alert');

		expect(popup).toBeInTheDocument();
	});

	test('should allow role to be overridden', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<Popup open role="dialog"><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = getByRole('dialog');

		expect(popup).toBeInTheDocument();
	});

	test('should set "data-webos-voice-exclusive" when popup is open', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = getByRole('alert');

		expect(popup).toHaveAttribute('data-webos-voice-exclusive');
	});

	test('should set "data-webos-voice-disabled" when voice control is disabled', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<Popup data-webos-voice-disabled open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = getByRole('alert');

		expect(popup).toHaveAttribute('data-webos-voice-disabled');
	});

	describe('with position bottom', function () {
		test('should have bottom class', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="bottom"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = getByRole('alert');

			expect(popup.className).toContain('bottom');
		});

		test('should have bottom class in popup transition container', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="bottom"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const transitionContainer = getByRole('alert').parentElement.parentElement;

			expect(transitionContainer.className).toContain('bottom');
		});
	});

	describe('with position left', function () {
		test('should have left class', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="left"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = getByRole('alert');

			expect(popup.className).toContain('left');
		});

		test('should have left class in popup transition container', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="left"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const transitionContainer = getByRole('alert').parentElement.parentElement;

			expect(transitionContainer.className).toContain('left');
		});
	});

	describe('with position top', function () {
		test('should have right class', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="right"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = getByRole('alert');

			expect(popup.className).toContain('right');
		});

		test('should have right class in popup transition container', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="right"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const transitionContainer = getByRole('alert').parentElement.parentElement;

			expect(transitionContainer.className).toContain('right');
		});
	});

	describe('with position top', function () {
		test('should have top class', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="top"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = getByRole('alert');

			expect(popup.className).toContain('top');
		});

		test('should have top class popup transition container', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="top"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const transitionContainer = getByRole('alert').parentElement.parentElement;

			expect(transitionContainer.className).toContain('top');
		});
	});

	describe('with position center', function () {
		test('should have center class', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="center"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = getByRole('alert');

			expect(popup.className).toContain('center');
		});

		test('should have center class popup transition container', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="center"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const transitionContainer = getByRole('alert').parentElement.parentElement;

			expect(transitionContainer.className).toContain('center');
		});
	});

	describe('with position fullscreen', function () {
		test('should have fullscreen class', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="fullscreen"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = getByRole('alert');

			expect(popup.className).toContain('fullscreen');
		});

		test('should have fullscreen class popup transition container', () => {
			const {getByRole} = render(
				<FloatingLayerController>
					<Popup open position="fullscreen"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const transitionContainer = getByRole('alert').parentElement.parentElement;

			expect(transitionContainer.className).toContain('fullscreen');
		});
	});

	describe('with position changes dynamically', function () {
		test('should not have top class when position change from top to any other position', () => {
			const firstPosition = 'top';
			const {getByRole, rerender} = render(
				<FloatingLayerController>
					<Popup open position={firstPosition}><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = getByRole('alert');
			const transitionContainer = getByRole('alert').parentElement.parentElement;

			expect(popup.className).toContain(firstPosition);
			expect(transitionContainer.className).toContain(firstPosition);
			expect(popup.className).not.toContain('fullscreen');
			expect(transitionContainer.className).not.toContain('fullscreen');
			expect(popup.className).not.toContain('center');
			expect(transitionContainer.className).not.toContain('center');
			expect(popup.className).not.toContain('bottom');
			expect(transitionContainer.className).not.toContain('bottom');
			expect(popup.className).not.toContain('right');
			expect(transitionContainer.className).not.toContain('right');
			expect(popup.className).not.toContain('left');
			expect(transitionContainer.className).not.toContain('left');

			rerender(
				<FloatingLayerController>
					<Popup open position="fullscreen"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			expect(popup.className).not.toContain(firstPosition);
			expect(transitionContainer.className).not.toContain(firstPosition);

			rerender(
				<FloatingLayerController>
					<Popup open position="center"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			expect(popup.className).not.toContain(firstPosition);
			expect(transitionContainer.className).not.toContain(firstPosition);

			rerender(
				<FloatingLayerController>
					<Popup open position="bottom"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			expect(popup.className).not.toContain(firstPosition);
			expect(transitionContainer.className).not.toContain(firstPosition);

			rerender(
				<FloatingLayerController>
					<Popup open position="left"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			expect(popup.className).not.toContain(firstPosition);
			expect(transitionContainer.className).not.toContain(firstPosition);

			rerender(
				<FloatingLayerController>
					<Popup open position="right"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			expect(popup.className).not.toContain(firstPosition);
			expect(transitionContainer.className).not.toContain(firstPosition);
		});
	});
});
