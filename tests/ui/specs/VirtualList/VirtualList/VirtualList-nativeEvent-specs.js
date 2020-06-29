const Page = require('./VirtualListPage');
const {expectFocusedItem, waitForScrollStartStop} = require('../VirtualList-utils');

describe('onKeyDown event', function () {
	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('onKeyDown event behavior [GT-28490]', function () {

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
				Page.dropdownJumpToItem.moveTo();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
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
				Page.dropdownJumpToItem.moveTo();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
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
				Page.dropdownJumpToItem.moveTo();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				expectFocusedItem(99, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.isFocused(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});
		});

		describe('onScrollStart/Stop Events behavior ', function () {

			// TODO: Fix to jenkins fail
			it.skip('should display Scroll Events in Action with 5-way Down and Up [GT-28470]', function () {
				// Verify Step 3 : Spotlight displays on the Item 006 or 007.
				Page.item(7).moveTo();
				expectFocusedItem(7, 'step 3 focus');
				// Step 4:5-way Down se	veral times(approximately 10 times) until the entire list starts to scroll.
				for (let i = 0; i < 10; i++) {
					Page.spotlightDown();
					// Verify Step 4.1: Displays 'onScrollStart'
					// Verify Step 4.2: Displays 'onScrollStop' as soon as the list stops.
					waitForScrollStartStop();
				}
				// Step 5:5-way Up several times(approximately 10 times) until the entire list starts to scroll.
				for (let j = 0; j < 10; j++) {
					Page.spotlightUp();
					if (j > 6) {
					// Verify Step 5.1: Displays 'onScrollStart'
					// Verify Step 5.2: Displays 'onScrollStop' as soon as the list stops.
					// Verify no error on waitForScrollStartStop
						waitForScrollStartStop();
					}
				}
			});
		});
	});
});
