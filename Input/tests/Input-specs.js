import React from 'react';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount} from 'enzyme';

import Input from '../Input';
import {DEFAULT_LENGTH} from '../util';

import css from '../Input.module.less';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Input specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input open />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const subject = mount(
			<FloatingLayerController>
				<Input open title={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.title}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const subject = mount(
			<FloatingLayerController>
				<Input open subtitle={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.subtitle}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = 'value text';
		const subject = mount(
			<FloatingLayerController>
				<Input open value={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find('input').prop('value');

		expect(actual).toBe(expected);
	});

	test('should set placeholder at input when there is placeholder text', () => {
		const str = 'placeholder text';
		const subject = mount(
			<FloatingLayerController>
				<Input open placeholder={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find('input').prop('placeholder');

		expect(actual).toBe(expected);
	});

	test('should set type to password at input when input type is "password"', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input open type="password" />
			</FloatingLayerController>
		);

		const expected = 'password';
		const actual = subject.find('input').prop('type');

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when popup is disabled', () => {
		const subject = mount(<Input disabled />);

		const expected = true;
		const actual = subject.find('[role="button"]').prop('disabled');

		expect(actual).toBe(expected);
	});

	// describe('Input specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} title={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.title}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} subtitle={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.subtitle}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = '1234';
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} value={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.numberField}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when the component is disabled', () => {
		const subject = mount(<Input type="number" length={4} disabled />);

		const expected = true;
		const actual = subject.find('[role="button"]').prop('disabled');

		expect(actual).toBe(expected);
	});

	// Length, maxLength, and minLength checks
	const prettyProps = (props) => {
		return Object.entries(props).map(([prop, val]) => `${prop}={${val}}`)
			.join(', ')
			.replace(/(?:,)\W*([^,]*)$/, (Object.getOwnPropertyNames(props).length > 2 ? ',' : '') + ' and $1');
	};
	const isAre = (props) => {
		return Object.getOwnPropertyNames(props).length > 1 ? 'are' : 'is';
	};
	const lengthChecks = [
		// [ {Input props}, {expected values to verify, one prop at a time} ]
		[{length: void 0},                         {maxLength: DEFAULT_LENGTH, minLength: DEFAULT_LENGTH}],
		[{length: 3},                              {maxLength: 3, minLength: 3}],
		[{length: 3, maxLength: 6, minLength: 2},  {maxLength: 3, minLength: 3}],
		[{length: 3, maxLength: 6},                {maxLength: 3, minLength: 3}],
		[{length: 3, minLength: 2},                {maxLength: 3, minLength: 3}],
		[{maxLength: 0},                           {maxLength: 0, minLength: 0}],
		[{minLength: 0},                           {maxLength: DEFAULT_LENGTH, minLength: 0}],
		[{minLength: 3},                           {maxLength: DEFAULT_LENGTH, minLength: 3}],
		[{maxLength: 6, minLength: 3},             {maxLength: 6, minLength: 3}],
		[{maxLength: 2, minLength: 5},             {maxLength: 2, minLength: 5}]
	];
	lengthChecks.forEach(checklist => {
		const props = checklist[0];
		Object.entries(checklist[1]).forEach(([prop, val]) => {
			test(`should set \`${prop}\` to be \`${val}\` for "number" type, when ${prettyProps(props)} ${isAre(props)} set`, () => {

				const subject = mount(
					<FloatingLayerController>
						<Input type="number" open {...props} />
					</FloatingLayerController>
				);

				const expected = val;
				const actual = subject.find('NumberField').first().prop(prop);

				expect(actual).toBe(expected);
			});
		});
	});

	test('should include a submit button when `minLength` !== `maxLength` for number input', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" minLength={4} maxLength={6} open />
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('.submitButton').first().length;

		expect(actual).toBe(expected);
	});

	test('should include a submit button for implicit joined number input', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" length={10} open />
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('.submitButton').first().length;

		expect(actual).toBe(expected);
	});

	test('should include a submit button for explicit joined number input', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" length={4} open numberInputField="joined" />
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = subject.find('.submitButton').first().length;

		expect(actual).toBe(expected);
	});

	test('should exclude a submit button when separated number input', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" length={4} open />
			</FloatingLayerController>
		);

		const expected = 0;
		const actual = subject.find('.submitButton').first().length;

		expect(actual).toBe(expected);
	});

	test('should exclude a submit button for explicit separated number input', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" length={10} open numberInputField="separated" />
			</FloatingLayerController>
		);

		const expected = 0;
		const actual = subject.find('.submitButton').first().length;

		expect(actual).toBe(expected);
	});

	test('should show an invalid tooltip if invalid and message supplied', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={10} invalid invalidMessage="Invalid" />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('Tooltip').exists();

		expect(actual).toBe(expected);
	});

	test('should not show invalid tooltip if not invalid but message supplied', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={10} invalidMessage="Invalid" />
			</FloatingLayerController>
		);

		const expected = false;
		const actual = subject.find('Tooltip').exists();

		expect(actual).toBe(expected);
	});

	test('should show an invalid tooltip if invalid and no message supplied', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={10} invalid />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('Tooltip').exists();

		expect(actual).toBe(expected);
	});

	test('should not show an invalid tooltip if invalid and message is falsy', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={10} invalid invalidMessage="" />
			</FloatingLayerController>
		);

		const expected = false;
		const actual = subject.find('Tooltip').exists();

		expect(actual).toBe(expected);
	});

	test('should call onComplete when submit button clicked', (done) => {
		const spy = jest.fn();
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onComplete={spy} />
			</FloatingLayerController>
		);

		subject.find({children: '1'}).first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		subject.find('.submitButton').first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		// 250 ms. delay before it's called!
		setTimeout(() => {
			const expected = 1;
			const actual = spy.mock.calls.length;
			expect(actual).toBe(expected);
			done();
		}, 300);
	});

	test('should call onChange when submit button clicked', () => {
		const spy = jest.fn();
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onChange={spy} />
			</FloatingLayerController>
		);

		subject.find({children: '1'}).first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		subject.find('.submitButton').first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		const expected = '1';
		const actual = spy.mock.calls[0][0].value;
		expect(actual).toBe(expected);
	});

	test('should call onBeforeChange once when input occurs', () => {
		const spy = jest.fn();
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={10} onBeforeChange={spy} />
			</FloatingLayerController>
		);

		subject.find({children: '1'}).first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		const expected = 1;
		const actual = spy.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should prevent input when onBeforeChange calls preventDefault', () => {
		const spy = jest.fn();
		const mock = jest.fn((ev) => {
			if (ev.value === '2') {
				ev.preventDefault();
			}
		});
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onBeforeChange={mock} onChange={spy} />
			</FloatingLayerController>
		);

		subject.find({children: '2'}).first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		subject.find({children: '1'}).first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		subject.find('.submitButton').first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		const expected = '1';
		const actual = spy.mock.calls[0][0].value;
		expect(actual).toBe(expected);
	});

	test('should delete an input when delete button clicked', () => {
		const spy = jest.fn();
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" value="12" minLength={1} maxLength={4} open onChange={spy} />
			</FloatingLayerController>
		);

		subject.find({children: 'backspace'}).first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		subject.find('.submitButton').first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		const expected = '1';
		const actual = spy.mock.calls[0][0].value;
		expect(actual).toBe(expected);
	});

	test('should call onBeforeChange when delete button clicked', () => {
		const spy = jest.fn();

		const subject = mount(
			<FloatingLayerController>
				<Input type="number" value="12" minLength={1} maxLength={4} open onBeforeChange={spy} />
			</FloatingLayerController>
		);

		subject.find({children: 'backspace'}).first().simulate('click', {nativeEvent: {stopImmediatePropagation: () => {}}});

		const expected = 1;
		const actual = spy.mock.calls.length;
		expect(actual).toBe(expected);
	});
});
