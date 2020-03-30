'use strict';
const {componentSelector, Page} = require('@enact/ui-test-utils/utils');

const elements = (selector) => (el) => el.$$(selector);
const getButtons = elements(componentSelector({component: 'Button'}));
const viewSelector = view => `#view${view}`;

class WizardPanelInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	waitForEnter (view, duration = 1000) {
		this['view' + view].waitForExist(duration);
	}

	waitForLeave (view, duration = 1000) {
		this['view' + view].waitForExist(duration, true);
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

	get view1 () { return this.self.$(viewSelector(1)); }
	get view2 () { return this.self.$(viewSelector(2)); }
	get view3 () { return this.self.$(viewSelector(3)); }
	get view4 () { return this.self.$(viewSelector(4)); }
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
