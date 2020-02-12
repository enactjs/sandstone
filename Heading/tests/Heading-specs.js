import React from 'react';
import {shallow} from 'enzyme';

import {HeadingBase} from '../Heading';
import css from '../Heading.module.less';

describe('Heading Specs', () => {

	test('should render a Heading with content', () => {
		const content = 'Hello Heading!';

		const subject = shallow(
			<HeadingBase>{content}</HeadingBase>
		);

		const expected = content;
		const actual = subject.text();

		expect(actual).toBe(expected);
	});

	test('should add the showLine class', () => {
		const subject = shallow(
			<HeadingBase showLine>
				check
			</HeadingBase>
		);

		const expected = css.showLine;
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});
});
