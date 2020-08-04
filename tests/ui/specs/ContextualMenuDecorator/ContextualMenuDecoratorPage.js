'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

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

class MenuInterface {
	constructor (id) {
		this.id = id;
		this.selector = `[data-spotlight-id='${this.id}']`;
	}

	get self () {
		return $(this.selector);
	}
	get isMenuExist () {
		return this.self.isExisting();
	}

	item (n) {
		return element(`[data-index="${n}"]`, this.self);
	}
}

class ContextualMenuDecoratorPage extends Page {
	constructor () {
		super();
		this.title = 'ContextualMenuDecorator Test';
		const button1 = new ButtonInterface('button1');
		const button2 = new ButtonInterface('button2');
		const menu1 = new MenuInterface('menu1');
		const menu2 = new MenuInterface('menu2');

		this.components = {
			button1,
			button2,
			menu1,
			menu2
		};
	}

	open (urlExtra) {
		super.open('ContextualMenuDecorator-View', urlExtra);
	}
}

module.exports = new ContextualMenuDecoratorPage();
