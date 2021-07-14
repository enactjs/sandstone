import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';

import Button, {ButtonBase} from '../Button';
import css from '../Button.module.less';

describe('Button', () => {
	test(
		'should have \'disabled\' HTML attribute when \'disabled\' prop is provided',
		() => {
			const {getByTestId} = render(<Button data-testid="button" disabled>I am a disabled Button</Button>);

			expect(getByTestId('button')).toHaveAttribute('disabled', '');
		}
	);

	it('should have default backgroundOpacity opaque', function () {
		const {getByTestId} = render(<ButtonBase data-testid="button" />);

		const expected = css.opaque;

		expect(getByTestId('button')).toHaveClass(expected);
	});

	it('should expand by default', function () {
		const {getByTestId} = render(<ButtonBase data-testid="button" />);

		const expected = 'focusExpand';

		expect(getByTestId('button')).toHaveClass(expected);
	});

	it('should be able to disable the expand focus effect', function () {
		const {getByTestId} = render(<ButtonBase data-testid="button" focusEffect="static" />);

		const expected = 'focusStatic';

		expect(getByTestId('button')).toHaveClass(expected);
	});

	it('should have default minWidth', function () {
		const {getByTestId} = render(<ButtonBase data-testid="button" />);

		const expected = css.minWidth;

		expect(getByTestId('button')).toHaveClass(expected);
	});

	it('should have default size large', function () {
		const {getByTestId} = render(<ButtonBase data-testid="button" />);

		const expected = css.large;

		expect(getByTestId('button')).toHaveClass(expected);
	});

	describe('with no minWidth', function () {
		it('should not have minWidth class', function () {
			const {getByTestId} = render(<ButtonBase data-testid="button" minWidth={false} />);

			const expected = css.minWidth;

			expect(getByTestId('button')).not.toHaveClass(expected);
		});
	});

	describe('with transparent backgroundOpacity', function () {
		it('should have transparent class', function () {
			const {getByTestId} = render(<ButtonBase data-testid="button" backgroundOpacity="transparent" />);

			const expected = css.transparent;

			expect(getByTestId('button')).toHaveClass(expected);
		});

		it('should not have have opaque class', function () {
			const {getByTestId} = render(<ButtonBase data-testid="button" backgroundOpacity="transparent" />);

			const expected = css.opaque;

			expect(getByTestId('button')).not.toHaveClass(expected);
		});
	});

	describe('with icon', function () {
		it('should have check icon when specified', function () {
			const {getByText} = render(<Button icon="check">abc</Button>);

			const actual = getByText('✓');
			expect(actual).toBeInTheDocument();

			const expectedClassname = 'icon';
			expect(getByText('✓')).toHaveClass(expectedClassname);
		});

		it('should not have minWidth class with only icon', function () {
			const {getByTestId} = render(<Button data-testid="button" icon="check" />);

			const expected = css.minWidth;

			expect(getByTestId('button')).not.toHaveClass(expected);
		});

		it('should have iconAfter class with text and icon', function () {
			const {getByTestId} = render(<Button data-testid="button" icon="check" iconPosition="after">text</Button>);

			const expected = css.iconAfter;

			expect(getByTestId('button')).toHaveClass(expected);
		});

		it('should have iconBefore class with text and icon', function () {
			const {getByTestId} = render(<Button data-testid="button" icon="check" iconPosition="before">text</Button>);

			const expected = css.iconBefore;

			expect(getByTestId('button')).toHaveClass(expected);
		});

		it('should not have iconPosition classes with only icon', function () {
			const {getByTestId} = render(<Button data-testid="button" icon="check" />);

			expect(getByTestId('button')).not.toHaveClass(css.iconBefore);
			expect(getByTestId('button')).not.toHaveClass(css.iconAfter);
		});

		it('should have iconOnly class when there is no children', function () {
			const {getByTestId} = render(<Button data-testid="button" icon="check" />);

			const expected = css.iconOnly;

			expect(getByTestId('button')).toHaveClass(expected);
		});
	});

	describe('with color', () => {
		it('should have hasColor class', () => {
			const {getByTestId} = render(<Button data-testid="button" color="red">abc</Button>);

			const expected = css.hasColor;
			const actual = getByTestId('button').className;

			expect(actual).toContain(expected);
		});

		it('should have not hasColor class', () => {
			const {getByTestId} = render(<Button data-testid="button">abc</Button>);

			const expected = css.hasColor;
			const actual = getByTestId('button').className;

			expect(actual).not.toContain(expected);
		});

		it('should have red class', () => {
			const {getByTestId} = render(<Button color="red" data-testid="button">abc</Button>);

			const expected = css.red;
			const actual = getByTestId('button').className;

			expect(actual).toContain(expected);
		});

		it('should have blue class', () => {
			const {getByTestId} = render(<Button color="blue" data-testid="button">abc</Button>);

			const expected = css.blue;
			const actual = getByTestId('button').className;

			expect(actual).toContain(expected);
		});

		it('should have yellow class', () => {
			const {getByTestId} = render(<Button color="yellow" data-testid="button">abc</Button>);

			const expected = css.yellow;
			const actual = getByTestId('button').className;

			expect(actual).toContain(expected);
		});

		it('should have green class', () => {
			const {getByTestId} = render(<Button color="green" data-testid="button">abc</Button>);

			const expected = css.green;
			const actual = getByTestId('button').className;

			expect(actual).toContain(expected);
		});
	});

	describe('events', () => {
		test('should call onClick when not disabled', () => {
			const handleClick = jest.fn();

			const {getByText} = render(<Button onClick={handleClick}>I am not a disabled Button</Button>);

			fireEvent.click(getByText('I am not a disabled Button'));

			const expected = 1;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should not call onClick when disabled', () => {
			const handleClick = jest.fn();
			const {getByText} = render(<Button disabled onClick={handleClick}>I am a disabled Button</Button>);

			fireEvent.click(getByText('I am a disabled Button'));

			const expected = 0;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should have "Select" voice intent in the node of "role=button"', () => {
			const {getByRole} = render(<Button>Hello</Button>);

			expect(getByRole('button')).toHaveAttribute('data-webos-voice-intent', 'Select');
		});
	});
});
