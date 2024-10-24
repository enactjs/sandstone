'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const {focusedElement, waitUntilFocused, waitUntilVisible} = require('../VirtualList-utils');

const listItemSelector = '.enact_ui_VirtualList_VirtualList_listItem';
const scrollableSelector = '.enact_ui_useScroll_useScroll_scroll';
const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';
const scrollContentSelector = '.useScroll_useScroll_scrollContent';
const scrollThumbSelector = '.useScroll_ScrollbarTrack_thumb';
const verticalScrollbarSelector = '.useScroll_useScroll_verticalScrollbar';
const verticalScrollbarTrackSelector = '.useScroll_ScrollbarTrack_vertical';

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';

	}

	async open (layout = '', urlExtra) {
		await super.open(`VirtualList${layout}-View`, urlExtra);
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
	get buttonHeaderChildren () {
		return element('#headerChildrenButton', browser);
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

	async getVerticalScrollbarRect () {
		return await browser.execute(function (_verticalScrollbarSelector) {
			return document.querySelector(_verticalScrollbarSelector).getBoundingClientRect().toJSON();
		}, verticalScrollbarSelector);
	}

	async getVerticalScrollbarTrackRect () {
		return await browser.execute(function (_verticalScrollbarTrackSelector) {
			return document.querySelector(_verticalScrollbarTrackSelector).getBoundingClientRect().toJSON();
		}, verticalScrollbarTrackSelector);
	}

	// scrollThumb api
	get scrollThumb () {
		return $(`${scrollThumbSelector}`);
	}

	async getScrollThumbPosition (index = 0) {
		return await browser.execute(function (_scrollbarSelector, _index) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector)[_index];
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector, index);

	}

	// list api
	get list () {
		return element('#list', browser);
	}

	async getListRect () {
		return await browser.execute(function (_scrollContentSelector) {
			return document.querySelector(_scrollContentSelector).getBoundingClientRect().toJSON();
		}, scrollContentSelector);
	}

	// item api
	async item (id) {
		return await element(`#${typeof id === 'number' ? `item${id}` : id}`, browser);
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

	async getElementAttribute (string) {
		return await browser.execute(function (_string) {
			return document.activeElement.getAttribute(_string);
		}, string);
	}

	async activeElementRect () {
		return await browser.execute(function () {
			return document.activeElement.getBoundingClientRect().toJSON();
		});
	}

	async itemSpacing () {
		return await browser.execute(function (_listItemSelector) {
			const itemContent = document.querySelectorAll(_listItemSelector);
			const firstItemRect = itemContent[0].getBoundingClientRect();
			const secondItemRect = itemContent[1].getBoundingClientRect();
			return Math.round(secondItemRect.top - firstItemRect.top - firstItemRect.height);
		}, listItemSelector);
	}

	async getItemSize () {
		return await browser.execute(function (_listItemSelector) {
			const itemContent = document.querySelector(_listItemSelector);
			const itemHeight = itemContent.getBoundingClientRect().height;
			const itemWidth = itemContent.getBoundingClientRect().width;
			return {
				height: itemHeight,
				width: itemWidth
			};
		}, listItemSelector);
	}

	async itemDisabled () {
		return await browser.execute(function () {
			return document.activeElement.getAttribute('aria-disabled') === 'true';
		});
	}

	async textContent () {
		return await browser.execute(function () {
			return document.activeElement.innerText.split('\n')[0];
		});
	}

	async spotlightSize () {
		return await browser.execute(function () {
			return document.activeElement.clientHeight;
		});
	}

	// key input api
	async fiveWayToItem (itemNum) {
		const currentItem = Number((await focusedElement()).slice(4));
		expect(Number.isNaN(currentItem)).toBe(false);

		const direction = currentItem < itemNum ? 1 : -1;

		for (let i = currentItem; i !== itemNum; i = i + direction) {
			if (direction > 0) {
				await this.spotlightDown();
			} else {
				await this.spotlightUp();
			}
			await waitUntilFocused(i + direction);
			await waitUntilVisible(i + direction);
		}
		await this.delay(200);
	}

	async checkScrollbyPagekey (way) {
		const initialThumbPosition = await this.getScrollThumbPosition();
		if (way === 'down') {
			await this.pageDown();
			await this.delay(1000);
			expect((await this.getScrollThumbPosition()) > initialThumbPosition).toBe(true);
		} else {
			await this.pageUp();
			await this.delay(1000);
			expect(initialThumbPosition > (await this.getScrollThumbPosition())).toBe(true);
		}
	}
	backSpace () {
		return this.keyDelay('Backspace');
	}

	async numPad (num) {
		let Inputnum = 'numpad' + String(num);
		return await this.keyDelay(Inputnum);
	}
}

module.exports = new VirtualListPage();
