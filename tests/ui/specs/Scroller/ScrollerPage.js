'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';
const scrollVirticalThumbSelector = '.useScroll_ScrollbarTrack_vertical  .useScroll_ScrollbarTrack_thumb';
const scrollHorizontalThumbSelector = '.useScroll_useScroll_horizontalScrollbar .useScroll_ScrollbarTrack_thumb';
const verticalscrollbarSelector = '.useScroll_useScroll_verticalScrollbar';
const horizontalscrollbarSelector = '.useScroll_useScroll_horizontalScrollbar';
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
	get buttonLeft () {
		return element('#left', browser);
	}
	get buttonRight () {
		return element('#right', browser);
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
	/* global document */
	getScrollThumbPosition () {
		return browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector);
			return {
				vertical: scrollbar[0].style.getPropertyValue('--scrollbar-thumb-progress-ratio'),
				horizontal: scrollbar[1].style.getPropertyValue('--scrollbar-thumb-progress-ratio')
			};
		}, scrollbarSelector);
	}
	getScrollThumbLocation () {
		return browser.execute(function (_scrollThumbSelector) {
			const scrollThumb = document.querySelectorAll(_scrollThumbSelector);
			return {
				vertical: scrollThumb[0].getBoundingClientRect(),
				horizontal: scrollThumb[1].getBoundingClientRect()
			};
		}, scrollThumbSelector);
	}
	getScrollBarLocation () {
		return browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector);
			return {
				vertical: scrollbar[0].getBoundingClientRect(),
				horizontal: scrollbar[1].getBoundingClientRect()
			};
		}, scrollbarSelector);
	}
	moveToAwayThumb (direction, rtl, way) {
		if (direction === 'vertical') {
			const verticalScroll = way === 'Down' ? this.getScrollThumbLocation().vertical.bottom - this.getScrollBarLocation().vertical.top + 20 :
				this.getScrollThumbLocation().vertical.top - this.getScrollBarLocation().vertical.top - 20;
			$(`${verticalscrollbarSelector}`).moveTo({xOffset: 0, yOffset: Math.round(verticalScroll)});
		} else if (direction === 'horizontal') {
			if (rtl) {
				const horizontalScroll = way === 'Left' ? this.getScrollThumbLocation().horizontal.right - this.getScrollThumbLocation().horizontal.left - this.getScrollBarLocation().horizontal.left - 20 :
					this.getScrollThumbLocation().horizontal.right - this.getScrollBarLocation().horizontal.left + 20;
				$(`${horizontalscrollbarSelector}`).moveTo({xOffset: Math.round(horizontalScroll), yOffset: 0});
			} else {
				const horizontalScroll = way === 'Right' ? this.getScrollThumbLocation().horizontal.right + 20 :
					this.getScrollThumbLocation().horizontal.left - this.getScrollBarLocation().horizontal.left - 20;
				$(`${horizontalscrollbarSelector}`).moveTo({xOffset: Math.round(horizontalScroll), yOffset: 0});
			}
		}
	}
	getScrollOffsetLeft () {
		return browser.execute(function (_verticalscrollbarSelector) {
			const verticalscrollbar = document.querySelector(_verticalscrollbarSelector);
			return verticalscrollbar.offsetLeft;
		}, verticalscrollbarSelector);
	}
}

module.exports = new ScrollerPage();
