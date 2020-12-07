const Page = require('../TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open('VerticalTabsWithoutIcons');
	});

	describe('vertical tabs without icons', function () {

		describe('collapsing/expanding behavior', function () {
			describe('5-way interaction', function () {

				// this covers GT-28259 step 3
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

				// this covers GT-28259 step 4
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
					expect(Page.tabLayout.tabItems[1].isFocused()).to.be.true();
				});
			});
			describe('pointer interaction', function () {

				// this covers GT-28258
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
					// go back to tabs
					$('[data-webos-voice-intent=Select]').moveTo(); // test note: this is different from tabs with icons since this item doesn't exist while expanded, spotlight can't focus it when the mouse moves over the scroller in TabGroup
					// check that layout is not collapsed
					expect(Page.tabLayout.isCollapsed).to.be.false();
				});
			});
		});
	});
});
