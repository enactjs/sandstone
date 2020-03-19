import React from 'react';
import {mount, shallow} from 'enzyme';
import ActionGuide, {ActionGuideBase} from '../ActionGuide';

describe('ActionGuide', () => {

	test(
		'should render `icon`',
		() => {
			const subject = shallow(
				<ActionGuideBase icon="star" />
			);

			const expected = 'star';
			const actual = subject.find('.icon').prop('children');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should render `children`',
		() => {
			const subject = shallow(
				<ActionGuideBase>content</ActionGuideBase>
			);

			const expected = 'content';
			const actual = subject.find('.label').prop('children');

			expect(actual).toBe(expected);
		}
	);

	describe('CSS override', () => {
		test(
			'should allow `actionGuide` to be augmented',
			() => {
				const css = {actionGuide: 'test-action-guide'};
				const subject = shallow(
					<ActionGuideBase css={css}>content</ActionGuideBase>
				);

				const expected = css.actionGuide;
				const actual = subject.prop('className');

				expect(actual).toContain(expected);
			}
		);
	});
});
