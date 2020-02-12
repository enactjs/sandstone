'use strict';
const {Page} = require('@enact/ui-test-utils/utils');


class ItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.selectorExecute(this.selector, (els) => els && !els[0].focus());
	}

	hover () {
		return browser.moveToObject(this.selector, 0, 0);
	}

	get self () { return browser.element(this.selector); }
	get content () { return this.self.getText('.Item_Item_content'); }
}

class ItemPage extends Page {
	constructor () {
		super();
		this.title = 'Item Test';
<<<<<<< HEAD
		const item1Default = new ItemInterface('item1DefaultSelected');
		const item2Disabled = new ItemInterface('item2Disabled');
		const item3WithLabel = new ItemInterface('item3WithLabel');
		const item4Inline = new ItemInterface('item4Inline');
		const item5InLineDisabled = new ItemInterface('item5InLineDisabled');
		this.components = {item1Default, item2Disabled, item3WithLabel, item4Inline, item5InLineDisabled};
=======
		const itemDefault = new ItemInterface('item1');
		const itemDisabled = new ItemInterface('item2');
		const itemInline1 = new ItemInterface('item3');
		const itemInline2 = new ItemInterface('item4');
		const itemInline3 = new ItemInterface('item5');

		this.components = {itemDefault, itemDisabled, itemInline1, itemInline2, itemInline3};
>>>>>>> develop
	}

	open (urlExtra) {
		super.open('Item-View', urlExtra);
	}
}

module.exports = new ItemPage();
