const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

// TODO: Fix to wrap bug [ENYO-6468]
describe('Change `wrap` dynamically', function () {
	beforeEach(function () {
		Page.open();
	});

	// TODO: this TC number is not matching the JIRA TC - remove number?
	it.skip('should prevent bubbling when wrapping[GT-28463]', function () {
		// Wrap knobs Setting
		Page.spotlightRight();
		Page.spotlightSelect();
		Page.spotlightDown();
		Page.spotlightRight();
		// TODO: expectFocusedItem is not working in case of wrap
		expectFocusedItem(0, 'focus');
		Page.spotlightUp();
		Page.spotlightUp();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		expectFocusedItem(99, 'focus 2');
		Page.spotlightDown();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		expectFocusedItem(0, 'focus 3');
		expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
	});
});
