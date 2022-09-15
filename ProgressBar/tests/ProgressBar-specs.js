import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ProgressBar, {ProgressBarTooltip} from '../ProgressBar';

describe('ProgressBar Specs', () => {
	test('should only show tooltip when tooltip is true', () => {
		render(
			<ProgressBar tooltip />
		);
		const tooltip = screen.getByRole('progressbar').children.item(1);
		const expected = 'tooltip';

		expect(tooltip).toHaveClass(expected);
	});

	test('should have tooltip show progress as percentage', () => {
		render(
			<ProgressBar
				tooltip
				progress={0.6}
			/>
		);

		const expected = '60%';
		const actual = screen.getByRole('progressbar').textContent;

		expect(actual).toBe(expected);
	});

	describe('ProgressBar with horizontal orientation', () => {
		test('should have default orientation of horizontal', () => {
			render(
				<ProgressBar />
			);
			const progressBar = screen.getByRole('progressbar');
			const expected = 'horizontal';

			expect(progressBar).toHaveClass(expected);
		});

		test('should have tooltip above after', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above after" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above after';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above before', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above before" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above before';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above center', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above center" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above center';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above left', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above left" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above left';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above right', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above right" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above right';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below after', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below after" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below after';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below before', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below before" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below before';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below center', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below center" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below center';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below left', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below left" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below left';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below right', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below right" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below right';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip in default position (above)', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above';

			expect(tooltip).toHaveClass(expected);
		});
	});

	describe('ProgressBar with vertical orientation', () => {
		test('should have vertical orientation', () => {
			render(
				<ProgressBar orientation="vertical" />
			);

			const progressBar = screen.getByRole('progressbar');
			const expected = 'vertical';

			expect(progressBar).toHaveClass(expected);
		});

		test('should have tooltip after', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="after" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'after';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip before', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="before" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'before';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip left', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="left" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'left';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip right', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="right" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'right';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip in default position (after)', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'after';

			expect(tooltip).toHaveClass(expected);
		});
	});

	describe('ProgressBar with radial orientation', () => {
		test('should have radial orientation', () => {
			render(
				<ProgressBar orientation="radial" />
			);

			const progressBar = screen.getByRole('progressbar');
			const expected = 'radial';

			expect(progressBar).toHaveClass(expected);
		});

		test('should have tooltip above', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="above" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="below" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above after', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="above after" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above after';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above before', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="above before" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above before';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above center', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="above center" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above center';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above left', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="above left" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above left';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip above right', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="above right" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above right';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below after', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="below after" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below after';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below before', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="below before" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below before';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below center', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="below center" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below center';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below left', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="below left" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below left';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip below right', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="below right" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'below right';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip after', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="after" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'after';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip before', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="before" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'before';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip left', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="left" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'left';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip right', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip position="right" />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'right';

			expect(tooltip).toHaveClass(expected);
		});

		test('should have tooltip in default position (above)', () => {
			render(
				<ProgressBar orientation="radial">
					<ProgressBarTooltip />
				</ProgressBar>
			);
			const tooltip = screen.getByRole('progressbar').children.item(1);
			const expected = 'above';

			expect(tooltip).toHaveClass(expected);
		});
	});

});
