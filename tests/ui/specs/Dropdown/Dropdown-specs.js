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

	describe('pointer', function () {
		it('should dismiss dropdown when clicking outside - [GT-28644]', function () {
			const dropdown = Page.components.dropdownDefault;

			// open the first dropdown and wait for the first list item to be focused
			Page.openDropdown(dropdown);
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			// click in the empty space created by the wrapper
			const wrapper = $('#wrapper');
			wrapper.click({x: 0, y: 0});

			// verify that the floating list no longer exists
			const dropdownList = $('.Dropdown_Dropdown_dropdownList');
			expect(dropdownList.isExisting).to.not.be.true();
		});
	});

});
