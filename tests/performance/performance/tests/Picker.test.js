/* global page */

const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Picker', () => {
	describe('click', () => {
		it.skip('increment', async () => {
			const filename = getFileName('Picker');
			const incrementer = '[class^="Picker_incrementer"]';
			await page.goto('http://localhost:8080/picker');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitFor(500);
			await page.click(incrementer);
			await page.waitFor(200);
			await page.click(incrementer);
			await page.waitFor(200);
			await page.click(incrementer);
			await page.waitFor(200);
			await page.click(incrementer);
			await page.waitFor(200);

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Picker', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Picker', type: 'Update', actualValue: actualUpdateTime});

		});
	});

	describe('keypress', () => {
		it('increment', async () => {
			const filename = getFileName('Picker');
			await page.goto('http://localhost:8080/picker');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitFor(500);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Picker', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Picker', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	it('should mount picker under threshold', async () => {
		const filename = getFileName('Picker');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/picker');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Changeable');
		TestResults.addResult({component: 'Picker', type: 'Mount', actualValue: actualMount});
	});
});

