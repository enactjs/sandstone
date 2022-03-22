const Page = require('./ContextualPopupDecoratorPage');

describe('ContextualPopupDecorator', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		button1,
		button2,
		button3
	} = Page.components;

	describe('not using open', function () {

		beforeEach(async function () {
			await button1.focus();
		});

		it('should focus the first button on start', async function () {
			expect(await button1.self.isFocused()).to.be.true();
		});

		describe('using 5-way', function () {
			it('should focus second button on 5-way right', async function () {
				await Page.spotlightRight();
				expect(await button2.self.isFocused()).to.be.true();
			});
		});
	});

	describe('using open', function () {
		describe('using 5-way', function () {
			it('should have Spotlight on button when ContextualPopup1 opens', async function () {
				let popupButton = $('#popupButton1');

				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();
			});

			it('should have Spotlight on button when ContextualPopup2 opens', async function () {
				let popupButton = $('#popupButton2');

				await button2.focus();
				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();
			});

			it('should close popup and move Spotlight on button on Spotlight up', async function () {
				let popupButton = $('#popupButton3');

				await button3.focus();
				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();

				await Page.spotlightUp();
				expect(await button3.isOpen).to.be.false();
				expect(await button3.self.isFocused()).to.be.true();
			});

			it('with SpotlightRestrict="self-only", should not close popup and move Spotlight on button on Spotlight up', async function () {
				let popupButton = $('#popupButton2');

				await button2.focus();
				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();

				await Page.spotlightUp();
				expect(await button2.isOpen).to.be.true();
				expect(await button2.self.isFocused()).to.be.false();
			});

			it('should close the popup and should have Spotlight on button on auto dismiss the ContexualPopup2', async function () {
				let popupButton = $('#popupButton2');

				await button2.focus();
				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();

				await Page.backKey();
				expect(await button2.isOpen).to.be.false();
				expect(await button2.self.isFocused()).to.be.true();
			});

			it('should not close the popup and should not have Spotlight on button on auto dismiss the ContexualPopup3', async function () {
				let popupButton = $('#popupButton3');

				await button3.focus();
				await Page.spotlightSelect();
				expect(await popupButton.isFocused()).to.be.true();

				await Page.backKey();
				expect(await button1.isOpen).to.be.true();
				expect(await button1.self.isFocused()).to.be.false();
			});
		});

		describe('using pointer', function () {
			it('should open when clicked', async function () {
				await button1.self.click();
				expect(await button1.isOpen).to.be.true();
			});

			it('should close when clicking twice', async function () {
				await button1.self.click();
				await button1.self.click();
				expect(await button1.isOpen).to.be.false();
			});

			it('should close when clicking outside', async function () {
				await button1.self.click();

				// Click in the area outside the ContextualPopupDecorator (in the empty space created by the wrapper)
				const wrapper = $('.ThemeDecorator_ThemeDecorator_bg');
				await wrapper.click({x: 0, y: 0});

				expect(await button1.isOpen).to.be.false();
			});

			it('should not close when clicking outside', async function () {
				await button3.self.click();

				// Click in the area outside the ContextualPopupDecorator (in the empty space created by the wrapper)
				const wrapper = $('.ThemeDecorator_ThemeDecorator_bg');
				await wrapper.click({x: 0, y: 0});

				expect(await button3.isOpen).to.be.true();
			});
		});
	});
});
