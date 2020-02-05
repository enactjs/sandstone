// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
function expectSelected (selectableItem) {
	expect(selectableItem.isSelected).to.be.true();
	expect(selectableItem.isToggled).to.be.true();
}

function expectUnselected (selectableItem) {
	expect(selectableItem.isSelected).to.be.false();
	expect(selectableItem.isToggled).to.be.false();
}
