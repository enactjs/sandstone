const {getFocusedText} = require('../utils');

const Page = require('./PopupTabLayoutPage');

describe('PopupTabLayout', function () {

	const {
		popupTabLayout
	} = Page.components;

	describe('default', function () {

		beforeEach(function () {
			Page.open();
		});

		describe('view navigation behavior', function () {

			describe('5-way interaction', function () {

				it('should render the first tab by default', function () {
					const expected = 'display';
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
					Page.waitTransitionEnd(1500, 'waiting for Panel transition', () => {
						Page.spotlightRight();
					});

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
					Page.waitTransitionEnd(1500, 'waiting for Panel transition', () => {
						Page.spotlightRight();
					});
					Page.waitTransitionEnd(1500, 'waiting for Panel transition', () => {
						Page.spotlightLeft();
					});

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
			// 		$(`#${expected}`).waitForExist();
			// 		const actual = popupTabLayout.currentView.getAttribute('id');

			// 		expect(actual).to.equal(expected);
			// 	});
			// });
		});

		describe('auto focus behavior', function () {
			it('should focus the first tab when expanded', function () {
				Page.open();

				const expected = 'Display';
				const actual = browser.execute(getFocusedText);

				expect(actual).to.equal(expected);
			});

			it('should focus the second tab when expanded', function () {
				Page.open('?defaultIndex=1');

				const expected = 'Sound';
				const actual = browser.execute(getFocusedText);

				expect(actual).to.equal(expected);
			});

			it('should respect the `autoFocus` prop on `TabPanel` when collapsed', function () {
				Page.open('?defaultCollapsed');

				const expected = 'Color Adjust';
				const actual = browser.execute(getFocusedText);

				expect(actual).to.equal(expected);
			});
		});
	});
});
