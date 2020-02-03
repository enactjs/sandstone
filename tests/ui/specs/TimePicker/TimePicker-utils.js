// Utility methods for testing
const extractValues = (picker) => {
	const hour = parseInt(picker.item(picker.hour).getText());
	const minute = parseInt(picker.item(picker.minute).getText());
	const meridiem = picker.meridiem.value ? picker.item(picker.meridiem).getText() : null;

	return {hour, minute, meridiem};
};

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', function () {
		expect(picker.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (picker) {
	expect(picker.isOpen).to.be.false();
}

function expectNoLabels (picker) {
	expect(picker.hourLabel.value).to.be.null();
	expect(picker.minuteLabel.value).to.be.null();
	expect(picker.meridiemLabel.value).to.be.null();
}

function expectOpen (picker) {
	expect(picker.isOpen).to.be.true();
}

module.exports = {
	expectClosed,
	expectNoLabels,
	expectOpen,
	extractValues,
	validateTitle
};
