/* global page */

const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Slider', () => {
	describe('drag', () => {
		it('increment', async () => {
			const filename = getFileName('Slider');
			await page.goto('http://localhost:8080/slider');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitForSelector('#slider');
			const {x: posX, y: posY} = await page.evaluate(() => {
				const knobElement = document.querySelector('[class^="Slider_knob"]');
				const {x, y} = knobElement.getBoundingClientRect();
				return {x, y};
			});

			await page.mouse.move(posX, posY);
			await page.mouse.down();


			for (let i = 0; i < 100; i++) {
				await page.mouse.move(posX + (i * 10), posY);
			}

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Slider', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Slider', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	describe('keyboard', () => {
		it('increment', async () => {
			const filename = getFileName('Slider');
			await page.goto('http://localhost:8080/slider');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitForSelector('#slider');
			await page.focus('#slider');

			await page.keyboard.press('Enter');

			for (let i = 0; i < 100; i++) {
				await page.keyboard.down('ArrowRight');
			}

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Slider', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Slider', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	it('mount', async () => {
		const filename = getFileName('Slider');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/slider');
		await page.waitForSelector('#slider');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Changeable');
		TestResults.addResult({component: 'Slider', type: 'Mount', actualValue: actualMount});
	});
});

