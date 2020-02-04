'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');


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
		const itemDefault1 = new ItemInterface('item1');
		const item2Disabled = new ItemInterface('item2');
		const itemDefault3 = new ItemInterface('item3');

		this.components = {itemDefault1, item2Disabled, itemDefault3};
	}

	open (urlExtra) {
		super.open('Item-View', urlExtra);
	}
}

module.exports = new ItemPage();
