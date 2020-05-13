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

function fiveWayToItem (Page, itemNum) {
	const currentFocusMatch = focusedElement().match(/item(\d+)/);
	expect(currentFocusMatch, 'Not focused to an item').to.exist();
	const currentItem = Number.parseInt(currentFocusMatch[1]),
		direction = currentItem < itemNum ? 1 : -1;

	for (let i = currentItem; i !== itemNum; i = i + direction) {
		if (direction > 0) {
			Page.spotlightDown();
		} else {
			Page.spotlightUp();
		}
		waitUntilFocused(i + direction);
	}
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
function waitForScrollStartStop (timeout = 3000) {
	browser.waitUntil(isScrolling, timeout);
	browser.waitUntil(isNotScrolling, timeout);
}

exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.waitForScrollStartStop = waitForScrollStartStop;
exports.waitUntilFocused = waitUntilFocused;
exports.fiveWayToItem = fiveWayToItem;
