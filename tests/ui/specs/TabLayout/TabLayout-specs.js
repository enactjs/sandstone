const Page = require('./TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		tabLayoutDefaultWithoutIcons,
		tabLayoutCollapsedWithIcons,
		tabLayoutCollapsedWithoutIcons,
		tabLayoutHorizontal
	} = Page.components;

	describe('default', function () {

		it('should display first view on render', function () {
			const expected = 'view1';
			const actual = tabLayoutDefaultWithoutIcons.currentView.getAttribute('id');

			expect(actual).to.equal(expected);
		});

		it('should have vertical tabs', function () {
			const expected = 'vertical';
			const actual = tabLayoutDefaultWithoutIcons.tabOrientation;

			expect(actual).to.equal(expected);
		});

		describe('collapsed', function () {

			it('should not render a <Group> component', function () {
				const expected = null;
				const actual = tabLayoutCollapsedWithoutIcons.tabGroup.value;

				expect(actual).to.equal(expected);
			});

			describe('with tabs having icons', function () {

				it('should display all icons', function () {
					const expected = 6;
					const actual = tabLayoutCollapsedWithIcons.tabIcons.value.length;

					expect(actual).to.equal(expected);
				});
			});

			describe('with no tabs having icons', function () {

				it('should display only one icon', function () {
					const expected = 1;
					const actual = tabLayoutCollapsedWithoutIcons.tabIcons.value.length;

					expect(actual).to.equal(expected);
				});
			});
		});
	});

	describe('horizontal orientation', function () {

		it('should have horizontal tabs', function () {
			const expected = 'horizontal';
			const actual = tabLayoutHorizontal.tabOrientation;

			expect(actual).to.equal(expected);
		});

		it('should show a maximum of five tabs', function () {
			const expected = 5; // there are 6 tabs passed to the test component
			const actual = tabLayoutHorizontal.tabItems.value.length;

			expect(actual).to.equal(expected);
		});

		describe('collapsed', function () {

			it('should not collapse', function () {
				const expected = true;
				const actual = !!tabLayoutCollapsedWithoutIcons.tabGroup;

				expect(actual).to.equal(expected);
			});
		});
	});
});
