const Page = require('../VirtualListPage');

describe('RTL locale', function () {
	beforeEach(function () {
		Page.open('?locale=ar-SA');
	});

	it('should position Scrollbar Track on left side in RTL [GT-28480]', function () {
		// Verify 3-2: The Scrollbar track displays shortly left aligned.
		expect(Page.getListRect().left).to.equal(Page.getVerticalScrollbarRect().left);
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
		expect(Page.getListRect().left).to.equal(Page.getVerticalScrollbarRect().left);
	});
});
