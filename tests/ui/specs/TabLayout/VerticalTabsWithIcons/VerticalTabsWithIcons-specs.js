const Page = require('../TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open('VerticalTabsWithIcons');
	});

	describe('vertical tabs with icons', function () {

		describe('collapsing/expanding behavior', function () {
			describe('5-way interaction', function () {

				// this covers GT-28257 step 3
				it('should collapse tabs when focus is moved to a Spottable component in the content container', function () {
					// 5-way down to second tab
					Page.spotlightDown();
					Page.tabLayout.view(2).waitForExist();
					// 5-way right to Spottable component
					Page.waitTransitionEnd(1500, 'waiting for Panel transition', () => {
						Page.spotlightRight();
					});
					// check that layout is collapsed
					expect(Page.tabLayout.isCollapsed).to.be.true();
				});

				// this covers GT-28257 step 4
				it('should expand tabs when focus is moved to a Spottable component in the tabs container', function () {
					// 5-way down to second tab
					Page.spotlightDown();
					Page.tabLayout.view(2).waitForExist();
					// focus the contents
					Page.waitTransitionEnd(1500, 'waiting for Panel transition', () => {
						Page.spotlightRight();
					});
					expect(Page.tabLayout.isCollapsed).to.be.true();
					// Back to the tabs
					Page.waitTransitionEnd(1500, 'waiting for Panel transition', () => {
						Page.spotlightLeft();
					});
					expect(Page.tabLayout.isCollapsed).to.be.false();
				});

				it('should not show disabled tab contents when focused', function () {
					// 5-way down to second tab
					Page.spotlightDown();
					// 5-way down to third tab
					Page.spotlightDown();

					Page.tabLayout.view(3).waitForExist();

					// 5-way down to fourth tab
					Page.spotlightDown();
					Page.delay(1000);

					expect(Page.tabLayout.view(3).isExisting()).to.be.true();

					// 5-way down to fifth tab
					Page.spotlightDown();
					Page.tabLayout.view(5).waitForExist();
				});


			});
			describe('pointer interaction', function () {

				// this covers GT-28256
				it('should collapse and expand tabs when focus is moved between `Spottable` components in the content and tabs containers via pointer move', function () {
					// focus the layout's tabs
					Page.tabLayout.hoverTabs();
					// select the second tab
					Page.tabLayout.tabItems[1].click();
					Page.tabLayout.view(2).waitForExist();

					// move pointer to Spottable component in content container
					$('#button2').moveTo();
					// check that layout is collapsed
					expect(Page.tabLayout.isCollapsed).to.be.true();

					// go back to hover the tabs
					Page.tabLayout.tabItems[0].moveTo();
					// check that layout is not collapsed
					expect(Page.tabLayout.isCollapsed).to.be.false();
				});
			});
		});
	});
});
