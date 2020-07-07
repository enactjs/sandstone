'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';

class ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Test';
	}

	open (layout = '', urlExtra) {
		super.open(`Scroller${layout}-View`, urlExtra);
	}

	// button api
	get button1 () {
		return element('#Page_1_Button', browser);
	}
	get button2 () {
		return element('#Page_2_Button', browser);
	}
	get button3 () {
		return element('#Page_3_Button', browser);
	}
	get buttonTop () {
		return element('#top', browser);
	}
	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}

	// dropdown api
	get dropdownFocusableScrollbar () {
		return element('#focusableScrollbar', browser);
	}

	// scrollable api
	get scrollThumb () {
		return $(`${scrollThumbSelector}`);
	}

	// active element api
	getAriaLabel () {
		return browser.execute(function () {
			return document.activeElement.getAttribute('aria-label');
		});
	}
	getActiveElementClass () {
		return browser.execute(function () {
			return document.activeElement.className;
		});
	}
}

module.exports = new ScrollerPage();
