/* eslint-disable no-undefined */
const Page = require('./DropdownPage');

function waitForFocusedText (dropdown, text, timeout, timeoutMsg = `timed out waiting for ${text}`, interval = 250) {
	browser.waitUntil(function () {
		return dropdown.focusedItemText.indexOf(text) === 0;
	}, {timeout, timeoutMsg, interval});
}

describe('Dropdown', function () {

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
		beforeEach(function () {
			Page.open();
		});

		it('should lock Spotlight inside the Dropdown - [GT-28646]', function () {
			const dropdown = Page.components.dropdownDefault;

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
			// Verify Step 8: The 'Default' Dropdown is closed.
			expect(dropdown.list.isExisting()).to.not.be.true();
		});
	});

	describe('pointer', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should dismiss dropdown when clicking outside - [GT-28644]', function () {
			const dropdown = Page.components.dropdownDefault;

			// Open the first dropdown and wait for the first list item to be focused
			Page.openDropdown(dropdown);
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 3: Click in the area outside the Dropdown (in the empty space created by the wrapper)
			const wrapper = $('#wrapper');
			wrapper.click({x: 0, y: 0});

			// Verify Step 3: that the floating list no longer exists (Dropdown is closed)
			expect(dropdown.list.isExisting()).to.not.be.true();
		});
	});

	describe('5-way and pointer', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should close dropdown from Pointer mode with Back key  - [GT-28623]', function () {
			const dropdown = Page.components.dropdownDefault;

			// Step 3: 5-way Spot and 5-way Select the Dropdown placeholder "No selection".
			Page.openDropdown(dropdown);
			// Verify Step 3: The Dropdown opens.
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// Step 4: Press the *Back* key on the remote.
			Page.backKey();
			// Verify Step 4: The Dropdown closes.
			expect(dropdown.list.isExisting()).to.not.be.true();

			// Step 5: Click on the Dropdown placeholder "No selection".
			dropdown.button.click();
			// Verify Step 5: The Dropdown opens.
			expect(dropdown.list.isExisting()).to.be.true();

			// Step 6: Move the pointer over any Option.  Moving to  Item 'two' here.
			dropdown.item(1).moveTo();
			// Verify Step 6: Spotlight is on this Option.
			waitForFocusedText(dropdown, 'two', 500, undefined, 100);

			// Step 7: Press the *Back* key on the remote.
			Page.backKey();
			// Verify Step 7: Dropdown closes.
			expect(dropdown.list.isExisting()).to.not.be.true();
		});
	});

	describe('in scroller', function () {
		beforeEach(function () {
			Page.open('InScroller');
		});

		function getDropdownOffset (dropdown, scroller) {
			return browser.execute((a, b) => {
				return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
			}, dropdown, scroller);
		}

		it('should have title visible when focusing button via 5-way - [GT-31167]', function () {
			// TODO: This refocuses the first dropdown which is being blurred for some reason with
			// Scroller. Once that bug is resolved, this can be removed.
			Page.spotlightLeft();
			expect(Page.components.dropdown1.button.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.delay(250);

			// Verify that we have scrolled down
			expect(getDropdownOffset(
				Page.components.dropdown1.self,
				$('#scroller')
			)).to.not.equal(0);

			Page.spotlightUp();
			Page.delay(250);

			const expected = 0;
			const actual = getDropdownOffset(
				Page.components.dropdown1.self,
				$('#scroller')
			);
			expect(actual).to.equal(expected);
		});
	});

	describe('disabled', function () {
		beforeEach(function () {
			Page.open('Disabled');
		});

		function getDropdownDisabled () {
			return browser.execute(() => {
				return document.activeElement.setAttribute('aria-disabled', 'true');
			});
		}

		it.only('should collapses if it is set to \'Disabled\' while it is opened - [GT-28633]', function () {
			const dropdown = Page.components.dropdown1;

			// Step 3: Click on the dropdown No selection.
			dropdown.button.click();
			// Verify Step 3: *No selection* opens with a list of 5 options.
			expect(dropdown.list.isExisting()).to.be.true();
			Page.delay(2000);

			// Step 4: Knobs > Dropdown > *disabled* > check
			// => set the Dropdown to disabled - turn on disabled flag
			const actual = getDropdownDisabled ();
			console.log ('actual', actual);
		  // Verify Step 4: The dropdown *No selection* collapses.
			// expect(dropdown.list.isExisting()).to.not.be.true();

			// Step 5: Knobs > Dropdown > *disabled* > uncheck
			// => set the Dropdown to enabled - turn off disabled flag
			// Verify Step 5: The Dropdown *No selection* is opened with a list of 5 options.
			// expect(dropdown.list.isExisting()).to.be.true();
		});
	});
});
