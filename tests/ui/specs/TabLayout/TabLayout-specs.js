const {getFocusedText} = require('../utils');

const Page = require('./TabLayoutPage');

describe('TabLayout', function () {

	describe('default', function () {

		beforeEach(function () {
			Page.open();
		});

		describe('view navigation behavior', function () {

			describe('5-way interaction', function () {

				it('should render a tab\'s associated view when it is focused via 5-way move', function () {
					const expected = 'view2';
					const originalView = Page.tabLayout.currentView.getAttribute('id');

					expect(originalView).to.equal('view1');
					Page.spotlightDown();
					Page.waitForExist(`#${expected}`);
					const actual = Page.tabLayout.currentView.getAttribute('id');

					expect(actual).to.equal(expected);
				});
			});

			describe('pointer interaction', function () {

				// this covers GT-28261
				it('should render a tab\'s associated view when it is selected via pointer click', function () {
					const expected = 'view5';
					const originalView = Page.tabLayout.currentView.getAttribute('id');

					expect(originalView).to.equal('view1');
					Page.tabLayout.tabItems[4].click();
					Page.waitForExist(`#${expected}`);
					const actual = Page.tabLayout.currentView.getAttribute('id');

					expect(actual).to.equal(expected);
				});
			});
		});
	});

	describe('auto focus behavior', function () {
		it('should focus the first tab when expanded', function () {
			Page.open();

			const expected = 'One';
			const actual = browser.execute(getFocusedText);

			expect(actual).to.equal(expected);
		});

		it('should focus the first tab content when collapsed', function () {
			Page.open('', '?defaultCollapsed');

			const expected = 'Button One';
			const actual = browser.execute(getFocusedText);

			expect(actual).to.equal(expected);
		});

		it('should focus the tab for the selected index when expanded', function () {
			Page.open('', '?defaultIndex=1');

			const expected = 'Two';
			const actual = browser.execute(getFocusedText);

			expect(actual).to.equal(expected);
		});

		it('should focus the content for the selected index when collapsed', function () {
			Page.open('', '?defaultIndex=1&defaultCollapsed');

			const expected = 'Button Two';
			const actual = browser.execute(getFocusedText);

			expect(actual).to.equal(expected);
		});
	});
});
