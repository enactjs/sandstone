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

				expect(actual).toBe(expected);
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
			expect(await wizardPanels.view2.isExisting()).toBe(true);

			await wizardPanels.focusPrevButton();
			await Page.spotlightSelect();

			await wizardPanels.waitForLeave(2);
			expect(await wizardPanels.view1.isExisting()).toBe(true);
		});

		it('should navigate back with back key', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();

			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).toBe(true);

			await Page.backKey();

			await wizardPanels.waitForLeave(2);
			expect(await wizardPanels.view1.isExisting()).toBe(true);
		});

		it('should focus on back button in header on left key', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();

			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).toBe(true);

			await Page.spotlightUp();
			expect(await (await wizardPanels.prevButton()).isFocused()).toBe(true);

			await Page.spotlightRight();
			expect(await (await wizardPanels.nextButton()).isFocused()).toBe(true);

			await Page.spotlightLeft();
			expect(await (await wizardPanels.prevButton()).isFocused()).toBe(true);

		});

		it('should focus an eligible navigation button when leaving the contents or footer via 5-way left or right - [QWTC-2536]', async function () {
			expect('OK').toBe(await browser.execute(getFocusedTextContent));

			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await (await wizardPanels.nextButton()).isFocused()).toBe(true);
		});

	});

	describe('Pointer', function () {
		it('should navigate between views', async function () {
			await (await wizardPanels.nextButton()).moveTo();
			expect(await (await wizardPanels.nextButton()).isFocused()).toBe(true);
			await (await wizardPanels.nextButton()).click();

			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).toBe(true);

			await (await wizardPanels.prevButton()).moveTo();
			expect(await (await wizardPanels.prevButton()).isFocused()).toBe(true);
			await (await wizardPanels.prevButton()).click();

			await wizardPanels.waitForLeave(2);
			expect(await wizardPanels.view1.isExisting()).toBe(true);
		});
	});

	describe('Focus Behavior', function () {
		it('should focus a component within the body on mount - [QWTC-2532]', async function () {
			await wizardPanels.waitForEnter(1);

			const expected = 'OK';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		});

		it('should focus a navigation button on mount if no focusable elements exist in the body - [QWTC-2533]', async function () {
			await Page.open('?index=3');

			await wizardPanels.waitForEnter(4);

			expect(await (await wizardPanels.prevButton()).isFocused()).toBe(true);
		});

		it('should select contents over buttons - [QWTC-2389]', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(1);

			const expected = 'Button A';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		});

		it('should select buttons over header - [QWTC-2390]', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(1);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(2);

			const expected = 'OK';
			const actual = await browser.execute(getFocusedTextContent);

			expect(actual).toBe(expected);
		});

		it('should select header when no other options are available - [QWTC-2391]', async function () {
			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(1);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(2);

			await wizardPanels.focusNextButton();
			await Page.spotlightSelect();
			await wizardPanels.waitForLeave(3);

			expect(await (await wizardPanels.prevButton()).isFocused()).toBe(true);
		});

		it('should select `.spottable-default` when it exists - [QWTC-2413]', async function () {
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

			expect(actual).toBe(expected);
		});

		it('should focus buttons when navigating with 5-way - [QWTC-2012]', async function () {
			// Step 3: 5-way Spot and 5-way Select the Right Paging Control (>)
			await Page.spotlightRight(); // spot Cancel button
			await Page.spotlightRight(); // spot Next View button
			await Page.spotlightSelect();
			// Step 3 Verify: View 2 page content displays and Spotlight is on Button A button
			await wizardPanels.waitForLeave(1);
			expect(await wizardPanels.view2.isExisting()).toBe(true);
			const firstActual = await browser.execute(getFocusedTextContent);
			expect(firstActual).toBe('Button A');

			// Step 4: 5-way Spot and 5-way Select the Left Paging Control (<)
			await Page.spotlightUp(); // spot Previous View button
			await Page.spotlightSelect();
			// Step 4 Verify: View 1 page content displays and Spotlight is on OK button
			await wizardPanels.waitForLeave(2);
			expect(await wizardPanels.view1.isExisting()).toBe(true);
			const secondActual = await browser.execute(getFocusedTextContent);
			expect(secondActual).toBe('OK');
		});
	});
});
