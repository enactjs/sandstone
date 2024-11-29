const {getFocusedText} = require('../utils');

const Page = require('./TabLayoutPage');

describe('TabLayout', function () {
	describe('default', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('view navigation behavior', function () {
			describe('5-way interaction', function () {
				it('should render a tab\'s associated view when it is focused via 5-way move', async function () {
					const expected = 'view2';
					const originalView = (await Page.tabLayout.currentView()).getAttribute('id');

					expect(await originalView).toBe('view1');
					await Page.spotlightDown();
					await Page.waitForExist(`#${expected}`);
					const actual = (await Page.tabLayout.currentView()).getAttribute('id');

					expect(await actual).toBe(expected);
				});

				it('should focus to tab content element via 5-way enter in tab menu', async function () {
					const expected = 'Button One';
					const originalView = (await Page.tabLayout.currentView()).getAttribute('id');

					expect(await originalView).toBe('view1');
					await Page.spotlightSelect();
					const actual = await browser.execute(getFocusedText);

					expect(actual).toBe(expected);
				});

				it('should not focus a spotlightDisabled tab', async function () {
					await Page.spotlightDown(); // go to tab 2
					await Page.spotlightDown(); // go to tab 3
					await Page.spotlightDown(); // go to tab 4
					await Page.spotlightDown(); // go to tab 5
					await Page.spotlightDown(); // go to tab 6

					const expected = 'Five';
					const actual = await browser.execute(getFocusedText);

					expect(actual).toBe(expected);
				});
			});

			describe('pointer interaction', function () {
				it('should render a tab\'s associated view when it is selected via pointer click - [QWTC-1896]', async function () {
					const expected = 'view5';
					const originalView = (await Page.tabLayout.currentView()).getAttribute('id');

					expect(await originalView).toBe('view1');
					await (await Page.tabLayout.tabItems())[4].click();
					await Page.waitForExist(`#${expected}`);
					const actual = (await Page.tabLayout.currentView()).getAttribute('id');

					expect(await actual).toBe(expected);
				});
			});
		});
	});

	describe('auto focus behavior', function () {
		it('should focus the first tab when expanded', async function () {
			await Page.open();

			const expected = 'One';
			const actual = await browser.execute(getFocusedText);

			expect(actual).toBe(expected);
		});

		it('should focus the first tab content when collapsed', async function () {
			await Page.open('', '?defaultCollapsed');

			const expected = 'Button One';
			const actual = await browser.execute(getFocusedText);

			expect(actual).toBe(expected);
		});

		it('should focus the tab for the selected index when expanded', async function () {
			await Page.open('', '?defaultIndex=1');

			const expected = 'Two';
			const actual = await browser.execute(getFocusedText);

			expect(actual).toBe(expected);
		});

		it('should focus the content for the selected index when collapsed', async function () {
			await Page.open('', '?defaultIndex=1&defaultCollapsed');

			const expected = 'Button Two';
			const actual = await browser.execute(getFocusedText);

			expect(actual).toBe(expected);
		});
	});
});
