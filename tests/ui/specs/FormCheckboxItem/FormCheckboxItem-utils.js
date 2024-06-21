// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectUnchecked
};

// Expect blocks
async function expectChecked (formCheckboxItem) {
	expect(await formCheckboxItem.isChecked).toBe(true);
	expect(await formCheckboxItem.icon.isVisible()).toBe(true);
}

async function expectUnchecked (formCheckboxItem) {
	expect(await formCheckboxItem.isChecked).toBe(false);
	expect(await formCheckboxItem.icon.isVisible()).toBe(false);
}
