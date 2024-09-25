async function focusedElement () {
	return await browser.execute(function () {
		return document.activeElement.id;
	});
}

async function hitTest (_selector) {
	return await browser.execute(function (selector) {
		const
			target = document.querySelector(selector),
			targetRect = target.getBoundingClientRect(),
			targetDown = [targetRect.x + (targetRect.width / 2), targetRect.y + targetRect.height - 1],
			targetTop = [targetRect.x + (targetRect.width / 2), targetRect.y + 1];
		return target.contains(document.elementFromPoint(...targetDown)) || target.contains(document.elementFromPoint(...targetTop));
	}, _selector);
}

async function expectFocusedItem (itemNum) {
	const focusedId = await focusedElement();
	expect(focusedId).toBe(`item${itemNum}`);
}

async function expectNoFocusedItem () {
	expect(await browser.execute(function () {
		return document.activeElement === document.body;
	})).toBe(true);
}

async function waitUntilFocused (itemNum, comment = '') {
	const target = `item${itemNum}`;
	if (comment) {
		comment = ': ' + comment;
	}
	await browser.waitUntil(async function () {
		const focusedId = await focusedElement();
		return target === focusedId;
	}, {timeout: 1500, timeoutMsg: `timed out waiting to focus index ${itemNum}${comment}`});
	await browser.pause(500);
}

async function waitUntilVisible (itemNum) {
	await browser.waitUntil(function () {
		return hitTest(`#item${itemNum}`);
	},  {timeout: 1500, timeoutMsg: `timed out waiting until visible index ${itemNum}`});
	await browser.pause(500);
}

async function isScrolling () {
	return (await $('#scrolling').getText()) === 'Scrolling';
}

async function isNotScrolling () {
	return (await $('#scrolling').getText()) === 'Not Scrolling';
}

/**
 * Waits for scrolling to start, then stop
 *
 * @param {Number} [timeout=3000]
 */
async function waitForScrollStartStop (timeout = 3000) {
	await browser.waitUntil(await isScrolling, {timeout});
	await browser.waitUntil(await isNotScrolling, {timeout});
}

exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.focusedElement = focusedElement;
exports.waitForScrollStartStop = waitForScrollStartStop;
exports.waitUntilFocused = waitUntilFocused;
exports.waitUntilVisible = waitUntilVisible;
