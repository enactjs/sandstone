/* global page */

const {FPS, Mount} = require('../TraceModel');
const {getFileName, scrollAtPoint} = require('../utils');
const TestResults = require('../TestResults');

describe( 'Scroller', () => {
	describe('ScrollButton', () => {
		it.skip('scrolls down', async () => {
			const filename = getFileName('Scroller');
			await page.goto('http://localhost:8080/scroller');
			await page.tracing.start({path: filename, screenshots: false});

			await page.focus('[aria-label="scroll down"]');
			await page.keyboard.down('Enter');
			await page.keyboard.down('Enter');
			await page.waitFor(2000);

			await page.tracing.stop();

			const actual = FPS(filename);
			TestResults.addResult({component: 'Scroller', type: 'Frames Per Second', actualValue: actual});
		});
	});

	describe('mouse wheel', () => {
		it('scrolls down', async () => {
			const filename = getFileName('Scroller');
			await page.goto('http://localhost:8080/scroller');
			await page.tracing.start({path: filename, screenshots: false});

			const scroller = '#scroller';

			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);

			await page.tracing.stop();

			const actual = FPS(filename);
			TestResults.addResult({component: 'Scroller', type: 'Frames Per Second', actualValue: actual});
		});
	});

	it('mount', async () => {
		const filename = getFileName('Scroller');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/scroller');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actual = Mount(filename, 'Scroller');

		TestResults.addResult({component: 'Scroller', type: 'Mount', actualValue: actual});
	});

	describe('mount with various children', () => {

		const counts = [10, 40, 70, 100];
		let results = [];
		const types = [
			// 'ScrollerJS',
			// 'ScrollerNative',
			'Scroller',
			'UiScrollerJS',
			'UiScrollerNative'
		];

		for (const type of types) {
			for (let index = 0; index < counts.length; index++) {
				const count = counts[index];
				it(`mount ${type} with ${count} children`, async () => {
					const filename = getFileName(type);

					await page.tracing.start({path: filename, screenshots: false});
					await page.goto(`http://localhost:8080/scrollerMultipleChildren?count=${count}&type=${type}`);
					await page.waitFor(2000);

					await page.tracing.stop();

					const actual = Mount(filename, 'ScrollerMultipleChildren');
					results.push({count: count, value: actual, type: type});
					TestResults.addResult({component: 'Scroller', type: `Mount ${count} ${type}`, actualValue: actual});
				});
			}
		}
	});


	it.skip('scroll down with 5-way with Scroller Native', async () => {
		const filename = getFileName('ScrollerNative');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/scrollerMultipleChildren?count=100&type=ScrollerNative');
		await page.waitForSelector('#Scroller');
		const item = '[class^="Item_item"]';
		await page.focus(item);

		for (let i = 0; i < 300; i++) {
			await page.keyboard.down('ArrowDown');
			await page.waitFor(10);
		}

		await page.waitFor(2000);

		await page.tracing.stop();

		const actual = FPS(filename);
		TestResults.addResult({component: 'Scroller', type: 'FPS', actualValue: actual});
	});
});
