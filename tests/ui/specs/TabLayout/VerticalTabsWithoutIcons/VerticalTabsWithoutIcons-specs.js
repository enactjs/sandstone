const Page = require('../TabLayoutPage');

describe('TabLayout', function () {
	beforeEach(async function () {
		await Page.open('VerticalTabsWithoutIcons');
		await Page.delay(500);
	});

	describe('vertical tabs without icons', function () {
		describe('collapsing/expanding behavior', function () {
			describe('5-way interaction', function () {
				it('should collapse tabs when focus is moved to a Spottable component in the content container - [QWTC-1894]', async function () {
					// 5-way down to second tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(2)).waitForExist();
					// Step 3-2: 5-way right to Spottable component
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightRight();
					});
					// check that layout is collapsed
					expect(await Page.tabLayout.isCollapsed).toBe(true);
				});

				it('should expand tabs when focus is moved to a Spottable component in the tabs container - [QWTC-1894]', async function () {
					// 5-way down to second tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(2)).waitForExist();
					// focus the contents
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightRight();
					});
					expect(await Page.tabLayout.isCollapsed).toBe(true);
					// Step 4: Back to the tabs
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightLeft();
					});
					expect(await Page.tabLayout.isCollapsed).toBe(false);
					expect(await (await Page.tabLayout.tabItems())[1].isFocused()).toBe(true);
				});
			});
			describe('pointer interaction', function () {
				it('should collapse and expand tabs when focus is moved between `Spottable` components in the content and tabs containers via pointer move - [QWTC-1893]', async function () {
					// focus the layout's tabs
					await Page.tabLayout.hoverTabs();
					// select the second tab
					// console.log(await Page.tabLayout.tabItems);
					await (await Page.tabLayout.tabItems())[1].click();
					await (await Page.tabLayout.view(2)).waitForExist();

					// move pointer to Spottable component in content container
					await $('#button2').moveTo();
					// check that layout is collapsed
					expect(await Page.tabLayout.isCollapsed).toBe(true);
					// go back to tabs
					await $('[data-webos-voice-intent=Select]').moveTo(); // test note: this is different from tabs with icons since this item doesn't exist while expanded, spotlight can't focus it when the mouse moves over the scroller in TabGroup
					// check that layout is not collapsed
					expect(await Page.tabLayout.isCollapsed).toBe(false);
				});

				it('should return spotlight after click on navigation button - [QWTC-2503]', async function () {
					// Step 4-1: Hover and Click on ImageItem 1. In this test view, imageitem is replaced with button.
					await $('#button1').moveTo();
					// Step 4-2: Hover over the hamburger icon.
					await $('.TabLayout_TabLayout_tabGroup').moveTo();
					await Page.delay(500);
					// Step 4-3: Click on Home tab.
					await $$('.TabLayout_TabLayout_tabGroup')[1].click();
					// Step 4-4: Hover on ImageItem 1 again.
					await $('#button1').moveTo();
					// step 4 Verify: Spotlight is on ImageItem 1.
					expect(await $('#button1').isFocused()).toBe(true);
				});
			});
		});
	});
});
