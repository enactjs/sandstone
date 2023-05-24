// const Page = require('../VirtualGridListPage');
// const {expectFocusedItem} = require('../../VirtualList-utils');
import Page from '../VirtualGridListPage.js';
import {expectFocusedItem} from '../../VirtualList-utils.js';

describe('qa-VirtualGridList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should spotlight is on the bottom/top in same column via page up/down key with nativescroll mode[QWTC-2300]', async function () {
		// To speed up the test, set dataSize to 30.
		await Page.inputNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(3);
		await Page.numPad(0);
		await Page.spotlightRight();

		// Step 2-1: Position the pointer on an image.
		await (await Page.item(3)).moveTo();
		// Step 2-2: 5-way Left to change into 5-way key mode.
		await Page.spotlightLeft();
		// Step 2 Verify: Spotlight on one of the images.
		await expectFocusedItem(2);

		// Step 3: Press Channel Down continuously until the bottom of the list displays
		for (let i =  0; i < 3; i++) {
			await Page.pageDown();
			await Page.delay(1000);
		}
		// Step 3 Verify: Spotlight is on the bottom most image in the same column from the previous step.
		await expectFocusedItem(27);

		// Step 4: Press Channel Up continuously until the top of the list displays.
		for (let i =  0; i < 3; i++) {
			await Page.pageUp();
			await Page.delay(1000);
		}
		// Step 4 Verify: Spotlight is on the top-most image in the same column from the previous step.
		await expectFocusedItem(2);
	});

	it('should spotlight is on the bottom/top in same column via page up/down key with translatescroll mode[QWTC-2294]', async function () {
		// Step 2: Uncheck the "Native Scrolling" CheckboxItem.
		await Page.buttonModeChange.moveTo();
		await Page.spotlightSelect();
		// To speed up the test, set dataSize to 30.
		await Page.inputNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(3);
		await Page.numPad(0);
		await Page.spotlightRight();

		// Step 3-1: Position the pointer on an image.
		await (await Page.item(3)).moveTo();
		// Step 3-2: 5-way Left to change into 5-way key mode.
		await Page.spotlightLeft();
		// Step 3 Verify: Spotlight on one of the images.
		await expectFocusedItem(2);

		// Step 4: Press Channel Down continuously until the bottom of the list displays
		for (let i =  0; i < 3; i++) {
			await Page.pageDown();
			await Page.delay(1000);
		}
		// Step 4 Verify: Spotlight is on the bottom most image in the same column from the previous step.
		await expectFocusedItem(27);

		// Step 5: Press Channel Up continuously until the top of the list displays.
		for (let i =  0; i < 3; i++) {
			await Page.pageUp();
			await Page.delay(1000);
		}
		// Step 5 Verify: Spotlight is on the top-most image in the same column from the previous step.
		await expectFocusedItem(2);
	});
});
