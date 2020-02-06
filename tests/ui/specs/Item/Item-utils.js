// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (item, title) {
	it('should have correct title', function () {
		const match = item.content === title;
		// console.log('item = ', item);
		// console.log('title = ', title);
		expect(match).to.be.true();
	});
}

module.exports = {
	validateTitle
};
