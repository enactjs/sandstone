const Page = require('./DropdownPage');

describe('Dropdown', function () {
	Page.open();

	describe('changing props', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus the first item when `selected` changes to `null`', function () {
			const dropdown = Page.components.dropdownChangeSelected;

			Page.openDropdown(dropdown);

			expect(dropdown.focusedItemText).to.equal('four');

			Page.delay(750);

			expect(dropdown.focusedItemText).to.equal('one');
		});

		it('should focus the first item when `children` changes', function () {
			const dropdown = Page.components.dropdownChangeChildren;

			Page.openDropdown(dropdown);

			expect(dropdown.focusedItemText).to.equal('one');

			Page.delay(750);

			expect(dropdown.focusedItemText).to.equal('three');
		});
	});

});
