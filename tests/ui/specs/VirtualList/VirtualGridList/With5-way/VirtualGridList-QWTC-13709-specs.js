const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Scroll via 5-way when clientSize is smaller than itemSize plus affordance (QWTC-13709)', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('Should not scroll to abnormal position by 5-way navigation)', async function () {
		const scrollAnimationTimeout = 500;

		// Set minHeight to 1300 to make itemSize + affordance bigger than viewport
		await Page.inputMinHeight.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(1);
		await Page.numPad(3);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.spotlightDown();

		// check the first item
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(0);
		expect(await Page.getScrollPositionNative()).toBe(0);

		// move right to check if unexpected scrolling occurs
		await Page.spotlightRight();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(1);
		expect(await Page.getScrollPositionNative()).toBe(0);

		// move down to check if the scroll position is updated correctly
		await Page.spotlightDown();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(6);
		expect(await Page.getScrollPositionNative()).toBe(740);

		// move left to check if unexpected scrolling occurs
		await Page.spotlightLeft();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(5);
		expect(await Page.getScrollPositionNative()).toBe(740);

		// move up to check if the scroll position is updated correctly
		await Page.spotlightUp();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(0);
		expect(await Page.getScrollPositionNative()).toBe(0);
	});

	it('Should not scroll to abnormal position by 5-way navigation with translate mode)', async function () {
		const scrollAnimationTimeout = 1000;

		// Set translate mode
		await Page.buttonModeChange.moveTo();
		await Page.spotlightSelect();

		// Set minHeight to 1300 to make itemSize + affordance bigger than viewport
		await Page.inputMinHeight.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(1);
		await Page.numPad(3);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.spotlightDown();

		// check the first item
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(0);
		expect(await Page.getScrollPositionTranslate()).toBe(0);

		// move right to check if unexpected scrolling occurs
		await Page.spotlightRight();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(1);
		expect(await Page.getScrollPositionTranslate()).toBe(0);

		// move down to check if the scroll position is updated correctly
		await Page.spotlightDown();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(6);
		expect(await Page.getScrollPositionTranslate()).toBe(-740);

		// move left to check if unexpected scrolling occurs
		await Page.spotlightLeft();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(5);
		expect(await Page.getScrollPositionTranslate()).toBe(-740);

		// move up to check if the scroll position is updated correctly
		await Page.spotlightUp();
		await Page.delay(scrollAnimationTimeout);
		await expectFocusedItem(0);
		expect(await Page.getScrollPositionTranslate()).toBe(0);
	});
});
