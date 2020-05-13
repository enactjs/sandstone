const Page = require('./TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {

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
});
