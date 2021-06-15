/* global page */

const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('ViewManager', () => {
	it('change index', async () => {
		const filename = getFileName('ViewManager');
		const view = '[class^="view"]';

		await page.goto('http://localhost:8080/viewManager');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitFor(1000);
		await page.click(view);
		await page.waitFor(1000);
		await page.click(view);
		await page.waitFor(1000);

		await page.tracing.stop();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'ViewManager', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'ViewManager');
		TestResults.addResult({component: 'ViewManager', type: 'Update', actualValue: actualUpdateTime});
	});

	it('mount', async () => {
		const filename = getFileName('ViewManager');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/viewManager');
		await page.waitForSelector('#view1');

		await page.tracing.stop();

		const actualMount = Mount(filename, 'ViewManager');
		TestResults.addResult({component: 'Panels', type: 'Mount', actualValue: actualMount});
	});
});

