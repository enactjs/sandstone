const Page = require('../VirtualGridListPage');

describe('Navigate with Channel Up/Down key with native mode', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate via Page Down/Up key on scrollbar [QWT-2542]', function () {
		const initialScrollThumbPosition = Number(Page.scrollThumbPosition());
		// Step 3: Channel Down.(accroding to summary, it works on scrollbar)
		Page.showPointerByKeycode();
		Page.scrollBar.moveTo();
		Page.pageDown();
		Page.delay(500);
		// Step 3-2 Verify: Scroll thumb in verticalScrollbar track moves down.
		expect(Number(Page.scrollThumbPosition()) > initialScrollThumbPosition).to.be.true();
		// Step 4: Channel Up more 2 times.
		Page.pageUp();
		Page.pageUp();
		Page.delay(500);
		// Step 4-2 Verify: Scroll thumb's position is top of verticalScrollbar track.
		expect(Page.scrollThumbPosition()).to.equal('0');
		// Step 5: Channel Down 2 times.
		// Step 5-2 Verify: Scroll thumb in verticalScrollbar track moves down with each press Channel Down key .
		Page.pageDown();
		Page.delay(500);
		expect(Number(Page.scrollThumbPosition()) > 0).to.be.true();
		const curScrollThumbPosition = Number(Page.scrollThumbPosition());
		Page.pageDown();
		Page.delay(500);
		expect(Number(Page.scrollThumbPosition()) > curScrollThumbPosition);
	});
});
