const Page = require('./VirtualGridListPage'),
	{expectFocusedItem /* , expectNoFocusedItem, waitForScrollStartStop, waitUntilFocused*/} = require('../VirtualList-utils');

describe('VirtualGridList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should meet initial conditions', async function () {
		expect(await Page.buttonHideScrollbar.isFocused()).toBe(true);
	});

	describe('LTR locale', function () {
		it('should focus first item on first focus', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await expectFocusedItem(0);
		});
	});

	describe('Minimal DataSize', function () {
		it('should not display scrollbar when minimal datasize [QWTC-2067]', async function () {
			// Step 3: Knobs > VirtualGridList > dataSize > 4
			await Page.inputNumItems.moveTo();
			await Page.spotlightSelect();
			await Page.backSpace();
			await Page.backSpace();
			await Page.backSpace();
			await Page.numPad(4);
			await Page.spotlightLeft();
			// Step 4 Verify: Scrollbar track does not display to the right as the data size is the minimal size of 4.
			expect((await Page.scrollBar).error.message.slice(0, 15)).toBe('no such element');
		});
	});

	it('wheel horizontal', async function () {
		const initialScrollThumbPosition = await Page.scrollThumbPosition();
		await browser.action('wheel').scroll({
			x: 700,
			y: 200,
			deltaX: 0,
			deltaY: 1000,
			duration: 200,
			pause: 1000
		}).perform();

		const currentScrollThumbPosition = await Page.scrollThumbPosition();
		// verify that the scrolling happened
		expect(currentScrollThumbPosition > initialScrollThumbPosition).toBe(true);

		// verify scroll returns to original position
		await browser.action('wheel').scroll({
			x: 700,
			y: 200,
			deltaX: 0,
			deltaY: -1000,
			duration: 200,
			pause: 1000
		}).perform();

		const finalScrollThumbPosition = await Page.scrollThumbPosition();
		expect(finalScrollThumbPosition === initialScrollThumbPosition).toBe(true);
	});

	it('wheel vertical', async function () {
		await Page.buttonDirectionChange.click();
		const initialScrollThumbPosition = await Page.scrollThumbPosition();
		await browser.action('wheel').scroll({
			x: 700,
			y: 200,
			deltaX: 1000,
			deltaY: 0,
			duration: 200,
			pause: 1000
		}).perform();
		await browser.pause(2000);

		const currentScrollThumbPosition = await Page.scrollThumbPosition();
		expect(currentScrollThumbPosition > initialScrollThumbPosition).toBe(true);

		await browser.action('wheel').scroll({
			x: 700,
			y: 200,
			deltaX: -1000,
			deltaY: 0,
			duration: 200,
			pause: 1000
		}).perform();
		await browser.pause(2000);

		const finalScrollThumbPosition = await Page.scrollThumbPosition();
		expect(finalScrollThumbPosition === initialScrollThumbPosition).toBe(true);
	});

	it('touch vertical', async function () {
		const initialScrollThumbPosition = await Page.scrollThumbPosition();

		await browser.action('pointer', {
			parameters: {pointerType: 'touch'}
		})
			.move({duration: 0, origin: await Page.list, x: 100, y: 100})
			.down()
			.move({duration: 3000, y: 200})
			.up()
			.move({duration: 1000, origin: await Page.list, x: 100, y: 200})
			.down()
			.move({duration: 1000, y: 300})
			.up()
			.move({duration: 1000, origin: await Page.list, x: 100, y: 300})
			.down()
			.move({duration: 1000, y: 400})
			.perform();

		const currScrollThumbPosition = await Page.scrollThumbPosition();

		expect(currScrollThumbPosition > initialScrollThumbPosition).toBe(true);
	});

	it('touch horizontal', async function () {
		const initialScrollThumbPosition = await Page.scrollThumbPosition();

		await browser.action('pointer', {
			parameters: {pointerType: 'touch'}
		})
			.move({duration: 0, origin: await Page.buttonDirectionChange, x: 0, y: 0})
			.down()
			.up()
			.move({duration: 1000, origin: await Page.list, x: 300, y: 50})
			.down()
			.move({duration: 1000, origin: await Page.list, x: 0, y: 50})
			.up()
			.move({duration: 1000, origin: await Page.list, x: 300, y: 50})
			.down()
			.move({duration: 1000, origin: await Page.list, x: 0, y: 50})
			.up()
			.perform();

		const currScrollThumbPosition = await Page.scrollThumbPosition();

		expect(currScrollThumbPosition > initialScrollThumbPosition).toBe(true);

		await browser.pause(3000);
	});
});
