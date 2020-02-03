'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'ActivityPanels Test';
	}

	open (urlExtra) {
		super.open('ActivityPanels-View', urlExtra);
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
	get breadcrumb () { return browser.element('.Panels_Panels_breadcrumb'); }
	get breadcrumbHeader () { return browser.element('.Panels_Panels_breadcrumbHeader'); }
	get closeButton () { return browser.element('.Panels_ApplicationCloseButton_applicationCloseButton'); }
	get panelTitle () { return browser.getText('.Panels_Header_title .enact_ui_Marquee_Marquee_text'); }
	get body () { return browser.element('body'); }
}

module.exports = new SpotlightMultiplePage();
