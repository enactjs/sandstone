'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const listItemSelector = '.enact_ui_VirtualList_VirtualList_listItem';
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
	get buttonAddItem () {
		return element('#plus', browser);
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
	scrollThumbPosition (index = 0) {
		return browser.execute(function (_scrollbarSelector, _index) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector)[_index];
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector, index);

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
				{bottom, width} = scroller.getBoundingClientRect();

			let currentY = bottom - 1;

			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(width - 30, currentY - 18 - i);

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

	itemOffsetTopById (index) {
		return browser.execute(function (_listItemSelector, _scrollableSelector, _index) {
			const itemContent = document.querySelectorAll(_listItemSelector)[_index];
			const scroller = document.querySelector(_scrollableSelector);
			return Math.round(scroller.getBoundingClientRect().height + scroller.getBoundingClientRect().top - itemContent.getBoundingClientRect().top);
		}, listItemSelector, scrollableSelector, index);
	}

	itemOffsetBottomById (index) {
		return browser.execute(function (_listItemSelector, _scrollableSelector, _index) {
			const itemContent = document.querySelectorAll(_listItemSelector)[_index];
			const scroller = document.querySelector(_scrollableSelector);
			return Math.round(itemContent.getBoundingClientRect().bottom - scroller.getBoundingClientRect().top);
		}, listItemSelector, scrollableSelector, index);
	}

	getItemSize (index = 0) {
		return browser.execute(function (_listItemSelector, _index) {
			const itemContent = document.querySelectorAll(_listItemSelector)[_index];
			const {height, width}  = itemContent.getBoundingClientRect();
			return {
				height,
				width
			};
		}, listItemSelector, index);
	}

	itemSpacing (firstItem, secondItem) {
		return browser.execute(function (_listItemSelector, _firstItem, _secondItem) {
			const itemContent = document.querySelectorAll(_listItemSelector);
			const firstItemRect = itemContent[_firstItem].getBoundingClientRect();
			const secondItemRect = itemContent[_secondItem].getBoundingClientRect();
			return {
				height: Math.round(secondItemRect.top - firstItemRect.bottom),
				width: Math.round(secondItemRect.left - firstItemRect.right)
			};
		}, listItemSelector, firstItem, secondItem);
	}

	spotlightSize () {
		return browser.execute(function () {
			return {
				height: document.activeElement.clientHeight,
				width: document.activeElement.clientWidth
			};
		});
	}

	checkScrollbyPagekey (way) {
		const initialThumbPosition = this.scrollThumbPosition();
		if (way === 'down') {
			this.pageDown();
			this.delay(1000);
			expect((this.scrollThumbPosition() > initialThumbPosition)).to.be.true();
		} else {
			this.pageUp();
			this.delay(1000);
			expect((initialThumbPosition > this.scrollThumbPosition())).to.be.true();
		}
	}

	backSpace () {
		return this.keyDelay('Backspace');
	}

	numPad (num) {
		let Inputnum = 'numpad' + String(num);
		return this.keyDelay(Inputnum);
	}
}

module.exports = new VirtualGridListPage();
