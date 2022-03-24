// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectUnchecked
};

// Expect blocks
async function expectChecked (formCheckboxItem) {
	expect(await formCheckboxItem.isChecked).to.be.true();
	expect(await formCheckboxItem.icon.isVisible()).to.be.true();
}

async function expectUnchecked (formCheckboxItem) {
	expect(await formCheckboxItem.isChecked).to.be.false();
	expect(await formCheckboxItem.icon.isVisible()).to.be.false();
}
