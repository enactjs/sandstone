'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const {focusedElement, waitUntilFocused} = require('../VirtualList-utils');

const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';
const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';

	}

	open (urlExtra) {
		super.open('VirtualList-View', urlExtra);
	}

	get buttonHideScrollbar () { return element('#hideScrollbar', browser); }
	get buttonTop () { return element('#top', browser); }
	get buttonLeft () { return element('#left', browser); }
	get buttonRight () { return element('#right', browser); }
	get buttonBottom () { return element('#bottom', browser); }
	get buttonWrap () { return element('#wrap', browser); }
	get scrollbar () { return $(`${scrollbarSelector}`); }
	get scrollBarSize () { return $(`${scrollbarSelector}`).getElementSize(); }
	get scrollThumb () { return $(`${scrollThumbSelector}`); }
	getScrollThumbPosition () {
		return browser.execute(function (_scrollbarSelector){
			const scrollbar = document.querySelector(_scrollbarSelector);
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector);

	}
	get list () { return element('#list', browser); }
	get listSize () { return $(`${scrollableSelector}`).getElementSize(); }

	item (id) {
		return element(`#${typeof id === 'number' ? `item${id}` : id}`, browser);
	}

	/* global document */
	topVisibleItemId () {
		return browser.execute(function (_scrollableSelector) {
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

	/* global document */
	bottomVisibleItemId () {
		return browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{bottom, left, width} = scroller.getBoundingClientRect();

			let currentY = bottom - 1,
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

	/* global document */
	itemOffsetTopById (id) {
		return browser.execute(function (_element) {
			return _element.getBoundingClientRect().top;
		}, this.item(id).value);
	}

	fiveWayToItem (itemNum) {
		const currentItem = Number(focusedElement().slice(4));
		expect(Number.isNaN(currentItem), 'Not focused to an item').to.be.false();

		const direction = currentItem < itemNum ? 1 : -1;

		for (let i = currentItem; i !== itemNum; i = i + direction) {
			if (direction > 0) {
				this.spotlightDown();
			} else {
				this.spotlightUp();
			}
			waitUntilFocused(i + direction);
		}
	}
}

module.exports = new VirtualListPage();
