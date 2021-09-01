const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList', function () {
	beforeEach(function () {
		Page.open('', '?locale=ar-SA');
	});

	it('should spotlight move on last item [QWT-2351]', function () {
		// Step 2-1: Select 'Horizontal'
		Page.buttonDirectionChange.moveTo();
		Page.spotlightSelect();

		// Step 3-1: 5-way spot item 0.
		Page.item(0).moveTo();
		Page.spotlightRight();
		expectFocusedItem(0);
		// Step 3-2: 5-way Left to Item 16.
		for (let i = 0; i < 8; i++) {
			Page.spotlightLeft();
			Page.delay(200);
		}
		Page.delay(500);
		// Step 3-2 Verify: Spotlight is on item 16.
		expectFocusedItem(16);
		const curScrollThumbPosition = Page.scrollThumbPosition();

		// Step 4: 5-way Right to item 14.
		Page.spotlightRight();
		// Step 4-1 Verify: The list does not Scroll Right.
		expect(Page.scrollThumbPosition()).to.be.equal(curScrollThumbPosition);
		// Step 4-2 Verify: Spotlight is on item 14.
		expectFocusedItem(14);
	});
});
