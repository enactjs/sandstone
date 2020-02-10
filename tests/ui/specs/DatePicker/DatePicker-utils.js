// Utility methods for testing

// adapted from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = ({month, year}) => new Date(year, month, 0).getDate();

const extractValues = (picker) => {
	const day = parseInt(picker.item(picker.day).getText());
	const month = parseInt(picker.item(picker.month).getText());
	const year = parseInt(picker.item(picker.year).getText());

	return {day, month, year};
};

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', function () {
		expect(picker.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (picker) {
	expect(picker.isOpen, 'Picker open').to.be.false();
}

function expectNoLabels (picker) {
	expect(picker.monthLabel.value).to.be.null();
	expect(picker.dayLabel.value).to.be.null();
	expect(picker.yearLabel.value).to.be.null();
}

function expectOpen (picker) {
	expect(picker.isOpen, 'Picker open').to.be.true();
}

module.exports = {
	daysInMonth,
	expectClosed,
	expectNoLabels,
	expectOpen,
	extractValues,
	validateTitle
};
