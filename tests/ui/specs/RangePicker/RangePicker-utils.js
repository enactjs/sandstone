// Utility methods for testing

const extractValue = (rangePicker) => {
	return parseInt(rangePicker.currentValue(rangePicker.self).getText());
};

module.exports = {
	extractValue
};
