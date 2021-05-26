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

	get isOpen () {
		return $('.ContextualPopupDecorator_ContextualPopup_container').isExisting();
	}
}

class ContextualPopupDecoratorPage extends Page {
	constructor () {
		super();
		this.title = 'ContextualPopupDecorator Test';
		const button1 = new ButtonInterface('button1');
		const button2 = new ButtonInterface('button2');
		const button3 = new ButtonInterface('button3');

		this.components = {button1, button2, button3};
	}

	open (urlExtra) {
		super.open('ContextualPopupDecorator-View', urlExtra);
	}
}

module.exports = new ContextualPopupDecoratorPage();
