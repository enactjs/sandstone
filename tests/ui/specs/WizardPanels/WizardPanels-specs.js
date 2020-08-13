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

		it('should focus on back button in header on left key', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();

			wizardPanels.waitForLeave(1);
			expect(wizardPanels.view2.isExisting()).to.be.true();

			Page.spotlightUp();
			expect(wizardPanels.prevButton.isFocused()).to.be.true();

			Page.spotlightRight();
			expect(wizardPanels.nextButton.isFocused()).to.be.true();

			Page.spotlightLeft();
			expect(wizardPanels.prevButton.isFocused()).to.be.true();

		});

	});

	describe('Pointer', function () {
		it('should navigate between views', function () {
			wizardPanels.nextButton.moveTo();
			expect(wizardPanels.nextButton.isFocused()).to.be.true();
			wizardPanels.nextButton.click();

			wizardPanels.waitForLeave(1);
			expect(wizardPanels.view2.isExisting()).to.be.true();

			wizardPanels.prevButton.moveTo();
			expect(wizardPanels.prevButton.isFocused()).to.be.true();
			wizardPanels.prevButton.click();

			wizardPanels.waitForLeave(2);
			expect(wizardPanels.view1.isExisting()).to.be.true();
		});
	});

	describe('Focus Behavior', function () {
		it('should focus a component within the body on mount', function () {
			wizardPanels.waitForEnter(1);

			const expected = 'OK';
			const actual = browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});

		it('should select contents over buttons - [GT-29594]', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(1);

			const expected = 'Button A';
			const actual = browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});

		it('should select buttons over header - [GT-29595]', function () {
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

		it('should select header when no other options are available - [GT-29596]', function () {
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

		it('should select `.spottable-default` when it exists - [GT-30541]', function () {
			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(1);

			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(2);

			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(3);

			wizardPanels.focusNextButton();
			Page.spotlightSelect();
			wizardPanels.waitForLeave(4);

			const expected = 'Second';
			const actual = browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});
	});
});
