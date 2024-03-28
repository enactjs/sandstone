const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem} = require('../Scroller-utils');

describe('RTL Horizontal Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithHorizontal', '?locale=ar-SA');
	});

	it('should not scroll with 5-way right on the first button [QWTC-1981]', async function () {
		// Step 3-2: Focus on 'Button 1'
		await ScrollerPage.spotlightDown();
		// Step 3-2 Verify: Spotlight is on 'Button 1'.
		await expectFocusedItem(0);
		// Step 3-3: 5-way Right
		await ScrollerPage.spotlightRight();
		// Step 3-3 Verify: Spotlight stays on 'Button 1'.
		await expectFocusedItem(0);
	});
});
