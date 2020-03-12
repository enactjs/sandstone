const Page = require('./TabLayoutPage');
const {selectTab} = require('./TabLayout-utils.js');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		tabLayoutWithoutIcons,
		tabLayoutWithIcons,
		tabLayoutCollapsedWithIcons,
		tabLayoutCollapsedWithoutIcons,
		tabLayoutHorizontal,
		tabLayoutHorizontalCollapsed
	} = Page.components;

	describe('default', function () {

		it('should display first view on render', function () {
			const expected = 'view1';
			const actual = tabLayoutWithoutIcons.currentView.getAttribute('id');

			expect(actual).to.equal(expected);
		});

		it('should have vertical tabs', function () {
			const expected = 'vertical';
			const actual = tabLayoutWithoutIcons.tabOrientation;

			expect(actual).to.equal(expected);
		});

		// this covers GT-28261
		it('should render a tab\'s associated view when it is selected', function () {
			const expected = 'view5';
			const originalView = tabLayoutWithoutIcons.currentView.getAttribute('id');

			expect(originalView).to.equal('view1');
			selectTab(tabLayoutWithoutIcons.tabItems.value[4]);
			const actual = tabLayoutWithoutIcons.currentView.getAttribute('id');

			expect(actual).to.equal(expected);
		});

		describe('collapsed', function () {

			it('should be collapsed', function () {
				const actual = tabLayoutCollapsedWithoutIcons.isCollapsed;

				expect(actual).to.be.true();
			});

			// this test uses a TabLayout with tabs that do not have icons, so there will be no ui.Group component
			it('should not render a <Group> component', function () {
				const expected = null;
				const actual = tabLayoutCollapsedWithoutIcons.tabGroup.value;

				expect(actual).to.equal(expected);
			});

			describe('with tabs having icons', function () {

				// rather than looking for the existence of the ui.Group component, this test ensures the number of icons remain the same
				it('should display all icons', function () {
					const expected = 6;
					const actual = tabLayoutCollapsedWithIcons.tabIcons.value.length;

					expect(actual).to.equal(expected);
				});
			});

			describe('with no tabs having icons', function () {

				// this test ensures that only one icon is displayed in the tabs when they are collpased
				it('should display only one icon', function () {
					const expected = 1;
					const actual = tabLayoutCollapsedWithoutIcons.tabIcons.value.length;

					expect(actual).to.equal(expected);
				});
			});
		});

		describe('collapsing/expanding behavior', function () {
			beforeEach(function () {
				Page.hideAll();
			});

			describe('5-way interaction', function () {

				// this covers GT-28257 and GT-28259 step 3
				it('should collapse tabs when focus is moved to a Spottable component in the content container', function () {
					const layout = tabLayoutWithIcons;
					// re-show the target layout
					layout.showSelf();
					// re-focus the layout's tabs
					layout.hoverTabs();
					Page.spotlightSelect();
					// 5-way down to second tab
					Page.spotlightDown();
					// select it
					Page.spotlightSelect();
					// 5-way right to Spottable component
					Page.spotlightRight();
					// check that layout is collapsed
					expect(layout.isCollapsed).to.be.true();
				});

				// this covers GT-28257 and GT-28259 step 4
				it('should expand tabs when focus is moved to a Spottable component in the tabs container', function () {
					const layout = tabLayoutCollapsedWithIcons;
					// re-show the target layout
					layout.showSelf();
					// re-focus the layout's tabs
					layout.hoverTabs();
					Page.spotlightSelect();
					expect(layout.isCollapsed).to.be.false();
				});
			});

			describe.skip('pointer interaction', function () {

				it('should collapse and expand tabs when focus is moved between `Spottable` components in the content and tabs containers via pointer move', function () {
					const layout = tabLayoutWithIcons;
					// const tab = layout.tabItems.value[1];
					// re-show the target layout
					layout.showSelf();
					// re-focus the layout's tabs
					layout.hoverTabs();
					// select the second tab
					selectTab(layout.tabItems.value[1]);
					// move pointer to Spottable component in content container
					browser.moveToObject('#button2');
					// check that layout is collapsed
					expect(layout.isCollapsed).to.be.true();
					// go back to tabs
					// layout.hoverTabs();
					// layout.tabsScroller.click(); // click the scroller will make the tabs expand but not a valid test for GT-28256
					browser.moveToObject(layout.tabsScroller.selector);
					// check that layout is not collapsed
					expect(layout.isCollapsed).to.be.false();
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
				const actual = tabLayoutHorizontalCollapsed.isCollapsed;

				expect(actual).to.be.false();
			});
		});
	});
});
