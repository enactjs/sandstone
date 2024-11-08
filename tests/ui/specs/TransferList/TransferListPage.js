'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

const listItemSelector = '.enact_ui_VirtualList_VirtualList_listItem';

class TransferListInterface {
	constructor(className) {
		this.className = className;
		this.selector = `${this.className}` // '.TransferList_TransferList_transferList';
	}

	get firstList() {
		return $$(`${this.selector} > div`)[0];
	}
	get secondList() {
		return $$(`${this.selector} > div`)[2];
	}
	get firstListItem() {
		return $$(`${this.selector} > div:nth-child(1) > div > div > div > div`);
	}
	get secondListItem() {
		return $$(`${this.selector} > div:nth-child(3) > div > div > div > div`);
	}

	async getItemSize () {
		return await browser.execute(function (_listItemSelector) {
			const itemContent = document.querySelector(_listItemSelector);
			const itemHeight = itemContent.getBoundingClientRect().height;
			const itemWidth = itemContent.getBoundingClientRect().width;
			return {
				height: itemHeight,
				width: itemWidth
			};
		}, listItemSelector);
	}
}

class TransferListPage extends Page {
	constructor() {
		super();
		this.title = 'TransferList Test';

		const transferList = new TransferListInterface('.TransferList_TransferList_transferList');

		this.components = {
			transferList
		}
	}

	async open (urlExtra) {
		await super.open('TransferList-View', urlExtra);
	}
}

module.exports = new TransferListPage();
