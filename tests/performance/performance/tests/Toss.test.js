/* global page */

const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Toss', () => {
	const count = 10;
	let total = 0;

	it(`should average the mount times of ${count} Toss components`, async () => {
		for (let index = 0; index < count; index++) {
			const filename = getFileName('Toss');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/toss');
			await page.waitForSelector('#toss');

			await page.tracing.stop();

			const actualMount = Mount(filename, 'Tossable');
			total += actualMount;

			if (index === (count - 1)) {
				TestResults.addResult({component: 'Toss', type: 'Mount', actualValue: (total / count)});
			}
		}
	});

	it('should mount Toss', async () => {
		const filename = getFileName('Toss');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/toss');
		await page.waitForSelector('#toss');

		await page.tracing.stop();

		// Executes Navigation API within the page context
		const metrics = await page.evaluate(() => JSON.stringify(window.performance));

		// Parses the result to JSON - loading timeline
		console.info(JSON.parse(metrics));

		// Analyzing runtime through metrics
		const metrics_data = await page.metrics();
		console.info(metrics_data);

		const actualMount = Mount(filename, 'Tossable');
		TestResults.addResult({component: 'Toss', type: 'Mount', actualValue: actualMount});
	});
});
