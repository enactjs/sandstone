'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';
const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';

class VirtualGridListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualGridList Test';

	}

	open (layout = '', urlExtra) {
		super.open(`VirtualGridList${layout}-View`, urlExtra);
	}

	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}
	get buttonTop () {
		return element('#top', browser);
	}
	get buttonLeft () {
		return element('#left', browser);
	}
	get buttonRight () {
		return element('#right', browser);
	}
	get buttonBottom () {
		return element('#bottom', browser);
	}
	get buttonMediaItem () {
		return element('#noLabel', browser);
	}
	get buttonWrap () {
		return element('#wrap', browser);
	}
	get buttonDirectionChange () {
		return element('#horizontal', browser);
	}
	get buttonModeChange () {
		return element('#translate', browser);
	}
	get buttonSpotlightDisabled () {
		return element('#spotlightDisabled', browser);
	}

	get inputNumItems () {
		return element('#numItems', browser);
	}
	get inputSpacing () {
		return element('#spacing', browser);
	}
	get inputMinWidth () {
		return element('#minWidth', browser);
	}
	get inputMinHeight () {
		return element('#minHeight', browser);
	}

	get scrollBar () {
		return $(`${scrollbarSelector}`);
	}
	get scrollBarSize () {
		return $(`${scrollbarSelector}`).getElementSize();
	}
	get list () {
		return element('#list', browser);
	}
	get listSize () {
		return $(`${scrollableSelector}`).getElementSize();
	}

	get scrollThumb () {
		return $(`${scrollThumbSelector}`);
	}
	scrollThumbPosition () {
		return browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelector(_scrollbarSelector);
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector);
	}

	item (id) {
		return element(`#${typeof id === 'number' ? `item${id}` : id}`, browser);
	}

	topLeftVisibleItemId () {
		return browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{top, left} = scroller.getBoundingClientRect();
			let currentY = top + 1;
			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(left + 30, currentY + i);
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

	bottomRightVisibleItemId () {
		return browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{bottom, left, width} = scroller.getBoundingClientRect();

			let currentY = bottom - 1;

			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(left + width - 30, currentY - i);

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

	itemOffsetTopById (id) {
		return browser.execute(function (_element) {
			return _element.getBoundingClientRect().top;
		}, this.item(id).value);
	}
}

module.exports = new VirtualGridListPage();
