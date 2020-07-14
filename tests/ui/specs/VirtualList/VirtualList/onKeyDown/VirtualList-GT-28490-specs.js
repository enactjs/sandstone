const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('onKeyDown [GT-28490]', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should prevent bubbling while navigating within a list', function () {
		Page.spotlightSelect();
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus 1');
		Page.spotlightDown();
		expectFocusedItem(1, 'focus 2');
		Page.spotlightUp();
		expectFocusedItem(0, 'focus 3');
		expect(Page.list.getAttribute('data-keydown-events')).to.be.null();
		Page.spotlightRight();
		Page.spotlightLeft();
		expectFocusedItem(0, 'focus 7');
		expect(Page.list.getAttribute('data-keydown-events')).to.equal('1');
	});

	// TODO: Fix to wrap bug [ENYO-6468]
	it.skip('should prevent bubbling when wrapping', function () {
		Page.spotlightRight();
		Page.spotlightRight();
		Page.spotlightSelect();
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus 1');
		Page.spotlightUp();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		expectFocusedItem(99, 'focus 2');
		Page.spotlightDown();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		expectFocusedItem(0, 'focus 3');
		expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
	});

	it.skip('should prevent bubbling when wrapping', function () {
		// Wrap knobs Setting
		Page.spotlightRight();
		Page.spotlightSelect();
		Page.spotlightDown();
		Page.spotlightRight();
		// TODO: expectFocusedItem is not working in case of wrap
		expectFocusedItem(0, 'focus');
		Page.spotlightUp();
		Page.spotlightUp();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		expectFocusedItem(99, 'focus 2');
		Page.spotlightDown();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		expectFocusedItem(0, 'focus 3');
		expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
	});

	it('should allow bubbling while navigating out of a list using visible focusableScrollbar via items', function () {
		Page.spotlightSelect();
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus 1');
		Page.spotlightUp();
		Page.spotlightDown();
		Page.spotlightLeft();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus 2');
		Page.fiveWayToItem(99);
		expectFocusedItem(99, 'focus 3');
		Page.spotlightDown();
		expect(Page.list.getAttribute('data-keydown-events')).to.equal('3');
	});

	// Need mochaOpts - timeout set to 60000 to pass
	it('should allow bubbling while navigating out of a list using hidden focusableScrollbar via items', function () {
		Page.spotlightSelect();
		Page.spotlightRight();
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus 1');
		Page.spotlightUp();
		expect(Page.buttonTop.isFocused(), 'focus 2').to.be.true();
		Page.spotlightDown();
		Page.spotlightLeft();
		expect(Page.buttonLeft.isFocused(), 'focus 3').to.be.true();
		Page.spotlightRight();
		Page.spotlightRight();
		expect(Page.buttonRight.isFocused(), 'focus 4').to.be.true();
		Page.spotlightLeft();
		expectFocusedItem(0, 'focus 5');
		Page.fiveWayToItem(99);
		expectFocusedItem(99, 'focus 6');
		Page.delay(1500);
		Page.spotlightDown();
		expect(Page.buttonBottom.isFocused(), 'focus 7').to.be.true();
		expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
	});

	// Need mochaOpts - timeout set to 60000 to pass
	it('should allow bubbling while navigating out of a list using non-focusableScrollbar via items', function () {
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus 1');
		Page.spotlightUp();
		expect(Page.buttonTop.isFocused(), 'focus 2').to.be.true();
		Page.spotlightDown();
		Page.spotlightLeft();
		expect(Page.buttonLeft.isFocused(), 'focus 3').to.be.true();
		Page.spotlightRight();
		Page.spotlightRight();
		expect(Page.buttonRight.isFocused(), 'focus 4').to.be.true();
		Page.spotlightLeft();
		expectFocusedItem(0, 'focus 5');
		Page.fiveWayToItem(99);
		expectFocusedItem(99, 'focus 6');
		Page.delay(1500);
		Page.spotlightDown();
		expect(Page.buttonBottom.isFocused(), 'focus 7').to.be.true();
		expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
	});
});
