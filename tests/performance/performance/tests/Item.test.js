/* global page */

const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Item', () => {
	it('mount', async () => {
		const filename = getFileName('Item');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/item');
		await page.waitForSelector('#item');
		await page.waitFor(2000);
		await page.tracing.stop();

		const actualMount = Mount(filename, 'Pure');

		TestResults.addResult({component: 'Button', type: 'Mount', actualValue: actualMount});
	});
});

