let Page = require('./PopupPage'),
	{validateTitle, expectClosed, expectOpen, expectNoneScrimOpen} = require('./Popup-utils.js');

describe('Popup', function () {

	const popupCommon = Page.popupCommon;

	beforeEach(function () {
		Page.open();
	});

	it('should focus the first button on start', function () {
		expect(popupCommon.buttonPopup1.isFocused()).to.be.true();
	});

	it('should not have the popup on start', function () {
		expectClosed(popupCommon);
	});

	describe('with AutoDismiss', function () {

		const popup = Page.components.popup1;

		it('should have correct title', function () {
			popupCommon.buttonPopup1.click();
			Page.waitForOpen(popup);

			expectOpen(popupCommon);
			validateTitle(popup, 'Popup with AutoDismiss');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightLeft();

				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup1.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup1.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup1.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup1.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.clickPopupFloatLayer();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup1.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', function () {
				popupCommon.buttonPopup1.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				popup.buttonOK.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				popupCommon.buttonPopup1.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				popup.buttonCancel.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});
		});
	});

	describe('without AutoDismiss', function () {

		const popup = Page.components.popup2;

		it('should have correct title', function () {
			popupCommon.buttonPopup2.click();
			Page.waitForOpen(popup);

			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without AutoDismiss');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should not dismiss the popup and should not move spotlight from the popup container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				Page.backKey();
				browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)
				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should not dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup2.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(300);  // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup2.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup2.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				popup.buttonOK.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});
		});
	});

	describe('with no Component', function () {

		const popup = Page.components.popup3;

		it('should have correct title', function () {
			popupCommon.buttonPopup3.click();
			Page.waitForOpen(popup);

			expectOpen(popupCommon);
			validateTitle(popup, 'Popup with no Component');
		});

		describe('using 5-way', function () {

			it('should open the popup in no Component button select', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup3.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup3.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				Page.backKey();
				Page.waitForClose(popup);


				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup3.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup3.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});
		});
	});

	describe('with noAnimation', function () {

		const popup = Page.components.popup4;

		it('should have correct title', function () {
			popupCommon.buttonPopup4.click();
			browser.pause(100); // needed to pass instead of waitTransitionEnd
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without Animation');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup4.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup4.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				popup.buttonCancel.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
			});
		});
	});

	describe('without Close Button', function () {

		const popup = Page.components.popup5;

		it('should have correct title', function () {
			popupCommon.buttonPopup5.click();
			Page.waitForOpen(popup);

			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without Close button');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightUp();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightRight();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightLeft();

				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.isFocused()).to.be.true();
			});

			it('should close the popup on spotlight select on cancel in the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.isFocused()).to.be.true();
			});

			it('should close the popup on spotlight select on close in the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup5.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup5.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				popup.buttonOK.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});
		});
	});

	describe('with spotlightRestrict - self-only', function () {

		const popup = Page.components.popup6;

		it('should have correct title', function () {
			popupCommon.buttonPopup6.click();
			Page.waitForOpen(popup);

			expectOpen(popupCommon);
			validateTitle(popup, 'Popup spotlightRestrict is self-only');
		});

		describe('using 5-way', function () {
			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightLeft();

				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightDown();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup6.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup6.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup6.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup6.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				popup.buttonOK.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});
		});

		describe('using 5-way and Pointer', function () {

			it('should retain spotlight on the Close button inside the popup [GT-28268]', function (){
				popupCommon.buttonPopup6.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				$('#buttonCancel').moveTo({xOffset: 200, yOffset: 200});
				// 5-way to the Cancel button
				Page.spotlightLeft();

				// Spotlight is on Cancel button (verify step 4)
				expect(popup.buttonCancel.isFocused()).to.be.true();

				// 5-way Up (step 5)
				Page.spotlightUp();

				// Spotlight remains on the Close button inside the popup (verify step 5)
				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should focus the popup button when changing from pointer to 5-way in popup container - [GT-28265]', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();

				// Spotlight is on the button 'spotlightRestrict - self-only' (verify step 3)
				expect(popupCommon.buttonPopup6.isFocused()).to.be.true();

				// Open popup (step 4)
				popupCommon.buttonPopup6.click();
				Page.waitForOpen(popup);

				// Verify the popup opens (verify step 4) - Spotlight will be on buttonOK by default
				expectOpen(popupCommon);

				// Wave the pointer to change to cursor mode (step 5)
				Page.showPointerByKeycode();
				// Position the pointer on the right of the Cancel button inside popup
				$('#buttonCancel').moveTo({xOffset: 200, yOffset: 200});

				// Spotlight on button in popup is blur (verify step 5)
				expect(popup.buttonOK.isFocused()).to.be.false();

				// Change from pointer to 5-way mode (step 6)
				Page.spotlightLeft();

				// Spotlight is on the button inside the Popup (verify step 6)
				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it.skip('should not spot Buttons Outside of Popup - [GT-28266]', function (){
				popupCommon.buttonPopup6.click();
				Page.waitForOpen(popup);

				// Verify the popup opens
				expectOpen(popupCommon);

				// Hover a button outside Popup (step 4)
				$('#buttonPopup9').moveTo({xOffset: 200, yOffset: 200});
				// Test spotlight cannot leave popup (step 4)
				Page.spotlightUp();

				// Check spotlight is NOT on buttons outside popup (verify step 4)
				expect(popup.buttonOK.isFocused()).to.be.true();

				// Hover the button 'spotlightRestrict - self-only' outside of the popup (step 6)
				Page.spotlightUp();

				// Check spotlight is on the button 'spotlightRestrict - self-only' outside popup (verify step 6)
				expect(popupCommon.buttonPopup6.isFocused()).to.be.true();

				// Open popup (step 7)
				popupCommon.buttonPopup6.click();
				Page.waitForOpen(popup);

				// Verify the popup opens (step 7)
				expectOpen(popupCommon);

				// Hover outside Popup (step 8)
				$('#buttonPopup9').moveTo({xOffset: 200, yOffset: 200});
				// Test spotlight cannot leave popup (step 8)
				Page.spotlightUp();

				// Check spotlight is NOT on buttons outside popup (verify step 8)
				expect(popup.buttonOK.isFocused()).to.be.true();
			});
		});
	});

	describe('with spotlightRestrict - self-first', function () {

		const popup = Page.components.popup7;

		it('should have correct title', function () {
			popupCommon.buttonPopup7.click();
			Page.waitForOpen(popup);

			expectOpen(popupCommon);
			validateTitle(popup, 'Popup spotlightRestrict is self-first');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightLeft();

				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightDown();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup7.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup7.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup7.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup7.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				popup.buttonOK.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});
		});

		describe('using 5-way and Pointer', function () {

			it('should navigate to nearest neighbor [GT-28267]', function (){
				popupCommon.buttonPopup7.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				$('#buttonCancel').moveTo({xOffset: 200, yOffset: 200});
				// 5-way to the OK button (step 5) (How to get it to spot Cancel button?)
				Page.spotlightLeft();

				// Spotlight is on OK button (verify step 5)
				expect(popup.buttonOK.isFocused()).to.be.true();
			});
		});
	});

	describe('with scrimType - transparent', function () {

		const popup = Page.components.popup8;

		it('should have correct title', function () {
			popupCommon.buttonPopup8.click();
			Page.waitForOpen(popup);

			expectOpen(popupCommon);
			validateTitle(popup, 'Popup scrimType is transparent');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightLeft();

				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightDown();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup8.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup8.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup8.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				// The ESC button (Back Key) does not switch out of pointer mode [ENYO-5865] [ENYO-5882]
				expect(popupCommon.buttonPopup8.isFocused()).to.be.false();
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup8.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				Page.clickPopupFloatLayer();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup8.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);
			});

			it('should close the popup and scrim on click in popup container', function () {
				popupCommon.buttonPopup8.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				popup.buttonOK.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				popupCommon.buttonPopup8.click();
				Page.waitForOpen(popup);

				expectOpen(popupCommon);

				popup.buttonCancel.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});
		});
	});

	describe('with scrimType - none', function () {

		const popup = Page.components.popup9;

		it('should have correct title', function () {
			popupCommon.buttonPopup9.click();
			Page.waitForOpen(popup);

			expectNoneScrimOpen(popupCommon);
			validateTitle(popup, 'Popup scrimType is none');
		});

		describe('using 5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectNoneScrimOpen(popupCommon);
				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectNoneScrimOpen(popupCommon);

				Page.spotlightRight();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectNoneScrimOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightLeft();

				expect(popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectNoneScrimOpen(popupCommon);

				Page.spotlightRight();
				Page.spotlightDown();

				expect(popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectNoneScrimOpen(popupCommon);

				Page.spotlightSelect();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup9.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForOpen(popup);

				expectNoneScrimOpen(popupCommon);

				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup9.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup9.click();

				expectNoneScrimOpen(popupCommon);

				Page.waitForOpen(popup);
				Page.backKey();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup9.click();

				expectNoneScrimOpen(popupCommon);

				Page.waitForOpen(popup);
				Page.clickPopupMain();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should open the popup without scrim on click', function () {
				popupCommon.buttonPopup9.click();

				expectNoneScrimOpen(popupCommon);
			});

			it('should close the popup on click in popup container', function () {
				popupCommon.buttonPopup9.click();

				expectNoneScrimOpen(popupCommon);

				Page.waitForOpen(popup);
				popup.buttonOK.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

			it('should close the popup on cancel click in popup container', function () {
				popupCommon.buttonPopup9.click();

				expectNoneScrimOpen(popupCommon);

				Page.waitForOpen(popup);
				popup.buttonCancel.click();
				Page.waitForClose(popup);

				expectClosed(popupCommon);
			});

		});
	});

	describe('toggling open', function () {
		// [GT-28264]
		it('should allow spotlight navigation', function () {
			popupCommon.buttonPopup10.click();

			Page.delay(500);

			Page.spotlightUp();

			expect(popupCommon.buttonPopup7.isFocused()).to.be.true();
		});
	});
});
