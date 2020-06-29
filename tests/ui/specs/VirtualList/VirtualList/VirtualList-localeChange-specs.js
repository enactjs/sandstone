const Page = require('./VirtualListPage');

describe('locale change', function () {

	describe('LTR locale change', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should position Scrollbar Track on right side in LTR [GT-28562]', function () {
			let ListwidthSize = Page.getScrollOffsetLeft() + Page.getScrollbarWidth();
			// Verify Step 2.2: The Scrollbar track displays shortly right aligned.
			expect(Page.getListwidthSize()).to.equal(ListwidthSize);
		});
	});

	describe('RTL locale change(ar-SA)', function () {
		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should position Scrollbar Track on left side in RTL [GT-28563], [GT-28480]', function () {
			// Verify 3-2: The Scrollbar track displays shortly left aligned.
			expect(Page.getScrollOffsetLeft()).to.equal(0);
		});
	});

	describe('RTL locale change(ur-PK)', function () {
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
