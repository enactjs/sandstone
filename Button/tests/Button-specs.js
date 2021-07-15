import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, {ButtonBase} from '../Button';

import css from '../Button.module.less';

describe('Button', () => {
	test('should have \'disabled\' HTML attribute when \'disabled\' prop is provided', () => {
		render(<Button disabled>I am a disabled Button</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveAttribute('disabled');
	});

	test('should have default backgroundOpacity opaque', () => {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = css.opaque;

		expect(button).toHaveClass(expected);
	});

	test('should expand by default', function () {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = 'focusExpand';

		expect(button).toHaveClass(expected);
	});

	test('should be able to disable the expand focus effect', () => {
		render(<ButtonBase focusEffect="static" />);
		const button = screen.getByRole('button');

		const expected = 'focusStatic';

		expect(button).toHaveClass(expected);
	});

	test('should have default minWidth', function () {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = css.minWidth;

		expect(button).toHaveClass(expected);
	});

	test('should have default size large', function () {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = css.large;

		expect(button).toHaveClass(expected);
	});

	describe('with no minWidth', function () {
		test('should not have minWidth class', () => {
			render(<ButtonBase minWidth={false} />);
			const button = screen.getByRole('button');

			const expected = css.minWidth;

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('with transparent backgroundOpacity', () => {
		test('should have transparent class', function () {
			render(<ButtonBase backgroundOpacity="transparent" />);
			const button = screen.getByRole('button');

			const expected = css.transparent;

			expect(button).toHaveClass(expected);
		});

		test('should not have have opaque class', () => {
			render(<ButtonBase backgroundOpacity="transparent" />);
			const button = screen.getByRole('button');

			const expected = css.opaque;

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('with icon', function () {
		test('should have check icon when specified', () => {
			render(<Button icon="check">abc</Button>);
			const icon = screen.getByText('✓');

			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass('icon');
		});

		test('should not have minWidth class with only icon', () => {
			render(<Button icon="check" />);
			const button = screen.getByRole('button');

			const expected = css.minWidth;

			expect(button).not.toHaveClass(expected);
		});

		test('should have iconAfter class with text and icon', () => {
			render(<Button icon="check" iconPosition="after">text</Button>);
			const button = screen.getByRole('button');

			const expected = css.iconAfter;

			expect(button).toHaveClass(expected);
		});

		test('should have iconBefore class with text and icon', () => {
			render(<Button icon="check" iconPosition="before">text</Button>);
			const button = screen.getByRole('button');

			const expected = css.iconBefore;

			expect(button).toHaveClass(expected);
		});

		test('should not have iconPosition classes with only icon', () => {
			render(<Button icon="check" />);
			const button = screen.getByRole('button');

			expect(button).not.toHaveClass(css.iconBefore);
			expect(button).not.toHaveClass(css.iconAfter);
		});

		test('should have iconOnly class when there is no children', () => {
			render(<Button icon="check" />);
			const button = screen.getByRole('button');

			const expected = css.iconOnly;

			expect(button).toHaveClass(expected);
		});
	});

	describe('with color', () => {
		test('should have hasColor class', () => {
			render(<Button color="red">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.hasColor;

			expect(button).toHaveClass(expected);
		});

		test('should have not hasColor class', () => {
			render(<Button data-testid="button">abc</Button>);
			const button = screen.getByTestId('button');

			const expected = css.hasColor;

			expect(button).not.toHaveClass(expected);
		});

		test('should have red class', () => {
			render(<Button color="red">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.red;

			expect(button).toHaveClass(expected);
		});

		test('should have blue class', () => {
			render(<Button color="blue">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.blue;

			expect(button).toHaveClass(expected);
		});

		test('should have yellow class', () => {
			render(<Button color="yellow">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.yellow;

			expect(button).toHaveClass(expected);
		});

		test('should have green class', () => {
			render(<Button color="green">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.green;

			expect(button).toHaveClass(expected);
		});
	});

	describe('events', () => {
		test('should call onClick when not disabled', () => {
			const handleClick = jest.fn();
			render(<Button onClick={handleClick}>I am not a disabled Button</Button>);
			const button = screen.getByText('I am not a disabled Button');

			userEvent.click(button);

			const expected = 1;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should not call onClick when disabled', () => {
			const handleClick = jest.fn();
			render(<Button disabled onClick={handleClick}>I am a disabled Button</Button>);
			const button = screen.getByText('I am a disabled Button');

			userEvent.click(button);

			const expected = 0;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should have "Select" voice intent in the node of "role=button"', () => {
			render(<Button>Hello</Button>);
			const button = screen.getByRole('button');

			expect(button).toHaveAttribute('data-webos-voice-intent', 'Select');
		});
	});
});
