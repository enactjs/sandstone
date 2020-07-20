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
			ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4 Verify: Spotlight is on the Scroll thumb.
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
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
			expect(ScrollerPage.buttonTop.isFocused(), 'focus').to.be.true();
			// Step 5: Press 5-Way Down.
			ScrollerPage.spotlightDown();
			// Step 5 Verify: Spotlight is on the box surrounding the item and scrollbars.
			expect(ScrollerPage.focusableBody.isFocused()).to.be.true();
			// Step 6: Press 5-Way Select.
			ScrollerPage.spotlightSelect();
			// Step 6 Verify: Spotlight is on the Scroll thumb in vertical scrollbar track.
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
			// Step 7: Press 5-Way Left.
			ScrollerPage.spotlightLeft();
			// Step 7 Verify: Spotlight is on the Scroll thumb in horizontal scrollbar track.
			expect(ScrollerPage.horizontalScrollThumb.isFocused()).to.be.true();
			// Step 8: Press Back key (or 'esc' with Chrome) or 5-way Select.
			ScrollerPage.backKey();
			// Step 8 Verify: Spolight is on the box surrounding the item and scrollbars.
			expect(ScrollerPage.focusableBody.isFocused()).to.be.true();
			// Step 9: Press 5-Way Up.
			ScrollerPage.spotlightUp();
			// Step 9 Verify: Spotlight is on the (x) button.
			expect(ScrollerPage.buttonTop.isFocused()).to.be.true();
		});

		it('should focus on scrollthumb with 5-way key and focusableScrollbar `true`[GT-28534]', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4 Precondition: Scroll thumb's position is top of vertical scrollbar track.
			const initialVerticalScrollTumbPosition = ScrollerPage.getScrollThumbPosition().vertical;
			expect(initialVerticalScrollTumbPosition).to.equal('0');
			// Step 4: Position the pointer on the Scroll thumb in the verticalScrollbar track.
			ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4 Verify:  Spotlight is on the Scroll thumb in the verticalScrollbar track.
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
			// Step 5: 5-Way Down.
			ScrollerPage.spotlightDown();
			ScrollerPage.delay(300);
			// Step 5 Verify: The scroller Scrolls Up. Check VerticalScrollThumb's position change.
			expect((ScrollerPage.getScrollThumbPosition().vertical > initialVerticalScrollTumbPosition)).to.be.true();
			// Step 6: 5-Way Left.
			ScrollerPage.spotlightLeft();
			// Step 6 Verify: Spotlight is on the Scroll thumb in the horizontalScrollbar track.
			expect(ScrollerPage.horizontalScrollThumb.isFocused()).to.be.true();
			const initialHorizontalScrollTumbPosition = ScrollerPage.getScrollThumbPosition().horizontal;
			expect(initialHorizontalScrollTumbPosition).to.equal('0');
			// Step 7: 5-Way Right.
			ScrollerPage.spotlightRight();
			ScrollerPage.delay(300);
			// Step 7 Verify: The scroller Scrolls Right. Check HorizontalScrollThumb's position change.
			expect((ScrollerPage.getScrollThumbPosition().horizontal > initialHorizontalScrollTumbPosition)).to.be.true();
			// Step 8: 5-Way Up.
			ScrollerPage.spotlightUp();
			// Step 8 Verify: Spotlight displays on the Scroll thumb in the verticalScrollbar track.
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
		});

		it('should Scrolling via 5-way Key with Spotlight on the ScrollThumb [GT-28587]', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 3 Verify: Scroll thumb's position is at the top of the verticalScrollbar track.
			const initialVerticalScrollTumbPosition = ScrollerPage.getScrollThumbPosition().vertical;
			expect(initialVerticalScrollTumbPosition).to.equal('0');
			// Step 4: Hover on the Scroll thumb in verticalScrollbar track.
			ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4-2 Verify: Spotlight is on the Scroll thumb in verticalScrollbar.
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
			// Step 6: 5-Way Down.
			ScrollerPage.spotlightDown();
			ScrollerPage.delay(300);
			// Step 6-2 Verify: Scroll thumb moves down.
			expect((ScrollerPage.getScrollThumbPosition().vertical > initialVerticalScrollTumbPosition)).to.be.true();
			// Step 7: 5-Way Up.
			ScrollerPage.spotlightUp();
			ScrollerPage.delay(300);
			// Step 7-2 Verify: Scroll thumb moves up.
			// Step 7-3 Verify: Scroll thumb's position is at the top of the verticalScrollbar track.
			expect(ScrollerPage.getScrollThumbPosition().vertical).to.equal('0');
			// Step 8: 5-Way Left.
			ScrollerPage.spotlightLeft();
			// Step 8-1 Verify: Spotlight is on the Scroll thumb in horizontalScrollbar.
			expect(ScrollerPage.horizontalScrollThumb.isFocused()).to.be.true();
			// Step 8-2 Verify: Scroll thumb's position is on the extreme left of the horizontalScrollbar track.
			const initialHorizontalScrollTumbPosition = ScrollerPage.getScrollThumbPosition().horizontal;
			expect(initialHorizontalScrollTumbPosition).to.equal('0');
			// Step 9: 5-Way Right.
			ScrollerPage.spotlightRight();
			ScrollerPage.delay(300);
			// Step 9-2 Verify: Scroll thumb moves Right.
			expect((ScrollerPage.getScrollThumbPosition().horizontal > initialHorizontalScrollTumbPosition)).to.be.true();
			// Step 10: 5-Way Left.
			ScrollerPage.spotlightLeft();
			ScrollerPage.delay(300);
			// Step 10-2 Verify: Scroll thumb moves Left.
			// Step 10-3 Verify: Scroll thumb's position is on the extreme left of the horizontalScrollbar track.
			expect(ScrollerPage.getScrollThumbPosition().horizontal).to.equal('0');
		});
	});
});
