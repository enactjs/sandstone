/* global page */

const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('ExpandableItem', () => {
	it('open and close', async () => {
		const filename = getFileName('ExpandableItem');
		const openClose = '[class^="ExpandableItem_expandableItem"]';

		await page.goto('http://localhost:8080/expandableItem');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitFor(500);
		await page.click(openClose);
		await page.waitFor(200);
		await page.click(openClose);
		await page.waitFor(200);
		await page.click(openClose);
		await page.waitFor(200);
		await page.click(openClose);
		await page.waitFor(200);

		await page.tracing.stop();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'ExpandableItem', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'Toggleable');
		TestResults.addResult({component: 'ExpandableItem', type: 'Update', actualValue: actualUpdateTime});

	});

	it('should mount ExpandableItem under threshold', async () => {
		const filename = getFileName('ExpandableItem');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/expandableItem');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Toggleable');
		TestResults.addResult({component: 'ExpandableItem', type: 'Mount', actualValue: actualMount});
	});
});

