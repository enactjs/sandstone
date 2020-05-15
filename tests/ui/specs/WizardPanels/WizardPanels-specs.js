const Page = require('./WizardPanelsPage');


describe('WizardPanels', function () {
	const wizardPanels = Page.components.wizardPanels;

	function getFocusedTextContent () {
		// eslint-disable-next-line no-undef
		return document.activeElement.textContent;
	}

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		it('should navigate between views', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();

			wizardPanels.waitForLeave(1);
			expect(wizardPanels.view2.isExisting()).to.be.true();

			wizardPanels.focusPrevButton();
			Page.spotlightSelect();

			wizardPanels.waitForLeave(2);
			expect(wizardPanels.view1.isExisting()).to.be.true();
		});

		it('should navigate back with back key', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();

			wizardPanels.waitForLeave(1);
			expect(wizardPanels.view2.isExisting()).to.be.true();

			Page.backKey();

			wizardPanels.waitForLeave(2);
			expect(wizardPanels.view1.isExisting()).to.be.true();
		});
	});

	describe('Pointer', function () {
		it('should navigate between views', function () {
			browser.moveToElement(wizardPanels.nextButton.ELEMENT);
			expect(wizardPanels.nextButton.isFocused()).to.be.true();
			wizardPanels.nextButton.click();

			wizardPanels.waitForLeave(1);
			expect(wizardPanels.view2.isExisting()).to.be.true();

			browser.moveToElement(wizardPanels.prevButton.ELEMENT);
			expect(wizardPanels.prevButton.isFocused()).to.be.true();
			wizardPanels.prevButton.click();

			wizardPanels.waitForLeave(2);
			expect(wizardPanels.view1.isExisting()).to.be.true();
		});
	});

	describe('Focus Behavior', function () {
		it('should select contents over buttons', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(1);

			const expected = 'Button A';
			const actual = browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});

		it('should select buttons over header', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(1);

			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(2);

			const expected = 'OK';
			const actual = browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});

		it('should select header when no other options are available', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(1);

			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(2);

			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(3);

			expect(wizardPanels.prevButton.isFocused()).to.be.true();
		});
	});
});
