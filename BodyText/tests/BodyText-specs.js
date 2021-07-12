import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import BodyText from '../BodyText';

describe('BodyText Specs', () => {

	test('should render a text', () => {
		const {getByTestId} = render(<BodyText data-testid="bodyText" />);
		const bodyText = getByTestId('bodyText');

		expect(bodyText).toBeInTheDocument();
	});

	test('should support single-line marqueeing content when `noWrap` is true', () => {
		const {getByTestId} = render(<BodyText data-testid="bodyText" noWrap />);
		const bodyText = getByTestId('bodyText');
		const marquee = bodyText.children.item(0);

		const expected = 'marquee';

		expect(marquee.className).toBe(expected);
	});

	test('should include the noWrap class if `noWrap` is true', () => {
		const {getByTestId} = render(<BodyText data-testid="bodyText" noWrap />);
		const bodyText = getByTestId('bodyText');

		const expected = 'noWrap';

		expect(bodyText.className).toContain(expected);
	});

	test('should have small class if `size` is true', () => {
		const {getByTestId} = render(<BodyText data-testid="bodyText" size="small" />);
		const bodyText = getByTestId('bodyText');

		const expected = 'small';

		expect(bodyText.className).toContain(expected);
	});

	test('should have center class if `center` is true', () => {
		const {getByTestId} = render(<BodyText data-testid="bodyText" centered />);
		const bodyText = getByTestId('bodyText');

		const expected = 'centered';

		expect(bodyText.className).toContain(expected);
	});
});
