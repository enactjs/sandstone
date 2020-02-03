// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (item, title) {
	it('should have correct title', function () {
		const match = item.titleText === title;
		expect(match).to.be.true();
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (item) {
	expect(item.isOpen).to.be.false();
	expect(getChevronRotation(item)).to.equal('down');
}

function expectOpen (item) {
	expect(item.isOpen).to.be.true();
	expect(getChevronRotation(item)).to.equal('up');
}

// Other utility functions
function getChevronRotation (item) {
	const matrix = item.chevron.getCssProperty('transform');

	if (matrix.value === 'matrix(1, 0, 0, -1, 0, 0)') {
		return 'up';
	} else if (matrix.value === 'none') {
		return 'down';
	} else {
		return 'unknown';
	}
}

module.exports = {
	expectClosed,
	expectOpen,
	validateTitle,
	getChevronRotation
};
