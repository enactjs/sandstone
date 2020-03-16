const Page = require('./WizardPanelPage');
// const {expectClosed, expectOpen, expectNoLabels, extractValues, validateTitle} = require('./WizardPanel-utils.js.js');

describe('WizardPanel', function () {
	Page.open();

	describe('5-way', function () {
		beforeEach(function () {
			Page.open();
		});

		const wizardPanel = Page.components.wizardPanel;

		it('should focus', function () {
			// Page.spotlightSelect();
			wizardPanel.nextButton.focus();

			console.error('hello', wizardPanel.nextButton);

			expect(wizardPanel.nextButton.isFocused()).to.be.true();
		});
	});
});
