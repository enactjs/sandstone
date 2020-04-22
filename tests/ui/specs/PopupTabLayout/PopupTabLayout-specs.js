const Page = require('./PopupTabLayoutPage');

describe('PopupTabLayout', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		popupTabLayout
	} = Page.components;

	describe('default', function () {

		describe('view navigation behavior', function () {

			describe('5-way interaction', function () {

				it('shound render the first tab by default', function () {
					const expected = 'brightness';
					const actual = popupTabLayout.currentView.getAttribute('id');

					expect(actual).to.equal(expected);
				});

				it('should render a tab\'s associated view when it is focused via 5-way move', function () {
					const soundId = 'sound';

					Page.spotlightDown();
					Page.waitForExist(`#${soundId}`);

					const expected = soundId;
					const actual = popupTabLayout.currentView.getAttribute('id');

					expect(actual).to.equal(expected);
				});

				it('should collapse the tabs when focus enters the content', function () {
					Page.spotlightRight();

					// Example of getting the DOM from the browser to debug. browser.execute()
					// accepts additional args after the function which are passed to the function.
					// If the arg is a WebDriver reference, it'll be resolved to the real node
					// before being passed to the function.
					//
					// console.log(browser.execute(function (n) {
					// 	return n.outerHTML;
					// }, popupTabLayout.self));

					const expected = true;
					const actual = popupTabLayout.isCollapsed;

					expect(actual).to.equal(expected);
				});

				it('should expand the tabs when focus returns to the tabs', function () {
					Page.spotlightRight();
					Page.spotlightLeft();

					const expected = false;
					const actual = popupTabLayout.isCollapsed;

					expect(actual).to.equal(expected);
				});
			});

			// describe('pointer interaction', function () {

			// 	// this covers GT-28261
			// 	it('should render a tab\'s associated view when it is selected via pointer click', function () {
			// 		const expected = 'view5';
			// 		const originalView = popupTabLayout.currentView.getAttribute('id');

			// 		expect(originalView).to.equal('view1');
			// 		popupTabLayout.tabItems[4].click();
			// 		Page.waitForExist(`#${expected}`);
			// 		const actual = popupTabLayout.currentView.getAttribute('id');

			// 		expect(actual).to.equal(expected);
			// 	});
			// });
		});
	});
});
