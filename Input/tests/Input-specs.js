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
});
