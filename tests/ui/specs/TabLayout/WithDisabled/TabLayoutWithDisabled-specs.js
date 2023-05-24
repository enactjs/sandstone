// const Page = require('../TabLayoutPage');
import Page from '../TabLayoutPage.js';

describe('TabLayout', function () {
	beforeEach(async function () {
		await Page.open('WithDisabled');
	});

	describe('With disabled tab', function () {
		it('should return spotlight after click on navigation button - [QWTC-2338]', async function () {
			// Step 3-3 Verify: Tab 0 Top view is already opened.
			await Page.spotlightRight();
			expect(await $('#topButton0').isFocused()).to.be.true();
			// restore initial condition.
			await Page.spotlightLeft();

			// Step 4-1: 5-way Spot the Disabled Tap 1 button.
			await Page.spotlightDown();
			expect(await $$('.TabLayout_TabGroup_tab')[2].isFocused()).to.be.true();
			// Step 4-2: 5-way right.
			await Page.spotlightRight();
			// Step 4-1 Verify: Tab 0 Top view is still opened.
			expect(await $('#topButton0').isFocused()).to.be.true();
			// Step 4-2 Verify: Tab 0 Top view expand.
			expect(await Page.tabLayout.isCollapsed).to.be.true();

			// Step 5: 5-way Left.
			await Page.spotlightLeft();
			// Step 5 Verify: Spotlight is on the Tab 0 button.
			expect(await $$('.TabLayout_TabGroup_tab')[1].isFocused()).to.be.true();
		});
	});
});
