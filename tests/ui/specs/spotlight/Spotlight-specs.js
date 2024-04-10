let Page = require('./SpotlightMultiplePage');

describe('Spotlight', function () {

	it('should focus first item on load', async function () {
		await Page.open();
		expect(await Page.item1.isFocused()).toBe(true);
	});

	it('should focus item 2 on 5-way down', async function () {
		await Page.open();
		await Page.spotlightDown();
		expect(await Page.item2.isFocused()).toBe(true);
	});

	it('should not change focus on 5-way left', async function () {
		await Page.open();
		await Page.spotlightLeft();
		expect(await Page.item1.isFocused()).toBe(true);
	});

	it('should not change focus on 5-way up', async function () {
		await Page.open();
		await Page.spotlightUp();
		expect(await Page.item1.isFocused()).toBe(true);
	});

	it('should spot default item in next container', async function () {
		await Page.open();
		await Page.spotlightDown();
		await Page.spotlightRight();
		expect(await Page.itemA.isFocused()).toBe(true);
	});

	it('should spot last spotted control in container when re-entering', async function () {
		await Page.open();
		await Page.spotlightDown();
		await Page.spotlightRight();
		expect(await Page.itemA.isFocused()).toBe(true);
		await Page.spotlightLeft();
		expect(await Page.item2.isFocused()).toBe(true);
	});

	it('should spot nearest control in container when leaving pointer mode with a target in direction', async function () {
		await Page.open();
		// Hovering non-focusable item with pointer
		await Page.item2.moveTo();
		// move down (no more spotted controls)
		await Page.spotlightDown();
		// Should re-spot item 1
		expect(await Page.item3.isFocused()).toBe(true);
	});

	it('should spot next container when leaving pointer mode with focus on spottable item', async function () {
		await Page.open();
		// Hovering non-focusable item with pointer
		await Page.item2.moveTo();
		// move down (no more spotted controls)
		await Page.spotlightRight();
		// Should re-spot item 1
		expect(await Page.itemA.isFocused()).toBe(true);
	});

	it('should spot closest control in container when leaving pointer in new container', async function () {
		await Page.open();
		// Hovering non-focusable item in different container with pointer
		await Page.nonSpottableItemB.moveTo();
		// move down
		await Page.spotlightDown();
		// Should spot item A
		expect(await Page.itemA.isFocused()).toBe(true);
	});

	describe('Nested Containers', function () {
		it('should spot child item', async function () {
			await Page.open();
			await Page.itemParent.moveTo();
			await Page.spotlightDown();
			expect(await Page.itemChild.isFocused()).toBe(true);
		});

		it('should spot parent item', async function () {
			await Page.open();
			await Page.itemChild.moveTo();
			await Page.spotlightUp();
			expect(await Page.itemParent.isFocused()).toBe(true);
		});
	});

	describe('Disappear Test', function () {
		it('should spot restore button when focus button disappears - [QWTC-2369]', async function () {
			await Page.open();
			await Page.restoreButton.moveTo();
			await Page.spotlightUp();
			await browser.pause(5000);
			expect(await Page.restoreButton.isFocused()).toBe(true);
		});
	});
});
