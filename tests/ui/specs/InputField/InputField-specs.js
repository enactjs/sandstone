let Page = require('./InputFieldPage');

describe('InputField', function () {

	it('should have focus on first input at start', async function () {
		await Page.open();
		expect(await Page.input1.isFocused()).toBe(true);
	});

	it('should focus input element on enter', async function () {
		await Page.open();
		await Page.spotlightSelect();
		expect(await Page.input1.$('input').isFocused()).toBe(true);
	});

	it('should focus input 2 on 5-way right', async function () {
		await Page.open();
		await Page.spotlightRight();
		expect(await Page.input2.isFocused()).toBe(true);
	});

	it('should have text-align equal to "right" when in ar-SA locale', async function () {
		await Page.open('?locale=ar-SA');
		const actual = await Page.inputElement1.getCSSProperty('text-align');

		expect(actual.value).toBe('right');
	});

	describe('disabled', function () {
		it('should be spottable', async function () {
			await Page.open();
			await Page.spotlightDown();
			await Page.spotlightDown();
			expect(await Page.disabledInput.isFocused()).toBe(true);
		});
	});
});
