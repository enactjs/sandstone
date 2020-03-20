'use strict';
const {componentSelector, Page} = require('@enact/ui-test-utils/utils');

const elements = (selector) => (el) => el.$$(selector);
const getButtons = elements(componentSelector({component: 'Button'}));

class WizardPanelInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focusNextButton () {
		return browser.execute((el) => el.focus(), this.nextButton);
	}

	focusPrevButton () {
		return browser.execute((el) => el.focus(), this.prevButton);
	}

	get self () { return $(this.selector); }

	get nextButton () { return getButtons(this.self)[1]; }
	get prevButton () { return getButtons(this.self)[0]; }
}

class WizardPanelPage extends Page {
	constructor () {
		super();
		this.title = 'WizardPanel Test';
		this.components = {};
		this.components.wizardPanel = new WizardPanelInterface('wizardpanel');
	}

	open (urlExtra) {
		super.open('WizardPanel-View', urlExtra);
	}
}

module.exports = new WizardPanelPage();
