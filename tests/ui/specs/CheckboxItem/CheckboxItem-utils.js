// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectInline,
	expectUnchecked
};

// Expect blocks
function expectChecked (checkboxItem) {
	expect(checkboxItem.isChecked).to.be.true();
	expect(checkboxItem.icon.isVisible()).to.be.true();
}

function expectUnchecked (checkboxItem) {
	expect(checkboxItem.isChecked).to.be.false();
	expect(checkboxItem.icon.isVisible()).to.be.false();
}

function expectInline (checkboxItem1, checkboxItem2) {
	expect(checkboxItem1.getLocation().x === checkboxItem2.getLocation().x).to.be.false();
}

