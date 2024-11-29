'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const viewSelector = view => `#view${view}`;

class QuickGuidePanelsInterface {
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
		return await element('[aria-label="Next"]', this.self);
	}
	async prevButton () {
		return await element('[aria-label="Previous"]', this.self);
	}
	async closeButton () {
		return await element('[aria-label="Exit Quick Guide"]', this.self);
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
}

class QuickGuidePanelsPage extends Page {
	constructor () {
		super();
		this.title = 'QuickGuidePanels Test';
		this.components = {};
		this.components.quickGuidePanels = new QuickGuidePanelsInterface('quickguidepanels');
	}

	async open (urlExtra) {
		await super.open('QuickGuidePanels-View', urlExtra);
	}
}

module.exports = new QuickGuidePanelsPage();
