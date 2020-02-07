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

		this.components = {itemDefault, itemDisabled};
	}

	open (urlExtra) {
		super.open('Item-View', urlExtra);
	}
}

module.exports = new ItemPage();
