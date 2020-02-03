'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');


class ItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
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
