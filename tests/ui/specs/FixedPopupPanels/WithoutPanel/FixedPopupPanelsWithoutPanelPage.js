'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

const panelSelector = panel => `#panel${panel}`;

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
	get item1 () {
		return this.self.$('#item1');
	}
	get panel1 () {
		return this.self.$(panelSelector(1));
	}
}

class FixedPopupPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'FixedPopupPanelsWithoutPanel Test';
		this.fixedPopupPanels = new FixedPopupPanelsInterface('fixedpopuppanels');
	}

	open () {
		super.open('FixedPopupPanelsWithoutPanel-View');
	}
}

module.exports = new FixedPopupPanelsPage();
