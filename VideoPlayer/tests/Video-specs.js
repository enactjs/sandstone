/* global HTMLMediaElement */

import {mount} from 'enzyme';

import Video from '../Video';

describe('VideoPlayer.Video', () => {
	function getSourceNode (wrapper) {
		return wrapper.find('Video').instance().video;
	}

	function getPreloadNode (wrapper) {
		return wrapper.find('Video').instance().preloadVideo;
	}

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
			const subject = mount(
				<Video source="abc.mp4" />
			);

			const expected = getSourceNode(subject);

			subject.setProps({
				source: 'def.mp4'
			});

			const actual = getSourceNode(subject);

			expect(actual).toBe(expected);
		});

		test('should not render `preloadSource` when not present', () => {
			const subject = mount(
				<Video source="abc.mp4" />
			);

			const expected = 1;
			const actual = subject.find('Media').length;

			expect(actual).toBe(expected);
		});

		test('should use same `source` when removing `source` and no `preload`', () => {
			const subject = mount(
				<Video source="abc.mp4" />
			);

			const expected = getSourceNode(subject);

			subject.setProps({
				source: undefined // eslint-disable-line no-undefined
			});

			const actual = getSourceNode(subject);

			expect(actual).toBe(expected);
		});

		test('should use same `source` when adding `source` and no `preload`', () => {
			const subject = mount(
				<Video />
			);

			const expected = getSourceNode(subject);

			subject.setProps({
				source: 'abc.mp4'
			});

			const actual = getSourceNode(subject);

			expect(actual).toBe(expected);
		});

		test('should use the same node when adding `preloadSource`', () => {
			const subject = mount(
				<Video source="abc.mp4" />
			);

			const expected = getSourceNode(subject);

			subject.setProps({
				preloadSource: 'def.mp4'
			});

			const actual = getSourceNode(subject);

			expect(actual).toBe(expected);
		});

		test('should render `preloadSource` when added', () => {
			const subject = mount(
				<Video source="abc.mp4" />
			);

			subject.setProps({
				preloadSource: 'def.mp4'
			});

			const expected = 2;
			const actual = subject.find('Media').length;

			expect(actual).toBe(expected);
		});

		test('should use the same node when adding `preloadSource` the same as source', () => {
			const subject = mount(
				<Video source="abc.mp4" />
			);

			const expected = getSourceNode(subject);

			subject.setProps({
				preloadSource: 'abc.mp4'
			});

			const actual = getSourceNode(subject);

			expect(actual).toBe(expected);
		});

		test('should use the same node when changing `preloadSource`', () => {
			const subject = mount(
				<Video source="abc.mp4" preloadSource="def.mp4" />
			);

			const expected = getPreloadNode(subject);

			subject.setProps({
				preloadSource: 'ghi.mp4'
			});

			const actual = getPreloadNode(subject);

			expect(actual).toBe(expected);
		});

		test('should swaps nodes when swapping `source` and `preloadSource`', () => {
			const subject = mount(
				<Video source="abc.mp4" preloadSource="def.mp4" />
			);

			const source = getSourceNode(subject);
			const preload = getPreloadNode(subject);

			subject.setProps({
				source: 'def.mp4',
				preloadSource: 'abc.mp4'
			});

			expect(getSourceNode(subject)).toBe(preload);
			expect(getPreloadNode(subject)).toBe(source);
		});


		test('should not swap nodes on re-render after swapping `source` and `preloadSource`', () => {
			const subject = mount(
				<Video source="abc.mp4" preloadSource="def.mp4" />
			);

			const source = getSourceNode(subject);
			const preload = getPreloadNode(subject);

			subject.setProps({
				source: 'def.mp4',
				preloadSource: 'abc.mp4'
			});

			subject.setProps({});

			expect(getSourceNode(subject)).toBe(preload);
			expect(getPreloadNode(subject)).toBe(source);
		});

		test('should reuse preload node when moving `preloadSource` to `source`', () => {
			const subject = mount(
				<Video source="abc.mp4" preloadSource="def.mp4" />
			);

			const preload = getPreloadNode(subject);

			subject.setProps({
				source: 'def.mp4',
				preloadSource: null
			});

			expect(getSourceNode(subject)).toBe(preload);
			expect(getPreloadNode(subject)).toBeFalsy();
		});

		test('should reuse both nodes when both `preloadSource` and `source` change', () => {
			const subject = mount(
				<Video source="abc.mp4" preloadSource="def.mp4" />
			);

			const source = getSourceNode(subject);
			const preload = getPreloadNode(subject);

			subject.setProps({
				source: 'ghi.mp4',
				preloadSource: 'jkl.mp4'
			});

			expect(getSourceNode(subject)).toBe(source);
			expect(getPreloadNode(subject)).toBe(preload);
		});

		test('should reuse source node over two changes', () => {
			const subject = mount(
				<Video source="abc.mp4" />
			);

			const source = getSourceNode(subject);

			subject.setProps({
				source: 'def.mp4'
			});

			expect(getSourceNode(subject)).toBe(source);

			subject.setProps({
				source: 'ghi.mp4'
			});

			expect(getSourceNode(subject)).toBe(source);
		});

		test('should swap nodes when preload does not exist initially', () => {
			const subject = mount(
				<Video source="abc.mp4" />
			);

			const source = getSourceNode(subject);

			subject.setProps({
				preloadSource: 'def.mp4'
			});

			const preload = getPreloadNode(subject);

			subject.setProps({
				source: 'def.mp4',
				preloadSource: 'abc.mp4'
			});

			expect(getSourceNode(subject)).toBe(preload);
			expect(getPreloadNode(subject)).toBe(source);
		});
	});
});
