const Page = require('./InputPage');

describe('Input test', () => {
	const components = Page.components;

	beforeEach(() => Page.open());
	it('should focus the first button on start', () => {
		expect(components.input1.self.isFocused()).to.be.true();
		expect(components.input1.self.getText()).equals('placeholder');
	});

	describe('using 5-way', () => {

		// Text Input
		it('should focus the Text Input Button', () => {
			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});
		it('should enter Text Input', () => {
			Page.spotlightSelect();

			expect(components.input1.title.getText()).equals('Text Input');
			expect(components.input1.inputField.isFocused()).to.be.true();
		});
		it('should focus the BackButton', () => {
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input1.backButton.isFocused()).to.be.true();
		});
		it('should exit Text Input using Select', () => {
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});
		it('should exit Text Input using BackButton', () => {
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});

		// Password Input
		it('should focus the Password Input Button', () => {
			Page.spotlightRight();

			expect(components.input2.self.isFocused()).to.be.true();
			expect(components.input2.self.getText()).equals('placeholder');
		});
		it('should enter Password Input', () => {
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input2.title.getText()).equals('Password Input');
			expect(components.input2.inputField.isFocused()).to.be.true();
		});
		it('should focus Password BackButton', () => {
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input2.backButton.isFocused()).to.be.true();
		});
		it('should exit Password Input using Select', () => {
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(components.input2.self.isFocused()).to.be.true();
			expect(components.input2.self.getText()).equals('placeholder');
		});
		it('should exit Password Input using BackButton', () => {
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input2.self.isFocused()).to.be.true();
			expect(components.input2.self.getText()).equals('placeholder');
		});

		// Number Input
		it('should focus the Number Input Button', () => {
			Page.spotlightRight();
			Page.spotlightRight();

			expect(components.input3.self.isFocused()).to.be.true();
			expect(components.input3.self.getText()).equals('placeholder');
		});
		it('should enter Number Input', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input3.title.getText()).equals('Number Input');
		});
		it('should focus Number BackButton', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input3.backButton.isFocused()).to.be.true();
		});
		it('should exit Number Input using Select', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightSelect();
			Page.spotlightSelect();
			Page.spotlightSelect();
			Page.spotlightSelect();
			browser.pause(1000);

			expect(components.input3.self.isFocused()).to.be.true();
			expect(components.input3.self.getText()).equals('1111');
		});
		it('should exit Number Input using BackButton', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input3.self.isFocused()).to.be.true();
			expect(components.input3.self.getText()).equals('placeholder');
		});

		// Password Number Input
		it('should focus the Password Number Input Button', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();

			expect(components.input4.self.isFocused()).to.be.true();
			expect(components.input4.self.getText()).equals('placeholder');
		});
		it('should enter Password Number Input', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input4.title.getText()).equals('Password Number Input');
		});
		it('should focus Password Number BackButton', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input4.backButton.isFocused()).to.be.true();
		});
		it('should exit Password Number Input using Select', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightSelect();
			Page.spotlightSelect();
			Page.spotlightSelect();
			Page.spotlightSelect();
			browser.pause(1000);

			expect(components.input4.self.isFocused()).to.be.true();
			expect(components.input4.self.getText()).equals('****');
		});
		it('should exit Password Input using BackButton', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input4.self.isFocused()).to.be.true();
			expect(components.input4.self.getText()).equals('placeholder');
		});

		// URL Input
		it('should focus the URL Input Button', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();

			expect(components.input5.self.isFocused()).to.be.true();
			expect(components.input5.self.getText()).equals('placeholder');
		});
		it('should enter URL Input', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input5.title.getText()).equals('URL Input');
			expect(components.input5.inputField.isFocused()).to.be.true();
		});
		it('should focus URL BackButton', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input5.backButton.isFocused()).to.be.true();
		});
		it('should exit URL Input using Select', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(components.input5.self.isFocused()).to.be.true();
			expect(components.input5.self.getText()).equals('placeholder');
		});
		it('should exit URL Input using BackButton', () => {
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input5.self.isFocused()).to.be.true();
			expect(components.input5.self.getText()).equals('placeholder');
		});

		// Invalid Input
		it('should focus the Invalid Input Button', () => {
			Page.spotlightDown();

			expect(components.input6.self.isFocused()).to.be.true();
			expect(components.input6.self.getText()).equals('placeholder');
		});
		it('should enter Invalid Input', () => {
			Page.spotlightDown();
			Page.spotlightSelect();

			expect(components.input6.title.getText()).equals('Invalid Input');
			expect(components.input6.inputField.isFocused()).to.be.true();
		});
		it('should focus Invalid BackButton', () => {
			Page.spotlightDown();
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input6.backButton.isFocused()).to.be.true();
		});
		it('should exit Invalid Input using Select', () => {
			Page.spotlightDown();
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(components.input6.self.isFocused()).to.be.true();
			expect(components.input6.self.getText()).equals('placeholder');
		});
		it('should exit Invalid Input using BackButton', () => {
			Page.spotlightDown();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input6.self.isFocused()).to.be.true();
			expect(components.input6.self.getText()).equals('placeholder');
		});

		// NoBackButton Input
		it('should focus the NoBackButton Input Button', () => {
			Page.spotlightDown();
			Page.spotlightRight();

			expect(components.input7.self.isFocused()).to.be.true();
			expect(components.input7.self.getText()).equals('placeholder');
		});
		it('should enter NoBackButton Input', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input7.title.getText()).equals('NoBackButton Input');
			expect(components.input7.inputField.isFocused()).to.be.true();
		});
		it('should try to focus and press NoBackButton BackButton', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input7.inputField.isFocused()).to.be.true();
		});
		it('should exit NoBackButton Input using Select', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(components.input7.self.isFocused()).to.be.true();
			expect(components.input7.self.getText()).equals('placeholder');
		});

		// Size Large Input
		it('should focus the Size Large Input Button', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();

			expect(components.input8.self.isFocused()).to.be.true();
			expect(components.input8.self.getText()).equals('placeholder');
		});
		it('should enter Size Large Input', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input8.title.getText()).equals('Size Large Input');
			expect(components.input8.inputField.isFocused()).to.be.true();
		});
		it('should focus Size Large BackButton', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input8.backButton.isFocused()).to.be.true();
		});
		it('should exit Size Large Input using Select', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(components.input8.self.isFocused()).to.be.true();
			expect(components.input8.self.getText()).equals('placeholder');
		});
		it('should exit Size Large Input using BackButton', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input8.self.isFocused()).to.be.true();
			expect(components.input8.self.getText()).equals('placeholder');
		});

		// // Disabled Input
		it('should focus the Disabled Input Button', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();

			expect(components.input9.self.isFocused()).to.be.true();
			expect(components.input9.self.getText()).equals('placeholder');
		});
		it('should enter Disabled Input', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input9.self.isFocused()).to.be.true();
			expect(components.input9.self.getText()).equals('placeholder');
		});

		// Overlay Input
		it('should focus the Overlay Input Button', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();

			expect(components.input10.self.isFocused()).to.be.true();
			expect(components.input10.self.getText()).equals('placeholder');
		});
		it('should enter Overlay Input', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();

			expect(components.input10.inputField.isFocused()).to.be.true();
		});
		it('should focus Overlay BackButton', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();

			expect(components.input10.backButton.isFocused()).to.be.true();
		});
		it('should exit Overlay Input using Select', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(components.input10.self.isFocused()).to.be.true();
			expect(components.input10.self.getText()).equals('placeholder');
		});
		it('should exit Overlay Input using BackButton', () => {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightUp();
			Page.spotlightSelect();

			expect(components.input10.self.isFocused()).to.be.true();
			expect(components.input10.self.getText()).equals('placeholder');
		});
	});

	describe('using pointer', () => {

		// Text Input
		it('should enter Text Input', () => {
			components.input1.self.click();
			components.input1.inputField.click();

			expect(components.input1.title.getText()).equals('Text Input');
			expect(components.input1.inputField.isFocused()).to.be.true();
		});
		it('should exit Text Input using BackButton', () => {
			components.input1.self.click();
			components.input1.background.click();
			components.input1.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});

		// Password Input
		it('should enter Password Input', () => {
			components.input2.self.click();
			components.input2.inputField.click();

			expect(components.input2.title.getText()).equals('Password Input');
			expect(components.input2.inputField.isFocused()).to.be.true();
		});
		it('should exit Password Input using BackButton', () => {
			components.input2.self.click();
			components.input2.background.click();
			components.input2.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});

		// Number Input
		it('should enter Number Input', () => {
			components.input3.self.click();
			components.input3.numberButton.click();

			expect(components.input3.numberCell.getText()).equals('1');
			expect(components.input3.title.getText()).equals('Number Input');
		});
		it('should exit Number Input using BackButton', () => {
			components.input3.self.click();
			components.input3.background.click();
			components.input3.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.getText()).equals('placeholder');
		});

		// Password Number Input
		it('should enter Password Number Input', () => {
			components.input4.self.click();
			components.input4.numberButton.click();

			expect(components.input4.numberCell.getText()).equals('󯿛');
			expect(components.input4.title.getText()).equals('Password Number Input');
		});
		it('should exit Number Password Input using BackButton', () => {
			components.input4.self.click();
			components.input4.background.click();
			components.input4.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});

		// URL Input
		it('should enter URL Input', () => {
			components.input5.self.click();
			components.input5.inputField.click();

			expect(components.input5.title.getText()).equals('URL Input');
			expect(components.input5.inputField.isFocused()).to.be.true();
		});
		it('should exit URL Input using BackButton', () => {
			components.input5.self.click();
			components.input5.background.click();
			components.input5.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});

		// Invalid Input
		it('should enter Invalid Input', () => {
			components.input6.self.click();
			components.input6.inputField.click();

			expect(components.input6.title.getText()).equals('Invalid Input');
			expect(components.input6.inputField.isFocused()).to.be.true();
		});
		it('should exit Invalid Input using BackButton', () => {
			components.input6.self.click();
			components.input6.background.click();
			components.input6.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});

		// NoBackButton Input
		it('should enter NoBackButton Input', () => {
			components.input7.self.click();
			components.input7.inputField.click();

			expect(components.input7.title.getText()).equals('NoBackButton Input');
			expect(components.input7.inputField.isFocused()).to.be.true();
		});

		// Size Large Input
		it('should enter Size Large Input', () => {
			components.input8.self.click();
			components.input8.inputField.click();

			expect(components.input8.title.getText()).equals('Size Large Input');
			expect(components.input8.inputField.isFocused()).to.be.true();
		});
		it('should exit Size Large Input using BackButton', () => {
			components.input8.self.click();
			components.input8.background.click();
			components.input8.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});

		// Disabled Input
		it('should try to enter Disabled Input', () => {
			components.input9.self.click();

			Page.spotlightSelect();

			expect(components.input9.self.isFocused()).to.be.true();
			expect(components.input9.self.getText()).equals('placeholder');
		});

		// Overlay Input
		it('should enter Overlay Input', () => {
			components.input10.self.click();
			components.input10.inputField.click();

			expect(components.input10.inputField.isFocused()).to.be.true();
		});
		it('should exit Overlay Input using BackButton', () => {
			components.input10.self.click();
			components.input10.background.click();
			components.input10.backButton.click();
			Page.spotlightSelect();

			expect(components.input1.self.isFocused()).to.be.true();
			expect(components.input1.self.getText()).equals('placeholder');
		});
	});
});
