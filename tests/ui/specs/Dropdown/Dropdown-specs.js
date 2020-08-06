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

			// eslint-disable-next-line no-undefined
			waitForFocusedText(dropdown, 'four', 500, undefined, 100);

			waitForFocusedText(dropdown, 'one', 750);
		});

		it('should focus the first item when `children` changes - [GT-30184]', function () {
			const dropdown = Page.components.dropdownChangeChildren;

			Page.openDropdown(dropdown);

			// eslint-disable-next-line no-undefined
			waitForFocusedText(dropdown, 'one', 500, undefined, 100);

			waitForFocusedText(dropdown, 'three', 750);
		});

		it('should focus the first item when `children` changes to smaller size - [GT-32190]', function () {
			const dropdown = Page.components.dropdownChangeLessChildren;

			Page.openDropdown(dropdown);

			// eslint-disable-next-line no-undefined
			waitForFocusedText(dropdown, '28', 500, undefined, 100);

			waitForFocusedText(dropdown, '3', 2250);
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
			Page.spotlightDown();
			expect(Page.components.dropdown1.button.isFocused()).to.be.true();

			Page.spotlightDown();
			Page.delay(250);

			// verify that we have scrolled down
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
});
