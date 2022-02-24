'use strict';
const {Page} = require('@enact/ui-test-utils/utils');


class ItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(this.selector));
	}

	async hover () {
		return await $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}

	get self () {
		return $(this.selector);
	}
}

class ItemPage extends Page {
	constructor () {
		super();
		this.title = 'Item Test';
		const item1 = new ItemInterface('item1');
		const item2Disabled = new ItemInterface('item2Disabled');
		const item3WithLabel = new ItemInterface('item3WithLabel');
		const item4Inline = new ItemInterface('item4Inline');
		const item5InLineDisabled = new ItemInterface('item5InLineDisabled');
		const item6Inline = new ItemInterface('item6Inline');
		const item7Inline = new ItemInterface('item7Inline');
		const item8Inline = new ItemInterface('item8Inline');
		const item9 = new ItemInterface('item9');
		this.components = {item1, item2Disabled, item3WithLabel, item4Inline, item5InLineDisabled, item6Inline, item7Inline, item8Inline, item9};
	}

	async open (urlExtra) {
		await super.open('Item-View', urlExtra);
	}
}

module.exports = new ItemPage();
