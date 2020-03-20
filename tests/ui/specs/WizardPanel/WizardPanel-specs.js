const Page = require('./WizardPanelPage');


describe('WizardPanel', function () {
	Page.open();

	describe('5-way', function () {
		beforeEach(function () {
			Page.open();
		});

		const wizardPanel = Page.components.wizardPanel;

		it('should focus', function () {
			wizardPanel.focusNextButton();

			expect(wizardPanel.nextButton.isFocused()).to.be.true();
		});
	});
});
