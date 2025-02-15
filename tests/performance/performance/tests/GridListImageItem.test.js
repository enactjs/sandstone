/* global page */

const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe( 'GridListImageItem', () => {
	it('mount', async () => {
		const filename = getFileName('GridListImageItem');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/GridListImageItem');
		await page.waitForSelector('#gridListImageItem');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Spottable');
		TestResults.addResult({component: 'GridListImageItem', type: 'Mount', actualValue: actualMount});
	});
});
