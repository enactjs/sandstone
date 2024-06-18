const Page = require('./PageViewsPage');

describe('PageViews', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		pageViewsPage1,
		pageViewsPage2,
		pageViewsItem1,
		pageViewsItem3
	} = Page.components;

	describe('focus management', function () {
		it('should focus item on load', async function () {
			expect(await pageViewsItem1.self.isFocused()).toBe(true);
		});

		it('should focus item after switching page', async function () {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await browser.pause(500);

			expect(await pageViewsItem3.self.isFocused()).toBe(true);
		});
	});

	describe('5-way', function () {
		it('should change page when selecting next/previous button', async function () {
			expect(await pageViewsPage1.isPageExist).toBe(true);

			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await pageViewsPage2.isPageExist).toBe(true);

			await browser.pause(500);
			await Page.spotlightLeft();
			await Page.spotlightSelect();

			expect(await pageViewsPage1.isPageExist).toBe(true);
		});
	});

	describe('pointer', function () {
		it('should change page when clicking next/previous button', async function () {
			expect(await pageViewsPage1.isPageExist).toBe(true);

			await pageViewsPage1.nextButton.click();

			expect(await pageViewsPage2.isPageExist).toBe(true);

			await pageViewsPage2.prevButton.click();

			expect(await pageViewsPage1.isPageExist).toBe(true);
		});
	});
});
