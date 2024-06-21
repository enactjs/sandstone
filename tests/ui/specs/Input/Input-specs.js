const Page = require('./InputPage');

describe('Input test', () => {
	const components = Page.components;

	beforeEach(async () => await Page.open());

	it('should focus the first button on start', async () => {
		expect(await components.input1.self.isFocused()).toBe(true);
		expect(await components.input1.self.getText()).toBe('placeholder');
	});

	describe('using 5-way', () => {
		// Text Input
		it('should focus the Text Input Button', async () => {
			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		it('should open Text Input popup using 5-way enter', async () => {
			await Page.spotlightSelect();

			expect(await components.input1.title.getText()).toBe('Text Input');
			expect(await components.input1.inputField.isFocused()).toBe(true);
		});

		it('should focus the BackButton', async () => {
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input1.backButton.isFocused()).toBe(true);
		});

		it('should exit Text Input using 5-way enter', async () => {
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		it('should exit Text Input using 5-way on escape key', async () => {
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		it('should exit Text Input using BackButton', async () => {
			await Page.spotlightSelect();
			await Page.spotlightUp();
			expect(await components.input1.backButton.isFocused()).toBe(true);
			await Page.spotlightSelect();
			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// Password Input
		it('should focus the Password Input Button', async () => {
			await Page.spotlightRight();

			expect(await components.input2.self.isFocused()).toBe(true);
			expect(await components.input2.self.getText()).toBe('placeholder');
		});

		it('should open Password Input using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input2.title.getText()).toBe('Password Input');
			expect(await components.input2.inputField.isFocused()).toBe(true);
		});

		it('should focus Password Input popup back button', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input2.backButton.isFocused()).toBe(true);
		});

		it('should exit Password Input using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await components.input2.self.isFocused()).toBe(true);
			expect(await components.input2.self.getText()).toBe('placeholder');
		});

		it('should exit Password Input using 5-way escape key', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input2.self.isFocused()).toBe(true);
			expect(await components.input2.self.getText()).toBe('placeholder');
		});

		it('should exit Password Input using BackButton', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input2.self.isFocused()).toBe(true);
			expect(await components.input2.self.getText()).toBe('placeholder');
		});

		// Number Input
		it('should focus the Number Input Button', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await components.input3.self.isFocused()).toBe(true);
			expect(await components.input3.self.getText()).toBe('placeholder');
		});

		it('should open Number Input popup using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input3.title.getText()).toBe('Number Input');
		});

		it('should focus Number BackButton', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input3.backButton.isFocused()).toBe(true);
		});

		it('should exit Number Input using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await browser.pause(1000);

			expect(await components.input3.self.isFocused()).toBe(true);
			expect(await components.input3.self.getText()).toBe('1111');
		});

		it('should exit Number Input using 5-way escape key', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.backKey();

			expect(await components.input3.self.isFocused()).toBe(true);
			expect(await components.input3.self.getText()).toBe('placeholder');
		});

		it('should exit Number Input using BackButton', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input3.self.isFocused()).toBe(true);
			expect(await components.input3.self.getText()).toBe('placeholder');
		});

		// Password Number Input
		it('should focus the Password Number Input Button', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await components.input4.self.isFocused()).toBe(true);
			expect(await components.input4.self.getText()).toBe('placeholder');
		});

		it('should open Password Number Input popup using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input4.title.getText()).toBe('Password Number Input');
		});

		it('should focus Password Number BackButton', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input4.backButton.isFocused()).toBe(true);
		});

		it('should exit Password Number Input using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			await browser.pause(1000);

			expect(await components.input4.self.isFocused()).toBe(true);
			expect(await components.input4.self.getText()).toBe('****');
		});

		it('should exit Password Number Input using 5-way escape key', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input4.self.isFocused()).toBe(true);
			expect(await components.input4.self.getText()).toBe('placeholder');
		});

		it('should exit Password Input using BackButton', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input4.self.isFocused()).toBe(true);
			expect(await components.input4.self.getText()).toBe('placeholder');
		});

		// URL Input
		it('should focus the URL Input Button', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await components.input5.self.isFocused()).toBe(true);
			expect(await components.input5.self.getText()).toBe('placeholder');
		});

		it('should open URL Input popup using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input5.title.getText()).toBe('URL Input');
			expect(await components.input5.inputField.isFocused()).toBe(true);
		});

		it('should focus URL BackButton', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input5.backButton.isFocused()).toBe(true);
		});

		it('should exit URL Input using 5-way enter', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await components.input5.self.isFocused()).toBe(true);
			expect(await components.input5.self.getText()).toBe('placeholder');
		});

		it('should exit URL Input using 5-way escape key', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input5.self.isFocused()).toBe(true);
			expect(await components.input5.self.getText()).toBe('placeholder');
		});

		it('should exit URL Input using BackButton', async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input5.self.isFocused()).toBe(true);
			expect(await components.input5.self.getText()).toBe('placeholder');
		});

		// Invalid Input
		it('should focus the Invalid Input Button', async () => {
			await Page.spotlightDown();

			expect(await components.input6.self.isFocused()).toBe(true);
			expect(await components.input6.self.getText()).toBe('placeholder');
		});

		it('should open Invalid Input popup using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightSelect();

			expect(await components.input6.title.getText()).toBe('Invalid Input');
			expect(await components.input6.inputField.isFocused()).toBe(true);
		});

		it('should focus Invalid BackButton', async () => {
			await Page.spotlightDown();
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input6.backButton.isFocused()).toBe(true);
		});

		it('should exit Invalid Input using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await components.input6.self.isFocused()).toBe(true);
			expect(await components.input6.self.getText()).toBe('placeholder');
		});

		it('should exit Invalid Input using 5-way escape key', async () => {
			await Page.spotlightDown();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input6.self.isFocused()).toBe(true);
			expect(await components.input6.self.getText()).toBe('placeholder');
		});

		it('should exit Invalid Input using BackButton', async () => {
			await Page.spotlightDown();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input6.self.isFocused()).toBe(true);
			expect(await components.input6.self.getText()).toBe('placeholder');
		});

		// NoBackButton Input
		it('should focus the NoBackButton Input Button', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();

			expect(await components.input7.self.isFocused()).toBe(true);
			expect(await components.input7.self.getText()).toBe('placeholder');
		});

		it('should open NoBackButton Input popup using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input7.title.getText()).toBe('NoBackButton Input');
			expect(await components.input7.inputField.isFocused()).toBe(true);
		});

		it('should try to focus and press NoBackButton BackButton', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input7.inputField.isFocused()).toBe(true);
		});

		it('should exit NoBackButton Input using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await components.input7.self.isFocused()).toBe(true);
			expect(await components.input7.self.getText()).toBe('placeholder');
		});

		it('should exit NoBackButton Input using 5-way escape key', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input7.self.isFocused()).toBe(true);
			expect(await components.input7.self.getText()).toBe('placeholder');
		});

		// Size Large Input
		it('should focus the Size Large Input Button', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await components.input8.self.isFocused()).toBe(true);
			expect(await components.input8.self.getText()).toBe('placeholder');
		});

		it('should open Size Large Input using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input8.title.getText()).toBe('Size Large Input');
			expect(await components.input8.inputField.isFocused()).toBe(true);
		});

		it('should focus Size Large BackButton', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input8.backButton.isFocused()).toBe(true);
		});

		it('should exit Size Large Input using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await components.input8.self.isFocused()).toBe(true);
			expect(await components.input8.self.getText()).toBe('placeholder');
		});

		it('should exit Size Large Input using 5-way escape key', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input8.self.isFocused()).toBe(true);
			expect(await components.input8.self.getText()).toBe('placeholder');
		});

		it('should exit Size Large Input using BackButton', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input8.self.isFocused()).toBe(true);
			expect(await components.input8.self.getText()).toBe('placeholder');
		});

		// // Disabled Input
		it('should focus the Disabled Input Button', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await components.input9.self.isFocused()).toBe(true);
			expect(await components.input9.self.getText()).toBe('placeholder');
		});

		it('should open Disabled Input using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input9.self.isFocused()).toBe(true);
			expect(await components.input9.self.getText()).toBe('placeholder');
		});

		// Overlay Input
		it('should focus the Overlay Input Button', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();

			expect(await components.input10.self.isFocused()).toBe(true);
			expect(await components.input10.self.getText()).toBe('placeholder');
		});

		it('should open Overlay Input popup using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();

			expect(await components.input10.inputField.isFocused()).toBe(true);
		});

		it('should focus Overlay BackButton', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();

			expect(await components.input10.backButton.isFocused()).toBe(true);
		});

		it('should exit Overlay Input using 5-way enter', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await components.input10.self.isFocused()).toBe(true);
			expect(await components.input10.self.getText()).toBe('placeholder');
		});

		it('should exit Overlay Input using 5-way escape key', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await components.input10.self.isFocused()).toBe(true);
			expect(await components.input10.self.getText()).toBe('placeholder');
		});

		it('should exit Overlay Input using BackButton', async () => {
			await Page.spotlightDown();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightUp();
			await Page.spotlightSelect();

			expect(await components.input10.self.isFocused()).toBe(true);
			expect(await components.input10.self.getText()).toBe('placeholder');
		});
	});

	describe('using pointer', () => {
		// Text Input
		it('should open Text Input on click', async () => {
			await components.input1.self.click();
			await components.input1.inputField.click();

			expect(await components.input1.title.getText()).toBe('Text Input');
			expect(await components.input1.inputField.isFocused()).toBe(true);
		});

		it('should exit Text Input using BackButton', async () => {
			await components.input1.self.click();
			await components.input1.background.click();
			await components.input1.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// Password Input
		it('should open Password Input on click', async () => {
			await components.input2.self.click();
			await components.input2.inputField.click();

			expect(await components.input2.title.getText()).toBe('Password Input');
			expect(await components.input2.inputField.isFocused()).toBe(true);
		});

		it('should exit Password Input using BackButton', async () => {
			await components.input2.self.click();
			await components.input2.background.click();
			await components.input2.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// Number Input
		it('should open Number Input on click', async () => {
			await components.input3.self.click();
			await components.input3.numberButton.click();

			expect(await components.input3.numberCell.getText()).toBe('1');
			expect(await components.input3.title.getText()).toBe('Number Input');
		});

		it('should exit Number Input using BackButton', async () => {
			await components.input3.self.click();
			await components.input3.background.click();
			await components.input3.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// Password Number Input
		it('should open Password Number Input on click', async () => {
			await components.input4.self.click();
			await components.input4.numberButton.click();

			expect(await components.input4.numberCell.getText()).toBe('󯿛');
			expect(await components.input4.title.getText()).toBe('Password Number Input');
		});

		it('should exit Number Password Input using BackButton', async () => {
			await components.input4.self.click();
			await components.input4.background.click();
			await components.input4.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// URL Input
		it('should open URL Input on click', async () => {
			await components.input5.self.click();
			await components.input5.inputField.click();

			expect(await components.input5.title.getText()).toBe('URL Input');
			expect(await components.input5.inputField.isFocused()).toBe(true);
		});

		it('should exit URL Input using BackButton', async () => {
			await components.input5.self.click();
			await components.input5.background.click();
			await components.input5.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// Invalid Input
		it('should open Invalid Input on click', async () => {
			await components.input6.self.click();
			await components.input6.inputField.click();

			expect(await components.input6.title.getText()).toBe('Invalid Input');
			expect(await components.input6.inputField.isFocused()).toBe(true);
		});

		it('should exit Invalid Input using BackButton', async () => {
			await components.input6.self.click();
			await components.input6.background.click();
			await components.input6.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// NoBackButton Input
		it('should open NoBackButton Input on click', async () => {
			await components.input7.self.click();
			await components.input7.inputField.click();

			expect(await components.input7.title.getText()).toBe('NoBackButton Input');
			expect(await components.input7.inputField.isFocused()).toBe(true);
		});

		// Size Large Input
		it('should open Size Large Input on click', async () => {
			await components.input8.self.click();
			await components.input8.inputField.click();

			expect(await components.input8.title.getText()).toBe('Size Large Input');
			expect(await components.input8.inputField.isFocused()).toBe(true);
		});

		it('should exit Size Large Input using BackButton', async () => {
			await components.input8.self.click();
			await components.input8.background.click();
			await components.input8.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});

		// Disabled Input
		it('should try to enter Disabled Input', async () => {
			await components.input9.self.click();

			expect(await components.input9.self.isFocused()).toBe(true);
			expect(await components.input9.self.getText()).toBe('placeholder');
		});

		// Overlay Input
		it('should enter Overlay Input', async () => {
			await components.input10.self.click();
			await components.input10.inputField.click();

			expect(await components.input10.inputField.isFocused()).toBe(true);
		});

		it('should exit Overlay Input using BackButton', async () => {
			await components.input10.self.click();
			await components.input10.background.click();
			await components.input10.backButton.click();
			await Page.spotlightSelect();

			expect(await components.input1.self.isFocused()).toBe(true);
			expect(await components.input1.self.getText()).toBe('placeholder');
		});
	});
});
