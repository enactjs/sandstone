const Page = require('../TabLayoutPage');

describe('TabLayout', function () {
	beforeEach(async function ()  {
		await Page.open('WithPanelsHeader');
	});

	describe('With Panels Header', function () {
		it('should spot tab instead of button in Header - [WRQ-18041]', async function () {
			// Focus item1 in Tab 1 contents.
			await Page.spotlightRight();
			expect(await $('#item1').isFocused()).toBe(true);
			// 5-way Left.
			await Page.spotlightLeft();
			// Spotlight is on the Tab 1 button.
			expect(await (await Page.tabLayout.tabItems())[0].isFocused()).toBe(true);
		});
	});
});
