const Page = require('../TabLayoutPage');

describe('TabLayout', function () {
	beforeEach(async function () {
		await Page.open('ControlledIndex');
	});

	describe('with controlled index', function () {
		describe('5-way interaction', function () {
			it('should focus an item in the new panel, remaining collapsed', async function () {
				// 5-way right to button in panel, collapsing tabs
				await Page.spotlightRight();
				await Page.waitForFocused($('#button2'), {targetName: 'button 2'});
				// Click button, programmatically changing tab index
				await Page.spotlightSelect();

				// Wait for new tab to appear, verify focus exists and tabs don't open
				await (await Page.tabLayout.view(3)).waitForExist();
				await Page.waitForFocused($('#button3'), {targetName: 'button 3'});
				expect(await Page.tabLayout.isCollapsed).to.be.true();

				// Spotlight left should return to active tab, not previous tab
				await Page.spotlightLeft();
				await Page.waitForFocused((await Page.tabLayout.tabItems())[2], {targetName: '3rd tab'});

			});

			it('should not focus an item in the new panel if not collapsed', async function () {
				// 5-way down to 3rd panel
				await Page.spotlightDown();
				await (await Page.tabLayout.view(3)).waitForExist();

				// Focus delayed index change button and select it
				await Page.spotlightRight();
				await Page.waitForFocused($('#button3'), {targetName: 'button 3'});
				await Page.spotlightSelect();

				// Focus back to tabs
				await Page.spotlightLeft();
				await Page.waitForFocused((await Page.tabLayout.tabItems())[2], {targetName: '3rd tab'});
				expect(await Page.tabLayout.isCollapsed).to.be.false();

				// Wait for second tab contents to appear
				await (await Page.tabLayout.view(2)).waitForExist();
				expect(await Page.tabLayout.isCollapsed).to.be.false();

				// Focus should be updated to the new selected item
				await Page.waitForFocused((await Page.tabLayout.tabItems())[1], {targetName: '2nd tab focused'});
			});
		});
	});
});
