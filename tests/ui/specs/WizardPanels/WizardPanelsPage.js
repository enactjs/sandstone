'use strict';
const {element, getComponent, Page} = require('@enact/ui-test-utils/utils');

const getHeaderSlot = (slot, el) => element(`.Panels_Header_${slot}`, el);
const getNextButton = el => getComponent({component: 'Button'}, getHeaderSlot('slotAfter', el));
const getPrevButton = el => getComponent({component: 'Button'}, getHeaderSlot('slotBefore', el));
const viewSelector = view => `#view${view}`;

class WizardPanelsInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	waitForEnter (view, timeout = 1000) {
		this['view' + view].waitForExist({timeout});
	}

	waitForLeave (view, timeout = 1000) {
		this['view' + view].waitForExist({timeout, reverse: true});
	}

	focusNextButton () {
		return browser.execute((el) => el.focus(), this.nextButton);
	}

	focusPrevButton () {
		return browser.execute((el) => el.focus(), this.prevButton);
	}

	get self () { return $(this.selector); }

	get nextButton () { return getNextButton(this.self); }
	get prevButton () { return getPrevButton(this.self); }

	get view1 () { return this.self.$(viewSelector(1)); }
	get view2 () { return this.self.$(viewSelector(2)); }
	get view3 () { return this.self.$(viewSelector(3)); }
	get view4 () { return this.self.$(viewSelector(4)); }
}

class WizardPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'WizardPanel Test';
		this.components = {};
		this.components.wizardPanels = new WizardPanelsInterface('wizardpanels');
	}

	open (urlExtra) {
		super.open('WizardPanels-View', urlExtra);
	}
}

module.exports = new WizardPanelsPage();
