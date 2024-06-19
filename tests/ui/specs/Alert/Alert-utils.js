async function validateTitle (alert, title) {
	expect(await alert.title).toBe(title);
}

const expectClosed = async (alert) => {
	expect(await alert.isAlertExist).toBe(false);
};

const expectOpen = async (alert) => {
	expect(await alert.isAlertExist).toBe(true);
};

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
};
