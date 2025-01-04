let Page = require('./PopupPage'),
	{validateTitle, expectClosed, expectOpen, expectNoneScrimOpen} = require('./Popup-utils.js');

describe('Popup', function () {

	const popupCommon = Page.popupCommon;

	beforeEach(async function () {
		await Page.open();
	});

	it('should focus the first button on start', async function () {
		expect(await popupCommon.buttonPopup1.isFocused()).toBe(true);
	});

	it('should not have the popup on start', async function () {
		await expectClosed(popupCommon);
	});

	describe('with AutoDismiss', function () {

		const popup = Page.components.popup1;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup1.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup with AutoDismiss');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup1.isFocused()).toBe(true);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup1.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.clickPopupFloatLayer();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await popupCommon.buttonPopup1.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await popup.buttonCancel.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('without AutoDismiss', function () {

		const popup = Page.components.popup2;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup2.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without AutoDismiss');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should not dismiss the popup and should not move spotlight from the popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.backKey();
				await browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should not dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup2.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.clickPopupFloatLayer();
				await browser.pause(300);  // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup2.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup2.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('with no Component', function () {

		const popup = Page.components.popup3;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup3.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup with no Component');
		});

		describe('using 5-way', function () {

			it('should open the popup in no Component button select', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup3.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup3.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.backKey();
				await Page.waitForClose(popup);


				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup3.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				await Page.clickPopupFloatLayer();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup3.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});
		});
	});

	describe('with noAnimation', function () {

		const popup = Page.components.popup4;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup4.click();
			await browser.pause(100); // needed to pass instead of waitTransitionEnd
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without Animation');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup4.isFocused()).toBe(true);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.backKey();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup4.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.backKey();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.clickPopupFloatLayer();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await popup.buttonOK.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await popup.buttonCancel.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});
		});
	});

	describe('without Close Button', function () {

		const popup = Page.components.popup5;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup5.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without Close button');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should not move spot from cancel button on 5-way left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightUp();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should not move spot from cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightRight();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).toBe(true);
			});

			it('should close the popup on spotlight select on cancel in the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).toBe(true);
			});

			it('should close the popup on spotlight select on close in the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).toBe(true);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup5.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup5.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('with spotlightRestrict - self-only', function () {

		const popup = Page.components.popup6;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup6.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup spotlightRestrict is self-only');
		});

		describe('using 5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightDown();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup6.isFocused()).toBe(true);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup6.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});

		describe('using 5-way and Pointer', function () {

			it('should retain spotlight on the Close button inside the popup [QWTC-1903]', async function () {
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				await $('#popup6').moveTo({xOffset: 800, yOffset: 200});

				// 5-way to the Cancel button
				await Page.spotlightLeft();

				// Spotlight is on Cancel button (verify step 4)
				expect(await popup.buttonCancel.isFocused()).toBe(true);

				// 5-way Up (step 5)
				await Page.spotlightUp();

				// Spotlight remains on the Close button inside the popup (verify step 5)
				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should focus the popup button when changing from pointer to 5-way in popup container - [QWTC-1900]', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();

				// Spotlight is on the button 'spotlightRestrict - self-only' (verify step 3)
				expect(await popupCommon.buttonPopup6.isFocused()).toBe(true);

				// Open popup (step 4)
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				// Verify the popup opens (verify step 4) - Spotlight will be on buttonOK by default
				await expectOpen(popupCommon);

				// Wave the pointer to change to cursor mode (step 5)
				await Page.showPointerByKeycode();
				// Position the pointer on the right of the Cancel button inside popup
				await $('#popup6').moveTo({xOffset: 800, yOffset: 200});

				// Spotlight on button in popup is blur (verify step 5)
				expect(await popup.buttonOK.isFocused()).toBe(false);

				// Change from pointer to 5-way mode (step 6)
				await Page.spotlightLeft();

				// Spotlight is on the button inside the Popup (verify step 6)
				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should not spot Buttons Outside of Popup - [QWTC-1901]', async function () {
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				// Verify the popup opens
				await expectOpen(popupCommon);

				// Hover a button outside Popup (step 4)
				await $('#buttonPopup9').moveTo({xOffset: 200, yOffset: 200});
				// Test spotlight cannot leave popup (step 4)
				await Page.spotlightUp();

				// Check spotlight is NOT on buttons outside popup (verify step 4)
				expect(await popup.buttonOK.isFocused()).toBe(true);

				// Hover the button 'spotlightRestrict - self-only' outside the popup (step 6)
				await Page.spotlightSelect();
				// wait for popup closes
				await Page.delay(1000);

				// Check spotlight is on the button 'spotlightRestrict - self-only' outside popup (verify step 6)
				expect(await popupCommon.buttonPopup6.isFocused()).toBe(true);

				// Open popup (step 7)
				await popupCommon.buttonPopup6.click();
				await Page.waitForOpen(popup);

				// Verify the popup opens (step 7)
				await expectOpen(popupCommon);

				// Hover outside Popup (step 8)
				await $('#buttonPopup9').moveTo({xOffset: 200, yOffset: 200});
				// Test spotlight cannot leave popup (step 8)
				await Page.spotlightUp();

				// Check spotlight is NOT on buttons outside popup (verify step 8)
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});
		});
	});

	describe('with spotlightRestrict - self-first', function () {

		const popup = Page.components.popup7;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup7.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup spotlightRestrict is self-first');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightDown();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup7.isFocused()).toBe(true);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup7.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup7.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await popupCommon.buttonPopup7.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});

		describe('using 5-way and Pointer', function () {

			it('should navigate to nearest neighbor [QWTC-1902]', async function () {
				await popupCommon.buttonPopup7.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				const popupSize = await $('#popup7').getSize();
				await Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4-1).
				await $('#popup7').moveTo({xOffset: popupSize.width - 1, yOffset: popupSize.height - 1});
				// Click on the blank area to change to 5-way.
				await $('#popup7').click();
				await Page.spotlightLeft();
				expect(await popup.buttonCancel.isFocused()).toBe(true);

				// Spotlight is on OK button (verify step 5)
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});
		});
	});

	describe('with scrimType - transparent', function () {

		const popup = Page.components.popup8;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup8.click();
			await Page.waitForOpen(popup);

			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup scrimType is transparent');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await 	Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightDown();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup8.isFocused()).toBe(true);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup8.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				// The ESC button (Back Key) does not switch out of pointer mode [ENYO-5865] [ENYO-5882]
				expect(await popupCommon.buttonPopup8.isFocused()).toBe(false);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await Page.clickPopupFloatLayer();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await popupCommon.buttonPopup8.click();
				await Page.waitForOpen(popup);

				await expectOpen(popupCommon);

				await popup.buttonCancel.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});
		});
	});

	describe('with scrimType - none', function () {

		const popup = Page.components.popup9;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup9.click();
			await Page.waitForOpen(popup);

			await expectNoneScrimOpen(popupCommon);
			await validateTitle(popup, 'Popup scrimType is none');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);

				await Page.spotlightRight();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightLeft();

				expect(await popup.buttonOK.isFocused()).toBe(true);
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);

				await Page.spotlightRight();
				await Page.spotlightDown();

				expect(await popup.buttonCancel.isFocused()).toBe(true);
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);

				await Page.spotlightSelect();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup9.isFocused()).toBe(true);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.waitForOpen(popup);

				await expectNoneScrimOpen(popupCommon);

				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup9.isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForOpen(popup);
				await Page.backKey();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForOpen(popup);
				await Page.clickPopupMain();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should open the popup without scrim on click', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);
			});

			it('should close the popup on click in popup container', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForOpen(popup);
				await popup.buttonOK.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

			it('should close the popup on cancel click in popup container', async function () {
				await popupCommon.buttonPopup9.click();

				await expectNoneScrimOpen(popupCommon);

				await Page.waitForOpen(popup);
				await popup.buttonCancel.click();
				await Page.waitForClose(popup);

				await expectClosed(popupCommon);
			});

		});
	});

	describe('toggling open', function () {

		it('should allow spotlight navigation [QWTC-1899]', async function () {
			await popupCommon.buttonPopup10.click();

			await Page.delay(500);

			await Page.spotlightUp();

			expect(await popupCommon.buttonPopup7.isFocused()).toBe(true);
		});
	});
});
