const Page = require('../TabLayoutPage');

describe('TabLayout', function () {
	beforeEach(async function () {
		await Page.open('VerticalTabsWithoutIcons');
	});

	describe('vertical tabs without icons', function () {
		describe('collapsing/expanding behavior', function () {
			describe('5-way interaction', function () {
				it('should collapse tabs when focus is moved to a Spottable component in the content container - [QWT-2756]', async function () {
					// 5-way down to second tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(2)).waitForExist();
					// Step 3-2: 5-way right to Spottable component
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightRight();
					});
					// check that layout is collapsed
					expect(await Page.tabLayout.isCollapsed).to.be.true();
				});

				it('should expand tabs when focus is moved to a Spottable component in the tabs container - [QWT-2756]', async function () {
					// 5-way down to second tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(2)).waitForExist();
					// focus the contents
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightRight();
					});
					expect(await Page.tabLayout.isCollapsed).to.be.true();
					// Step 4: Back to the tabs
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightLeft();
					});
					expect(await Page.tabLayout.isCollapsed).to.be.false();
					expect(await (await Page.tabLayout.tabItems())[1].isFocused()).to.be.true();
				});
			});
			describe('pointer interaction', function () {
				it('should collapse and expand tabs when focus is moved between `Spottable` components in the content and tabs containers via pointer move - [QWT-2757]', async function () {
					// focus the layout's tabs
					await Page.tabLayout.hoverTabs();
					// select the second tab
					// console.log(await Page.tabLayout.tabItems);
					await (await Page.tabLayout.tabItems())[1].click();
					await (await Page.tabLayout.view(2)).waitForExist();

					// move pointer to Spottable component in content container
					await $('#button2').moveTo();
					// check that layout is collapsed
					expect(await Page.tabLayout.isCollapsed).to.be.true();
					// go back to tabs
					await $('[data-webos-voice-intent=Select]').moveTo(); // test note: this is different from tabs with icons since this item doesn't exist while expanded, spotlight can't focus it when the mouse moves over the scroller in TabGroup
					// check that layout is not collapsed
					expect(await Page.tabLayout.isCollapsed).to.be.false();
				});
			});
		});
	});
});
