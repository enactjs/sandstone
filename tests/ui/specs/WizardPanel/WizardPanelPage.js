'use strict';
const {element, getComponent, getSubComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getButton = getComponent({component: 'TabLayout', child: 'tabs'});

class WizardPanelInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focusNextButton () {
		return browser.execute((el) => el.focus(), $('.Panels_WizardPanel_nextButton'));
	}
	focusPrevButton () {
		return browser.execute((el) => el.focus(), $('.Panels_WizardPanel_prevButton'));
	}

	get self () {return element(this.selector);}

	get nextButton () { return element('.Panels_WizardPanel_nextButton', browser); }
	get prevButton () { return element('.Panels_WizardPanel_prevButton', browser); }
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
