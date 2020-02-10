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
}

class ItemPage extends Page {
	constructor () {
		super();
		this.title = 'Item Test';
		const itemDefault = new ItemInterface('item1');
		const itemDisabled = new ItemInterface('item2');
		const itemInline1 = new ItemInterface('item3');
		const itemInline2 = new ItemInterface('item4');
		const itemInline3 = new ItemInterface('item5');

		this.components = {itemDefault, itemDisabled, itemInline1, itemInline2, itemInline3};
	}

	open (urlExtra) {
		super.open('Item-View', urlExtra);
	}
}

module.exports = new ItemPage();
