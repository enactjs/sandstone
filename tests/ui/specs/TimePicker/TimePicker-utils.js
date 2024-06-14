// Utility methods for testing
const extractValues = async (picker) => {
	const hour = parseInt(await picker.item(picker.hour).getText());
	const minute = parseInt(await picker.item(picker.minute).getText());
	const meridiem = await picker.meridiem.isExisting() ? await picker.item(picker.meridiem).getText() : null;

	return {hour, minute, meridiem};
};

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', async function () {
		expect(await picker.titleText).toBe(title);
	});
}

module.exports = {
	extractValues,
	validateTitle
};
