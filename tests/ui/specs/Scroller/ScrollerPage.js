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
		return element('#focusableScrollbarKnobs', browser);
	}

	// scrollable api
	get scrollThumb () {
		return $(`${scrollThumbSelector}`);
	}

	// active element api
	getActiveElement () {
		return browser.execute(function () {
			const activeElement = document.activeElement;
			return {
				ariaLabel:  activeElement.getAttribute('aria-label'),
				id: activeElement.id,
				isfocusableBody: activeElement.className === 'Scroller_Scroller_focusableBody spottable'
			};
		});
	}
}

module.exports = new ScrollerPage();
