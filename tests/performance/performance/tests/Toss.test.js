/* global page */

const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Toss', () => {
	it('should mount Toss', async () => {
		const filename = getFileName('Toss');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/toss');
		await page.waitForSelector('#toss');

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Toss');
		TestResults.addResult({component: 'Toss', type: 'Mount', actualValue: actualMount});
	});
});
