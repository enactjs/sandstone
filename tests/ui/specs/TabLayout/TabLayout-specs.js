const Page = require('./TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		tabLayoutDefaultWithoutIcons,
		tabLayoutCollapsedWithoutIcons,
		tabLayoutHorizontalWithoutIcons,
		tabLayoutHorizontalCollapsedWithoutIcons
	} = Page.components;

	describe('default', function () {
		const tabLayout = tabLayoutDefaultWithoutIcons;

		it('should display first view on render', function () {
			const expected = 'view1';
			const actual = tabLayout.currentView.getAttribute('id');

			expect(actual).to.equal(expected);
		});

		it('should have vertical tabs', function () {
			const expected = 'vertical';
			const actual = tabLayout.tabOrientation;

			expect(actual).to.equal(expected);
		});

		// TODO: ui tests for collapsed TabLayout
		// describe('collapsed', function () {

		// 	describe('with tabs having icons', function () {});

		// 	describe('with no tabs having icons', function () {
		// 		const tabLayout = tabLayoutCollapsedWithoutIcons;
		// 	});
		// });
	});

	describe('horizontal orientation', function () {
		const tabLayout = tabLayoutHorizontalWithoutIcons;

		it('should have horizontal tabs', function () {
			const expected = 'horizontal';
			const actual = tabLayout.tabOrientation;

			expect(actual).to.equal(expected);
		});

		it('should show a maximum of five tabs in horizontal orientation', function () {
			const expected = 5;
			const actual = tabLayout.tabs.value.length;

			expect(actual).to.equal(expected);
		});

		// TODO: ui tests for collapsed TabLayout
		// describe('collapsed', function () {

		// 	describe('with tabs having icons', function () {});

		// 	describe('with no tabs having icons', function () {
		// 		const tabLayout = tabLayoutHorizontalCollapsedWithoutIcons;
		// 	});

		// });
	});
});
