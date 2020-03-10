const clickElement = (el) => {
	el.click();
};

const selectTab = (tab) => browser.execute(clickElement, tab);

module.exports = {
	selectTab
};
