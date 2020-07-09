'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';
const focusableBodySelector = '.Scroller_Scroller_focusableBody';

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
		return element('#focusableScrollbarKnobs', browser);
	}

	// scrollable api
	get focusableBody () {
		return $(`${focusableBodySelector}`);
	}
	get verticalScrollThumb () {
		return $(`${scrollThumbSelector}`);
	}
	get scroll () {
		return browser.execute(function (_scrollThumbSelector) {
			return {
				verticalScrollThumb: document.querySelectorAll(_scrollThumbSelector)[0],
				horizontalScrollThumb: document.querySelectorAll(_scrollThumbSelector)[1]
			};
		}, scrollThumbSelector);
	}

	// active element api
	getActiveElement () {
		return browser.execute(function () {
			return document.activeElement;
		});
	}
}

module.exports = new ScrollerPage();
