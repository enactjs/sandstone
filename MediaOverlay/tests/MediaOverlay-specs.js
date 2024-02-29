import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import MediaOverlay from '../MediaOverlay';

describe('MediaOverlay', () => {
	beforeEach(() => {
		jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => true);
	});

	afterEach(() => {
		HTMLMediaElement.prototype.load.mockRestore();
	});

	test('should render a caption', () => {
		render(<MediaOverlay caption="This is a caption" source="abc.mp4" />);

		const mediaOverlayCaption = screen.getByText('This is a caption');
		const captionContainer = screen.getByText('This is a caption').parentElement.parentElement;

		expect(mediaOverlayCaption).toBeInTheDocument();
		expect(captionContainer).toHaveClass('caption');
	});

	test('should render a text', () => {
		const text = 'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.';
		render(<MediaOverlay source="abc.mp4" text={text} />);

		const mediaOverlayText = screen.getByText(text);

		expect(mediaOverlayText).toBeInTheDocument();
		expect(mediaOverlayText).toHaveClass('text');
	});

	test('should position text at end when `textAlign` is set to end', () => {
		const text = 'Text Example';
		render(<MediaOverlay source="abc.mp4" text={text} textAlign="end" />);

		const expected = 'flex-end';
		const actual = screen.getByText(text).parentElement.parentElement.parentElement;

		expect(actual).toHaveStyle({'align-items': expected});
	});

	test('should position text at center when `textAlign` is set to center', () => {
		const text = 'Text Example';
		render(<MediaOverlay source="abc.mp4" text={text} textAlign="center" />);

		const expected = 'center';
		const actual = screen.getByText(text).parentElement.parentElement.parentElement;

		expect(actual).toHaveStyle({'align-items': expected});
	});

	test('should position text at start when `textAlign` is set to start', () => {
		const text = 'Text Example';
		render(<MediaOverlay source="abc.mp4" text={text} textAlign="start" />);

		const expected = 'flex-start';
		const actual = screen.getByText(text).parentElement.parentElement.parentElement;

		expect(actual).toHaveStyle({'align-items': expected});
	});

	test('should render a subtitle', () => {
		const subtitle = '07:00 AM - 08:00 AM';
		render(<MediaOverlay source="abc.mp4" subtitle={subtitle} />);

		const mediaOverlaySubtitle = screen.getByText(subtitle);
		const subtitleContainer = screen.getByText(subtitle).parentElement.parentElement;

		expect(mediaOverlaySubtitle).toBeInTheDocument();
		expect(subtitleContainer).toHaveClass('subtitle');
	});

	test('should display a progress bar when `showProgress` is set to true', () => {
		render(<MediaOverlay showProgress source="abc.mp4" />);

		const progressBar = screen.getByRole('progressbar');

		expect(progressBar).toBeInTheDocument();
	});

	test('should not display a progress bar when `showProgress` is set to false', () => {
		render(<MediaOverlay showProgress={false} source="abc.mp4" />);

		const progressBar = screen.queryByRole('progressbar');

		expect(progressBar).toBeNull();
	});

	test('should display an image', () => {
		render(<MediaOverlay imageOverlay="image.png" source="abc.mp4" />);

		const image = screen.getAllByRole('img')[0];

		expect(image).toBeInTheDocument();
	});

	test('should use the same node when changing the `source`', () => {
		const {rerender} = render(<MediaOverlay data-testid="mediaOverlay" source="abc.mp4" />);

		const expected = screen.getByTestId('mediaOverlay');

		rerender(<MediaOverlay data-testid="mediaOverlay" source="def.mp4" />);

		const actual = screen.getByTestId('mediaOverlay');

		expect(actual).toBe(expected);
	});
});
