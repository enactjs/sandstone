/* eslint-disable no-undefined */
const Page = require('./DropdownPage');

function waitForFocusedText (dropdown, text, timeout, timeoutMsg = `timed out waiting for ${text}`, interval = 250) {
	browser.waitUntil(function () {
		return dropdown.focusedItemText.indexOf(text) === 0;
	}, {timeout, timeoutMsg, interval});
}

describe('Dropdown', function () {

	describe('changing props', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should focus the first item when `selected` changes to `null` - [QWTC-2403]', async function () {
			const dropdown = Page.components.dropdownChangeSelected;

			await Page.openDropdown(dropdown);

			waitForFocusedText(dropdown, 'four', 500, undefined, 100);

			waitForFocusedText(dropdown, 'one', 750);
		});

		it('should focus the first item when `children` changes - [QWTC-2404]', async function () {
			const dropdown = Page.components.dropdownChangeChildren;

			await Page.openDropdown(dropdown);

			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			waitForFocusedText(dropdown, 'three', 750);
		});

		it('should focus the first item when `children` changes to smaller size - [QWTC-2510]', async function () {
			const dropdown = Page.components.dropdownChangeLessChildren;

			await Page.openDropdown(dropdown);

			waitForFocusedText(dropdown, '28', 500, undefined, 100);

			waitForFocusedText(dropdown, '3', 2250);
		});
	});

	describe('5-way', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should lock Spotlight inside the Dropdown - [QWTC-2186]', async function () {
			const dropdown = Page.components.dropdownDefault;

			// Step 3: 5-way Spot and 5-way Select the 'Default' Dropdown.
			await Page.openDropdown(dropdown);
			// Verify Step 3.1: The 'Default' Dropdown opens.
			// Verify Step 3.2: Spotlight is on *Option 1* on the left *Dropdown*.
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 4: 5-way Down to *Option 5*
			// Verify Step 4.1: Spotlight is on each option with each 5-way Down.
			await Page.spotlightDown();
			waitForFocusedText(dropdown, 'two', 500, undefined, 100);
			await Page.spotlightDown();
			waitForFocusedText(dropdown, 'three', 500, undefined, 100);
			await Page.spotlightDown();
			waitForFocusedText(dropdown, 'four', 500, undefined, 100);
			// Verify Step 4.2:Spotlight is on *Option 5*.
			await Page.spotlightDown();
			waitForFocusedText(dropdown, 'five', 500, undefined, 100);

			// Step 5: 5-way Down one more time.
			// Verify Step 5.1: Spotlight stays on *Option 5*.
			await Page.spotlightDown();
			waitForFocusedText(dropdown, 'five', 500, undefined, 100);

			// Step 6: 5-way Up to *Option 1*.`
			// Verify Step 6.1: Spotlight is on each option with each 5-way Up.
			await Page.spotlightUp();
			waitForFocusedText(dropdown, 'four', 500, undefined, 100);
			await Page.spotlightUp();
			waitForFocusedText(dropdown, 'three', 500, undefined, 100);
			await Page.spotlightUp();
			waitForFocusedText(dropdown, 'two', 500, undefined, 100);
			// Verify Step 6.2:Spotlight is on *Option 1*.
			await Page.spotlightUp();
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 7: 5-way Up one more time.
			// Verify Step 7.1: Spotlight stays on *Option 1*.
			await Page.spotlightUp();
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 8: Click  on the empty space created by the wrapper (Pointer mode).
			const wrapper = $('#wrapper');
			await wrapper.click({x: 0, y: 0});
			// Verify Step 8: The 'Default' Dropdown is closed.
			expect(await dropdown.list.isExisting()).not.toBe(true);
		});

		it('should move Spotlight to the next/previous item on PageDown/PageUp', async function () {
			const dropdown = Page.components.dropdownMoreChildren;

			// 5-way Spot and 5-way Select the 'More Children' Dropdown.
			await Page.openDropdown(dropdown);
			// Verify: The 'Default' Dropdown opens.
			// Verify: Spotlight is on the first option.
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// ChannelDown(PageDown).
			// Verify: Spotlight is on the fifth option.
			await Page.pageDown();
			waitForFocusedText(dropdown, 'five', 500, undefined, 100);

			// ChannelDown(PageDown) to the last option.
			// Verify: Spotlight is on the ninth option.
			await Page.pageDown();
			waitForFocusedText(dropdown, 'nine', 500, undefined, 100);

			// ChannelUp(PageUp).
			// Verify: Spotlight is on the sixth option.
			await Page.pageUp();
			waitForFocusedText(dropdown, 'six', 500, undefined, 100);

			// ChannelUp(PageUp) to the first option.
			// Verify: Spotlight is on the first option.
			await Page.pageUp();
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);
		});
	});

	describe('pointer', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should dismiss dropdown when clicking outside - [QWTC-2184]', async function () {
			const dropdown = Page.components.dropdownDefault;

			// Open the first dropdown and wait for the first list item to be focused
			await Page.openDropdown(dropdown);
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 3: Click in the area outside the Dropdown (in the empty space created by the wrapper)
			const wrapper = $('#wrapper');
			await wrapper.click({x: 0, y: 0});

			// Verify Step 3: that the floating list no longer exists (Dropdown is closed)
			expect(await dropdown.list.isExisting()).not.toBe(true);
		});
	});

	describe('5-way and pointer', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should close dropdown from Pointer mode with Back key  - [QWTC-2167]', async function () {
			const dropdown = Page.components.dropdownDefault;

			// Step 3: 5-way Spot and 5-way Select the Dropdown placeholder "No selection".
			await Page.openDropdown(dropdown);
			// Verify Step 3: The Dropdown opens.
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 4: Press the *Back* key on the remote.
			await Page.backKey();
			// Verify Step 4: The Dropdown closes.
			expect(await dropdown.list.isExisting()).not.toBe(true);

			// Step 5: Click on the Dropdown placeholder "No selection".
			await dropdown.button.click();
			// Verify Step 5: The Dropdown opens.
			expect(await dropdown.list.isExisting()).toBe(true);

			// Step 6: Move the pointer over any Option.  Moving to  Item 'two' here.
			await dropdown.item(1).moveTo();
			// Verify Step 6: Spotlight is on this Option.
			waitForFocusedText(dropdown, 'two', 500, undefined, 100);

			// Step 7: Press the *Back* key on the remote.
			await Page.backKey();
			// Verify Step 7: Dropdown closes.
			expect(await dropdown.list.isExisting()).not.toBe(true);
		});
	});

	describe('touch/wheel tests', function () {
		beforeEach(async function () {
			await Page.open();
		});
		const dropdown = Page.components.dropdownMoreChildren;

		it('touch', async function () {
			await Page.openDropdown(dropdown);
			const initialScrollThumbPosition = await dropdown.getScrollThumbPosition();
			await browser.action('pointer', {
				parameters: {pointerType: 'touch'}
			})
				.move({duration: 0, origin: await dropdown.list})
				.down()
				.move({duration: 0, origin: await dropdown.list, y: -100})
				.up()
				.perform();

			let currentScrollThumbPosition = await dropdown.getScrollThumbPosition();
			expect(currentScrollThumbPosition > initialScrollThumbPosition).toBe(true);

			await browser.action('pointer', {
				parameters: {pointerType: 'touch'}
			})
				.move({duration: 0, origin: await dropdown.list, y: -100})
				.down()
				.move({duration: 0, origin: await dropdown.list, y: 0})
				.up()
				.perform();

			currentScrollThumbPosition = await dropdown.getScrollThumbPosition();
			expect(currentScrollThumbPosition === initialScrollThumbPosition).toBe(true);
		});

		it('wheel', async function () {
			await Page.openDropdown(dropdown);
			const initialScrollThumbPosition = await dropdown.getScrollThumbPosition();
			await browser.action('wheel').scroll({
				origin: await dropdown.list,
				deltaX: 0,
				deltaY: 100,
				duration: 1000
			}).perform();

			const currentScrollThumbPosition = await dropdown.getScrollThumbPosition();
			expect(currentScrollThumbPosition > initialScrollThumbPosition).toBe(true);
		});
	});

	describe('in scroller', function () {
		beforeEach(async function () {
			await Page.open('InScroller');
		});

		const getDropdownOffset = (dropdown, scroller) => {
			return browser.execute((a, b) => {
				return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
			}, dropdown, scroller);
		};

		it('should have title visible when focusing button via 5-way - [QWTC-2495]', async function () {
			// TODO: This refocuses the first dropdown which is being blurred for some reason with
			// Scroller. Once that bug is resolved, this can be removed.
			await Page.spotlightLeft();
			expect(await Page.components.dropdown1.button.isFocused()).toBe(true);

			await Page.spotlightDown();
			await Page.delay(250);

			// Verify that we have scrolled down
			expect(getDropdownOffset(
				await Page.components.dropdown1.self,
				await $('#scroller')
			)).not.toBe(0);

			await Page.spotlightUp();
			await Page.delay(250);

			const expected = 0;
			const actual = getDropdownOffset(
				await Page.components.dropdown1.self,
				await $('#scroller')
			);
			expect(await actual).toBe(expected);
		});
	});
});
