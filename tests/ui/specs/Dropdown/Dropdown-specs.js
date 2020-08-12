/* eslint-disable no-undefined */
const Page = require('./DropdownPage');

function waitForFocusedText (dropdown, text, timeout, timeoutMsg = `timed out waiting for ${text}`, interval = 250) {
	browser.waitUntil(function () {
		return dropdown.focusedItemText.indexOf(text) === 0;
	}, {timeout, timeoutMsg, interval});
}

describe('Dropdown', function () {
	Page.open();

	describe('changing props', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus the first item when `selected` changes to `null` - [GT-30183]', function () {
			const dropdown = Page.components.dropdownChangeSelected;

			Page.openDropdown(dropdown);

			waitForFocusedText(dropdown, 'four', 500, undefined, 100);

			waitForFocusedText(dropdown, 'one', 750);
		});

		it('should focus the first item when `children` changes - [GT-30184]', function () {
			const dropdown = Page.components.dropdownChangeChildren;

			Page.openDropdown(dropdown);

			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			waitForFocusedText(dropdown, 'three', 750);
		});

		it('should focus the first item when `children` changes to smaller size - [GT-32190]', function () {
			const dropdown = Page.components.dropdownChangeLessChildren;

			Page.openDropdown(dropdown);

			waitForFocusedText(dropdown, '28', 500, undefined, 100);

			waitForFocusedText(dropdown, '3', 2250);
		});
	});

	describe('5-way', function () {
		it('should lock Spotlight inside the Dropdown - [GT-28646]', function () {
			const dropdown = Page.components.dropdownDefault;
			const dropdownList = $('.Dropdown_Dropdown_dropdownList');
			// Step 3: 5-way Spot and 5-way Select the 'Default' Dropdown.
			Page.openDropdown(dropdown);
			// Verify Step 3.1: The 'Default' Dropdown opens.
			// Verify Step 3.2: Spotlight is on *Option 1* on the left *Dropdown*.
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 4: 5-way Down to *Option 5*
			// Verify Step 4.1: Spotlight is on each option with each 5-way Down.
			Page.spotlightDown();
			waitForFocusedText(dropdown, 'two', 500, undefined, 100);
			Page.spotlightDown();
			waitForFocusedText(dropdown, 'three', 500, undefined, 100);
			Page.spotlightDown();
			waitForFocusedText(dropdown, 'four', 500, undefined, 100);
			// Verify Step 4.2:Spotlight is on *Option 5*.
			Page.spotlightDown();
			waitForFocusedText(dropdown, 'five', 500, undefined, 100);

			// Step 5: 5-way Down one more time.
			// Verify Step 5.1: Spotlight stays on *Option 5*.
			Page.spotlightDown();
			waitForFocusedText(dropdown, 'five', 500, undefined, 100);

			// Step 6: 5-way Up to *Option 1*.`
			// Verify Step 6.1: Spotlight is on each option with each 5-way Up.
			Page.spotlightUp();
			waitForFocusedText(dropdown, 'four', 500, undefined, 100);
			Page.spotlightUp();
			waitForFocusedText(dropdown, 'three', 500, undefined, 100);
			Page.spotlightUp();
			waitForFocusedText(dropdown, 'two', 500, undefined, 100);
			// Verify Step 6.2:Spotlight is on *Option 1*.
			Page.spotlightUp();
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 7: 5-way Up one more time.
			// Verify Step 7.1: Spotlight stays on *Option 1*.
			Page.spotlightUp();
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 8: Click  on the empty space created by the wrapper (Pointer mode).
			const wrapper = $('#wrapper');
			wrapper.click({x: 0, y: 0});
			// Verify Step 8: The 'Default' Dropdoan is closed.
			expect(dropdownList.isExisting).to.not.be.true();
		});
	});

	describe('pointer', function () {
		it('should dismiss dropdown when clicking outside - [GT-28644]', function () {
			const dropdown = Page.components.dropdownDefault;

			// open the first dropdown and wait for the first list item to be focused
			Page.openDropdown(dropdown);
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 3: Click in the area outside the Dropdown (in the empty space created by the wrapper)
			const wrapper = $('#wrapper');
			wrapper.click({x: 0, y: 0});

			// Verify Step 3: that the floating list no longer exists (Dropdown is closed)
			const dropdownList = $('.Dropdown_Dropdown_dropdownList');
			expect(dropdownList.isExisting).to.not.be.true();
		});
	});
});
