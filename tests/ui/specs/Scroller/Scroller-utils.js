async function disabledAttribute () {
	return await browser.execute(function () {
		return document.activeElement?.getAttribute?.('aria-disabled') === 'true';
	});
}

async function enableEditModeLongPress () {
	await browser.execute(() => {
		// eslint-disable-next-line no-undef
		const event = new KeyboardEvent('keydown', {code: 'Enter', key: 'Enter', keyCode: 13, repeat: true});
		const element = document.activeElement;
		element.dispatchEvent(event);
	});
	await browser.pause(500);
	await browser.execute(() => {
		// eslint-disable-next-line no-undef
		const event = new KeyboardEvent('keyup', {code: 'Enter', key: 'Enter', keyCode: 13});
		const element = document.activeElement;
		element.dispatchEvent(event);
	});
}

async function expectDeleteButton (expectedIndex, comment = 'delete button') {
	const {ariaLabel, index} = await focusedItemButton();
	expect(index, comment).to.equal(expectedIndex);
	expect(ariaLabel, comment).to.equal('Delete');
}

async function expectDisabledItem (expectedIndex, comment = 'disabled item') {
	const {index} = await findItemWrapper();
	const disabled = await disabledAttribute();
	expect(index, comment).to.equal(expectedIndex);
	expect(disabled, comment).to.be.true();
}

async function expectFocusedIconItem (expectedIndex, comment = 'focused item') {
	const {index} = await findItemWrapper();
	expect(index, comment).to.equal(expectedIndex);
}

async function expectFocusedItem (itemNum, comment = 'focused item') {
	const focusedId = await focusedElement();
	expect(focusedId, comment).to.equal(`item${itemNum}`);
}

async function expectItemWrapperClass (expectedClass, comment = 'item wrapper class') {
	const {classList} = await findItemWrapper();
	expect(classList?.includes?.(expectedClass), comment).to.be.true();
}

async function expectNoFocusedItem () {
	expect(await browser.execute(function () {
		return document.activeElement === document.body;
	})).to.be.true();
}

async function findItemWrapper () {
	return await browser.execute(function () {
		let node = document.activeElement;
		let index;
		while (node.dataset) {
			index = node.dataset['index'];
			if (index) {
				break;
			}
			node = node.parentNode;
		}
		return {
			node: node ?? null,
			index: index ?? null,
			classList: node?.classList
		};
	});
}

async function focusedElement () {
	return await browser.execute(function () {
		return document.activeElement.id;
	});
}

async function focusedItemButton () {
	const {index} = await findItemWrapper();
	return await browser.execute(function () {
		const node = document.activeElement;
		return {
			ariaLabel: node.ariaLabel,
			index
		};
	});
}

exports.enableEditModeLongPress = enableEditModeLongPress;
exports.expectDeleteButton = expectDeleteButton;
exports.expectDisabledItem = expectDisabledItem;
exports.expectFocusedIconItem = expectFocusedIconItem;
exports.expectFocusedItem = expectFocusedItem;
exports.expectItemWrapperClass = expectItemWrapperClass;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.focusedElement = focusedElement;
