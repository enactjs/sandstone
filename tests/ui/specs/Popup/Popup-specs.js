let Page = require('./PopupPage'),
	{validateTitle, expectClosed, expectOpen, expectNoneScrimOpen, expectCloseButton} = require('./Popup-utils.js');

describe('Popup', function () {

	const popupCommon = Page.popupCommon;

	beforeEach(function () {
		Page.open();
	});

	it('should focus the first button on start', function () {
		expect(popupCommon.buttonPopup1.hasFocus()).to.be.true();
	});

	it('should not have the popup on start', function () {
		expectClosed(popupCommon);
	});

	describe('Popup with AutoDismiss', function () {

		const popup = Page.components.popup1;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup1.click();
			});
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup with AutoDismiss');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot close button on two 5-way right in popup container', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way up in popup container', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.spotlightSelect();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup1.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup1.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should dismiss the popup on escape key', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup1.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup1.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.clickPopupFloatLayer();
				});
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup1.click();
				});
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup1.click();
				});
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup1.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonOK.click();
				});
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup1.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonCancel.click();
				});
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup1.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonClose.click();
				});
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup without AutoDismiss', function () {

		const popup = Page.components.popup2;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup2.click();
			});
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without AutoDismiss');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not dismiss the popup and should not move spotlight from the popup container', function () {
				Page.spotlightRight();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.backKey();
				browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should not dismiss the popup on click on outside the popup', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup2.click();
				});
				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(300);  // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup2.click();
				});
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup2.click();
				});
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup2.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonOK.click();
				});
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup with no Component', function () {

		const popup = Page.components.popup3;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup3.click();
			});
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup with no Component');
		});

		describe('5-way', function () {

			it('should open the popup in no Component button select', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup3.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup3.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup3.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.clickPopupFloatLayer();
				});
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup3.click();
				});
				expectOpen(popupCommon);
			});
		});
	});

	describe('Popup with noAnimation', function () {

		const popup = Page.components.popup4;

		it('should have correct title', function () {
			popupCommon.buttonPopup4.click();
			browser.pause(100); // needed to pass instead of waitTransitionEnd
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without Animation');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot close button on two 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way up in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup4.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				Page.backKey();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup4.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
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

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				expectCloseButton(popup);
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

			it('should close the popup and scrim on close click in popup container', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectOpen(popupCommon);
				popup.buttonClose.click();
				browser.pause(100); // needed to pass instead of waitTransitionEnd
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup without Close Button', function () {

		const popup = Page.components.popup5;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup5.click();
			});
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without Close button');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});

			it('should close the popup on spotlight select on cancel in the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.spotlightSelect();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});

			it('should close the popup on spotlight select on close in the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.spotlightSelect();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup5.click();
				});
				expectOpen(popupCommon);
			});

			it('should not show close button in the popup container on display', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup5.click();
				});
				expectOpen(popupCommon);
				expect(popup.isCloseButton).to.be.false();
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup5.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonOK.click();
				});
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup spotlightRestrict - self-only', function () {

		const popup = Page.components.popup6;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup6.click();
			});
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup spotlightRestrict is self-only');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightDown();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.spotlightSelect();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup6.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup6.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup6.click();
				});
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup6.click();
				});
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup6.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonOK.click();
				});
				expectClosed(popupCommon);
			});
		});

		describe('5-way and Pointer', function () {

			it('should retain spotlight on the Close button inside the popup [GT-21627]', function (){
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup6.click();
				});
				expectOpen(popupCommon);
				Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				browser.moveToObject('#buttonCancel', 200, 200);
				// 5-way to the Cancel button
				Page.spotlightLeft();
				// Spotight is on Cancel button (verify step 4)
				expect(popup.buttonCancel.hasFocus()).to.be.true();
				// 5-way Up (step 5)
				Page.spotlightUp();
				// Spotight remains on the Close button inside the popup (verify step 5)
				expect(popup.buttonClose.hasFocus()).to.be.true();
				// 5-way up (step 6)
				Page.spotlightUp();
				// Spotlight remains on the close button inside the popup (verify step 6)
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should focus the popup button when changing from pointer to 5-way in popup container - [GT-25753]', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				// Spotlight is on the button 'spotlightRestrict - self-only' (verify step 3)
				expect(popupCommon.buttonPopup6.hasFocus()).to.be.true();
				// Open popup (step 4)
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup6.click();
				});
				// Verify the popup opens (verify step 4) - Spotlight will be on buttonOK by default
				expectOpen(popupCommon);
				// Wave the pointer to change to cursor mode (step 5)
				Page.showPointerByKeycode();
				// Position the pointer on the right of the Cancel buttion inside popup
				browser.moveToObject('#buttonCancel', 200, 200);
				// Spotlight on button in popup is blur (verify step 5)
				expect(popup.buttonOK.hasFocus()).to.be.false();
				// Change from pointer to 5-way mode (step 6)
				Page.spotlightLeft();
				// Spotlight is on the button inside the Popup (verify step 6)
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should not spot Buttons Outside of Popup - [GT-21630]', function (){
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup6.click();
				});
				// Verify the popup opens
				expectOpen(popupCommon);
				// Hover a button outside Popup (step 4)
				browser.moveToObject('#buttonPopup9', 200, 200);
				// Test spotlight cannot leave popup (step 4)
				Page.spotlightUp();
				// Check spotlight is NOT on buttons outside popup (verify step 4)
				expect(popup.buttonOK.hasFocus()).to.be.true();
				// Close Popup (step 5)
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonClose.click();
				});
				Page.spotlightUp();
				// Hover the button 'spotlightRestrict - self-only' outside of the popup (step 6)
				Page.spotlightUp();
				// Check spotlight is on the button 'spotlightRestrict - self-only' outside popup (verify step 6)
				expect(popupCommon.buttonPopup6.hasFocus()).to.be.true();
				// Open popup (step 7)
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup6.click();
				});
				// Verify the popup opens (step 7)
				expectOpen(popupCommon);
				// Hover outside Popup (step 8)
				browser.moveToObject('#buttonPopup9', 200, 200);
				// Test spotlight cannot leave popup (step 8)
				Page.spotlightUp();
				// Check spotlight is NOT on buttons outside popup (verify step 8)
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});
		});
	});

	describe('Popup spotlightRestrict - self-first', function () {

		const popup = Page.components.popup7;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup7.click();
			});
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup spotlightRestrict is self-first');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightDown();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.spotlightSelect();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup7.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup7.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup7.click();
				});
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup7.click();
				});
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup7.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonOK.click();
				});
				expectClosed(popupCommon);
			});
		});

		describe('5-way and Pointer', function () {

			it('should navigate to nearest neighbor [GT-25513]', function (){
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup7.click();
				});
				expectOpen(popupCommon);
				Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				browser.moveToObject('#buttonCancel', 200, 200);
				// 5-way to the OK button (step 5) (How to get it to spot Cancel button?)
				Page.spotlightLeft();
				// Spotight is on OK button (verify steo 5)
				expect(popup.buttonOK.hasFocus()).to.be.true();
				// Move to the Close X button (step 7)
				Page.spotlightUp();
				// Spotlight remains on the close button inside the popup (verfiy step 7)
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});
		});
	});

	describe('Popup scrimType - transparent', function () {

		const popup = Page.components.popup8;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup8.click();
			});
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup scrimType is transparent');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightDown();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.spotlightSelect();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup8.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup8.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup8.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				// The ESC button (Back Key) does not switch out of pointer mode [ENYO-5865] [ENYO-5882]
				expect(popupCommon.buttonPopup8.hasFocus()).to.be.false();
			});

			it('should dismiss the popup on click on outside the popup', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup8.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.clickPopupFloatLayer();
				});
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup8.click();
				});
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup8.click();
				});
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup8.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonOK.click();
				});
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup8.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonCancel.click();
				});
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup8.click();
				});
				expectOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonClose.click();
				});
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup scrimType - none', function () {

		const popup = Page.components.popup9;

		it('should have correct title', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				popupCommon.buttonPopup9.click();
			}); // browser.pause(3250);
			expectNoneScrimOpen(popupCommon);
			validateTitle(popup, 'Popup scrimType is none');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightDown();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.spotlightSelect();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup9.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, 'popup open', () => {
					Page.spotlightSelect();
				});
				expectNoneScrimOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup9.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup9.click();
				});
				expectNoneScrimOpen(popupCommon);
				Page.waitTransitionEnd(3000, 'popup close', () => {
					Page.backKey();
				});
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup9.click();
				});
				expectNoneScrimOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.clickPopupMain();
				});
				expectClosed(popupCommon);
			});

			it('should open the popup without scrim on click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup9.click();
				});
				expectNoneScrimOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup9.click();
				});
				expectNoneScrimOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup on click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup9.click();
				});
				expectNoneScrimOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonOK.click();
				});
				expectClosed(popupCommon);
			});

			it('should close the popup on cancel click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup9.click();
				});
				expectNoneScrimOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonCancel.click();
				});
				expectClosed(popupCommon);
			});

			it('should close the popup on close click in popup container', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					popupCommon.buttonPopup9.click();
				});
				expectNoneScrimOpen(popupCommon);
				Page.waitTransitionEnd(3000, undefined, () => {
					popup.buttonClose.click();
				});
				expectClosed(popupCommon);
			});
		});
	});
});
