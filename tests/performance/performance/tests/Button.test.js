/* global page */

const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Button', () => {
	describe('click', () => {
		it('animates', async () => {
			const filename = getFileName('Button');
			await page.goto('http://localhost:8080/button');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitFor(500);

			await page.click('#button'); // to move mouse on the button.
			await page.mouse.down();
			await page.waitFor(200);
			await page.mouse.up();
			await page.mouse.down();
			await page.waitFor(200);
			await page.mouse.up();
			await page.mouse.down();
			await page.waitFor(200);
			await page.mouse.up();
			await page.mouse.down();
			await page.waitFor(200);
			await page.mouse.up();

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Button', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Touchable');
			TestResults.addResult({component: 'Button', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	describe('keypress', () => {
		it('animates', async () => {
			const filename = getFileName('Button');

			await page.goto('http://localhost:8080/button');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitForSelector('#button');
			await page.focus('#button');
			await page.waitFor(200);
			await page.keyboard.down('Enter');
			await page.waitFor(200);
			await page.keyboard.up('Enter');
			await page.keyboard.down('Enter');
			await page.waitFor(200);
			await page.keyboard.up('Enter');
			await page.keyboard.down('Enter');
			await page.waitFor(200);
			await page.keyboard.up('Enter');
			await page.keyboard.down('Enter');
			await page.waitFor(200);
			await page.keyboard.up('Enter');

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Button', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Touchable');
			TestResults.addResult({component: 'Button', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	it('should mount Button under threshold', async () => {
		const filename = getFileName('Button');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/button');
		await page.waitForSelector('#button');

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Touchable');
		TestResults.addResult({component: 'Button', type: 'Mount', actualValue: actualMount});
	});
});

