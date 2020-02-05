// Utility methods for testing

function validateTitle (popup, title) {
	expect(popup.title).to.equal(title);
}

function expectClosed (popup) {
	expect(popup.isPopupExist).to.be.false();
	expect(popup.isScrimExist).to.be.false();
}

function expectOpen (popup) {
	expect(popup.isPopupExist).to.be.true();
	expect(popup.isScrimExist).to.be.true();
}

function expectNoneScrimOpen (popup) {
	expect(popup.isPopupExist).to.be.true();
	expect(popup.isScrimExist).to.be.false();
}

function expectCloseButton (popup) {
	expect(popup.isCloseButton).to.be.true();
	expect(popup.closeSymbol).to.equal('󯿵');
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen,
	expectNoneScrimOpen,
	expectCloseButton
};
