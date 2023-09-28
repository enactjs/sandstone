async function enableEditModeLongPress () {
	await browser.execute(() => {
		// eslint-disable-next-line no-undef
		const event = new KeyboardEvent('keydown', {code: 'Enter', key: 'Enter', keyCode: 13, repeat: true});
		const element = document.activeElement;
		element.dispatchEvent(event);
	});
	await browser.pause(500);
}

async function focusedElement () {
	return await browser.execute(function () {
		return document.activeElement.id;
	});
}

async function expectFocusedItem (itemNum, comment = 'focused item') {
	const focusedId = await focusedElement();
	expect(focusedId, comment).to.equal(`item${itemNum}`);
}

async function expectNoFocusedItem () {
	expect(await browser.execute(function () {
		return document.activeElement === document.body;
	})).to.be.true();
}

exports.enableEditModeLongPress = enableEditModeLongPress;
exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.focusedElement = focusedElement;
