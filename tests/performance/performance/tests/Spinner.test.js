/* global page */

const {FPS, Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Spinner', () => {
	it('mount', async () => {
		const filename = getFileName('Spinner');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/spinner');
		await page.waitForSelector('#spinner');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'SpinnerSpotlightDecorator');
		TestResults.addResult({component: 'Spinner', type: 'Mount', actualValue: actualMount});

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Spinner', type: 'Frames Per Second', actualValue: actualFPS});
	});
});
