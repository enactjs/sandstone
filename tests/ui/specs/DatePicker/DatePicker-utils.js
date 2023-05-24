// Utility methods for testing

// adapted from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = ({month, year}) => new Date(year, month, 0).getDate();

const extractValues = async (picker) => {
	const day = parseInt(await picker.item(picker.day).getText());
	const month = parseInt(await picker.item(picker.month).getText());
	const year = parseInt(await picker.item(picker.year).getText());

	return {day, month, year};
};

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', async function () {
		expect(await picker.titleText).to.equal(title);
	});
}

export  {
	daysInMonth,
	extractValues,
	validateTitle
};
