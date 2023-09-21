'use strict';
const {element, getComponent, Page} = require('@enact/ui-test-utils/utils');

const getHeaderSlot = (slot, el) => element(`.Panels_Header_${slot}`, el);
const getNextButton = async el => await getComponent({component: 'Button'}, await getHeaderSlot('slotAfter', el));
const getPrevButton = async el => await getComponent({component: 'Button'}, await getHeaderSlot('slotBefore', el));
const viewSelector = view => `#view${view}`;

class WizardPanelsInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async waitForEnter (view, timeout = 1000) {
		await this['view' + view].waitForExist({timeout});
	}

	async waitForLeave (view, timeout = 2000) {
		await this['view' + view].waitForExist({timeout, reverse: true});
	}

	async focusNextButton () {
		return await browser.execute(async (el) => await el.focus(), await this.nextButton());
	}

	async focusPrevButton () {
		return await browser.execute(async (el) => await el.focus(), await this.prevButton());
	}

	get self () {
		return $(this.selector);
	}

	async nextButton () {
		return await getNextButton(this.self);
	}
	async prevButton () {
		return await getPrevButton(this.self);
	}

	get view1 () {
		return this.self.$(viewSelector(1));
	}
	get view2 () {
		return this.self.$(viewSelector(2));
	}
	get view3 () {
		return this.self.$(viewSelector(3));
	}
	get view4 () {
		return this.self.$(viewSelector(4));
	}
}

class WizardPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'WizardPanels Test';
		this.components = {};
		this.components.wizardPanels = new WizardPanelsInterface('wizardpanels');
	}

	async open (urlExtra) {
		await super.open('WizardPanels-View', urlExtra);
	}
}

module.exports = new WizardPanelsPage();
