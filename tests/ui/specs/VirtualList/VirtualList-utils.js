/* global document */
function expectFocusedItem (itemNum, comment = 'focused item') {
	const focusedId = browser.execute(function () { return document.activeElement.id; });
	expect(focusedId, comment).to.equal(`item${itemNum}`);
}

function expectNoFocusedItem () {
	expect(browser.execute(function () { return document.activeElement === document.body; })).to.be.true();
}

exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
