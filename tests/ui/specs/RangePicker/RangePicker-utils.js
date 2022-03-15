// Utility methods for testing

const extractValue = async (rangePicker) => {
	return parseInt(await rangePicker.currentValue(rangePicker.self).getText());
};

module.exports = {
	extractValue
};
