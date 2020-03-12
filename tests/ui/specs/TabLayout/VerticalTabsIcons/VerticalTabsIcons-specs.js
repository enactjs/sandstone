const Page = require('../TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open('VerticalIcon');
	});

	const {tabLayout} = Page.components;

	describe('default', function () {

		describe('collapsing/expanding behavior', function () {
			describe('pointer interaction', function () {

				it('should collapse and expand tabs when focus is moved between `Spottable` components in the content and tabs containers via pointer move', function () {
					const layout = tabLayout;
					// re-focus the layout's tabs
					layout.hoverTabs();
					// select the second tab
					layout.tabItems[1].click();
					// move pointer to Spottable component in content container
					$('#button2').moveTo();
					// check that layout is collapsed
					expect(layout.isCollapsed).to.be.true();
					// go back to tabs
					// layout.hoverTabs();
					// layout.tabsScroller.click(); // click the scroller will make the tabs expand but not a valid test for GT-28256
					$(layout.tabsScroller.selector).moveTo();
					// check that layout is not collapsed
					expect(layout.isCollapsed).to.be.false();
				});
			});
		});
	});
});
