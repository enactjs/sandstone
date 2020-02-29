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
		$(selector).waitForExist(duration);
	}

	waitForLeave (selector, duration = 1500) {
		$(selector).waitForExist(duration, true);
	}

	waitToClick (selector, duration) {
		$(selector).waitForExist(duration);
		$(selector).click();
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

	get item1 () { return $('#item1'); }
	get item2 () { return $('#item2'); }
	get item3 () { return $('#item3'); }
	get item4 () { return $('#item4'); }
	get item5 () { return $('#item5'); }
	get item6 () { return $('#item6'); }
	get item7 () { return $('#item7'); }
	get item8 () { return $('#item8'); }
	get button1 () { return $('#button1'); }
	get button2 () { return $('#button2'); }
	get button3 () { return $('#button3'); }
	get button4 () { return $('#button4'); }
	get breadcrumb () { return $(this.getBreadcrumbSelector()); }
	get breadcrumbHeader () { return $('.Panels_Panels_breadcrumbHeader'); }
	get closeButton () { return $('.Panels_ApplicationCloseButton_applicationCloseButton'); }
	get panelTitle () { return $('.Panels_Header_title .enact_ui_Marquee_Marquee_text').getText(); }
	get body () { return $('body'); }
}

module.exports = new SpotlightMultiplePage();
