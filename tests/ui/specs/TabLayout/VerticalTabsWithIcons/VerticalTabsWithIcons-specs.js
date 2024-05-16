const Page = require('../TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(async function () {
		await Page.open('VerticalTabsWithIcons');
		await Page.delay(500);
	});

	describe('vertical tabs with icons', function () {
		describe('collapsing/expanding behavior', function () {
			describe('5-way interaction', function () {
				it('should collapse tabs when focus is moved to a Spottable component in the content container via 5-way Right - [QWTC-1892]', async function () {
					await Page.delay(1000);
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

				it('should expand tabs when focus is moved to a Spottable component in the tabs container - [QWTC-1892]', async function () {
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
				});

				it('should expand tabs when focus is moved to a Spottable component in the tabs container via back key', async function () {
					// 5-way down to second tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(2)).waitForExist();
					// focus the contents
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightRight();
					});
					expect(await Page.tabLayout.isCollapsed).toBe(true);
					// Back to the tabs
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.backKey();
					});
					expect(await Page.tabLayout.isCollapsed).toBe(false);
				});

				it('should collapse tabs when focus is moved to a Spottable component in the content container via 5-way Select', async function () {
					await Page.delay(1000);
					// 5-way down to second tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(2)).waitForExist();
					// Step 5-2: 5-way Select to Spottable component
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightSelect();
					});
					// check that layout is collapsed
					expect(await Page.tabLayout.isCollapsed).toBe(true);
				});

				it('should not show disabled tab contents when focused', async function () {
					// 5-way down to second tab
					await Page.spotlightDown();
					// 5-way down to third tab
					await Page.spotlightDown();

					await (await Page.tabLayout.view(3)).waitForExist();

					// 5-way down to fourth tab
					await Page.spotlightDown();
					await Page.delay(1000);

					expect(await (await Page.tabLayout.view(3)).isExisting()).toBe(true);

					// 5-way down to fifth tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(5)).waitForExist();
				});
			});
			describe('pointer interaction', function () {
				it('should not move focus to a Spottable component in the tabs container via back key in pointer mode', async function () {
					// 5-way down to second tab
					await Page.spotlightDown();
					await (await Page.tabLayout.view(2)).waitForExist();
					// focus the contents
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightRight();
					});
					expect(await Page.tabLayout.isCollapsed).toBe(true);
					// Set pointer mode
					await Page.tabLayout.hoverTabs();
					// When pointer mode is true, focus does not move to tabs via back key
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.backKey();
					});
					expect(await Page.tabLayout.isCollapsed).toBe(true);
				});

				it('should collapse and expand tabs when focus is moved between `Spottable` components in the content and tabs containers via pointer move - [QWTC-1891]', async  function () {
					// focus the layout's tabs
					await Page.tabLayout.hoverTabs();
					// select the second tab
					await (await Page.tabLayout.tabItems())[1].click();
					await (await Page.tabLayout.view(2)).waitForExist();

					// move pointer to Spottable component in content container
					await $('#button2').moveTo();
					// check that layout is collapsed
					expect(await Page.tabLayout.isCollapsed).toBe(true);

					// go back to hover the tabs
					await (await Page.tabLayout.tabItems())[0].moveTo();
					// check that layout is not collapsed
					expect(await Page.tabLayout.isCollapsed).toBe(false);
				});
			});
		});
	});
});
