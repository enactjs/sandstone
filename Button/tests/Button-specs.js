import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, {ButtonBase} from '../Button';

describe('Button', () => {
	test('should have \'disabled\' HTML attribute when \'disabled\' prop is provided', () => {
		render(<Button disabled>I am a disabled Button</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveAttribute('disabled');
	});

	test('should have default backgroundOpacity opaque', () => {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = 'opaque';

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

		const expected = 'minWidth';

		expect(button).toHaveClass(expected);
	});

	test('should have default size large', function () {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = 'large';

		expect(button).toHaveClass(expected);
	});

	describe('with no minWidth', function () {
		test('should not have minWidth class', () => {
			render(<ButtonBase minWidth={false} />);
			const button = screen.getByRole('button');

			const expected = 'minWidth';

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('with transparent backgroundOpacity', () => {
		test('should have transparent class', function () {
			render(<ButtonBase backgroundOpacity="transparent" />);
			const button = screen.getByRole('button');

			const expected = 'transparent';

			expect(button).toHaveClass(expected);
		});

		test('should not have have opaque class', () => {
			render(<ButtonBase backgroundOpacity="transparent" />);
			const button = screen.getByRole('button');

			const expected = 'opaque';

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

			const expected = 'minWidth';

			expect(button).not.toHaveClass(expected);
		});

		test('should have iconAfter class with text and icon', () => {
			render(<Button icon="check" iconPosition="after">text</Button>);
			const button = screen.getByRole('button');

			const expected = 'iconAfter';

			expect(button).toHaveClass(expected);
		});

		test('should have iconBefore class with text and icon', () => {
			render(<Button icon="check" iconPosition="before">text</Button>);
			const button = screen.getByRole('button');

			const expected = 'iconBefore';

			expect(button).toHaveClass(expected);
		});

		test('should not have iconPosition classes with only icon', () => {
			render(<Button icon="check" />);
			const button = screen.getByRole('button');

			expect(button).not.toHaveClass('iconBefore');
			expect(button).not.toHaveClass('iconAfter');
		});

		test('should have iconOnly class when there is no children', () => {
			render(<Button icon="check" />);
			const button = screen.getByRole('button');

			const expected = 'iconOnly';

			expect(button).toHaveClass(expected);
		});
	});

	describe('with color', () => {
		test('should have hasColor class when a color is specified', () => {
			render(<Button color="red">abc</Button>);
			const button = screen.getByRole('button');

			const expected = 'hasColor';

			expect(button).toHaveClass(expected);
		});

		test('should not have hasColor when no color is specified', () => {
			render(<Button>abc</Button>);
			const button = screen.getByRole('button');

			const expected = 'hasColor';

			expect(button).not.toHaveClass(expected);
		});

		test('should have red class', () => {
			render(<Button color="red">abc</Button>);
			const button = screen.getByRole('button');

			const expected = 'red';

			expect(button).toHaveClass(expected);
		});

		test('should have blue class', () => {
			render(<Button color="blue">abc</Button>);
			const button = screen.getByRole('button');

			const expected = 'blue';

			expect(button).toHaveClass(expected);
		});

		test('should have yellow class', () => {
			render(<Button color="yellow">abc</Button>);
			const button = screen.getByRole('button');

			const expected = 'yellow';

			expect(button).toHaveClass(expected);
		});

		test('should have green class', () => {
			render(<Button color="green">abc</Button>);
			const button = screen.getByRole('button');

			const expected = 'green';

			expect(button).toHaveClass(expected);
		});
	});

	describe('with shadowed', () => {
		test('should have shadowed class when the background is transparent', () => {
			render(<Button shadowed backgroundOpacity="transparent" />);
			const button = screen.getByRole('button');

			const expected = 'shadowed';

			expect(button).toHaveClass(expected);
		});

		test('should have shadowed class when the background is undefined and has icon only', () => {
			render(<Button shadowed icon="check" />);
			const button = screen.getByRole('button');

			const expected = 'shadowed';

			expect(button).toHaveClass(expected);
		});

		test('should not have shadowed class when the background is not transparent', () => {
			render(<Button shadowed backgroundOpacity="opaque" />);
			const button = screen.getByRole('button');

			const expected = 'shadowed';

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('events', () => {
		test('should call onClick when not disabled', async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();

			render(<Button onClick={handleClick}>I am not a disabled Button</Button>);
			const button = screen.getByText('I am not a disabled Button');

			await user.click(button);

			expect(handleClick).toBeCalled();
		});

		test('should not call onClick when disabled', async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();

			render(<Button disabled onClick={handleClick}>I am a disabled Button</Button>);
			const button = screen.getByText('I am a disabled Button');

			await user.click(button);

			expect(handleClick).not.toBeCalled();
		});

		test('should have "Select" voice intent in the node of "role=button"', () => {
			render(<Button>Hello</Button>);
			const button = screen.getByRole('button');

			expect(button).toHaveAttribute('data-webos-voice-intent', 'Select');
		});
	});
});
