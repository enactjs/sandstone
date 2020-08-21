const Page = require('../TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open('ControlledIndex');
	});

	describe('with controlled index', function () {

		describe('5-way interaction', function () {

			it('should focus an item in the new panel, remaining collapsed', function () {
				// 5-way right to button in panel, collapsing tabs
				Page.spotlightRight();
				Page.waitForFocused($('#button2'), {targetName: 'button 2'});
				// Click button, programmatically changing tab index
				Page.spotlightSelect();

				// Wait for new tab to appear, verify focus exists and tabs don't open
				Page.tabLayout.view(3).waitForExist();
				Page.waitForFocused($('#button3'), {targetName: 'button 3'});
				expect(Page.tabLayout.isCollapsed).to.be.true();

				// Spotlight left should return to active tab, not previous tab
				Page.spotlightLeft();
				Page.waitForFocused(Page.tabLayout.tabItems[2], {targetName: '3rd tab'});

			});

			it('should not focus an item in the new panel if not collapsed', function () {
				// 5-way down to 3rd panel
				Page.spotlightDown();
				Page.tabLayout.view(3).waitForExist();

				// Focus delayed index change button and select it
				Page.spotlightRight();
				Page.waitForFocused($('#button3'), {targetName: 'button 3'});
				Page.spotlightSelect();

				// Focus back to tabs
				Page.spotlightLeft();
				Page.waitForFocused(Page.tabLayout.tabItems[2], {targetName: '3rd tab'});
				expect(Page.tabLayout.isCollapsed).to.be.false();

				// Wait for second tab contents to appear
				Page.tabLayout.view(2).waitForExist();
				expect(Page.tabLayout.isCollapsed).to.be.false();
				Page.waitForFocused(Page.tabLayout.tabItems[2], {targetName: '3rd tab still'});
			});
		});
	});
});
