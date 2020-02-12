'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'ActivityPanels Test';
	}

	open (urlExtra) {
		super.open('ActivityPanels-View', urlExtra);
	}

	waitForExist (selector, duration) {
		browser.waitForExist(selector, duration);
	}

	waitForLeave (selector, duration) {
		browser.waitForExist(selector, duration, true);
	}

	waitToClick (selector, duration) {
		this.waitForExist(selector, duration);
		browser.element(selector).click();
	}

	waitForPanelEnter (index, duration) {
		this.waitForExist(this.getPanelSelector(index), duration);
	}

	waitForPanelLeave (index, duration) {
		this.waitForLeave(this.getPanelSelector(index), duration);
	}

	getBreadcrumbSelector (index) {
		if (index == null) {
			return '.Panels_Panels_breadcrumb';
		}

		return `.Panels_Panels_breadcrumb[data-index="${index}"]`;
	}

	getPanelSelector (index) {
		if (index == null) {
			return '.Panels_Panels_panel';
		}

		return `.Panels_Panel_panel[data-index="${index}"]`;
	}

	get item1 () { return browser.element('#item1'); }
	get item2 () { return browser.element('#item2'); }
	get item3 () { return browser.element('#item3'); }
	get item4 () { return browser.element('#item4'); }
	get item5 () { return browser.element('#item5'); }
	get item6 () { return browser.element('#item6'); }
	get item7 () { return browser.element('#item7'); }
	get item8 () { return browser.element('#item8'); }
	get button1 () { return browser.element('#button1'); }
	get button2 () { return browser.element('#button2'); }
	get button3 () { return browser.element('#button3'); }
	get button4 () { return browser.element('#button4'); }
	get breadcrumb () { return browser.element(this.getBreadcrumbSelector()); }
	get breadcrumbHeader () { return browser.element('.Panels_Panels_breadcrumbHeader'); }
	get closeButton () { return browser.element('.Panels_ApplicationCloseButton_applicationCloseButton'); }
	get panelTitle () { return browser.element('.Panels_Header_title .enact_ui_Marquee_Marquee_text').getText(); }
	get body () { return browser.element('body'); }
}

module.exports = new SpotlightMultiplePage();
