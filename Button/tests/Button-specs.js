import React from 'react';
import {mount, shallow} from 'enzyme';
import Button, {ButtonBase} from '../Button';

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

		expect(subject.prop('className').split(' ')).toContain('opaque');
	});

	it('should have default minWidth', function () {
		const subject = shallow(<ButtonBase />);

		expect(subject.prop('className').split(' ')).toContain('minWidth');
	});

	it('should have default size large', function () {
		const subject = shallow(<ButtonBase />);

		expect(subject.prop('className').split(' ')).toContain('large');
	});

	describe('with no minWidth', function () {
		it('should not have minWidth class', function () {
			const subject = shallow(<ButtonBase minWidth={false} />);

			expect(subject.prop('className').split(' ')).not.toContain('minWidth');
		});
	});

	describe('with transparent backgroundOpacity', function () {
		it('should have transparent class', function () {
			const subject = shallow(<ButtonBase backgroundOpacity="transparent" />);

			expect(subject.prop('className').split(' ')).toContain('transparent');
		});

		it('should not have have opaque class', function () {
			const subject = shallow(<ButtonBase backgroundOpacity="transparent" />);

			expect(subject.prop('className').split(' ')).not.toContain('opaque');
		});
	});

	describe('with icon', function () {
		it('should have check icon when specified', function () {
			const subject = mount(<Button icon="check">abc</Button>);

			const expected = '✓';
			const actual = subject.text();

			expect(actual).toEqual(expect.stringContaining(expected));
		});

		it('should not have minWidth class with only icon', function () {
			const subject = mount(<Button icon="check" />);

			expect(subject.find(ButtonBase).childAt(0).prop('className').split(' ')).not.toContain('minWidth');
		});

		it('should have iconOnly class when there is no children', function () {
			const subject = mount(<Button icon="check" />);

			expect(subject.find(ButtonBase).childAt(0).prop('className').split(' ')).toContain('iconOnly');
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
