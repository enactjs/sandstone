const Page = require('./WizardPanelsPage');


describe('WizardPanels', function () {
	const wizardPanels = Page.components.wizardPanels;

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
});
