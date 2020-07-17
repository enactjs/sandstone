'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');


const focusableBodySelector = '.Scroller_Scroller_focusableBody';
const horizontalscrollbarSelector = '.useScroll_useScroll_horizontalScrollbar';
const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';
const scrollContentSelector = '.enact_ui_Scroller_Scroller_scroller';
const scrollHorizontalThumbSelector = '.useScroll_useScroll_horizontalScrollbar .useScroll_ScrollbarTrack_thumb';
const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';
const scrollVirticalThumbSelector = '.useScroll_ScrollbarTrack_vertical  .useScroll_ScrollbarTrack_thumb';
const verticalscrollbarSelector = '.useScroll_useScroll_verticalScrollbar';




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
	getScrollerRect () {
		return browser.execute(function (_scrollContentSelector) {
			const scroller = document.querySelector(_scrollContentSelector);
			return scroller.getBoundingClientRect();
		}, scrollContentSelector);
	}
	getScrollThumbRect () {
		return browser.execute(function (_scrollThumbSelector) {
			const scrollThumb = document.querySelectorAll(_scrollThumbSelector);
			return {
				vertical: scrollThumb[0].getBoundingClientRect(),
				horizontal: scrollThumb[1].getBoundingClientRect()
			};
		}, scrollThumbSelector);
	}
	getScrollBarRect () {
		return browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector);
			return {
				vertical: scrollbar[0].getBoundingClientRect(),
				horizontal: scrollbar[1].getBoundingClientRect()
			};
		}, scrollbarSelector);
	}
	moveToScrollTrack (direction, way) {
		if (direction === 'vertical') {
			const verticalScroll = way === 'Down' ? this.getScrollThumbRect().vertical.bottom - this.getScrollBarRect().vertical.top + 50 :
				this.getScrollThumbRect().vertical.top - this.getScrollBarRect().vertical.top - 50;
			$(`${verticalscrollbarSelector}`).moveTo({xOffset: 0, yOffset: Math.round(verticalScroll)});
		} else if (direction === 'horizontal') {
			const horizontalScroll = way === 'Left' ? this.getScrollThumbRect().horizontal.left - this.getScrollBarRect().horizontal.left - 50 :
				this.getScrollThumbRect().horizontal.right - this.getScrollBarRect().horizontal.left + 50;
			$(`${horizontalscrollbarSelector}`).moveTo({xOffset: Math.round(horizontalScroll), yOffset: 0});
		}
	}
	getVerticalScrollOffsetLeft () {
		return browser.execute(function (_verticalscrollbarSelector) {
			const verticalscrollbar = document.querySelector(_verticalscrollbarSelector);
			return verticalscrollbar.offsetLeft === 0 ? 0 : verticalscrollbar.offsetLeft + verticalscrollbar.clientWidth;
		}, verticalscrollbarSelector);
	}
	getHorizontalScrollOffsetTop () {
		return browser.execute(function (_horizontalscrollbarSelector) {
			const horizontalscrollbar = document.querySelector(_horizontalscrollbarSelector);
			return horizontalscrollbar.offsetTop + horizontalscrollbar.clientHeight;
		}, horizontalscrollbarSelector);
	}
}

module.exports = new ScrollerPage();
