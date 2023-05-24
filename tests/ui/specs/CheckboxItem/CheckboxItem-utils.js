// A set of utility methods for testing
// module.exports = {
// 	expectChecked,
// 	expectInline,
// 	expectUnchecked
// };

// Expect blocks
async function expectChecked (checkboxItem) {
	expect(await checkboxItem.isChecked).to.be.true();
}

async function expectUnchecked (checkboxItem) {
	expect(await checkboxItem.isChecked).to.be.false();
}

async function expectInline (checkboxItem1, checkboxItem2) {
	expect(await checkboxItem1.getLocation().x === checkboxItem2.getLocation().x).to.be.false();
}

export {
	expectChecked,
	expectInline,
	expectUnchecked
}
