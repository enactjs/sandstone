// Utility methods for testing

const extractValue = (picker) => {
	return picker.currentValue(picker.self).getText();
};

module.exports = {
	extractValue
};
