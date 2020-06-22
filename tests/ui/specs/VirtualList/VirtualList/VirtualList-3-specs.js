const Page = require('./VirtualListPage');
const {expectFocusedItem} = require('../VirtualList-utils');

describe('VirtualList 3', function () {
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

			// TODO: Need to check another way for PagingControl.
			it.skip('should allow bubbling while navigating out of a focusableScrollbar list via scroll buttons', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonScrollUp.isFocused(), 'focus 1').to.be.true();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightDown();
				expect(Page.list.getAttribute('data-keydown-events'), 'step 8').to.equal('4');
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
	});

	describe('RTL locale', function () {
		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should position Scrollbar Track on left side in RTL [GT-28563], [GT-28480]', function () {
			// Verify 3-2: The Scrollbar track displays shortly left aligned.
			expect(Page.getScrollOffsetLeft()).to.equal(0);
		});
	});

	describe('Verify locale Change', function () {
		beforeEach(function () {
			Page.open('?locale=ur-PK');
		});

		// Since 'ar-sA' and 'en-US' have tests to check on the other side, this test only check 'ur-PK'.
		it('should Verify RTL functionality [GT-28480]', function () {
			// Verify 5-1: VirtualList sample displays in RTL (Right to Left.)
			// Check that the button's position is Right-> Left.(in case RTL, button position is 'Right' - 'Left')
			Page.buttonLeft.moveTo();
			expect(Page.buttonLeft.isFocused(), 'focus left');
			Page.spotlightLeft();
			Page.spotlightLeft();
			expect(Page.buttonRight.isFocused(), 'focus Right');
			// Verify 5-2: Vertical Scrollbar displays on the left side.
			expect(Page.getScrollOffsetLeft()).to.equal(0);
		});
	});
});
