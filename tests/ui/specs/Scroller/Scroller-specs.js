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

		it('should focus on scrollthumb with 5-way key and focusableScrollbar `true`[GT-28534]', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4 Precondition: Scroll thumb's position is top of vertical scrollbar track.
			const initialVerticalScrollTumbPosition = ScrollerPage.getVerticalScrollThumbPosition();
			expect(initialVerticalScrollTumbPosition).to.equal('0');
			// Step 4: Position the pointer on the Scroll thumb in the verticalScrollbar track.
			ScrollerPage.scrollThumb.moveTo();
			// Step 4 Verify:  Spotlight is on the Scroll thumb in the verticalScrollbar track.
			expect(ScrollerPage.getActiveElement().ariaLabel).to.equal('scroll up or down with up down button');
			// Step 5: 5-Way Down.
			ScrollerPage.spotlightDown();
			ScrollerPage.delay(300);
			// Step 5 Verify: The scroller Scrolls Up. Check VerticalScrollThumb's position change.
			expect((ScrollerPage.getVerticalScrollThumbPosition() > initialVerticalScrollTumbPosition)).to.be.true();
			// Step 6: 5-Way Left.
			ScrollerPage.spotlightLeft();
			// Step 6 Verify: Spotlight is on the Scroll thumb in the horizontalScrollbar track.
			expect(ScrollerPage.getActiveElement().ariaLabel).to.equal('scroll left or right with left right button');
			const initialHorizontalScrollTumbPosition = ScrollerPage.getHorizontalScrollThumbPosition();
			// Step 7: 5-Way Right.
			ScrollerPage.spotlightRight();
			ScrollerPage.delay(300);
			// Step 7 Verify: The scroller Scrolls Right. Check HorizontalScrollThumb's position change.
			expect((ScrollerPage.getHorizontalScrollThumbPosition() > initialHorizontalScrollTumbPosition)).to.be.true();
			// Step 8: 5-Way Up.
			ScrollerPage.spotlightUp();
			// Step 8 Verify: Spotlight displays on the Scroll thumb in the verticalScrollbar track.
			expect(ScrollerPage.getActiveElement().ariaLabel).to.equal('scroll up or down with up down button');
		});

		it('should Scrolling via 5-way Key with Spotlight on the ScrollThumb [GT-28587]', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 3 Verify: Scroll thumb's position is at the top of the verticalScrollbar track.
			const initialVerticalScrollTumbPosition = ScrollerPage.getVerticalScrollThumbPosition();
			expect(initialVerticalScrollTumbPosition).to.equal('0');
			// Step 4: Hover on the Scroll thumb in verticalScrollbar track.
			ScrollerPage.scrollThumb.moveTo();
			// Step 4-2 Verify: Spotlight is on the Scroll thumb in verticalScrollbar.
			expect(ScrollerPage.getActiveElement().ariaLabel).to.equal('scroll up or down with up down button');
			// Step 6: 5-Way Down.
			ScrollerPage.spotlightDown();
			ScrollerPage.delay(300);
			// Step 6-2 Verify: Scroll thumb moves down.
			expect((ScrollerPage.getVerticalScrollThumbPosition() > initialVerticalScrollTumbPosition)).to.be.true();
			// Step 7: 5-Way Up.
			ScrollerPage.spotlightUp();
			ScrollerPage.delay(300);
			// Step 7-2 Verify: Scroll thumb moves up.
			// Step 7-3 Verify: Scroll thumb's position is at the top of the verticalScrollbar track.
			expect(ScrollerPage.getVerticalScrollThumbPosition()).to.equal('0');
			// Step 8: 5-Way Left.
			ScrollerPage.spotlightLeft();
			// Step 8-1 Verify: Spotlight is on the Scroll thumb in horizontalScrollbar.
			expect(ScrollerPage.getActiveElement().ariaLabel).to.equal('scroll left or right with left right button');
			// Step 8-2 Verify: Scroll thumb's position is on the extreme left of the horizontalScrollbar track.
			const initialHorizontalScrollTumbPosition = ScrollerPage.getHorizontalScrollThumbPosition();
			expect(initialHorizontalScrollTumbPosition).to.equal('0');
			// Step 9: 5-Way Right.
			ScrollerPage.spotlightRight();
			ScrollerPage.delay(300);
			// Step 9-2 Verify: Scroll thumb moves Right.
			expect((ScrollerPage.getHorizontalScrollThumbPosition() > initialHorizontalScrollTumbPosition)).to.be.true();
			// Step 10: 5-Way Left.
			ScrollerPage.spotlightLeft();
			ScrollerPage.delay(300);
			// Step 10-2 Verify: Scroll thumb moves Left.
			// Step 10-3 Verify: Scroll thumb's position is on the extreme left of the horizontalScrollbar track.
			expect(ScrollerPage.getHorizontalScrollThumbPosition()).to.equal('0');
		});
	});
});
