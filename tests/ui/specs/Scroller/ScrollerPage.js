'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const focusableBodySelector = '.Scroller_Scroller_focusableBody';
const horizontalscrollbarSelector = '.useScroll_useScroll_horizontalScrollbar';
const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';
const scrollContentSelector = '.enact_ui_Scroller_Scroller_scroller';
const scrollHorizontalThumbSelector = '.useScroll_useScroll_horizontalScrollbar .useScroll_ScrollbarTrack_thumb';
const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';
const scrollVerticalThumbSelector = '.useScroll_ScrollbarTrack_vertical  .useScroll_ScrollbarTrack_thumb';
const verticalscrollbarSelector = '.useScroll_useScroll_verticalScrollbar';

class ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Test';
	}

	async open (layout = '', urlExtra) {
		await super.open(`Scroller${layout}-View`, urlExtra);
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

	get buttonLeft () {
		return element('#left', browser);
	}
	get buttonRight () {
		return element('#right', browser);
	}
	get buttonTop () {
		return element('#top', browser);
	}
	get buttonBottom () {
		return element('#bottom', browser);
	}

	get buttonRemoveItem () {
		return element('#removeItem', browser);
	}
	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}
	get buttonNativeScroll () {
		return element('#nativeScroll', browser);
	}
	get buttonSpotlightDisabled () {
		return element('#spotlightDisabled', browser);
	}
	get buttonEditableCentered () {
		return element('#editableCentered', browser);
	}

	get buttonShowItem () {
		return element('#showItem', browser);
	}

	// dropdown api
	get dropdownFocusableScrollbar () {
		return element('#focusableScrollbarKnobs', browser);
	}

	// scrollable api
	get scroller () {
		return element('#scroller', browser);
	}
	get focusableBody () {
		return $(`${focusableBodySelector}`);
	}
	get verticalScrollThumb () {
		return $(`${scrollVerticalThumbSelector}`);
	}
	get horizontalScrollThumb () {
		return $(`${scrollHorizontalThumbSelector}`);
	}

	// InputField api
	get inputFieldNumItems () {
		return element('#numItems', browser);
	}

	async getScrollThumbPosition () {
		return await browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector);
			return {
				vertical: scrollbar[0].style.getPropertyValue('--scrollbar-thumb-progress-ratio'),
				horizontal: scrollbar[1].style.getPropertyValue('--scrollbar-thumb-progress-ratio')
			};
		}, scrollbarSelector);
	}
	async getScrollerRect () {
		return await browser.execute(function (_scrollContentSelector) {
			const scroller = document.querySelector(_scrollContentSelector);
			return scroller.getBoundingClientRect();
		}, scrollContentSelector);
	}
	async getScrollThumbRect () {
		return await browser.execute(function (_scrollThumbSelector) {
			const scrollThumb = document.querySelectorAll(_scrollThumbSelector);
			return {
				vertical: scrollThumb[0].getBoundingClientRect(),
				horizontal: scrollThumb[1].getBoundingClientRect()
			};
		}, scrollThumbSelector);
	}
	async getScrollBarRect () {
		return await browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector);
			return {
				vertical: scrollbar[0].getBoundingClientRect(),
				horizontal: scrollbar[1].getBoundingClientRect()
			};
		}, scrollbarSelector);
	}

	async clickScrollTrack (direction, way) {
		if (direction === 'vertical') {
			const clickPositionFromCenter = way === 'Down' ? 300 : -300;
			await $(`${verticalscrollbarSelector}`).click({y: clickPositionFromCenter});
		} else if (direction === 'horizontal') {
			const clickPositionFromCenter = way === 'Left' ? -500 : 500;
			await $(`${horizontalscrollbarSelector}`).click({x: clickPositionFromCenter});
		}
	}

	async getVerticalScrollOffsetLeft () {
		return await browser.execute(function (_verticalscrollbarSelector) {
			const verticalscrollbar = document.querySelector(_verticalscrollbarSelector);
			return verticalscrollbar.offsetLeft === 0 ? 0 : verticalscrollbar.offsetLeft + verticalscrollbar.clientWidth;
		}, verticalscrollbarSelector);
	}
	async getHorizontalScrollOffsetTop () {
		return await browser.execute(function (_horizontalscrollbarSelector) {
			const horizontalscrollbar = document.querySelector(_horizontalscrollbarSelector);
			return horizontalscrollbar.offsetTop + horizontalscrollbar.clientHeight;
		}, horizontalscrollbarSelector);
	}

	async topVisibleItemId () {
		return await browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{top, left, width} = scroller.getBoundingClientRect();
			let currentY = top + 1,
				middle = left + Math.floor((left + width) / 2);
			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(middle, currentY + i);
				// Search parents for the row ID
				while (el && el !== scroller && el !== document.body) {
					if (el.id) {
						return el.id;
					} else {
						el = el.parentNode;
					}
				}
				// else, it's inside the list itself, increment y and try again
			}
			return 'unknown';	// we didn't find it?!
		}, scrollableSelector);
	}

	async bottomVisibleItemId () {
		return await browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{bottom, left, width} = scroller.getBoundingClientRect();
			// affordance space to draw the bottom shadow. affordanceSize is 48 for 4k and 24 for FHD.
			const affordanceSize = 24;
			let currentY = bottom - affordanceSize - 1,
				middle = left + Math.floor((left + width) / 2);

			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(middle, currentY - i);

				// Search parents for the row ID
				while (el && el !== scroller && el !== document.body) {
					if (el.id) {
						return el.id;
					} else {
						el = el.parentNode;
					}
				}
				// else, it's inside the list itself, decrement y and try again
			}
			return 'unknown';	// we didn't find it?!
		}, scrollableSelector);
	}

	async getActiveElementRect () {
		return await browser.execute(function () {
			return document.activeElement.getBoundingClientRect();
		});
	}

	async checkEditableItem () {
		return await browser.execute(function () {
			const itemWrapperClass = 'tests_ui_apps_Scroller_WithEditableSelectItemByLongPress_ScrollerWithEditableSelectItemByLongPress_itemWrapper Scroller_EditableWrapper_selected tests_ui_apps_Scroller_WithEditableSelectItemByLongPress_ScrollerWithEditableSelectItemByLongPress_selected';
			return document.activeElement.parentElement.className === itemWrapperClass;
		});
	}

	async backSpace () {
		return await this.keyDelay('Backspace');
	}

	async numPad (num) {
		let Inputnum = 'numpad' + String(num);
		return await this.keyDelay(Inputnum);
	}

	async moveSpotlight (times = 0, directionFunc = 'spotlightRight') {
		for (let i = 0; i < times; i++) {
			await this[directionFunc]();
		}
	}
}

module.exports = new ScrollerPage();
