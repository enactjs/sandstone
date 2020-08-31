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

		it('Spotlight should not leave scrollbar with direction key with focusableScrollbar `byEnter`[GT-33977]', function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > byEnter
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();

			// Step 3: Knobs > Scroller > direction > vertical
			ScrollerPage.spotlightRight();
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
			// Step 7: Press any 5-Way direction key.
			// Step 7 Verify: Spotlight is on the Scroll thumb in vertical scrollbar track.
			ScrollerPage.spotlightLeft();
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
			ScrollerPage.spotlightRight();
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
			ScrollerPage.spotlightUp();
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
			ScrollerPage.spotlightDown();
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
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

		it('Content animates with Click on scrollbar [GT-29589]', function () {
			// Step 3-3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4: Click on the Left Padding area of the verticalScrollbar and below the Scroll thumb.
			ScrollerPage.moveToScrollTrack('vertical', 'Down');
			browser.positionClick();
			ScrollerPage.delay(500);
			// Step 4-1 Verify: The Scroller scrolls Down.
			expect(ScrollerPage.getScrollThumbPosition().vertical).to.equal('1');
			// Step 5: Click on the Right Padding area of the verticalScrollbar and above the Scroll thumb.
			ScrollerPage.moveToScrollTrack('vertical', 'Up');
			browser.positionClick();
			ScrollerPage.delay(500);
			// Step 5-1 Verify: The Scroller scrolls Down.
			expect(ScrollerPage.getScrollThumbPosition().vertical).to.equal('0');
			// Step 6: Click on the Top Padding area of the horizontalScrollbar and to the Right of the Scroll thumb.
			const initialHorizontalScrollThumbPosition = ScrollerPage.getScrollThumbPosition().horizontal;
			ScrollerPage.moveToScrollTrack('horizontal', 'Right');
			browser.positionClick();
			ScrollerPage.delay(500);
			// Step 6-1 Verify: The Scroller scrolls Left to Right.
			expect(ScrollerPage.getScrollThumbPosition().horizontal > initialHorizontalScrollThumbPosition).to.be.true();
			// Step 7: Click on the Bottom Padding area of the horizontalScrollbar and to the Left of the Scroll thumb.
			ScrollerPage.moveToScrollTrack('horizontal', 'Left');
			browser.positionClick();
			ScrollerPage.delay(500);
			// Step 7-1 Verify: The Scroller scrolls Right to Left.
			expect(ScrollerPage.getScrollThumbPosition().horizontal).to.equal('0');
		});
	});

	describe('RTL Locale', function () {
		beforeEach(function () {
			ScrollerPage.open('', '?locale=ar-SA');
		});

		// In this Test Case, only checked RTL Mode.
		it('should not scroll with Click on Scrollbar [GT-28492]', function () {
			// Step 4-2 Verify:Upon hover, the verticalScrollbar displays on the Left side.
			// Since the visual part of UI Test cannot be checked, it is judged by the position of the scrollbar according to locale.
			expect(ScrollerPage.getVerticalScrollOffsetLeft()).to.equal(0);
			// Step 4-3 Verify: Upon hover, the horizontalScrollbar displays on the bottom.
			// Since the visual part of UI Test cannot be checked, it is judged by the position of the scrollbar.
			expect(ScrollerPage.getHorizontalScrollOffsetTop()).to.equal(ScrollerPage.getScrollerRect().height);
			// Step 5: Click on the verticalScrollbar below the scroll thumb a few times until the bottom text displays.
			for (let i; i < 3; i++) {
				ScrollerPage.moveToScrollTrack('vertical', 'Down');
				browser.positionClick();
				ScrollerPage.delay(300);
			}
			// Step 5-1 Verify: The Scroller does not scroll Up.
			// Step 5-2 Verify: The top text still displays.
			expect(ScrollerPage.getScrollThumbPosition().vertical).to.equal('0');
			// Step 6: Click on the horizontalScrollbar on the left of the scroll thumb a few times (some text still displays).
			for (let i; i < 3; i++) {
				ScrollerPage.moveToScrollTrack('horizontal', 'Left');
				browser.positionClick();
				ScrollerPage.delay(300);
			}
			// Step 6 Verify: The scroller does not scroll Left to Right.
			expect(ScrollerPage.getScrollThumbPosition().horizontal).to.equal('0');
		});

		it('should scroll with Click on Scrollbar with focusableScrollbar [GT-29078]', function () {
			// Step 3-3: Knobs > Scroller > focusableScrollbar > true
			ScrollerPage.dropdownFocusableScrollbar.moveTo();
			ScrollerPage.spotlightSelect();
			ScrollerPage.spotlightDown();
			ScrollerPage.spotlightSelect();
			// Step 4-1 Verify: The scroller displays in RTL (Right To Left).
			// Since the visual part of UI Test cannot be checked, it is judged by the position of the scrollbar according to locale.
			expect(ScrollerPage.getVerticalScrollOffsetLeft()).to.equal(0);
			// Step 4-2:  Hover on the verticalScrollbar on the left of the viewport.
			ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4-3 Verify:  Upon hover, Spotlight is on the verticalScroll thumb.
			expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.true();
			// Step 4-3: Hover on the horizontalScrollbar at the bottom of the viewport.
			ScrollerPage.horizontalScrollThumb.moveTo();
			// Step 4-5 Verify: Upon hover, Spotlight is on the horizontalScroll thumb.
			expect(ScrollerPage.horizontalScrollThumb.isFocused()).to.be.true();
			// Step 5: Click on the verticalScrollbar below the scroll thumb a few times until the bottom text displays.
			ScrollerPage.moveToScrollTrack('vertical', 'Down');
			browser.positionClick();
			ScrollerPage.delay(500);
			expect(ScrollerPage.getScrollThumbPosition().vertical).to.equal('1');
			// Step 6: Click on the horizontalScrollbar on the left of the scroll thumb a few times (some text still displays).
			const initialHorizontalScrollThumbPosition = ScrollerPage.getScrollThumbPosition().horizontal;
			ScrollerPage.moveToScrollTrack('horizontal', 'Left');
			browser.positionClick();
			ScrollerPage.delay(500);
			// Step 6 Verify: The scroller Scrolls Left to Right.
			expect(ScrollerPage.getScrollThumbPosition().horizontal > initialHorizontalScrollThumbPosition).to.be.true();
		});
	});
});
