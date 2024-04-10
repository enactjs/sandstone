const ScrollerPage = require('./ScrollerPage');

describe('Scroller', function () {

	it('should meet initial conditions', async function () {
		await ScrollerPage.open();
		expect(await ScrollerPage.buttonHideScrollbar.isFocused()).toBe(true);
	});

	describe('FocusableScrollbar knobs', function () {
		beforeEach(async function () {
			await ScrollerPage.open();
			await ScrollerPage.buttonNativeScroll.moveTo();
			await ScrollerPage.spotlightSelect();
		});

		it('should focus on scrollthumb with focusableScrollbar `true`[QWTC-2133]', async function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			// Step 4: Hover on one of the Scroll thumb.
			await ScrollerPage.showPointerByKeycode();
			await ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4 Verify: Spotlight is on the Scroll thumb.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);
		});

		it('should focus on scrollthumb with focusableScrollbar `byEnter`[QWTC-2136]', async function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > byEnter
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();

			// Step 4: Hover on the (x) button. This case replaced 'X' button to 'Top' button.
			await ScrollerPage.buttonTop.moveTo();
			// Step 4 Verify: Spotlight is on the (x) button.
			expect(await ScrollerPage.buttonTop.isFocused()).toBe(true);

			// Step 5: Press 5-Way Right.
			await ScrollerPage.spotlightRight();
			// Step 5 Verify: Spotlight is on the Scroll thumb in vertical scrollbar track.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);

			// Step 6: Press Back key (or 'esc' with Chrome) or 5-way Select.
			await ScrollerPage.backKey();
			// Step 6 Verify: Spolight is on the box surrounding the item and scrollbars.
			expect(await ScrollerPage.focusableBody.isFocused()).toBe(true);

			// Step 7: Press 5-Way Up.
			await ScrollerPage.spotlightUp();
			// Step 7 Verify: Spotlight is on the (x) button.
			expect(await ScrollerPage.buttonTop.isFocused()).toBe(true);

			// Step 8: Press 5-Way Right.
			await ScrollerPage.spotlightRight();
			// Step 8 Verify: Spotlight is on the Scroll thumb in vertical scrollbar track.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);

			// Step 9: Press 5-Way Select.
			await ScrollerPage.spotlightSelect();
			// Step 9 Verify: Spotlight is on the box surrounding the item and scrollbars.
			expect(await ScrollerPage.focusableBody.isFocused()).toBe(true);

			// Step 10: Press 5-Way Select.
			await ScrollerPage.spotlightSelect();
			// Step 10 Verify: Spotlight is on the Scroll thumb in vertical scrollbar track.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);
		});

		it('should focus on scrollthumb with 5-way key and focusableScrollbar `true`[QWTC-2089]', async function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			// Step 4 Precondition: Scroll thumb's position is top of vertical scrollbar track.
			const initialVerticalScrollTumbPosition = (await ScrollerPage.getScrollThumbPosition()).vertical;
			expect(await initialVerticalScrollTumbPosition).toBe('0');
			// Step 4: Position the pointer on the Scroll thumb in the verticalScrollbar track.
			await ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4 Verify:  Spotlight is on the Scroll thumb in the verticalScrollbar track.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);
			// Step 5: 5-Way Down.
			await ScrollerPage.spotlightDown();
			await ScrollerPage.delay(1000);
			// Step 5 Verify: The scroller Scrolls Up. Check VerticalScrollThumb's position change.
			expect(((await ScrollerPage.getScrollThumbPosition()).vertical > initialVerticalScrollTumbPosition)).toBe(true);
			// Step 6: 5-Way Left.
			await ScrollerPage.spotlightLeft();
			// Step 6 Verify: Spotlight is on the Scroll thumb in the horizontalScrollbar track.
			expect(await ScrollerPage.horizontalScrollThumb.isFocused()).toBe(true);
			const initialHorizontalScrollTumbPosition = (await ScrollerPage.getScrollThumbPosition()).horizontal;
			expect(initialHorizontalScrollTumbPosition).toBe('0');
			// Step 7: 5-Way Right.
			await ScrollerPage.spotlightRight();
			await ScrollerPage.delay(1000);
			// Step 7 Verify: The scroller Scrolls Right. Check HorizontalScrollThumb's position change.
			expect(((await ScrollerPage.getScrollThumbPosition()).horizontal > initialHorizontalScrollTumbPosition)).toBe(true);
			// Step 8: 5-Way Up.
			await ScrollerPage.spotlightUp();
			// Step 8 Verify: Spotlight displays on the Scroll thumb in the verticalScrollbar track.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);
		});

		it('should Scrolling via 5-way Key with Spotlight on the ScrollThumb [QWTC-2135]', async function () {
			// Step 3: Knobs > Scroller > focusableScrollbar > true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			// Step 3 Verify: Scroll thumb's position is at the top of the verticalScrollbar track.
			const initialVerticalScrollTumbPosition = (await ScrollerPage.getScrollThumbPosition()).vertical;
			expect(initialVerticalScrollTumbPosition).toBe('0');
			// Step 4: Hover on the Scroll thumb in verticalScrollbar track.
			await ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4-2 Verify: Spotlight is on the Scroll thumb in verticalScrollbar.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);
			// Step 6: 5-Way Down.
			await ScrollerPage.spotlightDown();
			await ScrollerPage.delay(1000);
			// Step 6-2 Verify: Scroll thumb moves down.
			expect(((await ScrollerPage.getScrollThumbPosition()).vertical > initialVerticalScrollTumbPosition)).toBe(true);
			// Step 7: 5-Way Up.
			await ScrollerPage.spotlightUp();
			await ScrollerPage.delay(1000);
			// Step 7-2 Verify: Scroll thumb moves up.
			// Step 7-3 Verify: Scroll thumb's position is at the top of the verticalScrollbar track.
			expect((await ScrollerPage.getScrollThumbPosition()).vertical).toBe('0');
			// Step 8: 5-Way Left.
			await ScrollerPage.spotlightLeft();
			// Step 8-1 Verify: Spotlight is on the Scroll thumb in horizontalScrollbar.
			expect(await ScrollerPage.horizontalScrollThumb.isFocused()).toBe(true);
			// Step 8-2 Verify: Scroll thumb's position is on the extreme left of the horizontalScrollbar track.
			const initialHorizontalScrollTumbPosition = (await ScrollerPage.getScrollThumbPosition()).horizontal;
			expect(initialHorizontalScrollTumbPosition).toBe('0');
			// Step 9: 5-Way Right.
			await ScrollerPage.spotlightRight();
			await ScrollerPage.delay(1000);
			// Step 9-2 Verify: Scroll thumb moves Right.
			expect(((await ScrollerPage.getScrollThumbPosition()).horizontal > initialHorizontalScrollTumbPosition)).toBe(true);
			// Step 10: 5-Way Left.
			await ScrollerPage.spotlightLeft();
			await ScrollerPage.delay(1000);
			// Step 10-2 Verify: Scroll thumb moves Left.
			// Step 10-3 Verify: Scroll thumb's position is on the extreme left of the horizontalScrollbar track.
			expect((await ScrollerPage.getScrollThumbPosition()).horizontal).toBe('0');
		});

		it('Content animates with Click on scrollbar [QWTC-2386]', async function () {
			// Step 3-3: Knobs > Scroller > focusableScrollbar > true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			// Step 4: Click on the Left Padding area of the verticalScrollbar and below the Scroll thumb.
			await ScrollerPage.clickScrollTrack('vertical', 'Down');
			await ScrollerPage.delay(1000);
			// Step 4-1 Verify: The Scroller scrolls Down.
			expect((await ScrollerPage.getScrollThumbPosition()).vertical).toBe('1');
			// Step 5: Click on the Right Padding area of the verticalScrollbar and above the Scroll thumb.
			await ScrollerPage.clickScrollTrack('vertical', 'Up');
			await ScrollerPage.delay(1000);
			// Step 5-1 Verify: The Scroller scrolls Down.
			expect((await ScrollerPage.getScrollThumbPosition()).vertical).toBe('0');
			// Step 6: Click on the Top Padding area of the horizontalScrollbar and to the Right of the Scroll thumb.
			const initialHorizontalScrollThumbPosition = (await ScrollerPage.getScrollThumbPosition()).horizontal;
			await ScrollerPage.clickScrollTrack('horizontal', 'Right');
			await ScrollerPage.delay(1000);
			// Step 6-1 Verify: The Scroller scrolls Left to Right.
			expect((await ScrollerPage.getScrollThumbPosition()).horizontal > initialHorizontalScrollThumbPosition).toBe(true);
			// Step 7: Click on the Bottom Padding area of the horizontalScrollbar and to the Left of the Scroll thumb.
			await ScrollerPage.clickScrollTrack('horizontal', 'Left');
			await ScrollerPage.delay(1000);
			// Step 7-1 Verify: The Scroller scrolls Right to Left.
			expect((await ScrollerPage.getScrollThumbPosition()).horizontal).toBe('0');
		});
	});

	describe('RTL Locale', function () {
		beforeEach(async function () {
			await ScrollerPage.open('', '?locale=ar-SA');
			await ScrollerPage.buttonNativeScroll.moveTo();
			await ScrollerPage.spotlightSelect();
		});

		// In this Test Case, only checked RTL Mode.
		it('should not scroll with Click on Scrollbar [QWTC-2064]', async function () {
			// Step 4-2 Verify:Upon hover, the verticalScrollbar displays on the Left side.
			// Since the visual part of UI Test cannot be checked, it is judged by the position of the scrollbar according to locale.
			expect(await ScrollerPage.getVerticalScrollOffsetLeft()).toBe(0);
			// Step 4-3 Verify: Upon hover, the horizontalScrollbar displays on the bottom.
			// Since the visual part of UI Test cannot be checked, it is judged by the position of the scrollbar.
			expect(await ScrollerPage.getHorizontalScrollOffsetTop()).toBe((await ScrollerPage.getScrollerRect()).height);
			// Step 5: Click on the verticalScrollbar below the scroll thumb a few times until the bottom text displays.
			for (let i; i < 3; i++) {
				await ScrollerPage.clickScrollTrack('vertical', 'Down');
				await ScrollerPage.delay(1000);
			}
			// Step 5-1 Verify: The Scroller does not scroll Up.
			// Step 5-2 Verify: The top text still displays.
			expect((await ScrollerPage.getScrollThumbPosition()).vertical).toBe('0');
			// Step 6: Click on the horizontalScrollbar on the left of the scroll thumb a few times (some text still displays).
			for (let i; i < 3; i++) {
				await ScrollerPage.clickScrollTrack('horizontal', 'Left');
				await ScrollerPage.delay(1000);
			}
			// Step 6 Verify: The scroller does not scroll Left to Right.
			expect((await ScrollerPage.getScrollThumbPosition()).horizontal).toBe('0');
		});

		it('should scroll with Click on Scrollbar with focusableScrollbar [QWTC-2335]', async function () {
			// Step 3-3: Knobs > Scroller > focusableScrollbar > true
			await ScrollerPage.dropdownFocusableScrollbar.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			// Step 4-1 Verify: The scroller displays in RTL (Right To Left).
			// Since the visual part of UI Test cannot be checked, it is judged by the position of the scrollbar according to locale.
			expect(await ScrollerPage.getVerticalScrollOffsetLeft()).toBe(0);
			// Step 4-2:  Hover on the verticalScrollbar on the left of the viewport.
			await ScrollerPage.verticalScrollThumb.moveTo();
			// Step 4-3 Verify:  Upon hover, Spotlight is on the verticalScroll thumb.
			expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);
			// Step 4-3: Hover on the horizontalScrollbar at the bottom of the viewport.
			await ScrollerPage.horizontalScrollThumb.moveTo();
			// Step 4-5 Verify: Upon hover, Spotlight is on the horizontalScroll thumb.
			expect(await ScrollerPage.horizontalScrollThumb.isFocused()).toBe(true);
			// Step 5: Click on the verticalScrollbar below the scroll thumb a few times until the bottom text displays.
			await ScrollerPage.clickScrollTrack('vertical', 'Down');
			await ScrollerPage.delay(1000);
			// Step 5 Verify: The Scroller Scrolls Up.
			expect((await ScrollerPage.getScrollThumbPosition()).vertical).toBe('1');
			// Step 6: Click on the horizontalScrollbar on the left of the scroll thumb a few times (some text still displays).
			const initialHorizontalScrollThumbPosition = (await ScrollerPage.getScrollThumbPosition()).horizontal;
			await ScrollerPage.clickScrollTrack('horizontal', 'Left');
			await ScrollerPage.delay(1000);
			// Step 6 Verify: The scroller Scrolls Left to Right.
			expect((await ScrollerPage.getScrollThumbPosition()).horizontal > initialHorizontalScrollThumbPosition).toBe(true);
		});
	});
});
