'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

const panelSelector = panel => `#panel${panel}`;

class FlexiblePopupPanelsInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	waitForOpen (timeout = 1000) {
		this.self.waitForExist({timeout});
	}

	waitForClose (timeout = 1000) {
		this.self.waitForExist(timeout, true);
	}

	waitForEnter (panel, timeout = 1000) {
		this['panel' + panel].waitForExist({timeout});
	}

	waitForPanelBody (panel, timeout = 2500) {
		$(`${panelSelector(panel)} .Panels_Panel_visible`).waitForExist({timeout});
	}

	waitForLeave (panel, timeout = 1000) {
		this['panel' + panel].waitForExist({timeout, reverse: true});
	}

	focusOpenButton () {
		return browser.execute((el) => el.focus(), this.openButton);
	}

	focusNextButton () {
		return browser.execute((el) => el.focus(), this.nextButton);
	}

	focusPrevButton () {
		return browser.execute((el) => el.focus(), this.prevButton);
	}

	clickBelowPopup () {
		const offset = browser.execute(function () {
			const {top, left: left1} = document.querySelector('#openButton').getBoundingClientRect();
			const {bottom, left: left2} = document.querySelector('#panel1 .FlexiblePopupPanels_FlexiblePopupPanels_bodyLayout').getBoundingClientRect();

			return {x: Math.ceil(left2 - left1) + 12, y: Math.ceil(bottom - top) + 12};
		});

		// Have to target open button because it does not allow for clicking outside the parents
		// bounds, apparently.  Trying to offset from item1 or from panel1 does not work.
		$('#openButton').click(offset);
	}

	get self () {
		return browser.$(this.selector);
	}

	get openButton () {
		return browser.$('#openButton');
	}
	get nextButton () {
		return this.self.$('#nextButton');
	}
	get prevButton () {
		return this.self.$('#prevButton');
	}

	get singleItem () {
		return this.self.$('#singleItem');
	}

	get panel1 () {
		return this.self.$(panelSelector(1));
	}
	get panel2 () {
		return this.self.$(panelSelector(2));
	}
	get panel3 () {
		return this.self.$(panelSelector(3));
	}
	get panel4 () {
		return this.self.$(panelSelector(4));
	}
	get panel5 () {
		return this.self.$(panelSelector(5));
	}
	get panel6 () {
		return this.self.$(panelSelector(6));
	}
}

class FlexiblePopupPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'FlexiblePopupPanels Test';
		this.flexiblePopupPanels = new FlexiblePopupPanelsInterface('flexiblepopuppanels');
	}

	open (urlExtra) {
		super.open('FlexiblePopupPanels-View', urlExtra);
	}
}

module.exports = new FlexiblePopupPanelsPage();
