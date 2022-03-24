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

exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.focusedElement = focusedElement;
