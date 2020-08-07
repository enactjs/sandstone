'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class PanelInterface {
	constructor (index) {
		this.index = index;
		this.id = `Panel${index}`;
	}

	get self () {
		return $(`#${this.id}`);
	}
	get header () {
		return $(`#header${this.index}`);
	}
	get body () {
		return $(`#body${this.index}`);
	}

	get nextButton () {
		return $(`#next${this.index}`);
	}
	get prevButton () {
		return $(`#prev${this.index}`);
	}

	waitForEnter () {
		this.body.waitForExist();
	}
}

class PanelPage extends Page {
	constructor () {
		super();
		this.title = 'Panel Test';
		this.panel1 = new PanelInterface(1);
		this.panel2 = new PanelInterface(2);
		this.panel3 = new PanelInterface(3);
		this.panel4 = new PanelInterface(4);
		this.panel5 = new PanelInterface(5);
		this.panel6 = new PanelInterface(6);
		this.panel7 = new PanelInterface(7);
	}

	focus (el) {
		browser.execute(e => e.focus(), el);
	}

	get focusedText () {
		return browser.execute(() => {
			return document.activeElement === document.body ? null : document.activeElement.textContent;
		});
	}

	open (urlExtra) {
		super.open('Panel-View', urlExtra);
	}
}

module.exports = new PanelPage();
