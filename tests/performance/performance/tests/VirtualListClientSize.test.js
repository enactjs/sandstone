/* global page */

const {getAveragePaintTimeFor, getFileName, log} = require('../utils');

describe('VirtualList clientSize prop', () => {
	describe('UiVirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('UiVirtualListJS_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=UiVirtualListJS');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`UiVirtualListJS without clientSize: ${paintTime} ms`);
			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('UiVirtualListJS_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=UiVirtualListJS');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`UiVirtualListJS with clientSize: ${paintTime} ms`);

			await page.tracing.stop();
		});
	});

	describe('UiVirtualList native type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('UiVirtualListNative_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=UiVirtualListNative');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`UiVirtualListNative without clientSize: ${paintTime} ms`);

			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('UiVirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=UiVirtualListNative');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`UiVirtualListNative with clientSize: ${paintTime} ms`);

			await page.tracing.stop();
		});
	});

	describe('VirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualList_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=VirtualListJS');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`VirtualListJS without clientSize: ${paintTime} ms`);

			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualList_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=VirtualListJS');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`VirtualListJS with clientSize: ${paintTime} ms`);

			await page.tracing.stop();
		});
	});

	describe('VirtualList native type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualListNative_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=VirtualListNative');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`VirtualListNative without clientSize: ${paintTime} ms`);

			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=VirtualListNative');
			const paintTime = await getAveragePaintTimeFor('#virtualList', 10);
			log(`VirtualListNative with clientSize: ${paintTime} ms`);

			await page.tracing.stop();
		});
	});
});
