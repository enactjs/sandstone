const Page = require('./TabLayoutPage');

describe('TabLayout', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		tabLayout
	} = Page.components;

	describe('default', function () {

		// this covers GT-28261
		it('should render a tab\'s associated view when it is selected', function () {
			const expected = 'view5';
			const originalView = tabLayout.currentView.getAttribute('id');

			expect(originalView).to.equal('view1');
			tabLayout.tabItems[4].click();
			const actual = tabLayout.currentView.getAttribute('id');

			expect(actual).to.equal(expected);
		});
	});
});
