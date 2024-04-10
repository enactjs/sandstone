const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, waitUntilFocused} = require('../VirtualList-utils');

describe('VirtualList', function () {
	it('should meet initial conditions', async function () {
		await Page.open();
		expect(await Page.buttonHideScrollbar.isFocused()).toBe(true);
	});

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should focus first item on first focus', async function () {
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();
			await expectFocusedItem(0);
		});

		it('should position Scrollbar Track on right side in LTR [QWTC-2113]', async function () {
			// Verify Step 2.2: The Scrollbar track displays shortly right aligned.
			expect(await Page.getListRect().right).toBe(await Page.getVerticalScrollbarRect().right);
		});

		it('should position Scroll thumb on top/bottom when reaching to the edge with 5-way and Channel Down [QWTC-2115]', async function () {
			// Step 3. Knobs > VirtualList > dataSize > 30
			await Page.inputfieldNumItems.moveTo();
			await Page.spotlightSelect();
			await Page.backSpace();
			await Page.backSpace();
			await Page.backSpace();
			await Page.numPad(3);
			await Page.numPad(0);
			await Page.backKey();
			await Page.spotlightDown();
			// Step 4. Move focus to the first item ('Item 00').
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight();
			// Verify Step 4: 1. Spotlight displays on the first item.
			await expectFocusedItem(0, 'focus Item 0');
			// Verify Step 5: Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(await Page.getScrollThumbPosition()).toBe('0');
			// Step 6. Press Channel Down.
			await Page.pageDown();
			// Verify Step 6: 1. Spotlight hides.
			await expectNoFocusedItem();
			await waitUntilFocused(6, 'focus Item 6');
			// Step 7. Press Channel Down.
			await Page.pageDown();
			// Verify Step 7: 1. Spotlight hides.
			await expectNoFocusedItem();
			await waitUntilFocused(12, 'focus Item 12');
			// Step 8. 5-way Down several times to scroll down the list.
			await Page.fiveWayToItem(20);
			// Step 9. 5-way Spot the last item.
			await Page.fiveWayToItem(29);
			// Verify Step 9: 1. Spotlight displays on the last item.
			await waitUntilFocused(29, 'focus last Item');
			await Page.delay(1000);
			// Verify Step 10: Scroll thumb's position appears shortly at the bottom of the Scrollbar track.
			expect(await Page.getScrollThumbPosition()).toBe('1');
			// Step 11: 5-way Spot the first item.
			await Page.pageUp();
			await waitUntilFocused(23, 'focus Item 23');
			await Page.pageUp();
			await waitUntilFocused(17, 'focus Item 17');
			await Page.pageUp();
			await waitUntilFocused(11, 'focus Item 11');
			await Page.pageUp();
			// Verify Step 11: Spotlight displays on the first item.
			await waitUntilFocused(0, 'focus Item 0');
			// Verify Step 12: Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(await Page.getScrollThumbPosition()).toBe('0');
		});

		// TODO: Will need lots of comments update to match the TC in JIra
		it('should Items Animate via 5-way Up and Down on Last Item on the page - vertical [QWTC-2060]', async function () {
			let bottomId;
			await Page.buttonLeft.moveTo();
			await Page.spotlightRight(); // needed to focus Item 00 and get into that container
			// Step 3. 1. Position the pointer on the last item in a current page.
			bottomId = await Page.bottomVisibleItemId();
			await Page.showPointerByKeycode();
			await (await Page.item(bottomId)).moveTo();
			// Verify Step 3: Spotlight displays on the item.
			await Page.delay(1000); // needed to run on mpc
			await expectFocusedItem(Number((await Page.bottomVisibleItemId()).slice(4)), 'focus bottomId');
			// Step 4. 5-way Down to the item below the last item on the current page.
			await Page.spotlightDown();
			// Verify Step 4: 1. The list Scrolled Up.  2 The Spotted item is placed on the Bottom.
			await Page.delay(1000); // needed to run on mpc
			await expectFocusedItem(Number((await Page.bottomVisibleItemId()).slice(4)), 'focus bottomId');
			// Step 5: 5-way Up to the previous item.
			await Page.spotlightUp();
			// Verify Step 5: 1. The list *does not* Scroll Down.
			// Check the bottomVisibleItem is still the same as the one before 5-way Up to check the list did not scroll Down
			expect(Number(bottomId.slice(4)) === ((Number((await Page.bottomVisibleItemId()).slice(4)))) - 1).toBe(true);
			// Verify Step 5: 2. The Spotted item is placed above the item on the Bottom.
			await expectFocusedItem(Number((bottomId.slice(4))), 'focus bottomId');
			// Step 6: 5-way Up to the first item ('*Item 000*').
			await Page.fiveWayToItem(0);
			// Verify Step 6:  1. The list Scroll Down. 2. The Spotted item is placed on the Top.
			await expectFocusedItem(Number((await Page.topVisibleItemId()).slice(4)), 'focus Item 00');
			await expectFocusedItem(0, 'focus Item 00');  // to double check it is really top item
		});

		it('should Spotlight with Pointer wave [QWTC-2055]', async function () {
			// Step 3-1: Position the pointer on 'item 004'.
			// Step 3-2: 5-way Spot 'Item 004'(while leaving the pointer on 'item 004').
			await (await Page.item(4)).moveTo();
			await Page.spotlightSelect();
			// Verify Step 3: Spotlight displays on the '*Item 004*'.
			await expectFocusedItem(4, 'focus Item 004');
			// Step 4-1: 5-way Down to 'Item 007'.
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await expectFocusedItem(7, 'focus Item 007');
			// Step 4-2: Wave the pointer.
			// Verify Step 4-1: Spotlight hides from 'Item 007'.
			// Verify Step 4-2: Spotlight displays on the item at the pointer's location.
			await Page.showPointerByKeycode();
			await (await Page.item(3)).moveTo();
			await expectFocusedItem(3, 'focus Item 03');
			await (await Page.item(1)).moveTo();
			await expectFocusedItem(1, 'focus Item 01');
			await (await Page.item(5)).moveTo();
			await expectFocusedItem(5, 'focus Item 05');
		});
	});
});
