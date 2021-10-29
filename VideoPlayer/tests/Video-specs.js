/* global HTMLMediaElement */

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Video from '../Video';

describe('VideoPlayer.Video', () => {
	beforeEach(() => {
		jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => true);
	});

	afterEach(() => {
		HTMLMediaElement.prototype.load.mockRestore();
	});

	describe('changing sources', () => {
		// Failures in these tests will often result in the following error. The error is misleading
		// but indicates the nodes aren't reused as expected.
		// TypeError: Cannot assign to read only property 'Symbol(impl)' of object '[object DOMImplementation]'

		test('should use the same node when changing the `source`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const expected = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" source="def.mp4" />
			);

			const actual = screen.getByTestId('video-id');

			expect(actual).toBe(expected);
		});

		test('should not render `preloadSource` when not present', () => {
			render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id').nextElementSibling;

			expect(actual).toBeNull();
		});

		test('should use same `source` when removing `source` and no `preload`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const expected = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" source={undefined} /> // eslint-disable-line no-undefined
			);

			const actual = screen.getByTestId('video-id');

			expect(actual).toBe(expected);
		});

		test('should use same `source` when adding `source` and no `preload`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" />
			);

			const expected = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id');

			expect(actual).toBe(expected);
		});

		test('should use the same node when adding `preloadSource`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const expected = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id');

			expect(actual).toBe(expected);
		});

		test('should render `preloadSource` when added', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			rerender(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id').nextElementSibling;

			expect(actual).not.toBeNull();
			expect(actual.tagName).toBe('VIDEO');
		});

		test('should use the same node when adding `preloadSource` the same as source', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const expected = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" preloadSource="abc.mp4" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id');

			expect(actual).toBe(expected);
		});

		test('should use the same node when changing `preloadSource`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const expected = screen.getByTestId('video-id').nextElementSibling;

			rerender(
				<Video data-testid="video-id" preloadSource="ghi.mp4" source="abc.mp4" />
			);

			const actual = screen.getByTestId('video-id').nextElementSibling;

			expect(actual).toBe(expected);
		});

		test('should swap nodes when swapping `source` and `preloadSource`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const source = screen.getByTestId('video-id');
			const preload = screen.getByTestId('video-id').nextElementSibling;

			rerender(
				<Video data-testid="video-id" preloadSource="abc.mp4" source="def.mp4" />
			);

			const newSource = screen.getByTestId('video-id');
			const newPreload = screen.getByTestId('video-id').nextElementSibling;

			expect(newSource).toBe(preload);
			expect(newPreload).toBe(source);
		});

		test('should reuse preload node when moving `preloadSource` to `source`', () => {
			const {rerender} = render(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const preload = screen.getByTestId('video-id').nextElementSibling;

			rerender(
				<Video data-testid="video-id" preloadSource={null} source="def.mp4" />
			);

			const newSource = screen.getByTestId('video-id');
			const newPreload = screen.getByTestId('video-id').nextElementSibling;

			expect(newSource).toBe(preload);
			expect(newPreload).toBeFalsy();
		});

		test('should reuse both nodes when both `preloadSource` and `source` change', () => {
			const {rerender} = render(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const source = screen.getByTestId('video-id');
			const preload = screen.getByTestId('video-id').nextElementSibling;

			rerender(
				<Video data-testid="video-id" preloadSource="jkl.mp4" source="ghi.mp4" />
			);

			const newSource = screen.getByTestId('video-id');
			const newPreload = screen.getByTestId('video-id').nextElementSibling;

			expect(newSource).toBe(source);
			expect(newPreload).toBe(preload);
		});

		test('should reuse source node over two changes', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const firstSource = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" source="def.mp4" />
			);

			const secondSource = screen.getByTestId('video-id');

			expect(secondSource).toBe(firstSource);

			rerender(
				<Video data-testid="video-id" source="ghi.mp4" />
			);

			const thirdSource = screen.getByTestId('video-id');

			expect(thirdSource).toBe(firstSource);
		});

		test('should swap nodes when preload does not exist initially', () => {
			const {rerender} = render(
				<Video data-testid="video-id" source="abc.mp4" />
			);

			const source = screen.getByTestId('video-id');

			rerender(
				<Video data-testid="video-id" preloadSource="def.mp4" source="abc.mp4" />
			);

			const preload = screen.getByTestId('video-id').nextElementSibling;

			rerender(
				<Video data-testid="video-id" preloadSource="abc.mp4" source="def.mp4" />
			);

			const newSource = screen.getByTestId('video-id');
			const newPreload = screen.getByTestId('video-id').nextElementSibling;

			expect(newSource).toBe(preload);
			expect(newPreload).toBe(source);
		});
	});
});
