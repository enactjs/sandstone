const Page = require('./DropdownPage');

describe('Dropdown', function () {
	Page.open();

	describe('changing props', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus the first item when `selected` changes to `null` - [GT-30183]', function () {
			const dropdown = Page.components.dropdownChangeSelected;

			Page.openDropdown(dropdown);

			browser.waitUntil(function () {
				return dropdown.focusedItemText === 'four';
			}, 500, `timed out waiting to focus 4`, 100);

			expect(dropdown.focusedItemText).to.equal('four');

			browser.waitUntil(function () {
				return dropdown.focusedItemText === 'one';
			}, 750, `timed out waiting to focus 1`, 250);
		});

		it('should focus the first item when `children` changes - [GT-30184]', function () {
			const dropdown = Page.components.dropdownChangeChildren;

			Page.openDropdown(dropdown);

			browser.waitUntil(function () {
				return dropdown.focusedItemText === 'one';
			}, 500, `timed out waiting to focus 1`, 100);

			browser.waitUntil(function () {
				return dropdown.focusedItemText === 'three';
			}, 1000, `timed out waiting to focus 3`, 250);
		});
	});

});
