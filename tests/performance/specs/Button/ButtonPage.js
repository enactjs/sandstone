'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class ButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}

	hover () {
		return $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}

	get self () {
		return $(this.selector);
	}
}

class ButtonPage extends Page {
	constructor () {
		super();
		this.title = 'Button Test';
		const button = new ButtonInterface('button');


		this.components = {
			button,
		};
	}

	open (urlExtra) {
		super.open('Button-View', urlExtra);
	}
}

module.exports = new ButtonPage();
