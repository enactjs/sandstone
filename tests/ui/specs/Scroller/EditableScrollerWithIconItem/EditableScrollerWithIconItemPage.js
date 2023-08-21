'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollContentSelector = '.enact_ui_Scroller_Scroller_scroller';

class ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Test';
	}

	async open (layout = '', urlExtra) {
		await super.open(`EditableScrollerWithIconItem${layout}-View`, urlExtra);
	}

	// button api
	get buttonNativeScroll () {
		return element('#nativeScroll', browser);
	}
	get buttonEditableCentered () {
		return element('#editableCentered', browser);
	}

	// scrollable api
	get scroller () {
		return element('#scroller', browser);
	}

	// InputField api
	get inputfieldNumItems () {
		return element('#numItems', browser);
	}

	async getScrollerRect () {
		return await browser.execute(function (_scrollContentSelector) {
			const scroller = document.querySelector(_scrollContentSelector);
			return scroller.getBoundingClientRect();
		}, scrollContentSelector);
	}

	async getActiveElementRect () {
		return await browser.execute(function () {
			return document.activeElement.getBoundingClientRect();
		});
	}

	async checkEditableItem () {
		return await browser.execute(function () {
			const itemWrapperClass = 'tests_ui_apps_Scroller_EditableItem_Scroller_itemWrapper Scroller_EditableWrapper_selected tests_ui_apps_Scroller_EditableItem_Scroller_selected';
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
}

module.exports = new ScrollerPage();
