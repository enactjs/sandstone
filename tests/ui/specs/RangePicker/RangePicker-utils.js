// Utility methods for testing

const extractValue = (rangePicker) => {
	return parseInt(rangePicker.active(rangePicker.self).getText());
};

module.exports = {
	extractValue
};
