// Utility methods for testing

const extractValue = (picker) => {
	return picker.active(picker.self).getText();
};

module.exports = {
	extractValue
};
