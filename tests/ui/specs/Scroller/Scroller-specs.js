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
