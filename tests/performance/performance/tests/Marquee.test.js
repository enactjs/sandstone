/* global page */

const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Marquee', () => {
	it.skip('should start marquee on hover', async () => {
		const filename = getFileName('Marquee');
		const MarqueeText = '[class^="Marquee"]';

		await page.goto('http://localhost:8080/marquee');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitForSelector('#marquee');
		await page.hover(MarqueeText);
		await page.waitFor(500);

		await page.tracing.stop();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Marquee', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'ui:MarqueeDecorator');
		TestResults.addResult({component: 'Marquee', type: 'Update', actualValue: actualUpdateTime});
	});

	it('should mount Marquee under threshold', async () => {
		const filename = getFileName('Marquee');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/marquee');
		await page.waitForSelector('#marquee');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Skinnable');
		TestResults.addResult({component: 'Marquee', type: 'Mount', actualValue: actualMount});
	});

	describe('Multiple Marquees', () => {
		const counts = [10, 40, 70, 100];
		for (let index = 0; index < counts.length; index++) {
			const count = counts[index];
			it(`mounts ${count} Marquee components`, async () => {
				const filename = getFileName('Marquee');

				await page.tracing.start({path: filename, screenshots: false});
				await page.goto(`http://localhost:8080/marqueeMultiple?count=${count}`);
				await page.waitForSelector('#Container');
				await page.waitFor(500);

				await page.tracing.stop();

				const actualMount = Mount(filename, 'MarqueeMultiple');
				TestResults.addResult({component: 'Marquee', type: 'Mount', actualValue: actualMount});
			});
		}

		for (let index = 0; index < counts.length; index++) {
			const count = counts[index];
			it(`updates marqueeOn hover ${count} Marquee components`, async () => {
				const filename = getFileName('Marquee');

				await page.tracing.start({path: filename, screenshots: false});
				await page.goto(`http://localhost:8080/marqueeMultiple?count=${count}`);
				await page.waitForSelector('#Container');
				await page.waitFor(500);

				await page.hover('#Marquee_5');
				await page.waitFor(500);

				await page.tracing.stop();

				const actualFPS = FPS(filename);
				TestResults.addResult({component: 'Marquee', type: 'Frames Per Second', actualValue: actualFPS});
			});
		}

		for (let index = 0; index < counts.length; index++) {
			const count = counts[index];
			it(`updates marqueeOn render ${count} Marquee components`, async () => {
				const filename = getFileName('Marquee');

				await page.tracing.start({path: filename, screenshots: false});
				await page.goto(`http://localhost:8080/marqueeMultiple?count=${count}&marqueeOn=render`);
				await page.waitForSelector('#Container');
				await page.waitFor(500);

				await page.tracing.stop();

				const actualFPS = FPS(filename);
				TestResults.addResult({component: 'Marquee', type: 'Frames Per Second', actualValue: actualFPS});
			});
		}
	});
});

