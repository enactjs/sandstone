import React from 'react';
import {shallow} from 'enzyme';

import TooltipLabel from '../TooltipLabel';

describe('TooltipDecorator', () => {

	describe('TooltipLabel', () => {
		test(
			'should apply alignment when `centered` and `marquee`',
			() => {
				const subject = shallow(
					<TooltipLabel centered marquee>
						Label
					</TooltipLabel>
				);

				const expected = 'center';
				const actual = subject.prop('alignment');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should not apply alignment when `centered` but not `marquee`',
			() => {
				const subject = shallow(
					<TooltipLabel centered>
						Label
					</TooltipLabel>
				);

				expect(subject).not.toHaveProperty('alignment');
			}
		);
	});
});
