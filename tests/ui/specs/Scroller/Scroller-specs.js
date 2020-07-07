const ScrollerPage = require('./ScrollerPage');

describe('Scroller', function () {

	it('should meet initial conditions', function () {
		ScrollerPage.open();
		expect(ScrollerPage.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('FocusableScrollbar knobs', function () {
		beforeEach(function () {
			ScrollerPage.open();
		});
		it('should focus on scrollthumb with focusableScrollbar `true`[GT-28585]', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4: Hover on one of the Scroll thumb.
			ScrollerPage.showPointerByKeycode();
			ScrollerPage.scrollThumb.moveTo();
			// Step 4 Verify: Spotlight is on the Scroll thumb.
			// Vertical or Horizontal ScrollThumb Check by direction.
			expect(ScrollerPage.getAriaLabel()).to.equal('scroll up or down with up down button');
		});

		it('should focus on scrollthumb with focusableScrollbar `byEnter`[GT-28588]', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > byEnter
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4: Hover on the (x) button. This case replaced 'X' button to 'Top' button.
			ScrollerPage.buttonTop.moveTo();
			// Step 4 Verify: Spotlight is on the (x) button.
			expect(ScrollerPage.buttonTop.isFocused()).to.be.true();
			// Step 5: Press 5-Way Down.
			ScrollerPage.spotlightDown();
			// Step 5 Verify: Spotlight is on the box surrounding the item and scrollbars.
			expect(ScrollerPage.getActiveElementClass()).to.equal('Scroller_Scroller_focusableBody spottable');
			// Step 6: Press 5-Way Select.
			ScrollerPage.spotlightSelect();
			// Step 6 Verify: Spotlight is on the Scroll thumb in vertical scrollbar track.
			// Vertical or Horizontal ScrollThumb Check by direction.
			expect(ScrollerPage.getAriaLabel()).to.equal('scroll up or down with up down button');
			// Step 7: Press 5-Way Left.
			ScrollerPage.spotlightLeft();
			// Step 7 Verify: Spotlight is on the Scroll thumb in horizontal scrollbar track.
			expect(ScrollerPage.getAriaLabel()).to.equal('scroll left or right with left right button');
			// Step 8: Press *Back* key (or 'esc' with Chrome) or 5-way Select.
			ScrollerPage.backKey();
			// Step 8 Verify: Spolight is on the box surrounding the item and scrollbars.
			expect(ScrollerPage.getActiveElementClass()).to.equal('Scroller_Scroller_focusableBody spottable');
			// Step 9: Press 5-Way Up.
			ScrollerPage.spotlightUp();
			// Step 9 Verify: Spotlight is on the (x) button.
			expect(ScrollerPage.buttonTop.isFocused()).to.be.true();
		});
	});
});
