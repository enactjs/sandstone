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

function isScrolling () {
	return $('#scrolling').getText() === 'Scrolling';
}

function isNotScrolling () {
	return $('#scrolling').getText() === 'Not Scrolling';
}

/**
 * Waits for scrolling to start, then stop
 *
 * @param {Number} [timeout=3000]
 */
function waitForScrollStop (timeout = 3000) {
	browser.waitUntil(isScrolling, timeout);
	browser.waitUntil(isNotScrolling, timeout);
}

exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.waitForScrollStop = waitForScrollStop;
exports.waitUntilFocused = waitUntilFocused;
