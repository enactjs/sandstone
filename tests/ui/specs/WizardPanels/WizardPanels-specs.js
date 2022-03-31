const Page = require('./WizardPanelsPage');

describe('WizardPanels', function () {
	const wizardPanels = Page.components.wizardPanels;

	function getFocusedTextContent () {
		return document.activeElement.textContent;
	}

	describe('noAnimation', function () {
		beforeEach(async function () {
			await Page.open('?noAnimation=true');
		});

		describe('Focus Behavior', function () {
			it('should select contents', async function () {
				await wizardPanels.focusNextButton();
				await Page.spotlightSelect();

				const expected = 'Button A';
				const actual = await browser.execute(getFocusedTextContent);

				expect(actual).to.be.equal(expected);
			});
		});
	});

	beforeEach(async function () {
		await Page.open();
	});

	describe('5-way', function () {
		it('should navigate between views', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();

			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).to.be.true();

			await wizardPanels.focusPrevButton();
			await Page.spotlightSelect();

			await wizardPanels.waitForLeave(2);
			expect(await wizardPanels.view1.isExisting()).to.be.true();
		});

		it('should navigate back with back key', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();

			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).to.be.true();

			await Page.backKey();

			await wizardPanels.waitForLeave(2);
			expect(await wizardPanels.view1.isExisting()).to.be.true();
		});

		it('should focus on back button in header on left key', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();

			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).to.be.true();

			await Page.spotlightUp();
			expect(await (await wizardPanels.prevButton()).isFocused()).to.be.true();

			await Page.spotlightRight();
			expect(await (await wizardPanels.nextButton()).isFocused()).to.be.true();

			await Page.spotlightLeft();
			expect(await (await wizardPanels.prevButton()).isFocused()).to.be.true();

		});

		it('should focus an eligible navigation button when leaving the contents or footer via 5-way left or right - [QWT-2113]', async function () {
			expect('OK').to.be.equal(await browser.execute(getFocusedTextContent));

			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await (await wizardPanels.nextButton()).isFocused()).to.be.true();
		});

	});

	describe('Pointer', function () {
		it('should navigate between views', async function () {
			await (await wizardPanels.nextButton()).moveTo();
			expect(await (await wizardPanels.nextButton()).isFocused()).to.be.true();
			await (await wizardPanels.nextButton()).click();

			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).to.be.true();

			await (await wizardPanels.prevButton()).moveTo();
			expect(await (await wizardPanels.prevButton()).isFocused()).to.be.true();
			await (await wizardPanels.prevButton()).click();

			await wizardPanels.waitForLeave(2);
			expect(await wizardPanels.view1.isExisting()).to.be.true();
		});
	});

	describe('Focus Behavior', function () {
		it('should focus a component within the body on mount - [QWT-2117]', async function () {
			await wizardPanels.waitForEnter(1);

			const expected = 'OK';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});

		it('should focus a navigation button on mount if no focusable elements exist in the body - [QWT-2116]', async function () {
			await Page.open('?index=3');

			await wizardPanels.waitForEnter(4);

			expect(await (await wizardPanels.prevButton()).isFocused()).to.be.true();
		});

		it('should select contents over buttons - [QWT-2260]', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(1);

			const expected = 'Button A';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});

		it('should select buttons over header - [QWT-2259]', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(1);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(2);

			const expected = 'OK';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});

		it('should select header when no other options are available - [QWT-2258]', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(1);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(2);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(3);

			expect(await (await wizardPanels.prevButton()).isFocused()).to.be.true();
		});

		it('should select `.spottable-default` when it exists - [QWT-2236]', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(1);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(2);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(3);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(4);

			const expected = 'Second';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).to.be.equal(expected);
		});
	});
});
