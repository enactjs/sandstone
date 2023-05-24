export async function validateTitle (alert, title) {
	expect(await alert.title).to.equal(title);
}

export const expectClosed = async (alert) => {
	expect(await alert.isAlertExist).to.be.false();
};

export const expectOpen = async (alert) => {
	expect(await alert.isAlertExist).to.be.true();
};

// module.exports = {
// 	validateTitle,
// 	expectClosed,
// 	expectOpen
// };
