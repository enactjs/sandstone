import React from 'react';
import {mount, shallow} from 'enzyme';

import Button, {ButtonBase} from '../Button';
import css from '../Button.module.less';

describe('Button', () => {

	test(
		'should have \'disabled\' HTML attribute when \'disabled\' prop is provided',
		() => {
			const button = mount(
				<Button disabled>I am a disabled Button</Button>
			);

			const expected = true;
			const actual = button.find('div').at(0).prop('disabled');

			expect(actual).toBe(expected);
		}
	);

	it('should have default backgroundOpacity opaque', function () {
		const subject = shallow(<ButtonBase />);

		const expected = css.opaque;
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});

	it('should expand by default', function () {
		const subject = shallow(<ButtonBase />);

		const expected = 'focusExpand';
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});

	it('should be able to disable the expand focus effect', function () {
		const subject = shallow(<ButtonBase focusEffect="static" />);

		const expected = 'focusStatic';
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});

	it('should have default minWidth', function () {
		const subject = shallow(<ButtonBase />);

		const expected = css.minWidth;
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});

	it('should have default size large', function () {
		const subject = shallow(<ButtonBase />);

		const expected = css.large;
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});

	describe('with no minWidth', function () {
		it('should not have minWidth class', function () {
			const subject = shallow(<ButtonBase minWidth={false} />);

			const expected = css.minWidth;
			const actual = subject.first().prop('className');

			expect(actual).not.toContain(expected);
		});
	});

	describe('with transparent backgroundOpacity', function () {
		it('should have transparent class', function () {
			const subject = shallow(<ButtonBase backgroundOpacity="transparent" />);

			const expected = css.transparent;
			const actual = subject.first().prop('className');

			expect(actual).toContain(expected);
		});

		it('should not have have opaque class', function () {
			const subject = shallow(<ButtonBase backgroundOpacity="transparent" />);

			const expected = css.opaque;
			const actual = subject.first().prop('className');

			expect(actual).not.toContain(expected);
		});
	});

	describe('with icon', function () {
		it('should have check icon when specified', function () {
			const subject = mount(<Button icon="check">abc</Button>);

			const expected = '✓';
			const actual = subject.find('Icon').first().text();

			expect(actual).toEqual(expected);
		});

		it('should not have minWidth class with only icon', function () {
			const subject = mount(<Button icon="check" />);

			const expected = css.minWidth;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).not.toContain(expected);
		});

		it('should have iconAfter class with text and icon', function () {
			const subject = mount(<Button icon="check" iconPosition="after">text</Button>);

			const expected = css.iconAfter;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});

		it('should have iconBefore class with text and icon', function () {
			const subject = mount(<Button icon="check" iconPosition="before">text</Button>);

			const expected = css.iconBefore;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});

		it('should not have iconPosition classes with only icon', function () {
			const subject = mount(<Button icon="check" />);

			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).not.toContain(css.iconBefore);
			expect(actual).not.toContain(css.iconAfter);
		});

		it('should have iconOnly class when there is no children', function () {
			const subject = mount(<Button icon="check" />);

			const expected = css.iconOnly;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});
	});

	describe('with color', () => {
		it('should have hasColor class', () => {
			const subject = mount(<Button color="red">abc</Button>);

			const expected = css.hasColor;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});

		it('should have not hasColor class', () => {
			const subject = mount(<Button>abc</Button>);

			const expected = css.hasColor;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).not.toContain(expected);
		});

		it('should have red class', () => {
			const subject = mount(<Button color="red">abc</Button>);

			const expected = css.red;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});

		it('should have blue class', () => {
			const subject = mount(<Button color="blue">abc</Button>);

			const expected = css.blue;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});

		it('should have yellow class', () => {
			const subject = mount(<Button color="yellow">abc</Button>);

			const expected = css.yellow;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});

		it('should have green class', () => {
			const subject = mount(<Button color="green">abc</Button>);

			const expected = css.green;
			const actual = subject.find(ButtonBase).childAt(0).first().prop('className');

			expect(actual).toContain(expected);
		});
	});

	describe('events', () => {
		test('should call onClick when not disabled', () => {
			const handleClick = jest.fn();
			const subject = mount(
				<Button onClick={handleClick}>I am a disabled Button</Button>
			);

			subject.simulate('click');

			const expected = 1;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should not call onClick when disabled', () => {
			const handleClick = jest.fn();
			const subject = mount(
				<Button disabled onClick={handleClick}>I am a disabled Button</Button>
			);

			subject.simulate('click');

			const expected = 0;
			const actual = handleClick.mock.calls.length;

			expect(actual).toBe(expected);
		});

		test('should have "Select" voice intent in the node of "role=button"', () => {
			const button = mount(<Button>Hello</Button>);

			const expected = 'Select';
			const actual = button.find('[role="button"]').prop('data-webos-voice-intent');

			expect(actual).toBe(expected);
		});
	});
});
