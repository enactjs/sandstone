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
	get isButtonExist () {
		return this.self.isExisting();
	}
}

class ContextualPopupDecoratorPage extends Page {
	constructor () {
		super();
		this.title = 'ContextualPopupDecorator Test';
		const button1 = new ButtonInterface('button1');

		this.components = {
			button1
		};
	}

	open (urlExtra) {
		super.open('ContextualPopupDecorator-View', urlExtra);
	}
}

module.exports = new ContextualPopupDecoratorPage();
