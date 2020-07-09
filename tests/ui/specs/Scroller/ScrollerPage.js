'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollVirticalThumbSelector = '.useScroll_useScroll_verticalScrollbar .useScroll_ScrollbarTrack_thumb';
const scrollHorizontalThumbSelector = '.useScroll_useScroll_horizontalScrollbar .useScroll_ScrollbarTrack_thumb';

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
	get verticalScrollThumb () {
		return $(`${scrollVirticalThumbSelector}`);
	}
	get horizontalScrollThumb () {
		return $(`${scrollHorizontalThumbSelector}`);
	}
	getScrollThumbPosition () {
		return browser.execute(function (_scrollVirticalThumbSelector, _scrollHorizontalThumbSelector) {
			const verticalScrollThumb = document.querySelector(_scrollVirticalThumbSelector);
			const horizontalScrollThumb = document.querySelector(_scrollHorizontalThumbSelector);
			return {
				vertical: getComputedStyle(verticalScrollThumb).getPropertyValue('--scrollbar-thumb-progress-ratio'),
				horizontal: getComputedStyle(horizontalScrollThumb).getPropertyValue('--scrollbar-thumb-progress-ratio')
			};
		}, scrollVirticalThumbSelector, scrollHorizontalThumbSelector);
	}
}

module.exports = new ScrollerPage();
