// Utility methods for testing

async function validateTitle (popup, title) {
	expect(await popup.title).toBe(title);
}

async function expectClosed (popup) {
	expect(await popup.isPopupExist).toBe(false);
	expect(await popup.isScrimExist).toBe(false);
}

async function expectOpen (popup) {
	expect(await popup.isPopupExist).toBe(true);
	expect(await popup.isScrimExist).toBe(true);
}

async function expectNoneScrimOpen (popup) {
	expect(await popup.isPopupExist).toBe(true);
	expect(await popup.isScrimExist).toBe(false);
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen,
	expectNoneScrimOpen
};
