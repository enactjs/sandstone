const Page = require('../TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open('VerticalTabsWithIcons');
	});

	const {tabLayout} = Page.components;

	describe('vertical tabs with icons', function () {

		describe('collapsing/expanding behavior', function () {
			describe('5-way interaction', function () {

				// this covers GT-28257 step 3
				it('should collapse tabs when focus is moved to a Spottable component in the content container', function () {
					// focus the layout's tabs
					tabLayout.hoverTabs();
					Page.spotlightSelect();
					// 5-way down to second tab
					Page.spotlightDown();
					// select it
					Page.spotlightSelect();
					// 5-way right to Spottable component
					Page.spotlightRight();
					// check that layout is collapsed
					expect(tabLayout.isCollapsed).to.be.true();
				});

				// this covers GT-28257 step 4
				it('should expand tabs when focus is moved to a Spottable component in the tabs container', function () {
					// focus the layout's tabs
					tabLayout.hoverTabs();
					Page.spotlightSelect();
					expect(tabLayout.isCollapsed).to.be.false();
				});
			});
			describe('pointer interaction', function () {

				// this covers GT-28256
				it('should collapse and expand tabs when focus is moved between `Spottable` components in the content and tabs containers via pointer move', function () {
					// focus the layout's tabs
					tabLayout.hoverTabs();
					// select the second tab
					tabLayout.tabItems[1].click();
					// move pointer to Spottable component in content container
					$('#button2').moveTo();
					// check that layout is collapsed
					expect(tabLayout.isCollapsed).to.be.true();
					// go back to tabs
					tabLayout.hoverScroller(); // test note: we only need to hover the scroller to have spotlight re-focus the last focused tab
					// check that layout is not collapsed
					expect(tabLayout.isCollapsed).to.be.false();
				});
			});
		});
	});
});
