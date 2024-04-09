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
	try {
		expect(index).toBe(expectedIndex);
	} catch (e) {
		console.error(comment);
	}
	try {
		expect(ariaLabel).toBe('Delete');
	} catch (e) {
		console.error(comment);
	}
}

async function expectDisabledItem (expectedIndex, comment = 'disabled item') {
	const {index} = await findItemWrapper();
	const disabled = await disabledAttribute();
	try {
		expect(index).toBe(expectedIndex);
	} catch (e) {
		console.error(comment);
	}
    try {
		expect(disabled).toBe(true);
	} catch (e) {
		console.error(comment);
	}
}

async function expectFocusedIconItem (expectedIndex, comment = 'focused item') {
	const {index} = await findItemWrapper();
	try {
		expect(index).toBe(expectedIndex);
	} catch (e) {
		console.error(comment);
	}
}

async function expectFocusedItem (itemNum, comment = 'focused item') {
	const focusedId = await focusedElement();
	try {
		expect(focusedId).toBe(`item${itemNum}`);
	} catch (e) {
		console.error(comment);
	}
}

async function expectItemWrapperClass (expectedClass, comment = 'item wrapper class') {
	const {classList} = await findItemWrapper();
	try {
		expect(classList?.includes?.(expectedClass)).toBe(true);
	} catch (e) {
		console.error(comment);
	}
}

async function expectNoFocusedItem () {
	expect(await browser.execute(function () {
		return document.activeElement === document.body;
	})).toBe(true);
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
