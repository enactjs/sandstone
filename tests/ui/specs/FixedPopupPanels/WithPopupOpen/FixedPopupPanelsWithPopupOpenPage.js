'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class FixedPopupPanelsInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return browser.$(this.selector);
	}

	get openButton () {
		return browser.$('#openButton');
	}

	get closeButton () {
		return browser.$('#closeButton');
	}
}

class FixedPopupPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'FixedPopupPanelsWithPopupOpen Test';
		this.fixedPopupPanels = new FixedPopupPanelsInterface('fixedpopuppanels');
	}

	async open () {
		await super.open('FixedPopupPanelsWithPopupOpen-View');
	}
}

module.exports = new FixedPopupPanelsPage();
