async function validateTitle (alert, title) {
	expect(await alert.title).to.equal(title);
}

const expectClosed = async (alert) => {
	expect(await alert.isAlertExist).to.be.false();
};

const expectOpen = async (alert) => {
	expect(await alert.isAlertExist).to.be.true();
};

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
};
