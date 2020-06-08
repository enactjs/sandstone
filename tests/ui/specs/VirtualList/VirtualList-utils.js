/* global document */
function focusedElement () {
	return browser.execute(function () { return document.activeElement.id; });
}

function hitTest (_selector) {
	return  browser.execute(function (selector) {
		const
			target = document.querySelector(selector),
			targetRect = target.getBoundingClientRect(),
			targetDown = [targetRect.x + (targetRect.width / 2), targetRect.y + targetRect.height - 1],
			targetTop = [targetRect.x + (targetRect.width / 2), targetRect.y + 1];
		return target.contains(document.elementFromPoint(...targetDown)) || target.contains(document.elementFromPoint(...targetTop));
	}, _selector);
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

function waitUntilVisible (itemNum) {
	browser.waitUntil(function () {
		return hitTest(`#item${itemNum}`);
	}, 1500, `timed out waiting until visible index ${itemNum}`);
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
exports.focusedElement = focusedElement;
exports.waitForScrollStartStop = waitForScrollStartStop;
exports.waitUntilFocused = waitUntilFocused;
exports.waitUntilVisible = waitUntilVisible;
