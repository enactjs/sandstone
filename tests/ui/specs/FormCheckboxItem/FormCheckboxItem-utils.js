// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectUnchecked
};

// Expect blocks
function expectChecked (formCheckboxItem) {
	expect(formCheckboxItem.isChecked).to.be.true();
	expect(formCheckboxItem.icon.isVisible()).to.be.true();
}

function expectUnchecked (formCheckboxItem) {
	expect(formCheckboxItem.isChecked).to.be.false();
	expect(formCheckboxItem.icon.isVisible()).to.be.false();
}
