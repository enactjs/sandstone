const {getFocusedText} = require('../utils');

const Page = require('./PopupTabLayoutPage');

describe('PopupTabLayout', function () {

	const {
		popupTabLayout
	} = Page.components;

	describe('default', function () {

		beforeEach(async function () {
			await Page.open();
		});

		describe('view navigation behavior', function () {

			describe('5-way interaction', function () {

				it('should render the first tab by default', async function () {
					const expected = 'display';
					const actual = await popupTabLayout.currentView.getAttribute('id');

					expect(actual).toBe(expected);
				});

				it('should render a tab\'s associated view when it is focused via 5-way move', async function () {
					const soundId = 'sound';

					await Page.delay(1000);
					await Page.spotlightDown();
					await Page.waitForExist(`#${soundId}`);

					const expected = soundId;
					const actual = await popupTabLayout.currentView.getAttribute('id');

					expect(actual).toBe(expected);
				});

				it('should show the collapsed tabs when a user enters a menu', async function () {
					await Page.delay(1000);
					await Page.waitTransitionEnd(1500, 'waiting for Panel transition', async () => {
						await Page.spotlightRight();
						await Page.spotlightSelect();
					});

					// Example of getting the DOM from the browser to debug. browser.execute()
					// accepts additional args after the function which are passed to the function.
					// If the arg is a WebDriver reference, it'll be resolved to the real node
					// before being passed to the function.
					//
					// console.log(browser.execute(function (n) {
					// 	return n.outerHTML;
					// }, popupTabLayout.self));

					await Page.delay(500);
					const expected = true;
					const actual = await popupTabLayout.isCollapsed;

					expect(actual).toBe(expected);
				});

				it('should expand the tabs when focus returns to the tabs', async function () {
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await Page.delay(500);

					// To the upper menu
					await Page.spotlightLeft();
					await Page.delay(500);

					await Page.spotlightLeft();
					await Page.delay(500);

					const expected = false;
					const actual = await popupTabLayout.isCollapsed;

					expect(actual).toBe(expected);
				});

				it('should go to the upper menu with the left key', async function () {
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await Page.delay(500);

					// To the upper menu
					await Page.spotlightLeft();
					await Page.delay(500);

					const expected = 'Color Adjust';
					const actual = await browser.execute(getFocusedText);

					expect(actual).toBe(expected);
				});

				it('should not move the focus with the left key on the back button', async function () {
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await Page.delay(500);

					// To the back button
					await Page.spotlightUp();

					await Page.spotlightLeft();
					await Page.delay(500);

					await Page.spotlightDown();

					const expected = await $('#brightness').isFocused();
					const actual = true;

					expect(actual).toBe(expected);
				});

				it('should prevent focus from moving to the tabs while navigating vertically through the content when using noCloseButton', async function () {
					const soundId = 'sound';

					await Page.spotlightDown();
					await Page.waitForExist(`#${soundId}`);

					await Page.spotlightRight();
					await Page.spotlightUp();

					const expected = 'Advanced Audio';
					const actual = await browser.execute(getFocusedText);

					expect(actual).toBe(expected);
				});

				it('should not lose focus with spotlight left', async function () {
					// Attempt to focus left
					expect(await popupTabLayout.tabItems[1].isFocused()).toBe(true);
					await Page.spotlightLeft();
					expect(await popupTabLayout.tabItems[1].isFocused()).toBe(true);
				});

				it('should suppress 5-way select during transition', async function () {
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await Page.delay(50);

					// The Brightness item is configured to blur itself on select so this will blur
					// it if key events are not suppressed.
					await Page.spotlightSelect();

					const expected = await $('#brightness').isFocused();
					const actual = true;

					expect(actual).toBe(expected);
				});

				it('should close the popup on back when the focus is on the tabs', async function () {
					await Page.waitTransitionEnd(1500, 'waiting for popup to close', async () => {
						await Page.backKey();
					});

					await Page.delay(500);
					const expected = await $('#tabLayout').isExisting();
					const actual = false;

					expect(actual).toBe(expected);
				});

				it('should suppress back key during transition', async function () {
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await Page.delay(50);
					await Page.backKey();

					// Adding an arbitrary delay since there are multiple pieces (panel transition,
					// popup transition) moving in this case to allow for everything to settle.
					await Page.delay(500);

					const expected = await $('#brightness').isFocused();
					const actual = true;

					expect(actual).toBe(expected);
				});

				it('should collapse tab only when user enters a menu', async function () {
					await Page.spotlightRight();
					await Page.delay(500);
					expect(await popupTabLayout.isCollapsed).toBe(false);

					await Page.spotlightSelect();
					await Page.delay(500);
					expect(await popupTabLayout.isCollapsed).toBe(true);

					// To the upper menu
					await Page.spotlightLeft();
					await Page.delay(500);
					expect(await popupTabLayout.isCollapsed).toBe(true);

					await Page.spotlightLeft();
					await Page.delay(500);
					expect(await popupTabLayout.isCollapsed).toBe(false);
				});

				it('should not close the popup when pressing back key on the first panel of content', async function () {
					// Go to the second depth of the content
					await Page.spotlightRight();
					await Page.spotlightSelect();
					await Page.delay(500);

					// Press back key to go to the first panel
					await Page.backKey();
					await Page.delay(500);

					// Make sure the focus is on the first panel
					expect(await browser.execute(getFocusedText)).toBe('Color Adjust');

					// Press back key to move the focus on the tabs
					await Page.backKey();
					await Page.delay(500);

					// Make sure the focus is on the tabs
					expect(await browser.execute(getFocusedText)).toBe('Display');

					// Press back key to close the popup
					await Page.waitTransitionEnd(1500, 'waiting for popup to close', async () => {
						await Page.backKey();
					});

					await Page.delay(500);
					const expected = await $('#tabLayout').isExisting();
					const actual = false;

					expect(actual).toBe(expected);
				});

				it('should change the tab content immediately when pressing the enter key on the tab menu (WRP-26238)', async function () {
					// Press the down key and then enter key to go to the second panel
					await Page.spotlightDown();
					await Page.delay(50);
					await Page.spotlightSelect();

					// Make sure the focus is on the second panel
					expect(await browser.execute(getFocusedText)).toBe('Advanced Audio');
				});
			});

			// Note: To verify that testing is not possible.
			// describe('pointer interaction', function () {

			// 	// this covers QWTC-1896
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
			it('should focus the first tab when expanded', async function () {
				await Page.open();

				const expected = 'Display';
				const actual = await browser.execute(getFocusedText);

				expect(actual).toBe(expected);
			});

			it('should restore last focused when returning to Panel', async function () {
				await Page.open();

				expect(await browser.execute(getFocusedText)).toBe('Display');

				await Page.spotlightRight();

				// Color Adjust is the default element
				expect(await browser.execute(getFocusedText)).toBe('Color Adjust');

				// sets the last focused for the Panel to be "Picture Modes"
				await Page.spotlightUp();

				expect(await browser.execute(getFocusedText)).toBe('Picture Modes');

				await Page.spotlightLeft();

				expect(await browser.execute(getFocusedText)).toBe('Display');

				await Page.spotlightRight();

				// expect to return to Picture Modes
				const expected = 'Picture Modes';
				const actual = await browser.execute(getFocusedText);

				expect(actual).toBe(expected);
			});

			it('should focus the second tab when expanded', async function () {
				await Page.open('', '?defaultIndex=1');

				const expected = 'Sound';
				const actual = await browser.execute(getFocusedText);

				expect(actual).toBe(expected);
			});

			it('should respect the `autoFocus` prop on `TabPanel` when collapsed', async function () {
				await Page.open('', '?defaultCollapsed');

				const expected = 'Color Adjust';
				const actual = await browser.execute(getFocusedText);

				expect(actual).toBe(expected);
			});
		});
	});
});
