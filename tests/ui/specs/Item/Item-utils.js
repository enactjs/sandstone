// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (item, title) {
	it('should have correct title', function () {
		const match = item.titleText === title;
		expect(match).to.be.true();
	});
}

module.exports = {
	validateTitle
};
