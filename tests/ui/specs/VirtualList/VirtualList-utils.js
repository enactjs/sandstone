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

async function waitUntilFocusedAsync (itemNum) {
	let focusedId = null;
	const target = `item${itemNum}`;
	await browser.waitUntil(() => {
		browser.call(async () => {
			focusedId = focusedElement();
		});

		return target === focusedId;
	}, 300, `timed out waiting to focus index ${itemNum}`);
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
exports.waitUntilFocusedAsync = waitUntilFocusedAsync;
