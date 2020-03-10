'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class ButtonInterface {
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

	get self () { return element(this.selector); }
	get isButtonExist () { return this.self.isExisting(); }
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
