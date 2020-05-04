'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class PanelInterface {
	constructor (id) {
		this.id = id;
	}

	getHeaderTop () {
		return browser.execute((el) => el.getBoundingClientRect().top, this.header);
	}

	get self () { return $(`#${this.id}`); }
	get content () { return $('#content'); }
	get header () { return $('#header'); }
	get scroller () { return $('#scroller'); }
}

class PanelPage extends Page {
	constructor () {
		super();
		this.title = 'Panel Test';
		this.panel = new PanelInterface('Panel');
	}

	open (urlExtra) {
		super.open('Panel-View', urlExtra);
	}
}

module.exports = new PanelPage();
