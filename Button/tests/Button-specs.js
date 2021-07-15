import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';

import Button, {ButtonBase} from '../Button';

import css from '../Button.module.less';

describe('Button', () => {
	test('should have \'disabled\' HTML attribute when \'disabled\' prop is provided', () => {
		const {getByRole} = render(<Button disabled>I am a disabled Button</Button>);
		const button = getByRole('button');

		expect(button).toHaveAttribute('disabled');
	});

	test('should have default backgroundOpacity opaque', () => {
		const {getByRole} = render(<ButtonBase />);
		const button = getByRole('button');

		const expected = css.opaque;

		expect(button).toHaveClass(expected);
	});

	test('should expand by default', function () {
		const {getByRole} = render(<ButtonBase />);
		const button = getByRole('button');

		const expected = 'focusExpand';

		expect(button).toHaveClass(expected);
	});

	test('should be able to disable the expand focus effect', () => {
		const {getByRole} = render(<ButtonBase focusEffect="static" />);
		const button = getByRole('button');

		const expected = 'focusStatic';

		expect(button).toHaveClass(expected);
	});

	test('should have default minWidth', function () {
		const {getByRole} = render(<ButtonBase />);
		const button = getByRole('button');

		const expected = css.minWidth;

		expect(button).toHaveClass(expected);
	});

	test('should have default size large', function () {
		const {getByRole} = render(<ButtonBase />);
		const button = getByRole('button');

		const expected = css.large;

		expect(button).toHaveClass(expected);
	});

	describe('with no minWidth', function () {
		test('should not have minWidth class', () => {
			const {getByRole} = render(<ButtonBase minWidth={false} />);
			const button = getByRole('button');

			const expected = css.minWidth;

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('with transparent backgroundOpacity', () => {
		test('should have transparent class', function () {
			const {getByRole} = render(<ButtonBase backgroundOpacity="transparent" />);
			const button = getByRole('button');

			const expected = css.transparent;

			expect(button).toHaveClass(expected);
		});

		test('should not have have opaque class', () => {
			const {getByRole} = render(<ButtonBase backgroundOpacity="transparent" />);
			const button = getByRole('button');

			const expected = css.opaque;

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('with icon', function () {
		test('should have check icon when specified', () => {
			const {getByText} = render(<Button icon="check">abc</Button>);
			const icon = getByText('✓');

			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass('icon');
		});

		test('should not have minWidth class with only icon', () => {
			const {getByRole} = render(<Button icon="check" />);
			const button = getByRole('button');

			const expected = css.minWidth;

			expect(button).not.toHaveClass(expected);
		});

		test('should have iconAfter class with text and icon', () => {
			const {getByRole} = render(<Button icon="check" iconPosition="after">text</Button>);
			const button = getByRole('button');

			const expected = css.iconAfter;

			expect(button).toHaveClass(expected);
		});

		test('should have iconBefore class with text and icon', () => {
			const {getByRole} = render(<Button icon="check" iconPosition="before">text</Button>);
			const button = getByRole('button');

			const expected = css.iconBefore;

			expect(button).toHaveClass(expected);
		});

		test('should not have iconPosition classes with only icon', () => {
			const {getByRole} = render(<Button icon="check" />);
			const button = getByRole('button');

			expect(button).not.toHaveClass(css.iconBefore);
			expect(button).not.toHaveClass(css.iconAfter);
		});

		test('should have iconOnly class when there is no children', () => {
			const {getByRole} = render(<Button icon="check" />);
			const button = getByRole('button');

			const expected = css.iconOnly;

			expect(button).toHaveClass(expected);
		});
	});

	describe('with color', () => {
		test('should have hasColor class', () => {
			const {getByRole} = render(<Button color="red">abc</Button>);
			const button = getByRole('button');

			const expected = css.hasColor;

			expect(button).toHaveClass(expected);
		});

		test('should have not hasColor class', () => {
			const {getByTestId} = render(<Button data-testid="button">abc</Button>);
			const button = getByTestId('button');

			const expected = css.hasColor;

			expect(button).not.toHaveClass(expected);
		});

		test('should have red class', () => {
			const {getByRole} = render(<Button color="red">abc</Button>);
			const button = getByRole('button');

			const expected = css.red;

			expect(button).toHaveClass(expected);
		});

		test('should have blue class', () => {
			const {getByRole} = render(<Button color="blue">abc</Button>);
			const button = getByRole('button');

			const expected = css.blue;

			expect(button).toHaveClass(expected);
		});

		test('should have yellow class', () => {
			const {getByRole} = render(<Button color="yellow">abc</Button>);
			const button = getByRole('button');

			const expected = css.yellow;

			expect(button).toHaveClass(expected);
		});

		test('should have green class', () => {
			const {getByRole} = render(<Button color="green">abc</Button>);
			const button = getByRole('button');

			const expected = css.green;

			expect(button).toHaveClass(expected);
		});
	});

	describe('events', () => {
		test('should call onClick when not disabled', () => {
			const handleClick = jest.fn();
			const {getByText} = render(<Button onClick={handleClick}>I am not a disabled Button</Button>);
			const button = getByText('I am not a disabled Button');

			fireEvent.click(button);

			const expected = 1;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should not call onClick when disabled', () => {
			const handleClick = jest.fn();
			const {getByText} = render(<Button disabled onClick={handleClick}>I am a disabled Button</Button>);
			const button = getByText('I am a disabled Button');

			fireEvent.click(button);

			const expected = 0;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should have "Select" voice intent in the node of "role=button"', () => {
			const {getByRole} = render(<Button>Hello</Button>);
			const button = getByRole('button');

			expect(button).toHaveAttribute('data-webos-voice-intent', 'Select');
		});
	});
});
