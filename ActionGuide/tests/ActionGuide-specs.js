import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {ActionGuideBase} from '../ActionGuide';

describe('ActionGuide', () => {

	test('should render `icon`', () => {
		const {getByTestId} = render(<ActionGuideBase data-testid="actionGuide" icon="star" />);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = getByTestId('actionGuide').children.item(0).textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should render `children`', () => {
		const {getByText} = render(<ActionGuideBase data-testid="actionGuide">content</ActionGuideBase>);

		const actual = getByText('content');

		expect(actual).toBeInTheDocument();
	});

	describe('CSS override', () => {
		test('should allow `actionGuide` to be augmented', () => {
			const css = {actionGuide: 'test-action-guide'};
			const {getByTestId} = render(<ActionGuideBase data-testid="actionGuide" css={css}>content</ActionGuideBase>);

			const expected = css.actionGuide;
			const actual = getByTestId('actionGuide');

			expect(actual).toHaveClass(expected);
		});
	});
});
