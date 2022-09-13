import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ProgressBar, {ProgressBarTooltip} from '../ProgressBar';

describe('ProgressBar Specs', () => {
	it('should only show tooltip when tooltip is true', () => {
		render(
			<ProgressBar tooltip />
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'tooltip';

		expect(progressBar).toHaveClass(expected);
	});

	it('should have tooltip show progress as percentage', () => {
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


});

//Cases with ProgressBar orientation is set to horizontal (default)
describe("ProgressBar orientation set to horizontal", () => {
	it('should display progressbar orientation horizontal', () =>{
		render(
			<ProgressBar />
		);
		const progressBar = screen.getByRole('progressbar');
		const expected = 'horizontal'

		expect(progressBar).toHaveClass(expected)
	})

	it('should display progressbar tooltip above after', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="above after" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above after';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above before', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="above before" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above before';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above center', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="above center" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above center';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above left', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="above left" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above left';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above right', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="above right" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above right';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below after', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="below after" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below after';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below before', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="below before" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below before';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below center', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="below center" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below center';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below left', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="below left" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below left';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below right', () => {
		render(
			<ProgressBar>
				<ProgressBarTooltip position="below right" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below right';

		expect(progressBar).toHaveClass(expected);
	});
})

//Cases with ProgressBar orientation set to vertical
describe('ProgressBar orientation set to vertical', () => {
	it('should display progressbar orientation vertical', () => {
		render(
			<ProgressBar orientation="vertical">
			</ProgressBar>
		);

		const progressBar = screen.getByRole('progressbar')
		const expected = 'vertical';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip after', () => {
		render(
			<ProgressBar orientation="vertical">
				<ProgressBarTooltip position="after" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'after';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip before', () => {
		render(
			<ProgressBar orientation="vertical">
				<ProgressBarTooltip position="before" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'before';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip left', () => {
		render(
			<ProgressBar orientation="vertical">
				<ProgressBarTooltip position="left" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'left';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip right', () => {
		render(
			<ProgressBar orientation="vertical">
				<ProgressBarTooltip position="right" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'right';

		expect(progressBar).toHaveClass(expected);
	});
});

//Cases with ProgressBar orientation set to radial
describe("ProgressBar orientation set to radial", () => {
	it("should display progressbar orientation radial", () => {
		render(
			<ProgressBar orientation="radial">
			</ProgressBar>
		);

		const progressBar = screen.getByRole('progressbar')
		const expected = 'radial';

		expect(progressBar).toHaveClass(expected);
	})

	it('should display progressbar tooltip above', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="above" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="below" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above after', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="above after" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above after';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above before', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="above before" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above before';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above center', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="above center" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above center';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above left', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="above left" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above left';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip above right', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="above right" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'above right';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below after', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="below after" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below after';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below before', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="below before" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below before';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below center', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="below center" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below center';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below left', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="below left" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below left';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip below right', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="below right" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'below right';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip after', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="after" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'after';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip before', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="before" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'before';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip left', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="left" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'left';

		expect(progressBar).toHaveClass(expected);
	});

	it('should display progressbar tooltip right', () => {
		render(
			<ProgressBar orientation="radial">
				<ProgressBarTooltip position="right" />
			</ProgressBar>
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'right';

		expect(progressBar).toHaveClass(expected);
	});
})