// Utility methods for testing
const extractValues = (picker) => {
	const hour = parseInt(picker.item(picker.hour).getText());
	const minute = parseInt(picker.item(picker.minute).getText());
	const meridiem = picker.meridiem.isExisting() ? picker.item(picker.meridiem).getText() : null;

	return {hour, minute, meridiem};
};

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', function () {
		expect(picker.titleText).to.equal(title);
	});
}

module.exports = {
	extractValues,
	validateTitle
};
