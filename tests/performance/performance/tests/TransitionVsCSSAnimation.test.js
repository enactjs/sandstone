/* global page */

const {getFileName} = require('../utils');

describe('TransitionVsCSSAnimation', () => {
	it('FPS', async () => {
		const filename = getFileName('TransitionVsCSSAnimation');

		await page.goto('http://localhost:8080/transitionVsCSSAnimation');
		await page.waitForSelector('#container');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitForSelector('#spinner');
		await page.waitFor(2000);

		await page.tracing.stop();

		// TODO: measure FPS for each component instead of the entire timeline
	});
});
