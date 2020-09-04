'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const {focusedElement, waitUntilFocused, waitUntilVisible} = require('../VirtualList-utils');

const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';
const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';
const verticalScrollbarSelector = '.useScroll_useScroll_verticalScrollbar';
const verticalScrollTrackSelector = '.useScroll_ScrollbarTrack_vertical';
const scrollContentSelector = '.useScroll_useScroll_scrollContent';
const listItemSelector = '.enact_ui_VirtualList_VirtualList_listItem';

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';

	}

	open (urlExtra) {
		super.open('VirtualList-View', urlExtra);
	}

	// button api
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
	get buttonWrap () {
		return element('#wrap', browser);
	}
	get buttonJumpToItem () {
		return element('#jumpTo', browser);
	}
	get buttonJumpToItemWithoutFocus () {
		return element('#jumpToWithoutFocus', browser);
	}
	get buttonDisabledItem () {
		return element('#disabled', browser);
	}
	get buttonChildProps () {
		return element('#hasChildProps', browser);
	}
	get buttonNativeScroll () {
		return element('#nativeScroll', browser);
	}

	// inputField api
	get inputfieldNumItems () {
		return element('#numItems', browser);
	}
	get inputfieldSpacing () {
		return element('#spacing', browser);
	}
	get inputfieldItemSize () {
		return element('#itemSize', browser);
	}

	// scrollBar api
	get scrollbar () {
		return $(`${verticalScrollbarSelector}`);
	}
	getVerticalScrollbarRect () {
		return browser.execute(function (_verticalScrollbarSelector) {
			return document.querySelector(_verticalScrollbarSelector).getBoundingClientRect();
		}, verticalScrollbarSelector);
	}
	getVerticalScrollbarTrackRect () {
		return browser.execute(function (_verticalScrollTrackSelector) {
			return document.querySelector(_verticalScrollTrackSelector).getBoundingClientRect();
		}, verticalScrollTrackSelector);
	}

	// scrollThumb api
	get scrollThumb () {
		return $(`${scrollThumbSelector}`);
	}
	getScrollThumbPosition () {
		return browser.execute(function (_scrollbarSelector) {
			const scrollbar = document.querySelector(_scrollbarSelector);
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector);

	}

	// list api
	get list () {
		return element('#list', browser);
	}
	getListRect () {
		return browser.execute(function (_scrollContentSelector) {
			return document.querySelector(_scrollContentSelector).getBoundingClientRect();
		}, scrollContentSelector);
	}

	// item api
	item (id) {
		return element(`#${typeof id === 'number' ? `item${id}` : id}`, browser);
	}
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
	bottomVisibleItemId () {
		return browser.execute(function (_scrollableSelector) {
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
	itemOffsetTopById (id) {
		return browser.execute(function (_element) {
			return _element.getBoundingClientRect().top;
		}, this.item(id).value);
	}
	itemSpacing () {
		return browser.execute(function (_listItemSelector) {
			const itemContent = document.querySelectorAll(_listItemSelector);
			const firstItemRect = itemContent[0].getBoundingClientRect();
			const secondItemRect = itemContent[1].getBoundingClientRect();
			return Math.round(secondItemRect.top - firstItemRect.top - firstItemRect.height);
		}, listItemSelector);
	}
	getItemSize () {
		return browser.execute(function (_listItemSelector) {
			const itemContent = document.querySelector(_listItemSelector);
			const itemHeight = itemContent.getBoundingClientRect().height;
			const itemWidth = itemContent.getBoundingClientRect().width;
			return {
				height: itemHeight,
				width: itemWidth
			};
		}, listItemSelector);
	}
	itemDisabled () {
		return browser.execute(function () {
			return document.activeElement.getAttribute('aria-disabled') === 'true';
		});
	}
	textContent () {
		return browser.execute(function () {
			return document.activeElement.innerText.split('\n')[0];
		});
	}
	spotlightSize () {
		return browser.execute(function () {
			return document.activeElement.clientHeight;
		});
	}

	// key input api
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
			waitUntilVisible(i + direction);
		}
	}
	checkScrollbyPagekey (way) {
		const initialThumbPosition = this.getScrollThumbPosition();
		if (way === 'down') {
			this.pageDown();
			this.delay(1000);
			expect((this.getScrollThumbPosition() > initialThumbPosition)).to.be.true();
		} else {
			this.pageUp();
			this.delay(1000);
			expect((initialThumbPosition > this.getScrollThumbPosition())).to.be.true();
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

module.exports = new VirtualListPage();
