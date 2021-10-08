function validateTitle (alert, title) {
	expect(alert.title).to.equal(title);
}

const expectClosed = (alert) => {
	expect(alert.isAlertExist).to.be.false();
};

const expectOpen = (alert) => {
	expect(alert.isAlertExist).to.be.true();
};

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
};
