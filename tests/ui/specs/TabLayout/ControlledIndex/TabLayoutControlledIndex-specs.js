const Page = require('../TabLayoutPage');

describe('TabLayout', function () {
	beforeEach(async function () {
		await Page.open('ControlledIndex');
	});

	describe('with controlled index', function () {
		describe('5-way interaction', function () {
			it('should change index in vertical tablayout [QWTC-2537]', async function () {
				// Step 4: Hover and click on the "Change to 3rd tab" button.
				await $('#button2').click();
				await Page.delay(500);
				// Step 4-1 Verify: Navigation tabs reduce to icons only.
				expect(await Page.tabLayout.isCollapsed).toBe(true);
				// Step 4-2 Verify: Content of third tab/button displays.
				await (await Page.tabLayout.view(3)).waitForExist();
				// Step 4-3 Verify: Trash icon is selected.
				expect(await Page.tabLayout.isSelectedTab(2)).toBe(true);

				// Step 5: Hover and click on the "Change to 2nd tab" button.
				await $('#Item').click();
				await Page.delay(500);
				// Step 5-1 Verify: Only icons display on the left side.
				expect(await Page.tabLayout.isCollapsed).toBe(true);
				// Step 5-2 Verify: Content of second tab/button displays.
				await (await Page.tabLayout.view(2)).waitForExist();
				// Step 5-3 Verify: Tool icon is selected.
				expect(await Page.tabLayout.isSelectedTab(1)).toBe(true);

				// Step 6-1: Hover and click on the "Delayed change to 3rd tab" button.
				await $('#button3').click();
				// Step 6-2: Wait a few seconds.
				await Page.delay(2000);
				// Step 6-1 Verify: Only icons display on the left side.
				expect(await Page.tabLayout.isCollapsed).toBe(true);
				// Step 6-2 Verify: Content of third tab/button displays.
				await (await Page.tabLayout.view(3)).waitForExist();
				// Step 6-3 Verify: Trash icon is selected.
				expect(await Page.tabLayout.isSelectedTab(2)).toBe(true);

				// Step 7-1: Click on the home icon.
				await $$('.TabLayout_TabGroup_tab')[0].click();
				// Step 7-1 Verify: Icons expand to tabs on the left side.
				expect(await Page.tabLayout.isCollapsed).toBe(false);
				// Step 7-2: Click on the Change to 2nd tab button.
				await $('#button1').click();
				await Page.delay(500);
				// Step 7-2 Verify: Tool icon with Button tab are selected.
				expect(await Page.tabLayout.isSelectedTab(1)).toBe(true);
				// Step 7-3 Verify: Only icons display on the left side.
				expect(await Page.tabLayout.isCollapsed).toBe(true);
			});

			it('should change index in horizontal tablayout [QWTC-2537]', async function () {
				// Step 8: Controls > TabLayout > orientation > horizontal
				await $('#orientationButton').click();

				// Step 9: Hover and click on the "Change to 3rd tab" button.
				await $('#button2').click();
				await Page.delay(500);
				// Step 9-1 Verify: Content of third navigation tab displays.
				await (await Page.tabLayout.view(3)).waitForExist();
				// Step 9-2 Verify: Item navigation tab is selected.
				expect(await Page.tabLayout.isSelectedTab(2)).toBe(true);

				// Step 10: Hover and click on the "Change to 2nd tab" button.
				await $('#Item').click();
				await Page.delay(500);
				// Step 10-1 Verify: Content of second navigation tab displays.
				await (await Page.tabLayout.view(2)).waitForExist();
				// Step 10-2 Verify: Button navigation tab is selected.
				expect(await Page.tabLayout.isSelectedTab(1)).toBe(true);

				// Step 11-1: Hover and click on the "Delayed change to 3rd tab" button.
				await $('#button3').click();
				// Step 11-2: Wait a few seconds.
				await Page.delay(2000);
				// Step 11-1 Verify: Content of third navigation tab displays.
				await (await Page.tabLayout.view(3)).waitForExist();
				// Step 11-2 Verify: Item navigation tab is selected.
				expect(await Page.tabLayout.isSelectedTab(2)).toBe(true);

				// Step 12-1: Click on the home icon.
				await $$('.TabLayout_TabGroup_tab')[0].click();
				// Step 12-2: Click on the Change to 2nd tab.
				await $('#button1').click();
				await Page.delay(500);
				// Step 12-1 Verify: Content of second navigation tab displays.
				await (await Page.tabLayout.view(2)).waitForExist();
				// step 12-2: Button navigation tab is selected.
				expect(await Page.tabLayout.isSelectedTab(1)).toBe(true);
			});
		});
	});
});
