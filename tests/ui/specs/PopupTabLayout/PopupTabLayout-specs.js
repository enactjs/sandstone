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

				it('should show the collapsed tabs when a user enters a menu', function () {
					Page.waitTransitionEnd(1500, 'waiting for Panel transition', () => {
						Page.spotlightRight();
						Page.spotlightSelect();
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
					Page.spotlightRight();
					Page.spotlightSelect();
					Page.delay(500);

					// To the upper menu
					Page.spotlightLeft();
					Page.delay(500);

					Page.spotlightLeft();
					Page.delay(500);

					const expected = false;
					const actual = popupTabLayout.isCollapsed;

					expect(actual).to.equal(expected);
				});

				it('should go to the upper menu with the left key', function () {
					Page.spotlightRight();
					Page.spotlightSelect();
					Page.delay(500);

					// To the upper menu
					Page.spotlightLeft();
					Page.delay(500);

					const expected = 'Color Adjust';
					const actual = browser.execute(getFocusedText);

					expect(actual).to.equal(expected);
				});

				it('should not move the focus with the left key on the back button', function () {
					Page.spotlightRight();
					Page.spotlightSelect();
					Page.delay(500);

					// To the back button
					Page.spotlightUp();

					Page.spotlightLeft();
					Page.delay(500);

					Page.spotlightDown();

					const expected = $('#brightness').isFocused();
					const actual = true;

					expect(actual).to.equal(expected);
				});

				it('should prevent focus from moving to the tabs while navigating vertically through the content when using noCloseButton', function () {
					const soundId = 'sound';

					Page.spotlightDown();
					Page.waitForExist(`#${soundId}`);

					Page.spotlightRight();
					Page.spotlightUp();

					const expected = 'Advanced Audio';
					const actual = browser.execute(getFocusedText);

					expect(actual).to.equal(expected);
				});

				it('should not lose focus with spotlight left', function () {
					// Attempt to focus left
					expect(popupTabLayout.tabItems[0].isFocused(), 'initial focus').to.be.true();
					Page.spotlightLeft();
					expect(popupTabLayout.tabItems[0].isFocused(), 'secondary focus').to.be.true();
				});

				it('should suppress 5-way select during transition', function () {
					Page.spotlightRight();
					Page.spotlightSelect();
					Page.delay(50);

					// The Brightness item is configured to blur itself on select so this will blur
					// it if key events are not suppressed.
					Page.spotlightSelect();

					const expected = $('#brightness').isFocused();
					const actual = true;

					expect(actual).to.equal(expected);
				});

				it('should close the popup on back', function () {
					Page.waitTransitionEnd(1500, 'waiting for popup to close', () => {
						Page.backKey();
					});

					const expected = $('#tabLayout').isExisting();
					const actual = false;

					expect(actual).to.equal(expected);
				});

				it('should suppress back key during transition', function () {
					Page.spotlightRight();
					Page.spotlightSelect();
					Page.delay(50);
					Page.backKey();

					// Adding an arbitrary delay since there are multiple pieces (panel transition,
					// popup transition) moving in this case to allow for everything to settle.
					Page.delay(500);

					const expected = $('#brightness').isFocused();
					const actual = true;

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

			it('should restore last focused when returning to Panel', function () {
				Page.open();

				expect(browser.execute(getFocusedText)).to.equal('Display');

				Page.spotlightRight();

				// Color Adjust is the default element
				expect(browser.execute(getFocusedText)).to.equal('Color Adjust');

				// sets the last focused for the Panel to be "Picture Modes"
				Page.spotlightUp();

				expect(browser.execute(getFocusedText)).to.equal('Picture Modes');

				Page.spotlightLeft();

				expect(browser.execute(getFocusedText)).to.equal('Display');

				Page.spotlightRight();

				// expect to return to Picture Modes
				const expected = 'Picture Modes';
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

			it('should collapse tab only when user enters a menu ', function () {
				Page.spotlightRight();
				Page.delay(500);
				expect(popupTabLayout.isCollapsed).to.be.false();

				Page.spotlightSelect();
				Page.delay(500);
				expect(popupTabLayout.isCollapsed).to.be.true();

				// To the upper menu
				Page.spotlightLeft();
				Page.delay(500);
				expect(popupTabLayout.isCollapsed).to.be.true();

				Page.spotlightLeft();
				Page.delay(500);
				expect(popupTabLayout.isCollapsed).to.be.false();
			});
		});
	});
});
