/* global document */
function focusedElement () {
	return browser.execute(function () { return document.activeElement.id; });
}

function expectFocusedItem (itemNum, comment = 'focused item') {
	const focusedId = focusedElement();
	expect(focusedId, comment).to.equal(`item${itemNum}`);
}

function expectNoFocusedItem () {
	expect(browser.execute(function () { return document.activeElement === document.body; })).to.be.true();
}

function waitUntilFocused (itemNum) {
	const target = `item${itemNum}`;
	browser.waitUntil(function () {
		const focusedId = focusedElement();
		return target === focusedId;
	}, 1500, `timed out waiting to focus index ${itemNum}`);
}

exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.waitUntilFocused = waitUntilFocused;
