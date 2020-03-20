const Page = require('./WizardPanelPage');


describe('WizardPanel', function () {
	const wizardPanel = Page.components.wizardPanel;

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		it('should navigate between views', function () {
			wizardPanel.focusNextButton();
			Page.spotlightSelect();

			wizardPanel.waitForLeave(1);
			expect(wizardPanel.view2.isExisting()).to.be.true();

			wizardPanel.focusPrevButton();
			Page.spotlightSelect();

			wizardPanel.waitForLeave(2);
			expect(wizardPanel.view1.isExisting()).to.be.true();
		});
	});

	describe('Pointer', function () {
		it('should navigate between views', function () {
			browser.moveToElement(wizardPanel.nextButton.ELEMENT);
			Page.spotlightSelect();

			wizardPanel.waitForLeave(1);
			expect(wizardPanel.view2.isExisting()).to.be.true();

			browser.moveToElement(wizardPanel.prevButton.ELEMENT);
			Page.spotlightSelect();

			wizardPanel.waitForLeave(2);
			expect(wizardPanel.view1.isExisting()).to.be.true();
		});
	});
});
