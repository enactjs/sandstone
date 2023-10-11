'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollContentSelector = '.enact_ui_Scroller_Scroller_scroller';

class ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Test';
	}

	async open (layout = '', urlExtra) {
		await super.open(`ScrollerWithEditableSelectItemByPress${layout}-View`, urlExtra);
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

	async findItemWrapper () {
		return await browser.execute(function () {
			let node = document.activeElement;
			let index;
			while (node.dataset) {
				index = node.dataset['index'];
				if (index) {
					break;
				}
				node = node.parentNode;
			}
			return {
				node: node ?? null,
				index: index ?? null,
				classList: node?.classList
			};
		});
	}

	async focusedItemButton () {
		const {index} = await this.findItemWrapper();
		return await browser.execute(function () {
			const node = document.activeElement;
			return {
				ariaLabel: node.ariaLabel,
				index
			};
		});
	}

	async disabledAttribute () {
		return await browser.execute(function () {
			return document.activeElement?.getAttribute?.('aria-disabled') === 'true';
		});
	}

	async expectFocusedItem (expectedIndex, comment = 'focused item') {
		const {index} = await this.findItemWrapper();
		expect(index, comment).to.equal(expectedIndex);
	}

	async expectDisabledItem (expectedIndex, comment = 'disabled item') {
		const {index} = await this.findItemWrapper();
		const disabled = await this.disabledAttribute();
		expect(index, comment).to.equal(expectedIndex);
		expect(disabled, comment).to.be.true();
	}

	async expectDeleteButton (expectedIndex, comment = 'delete button') {
		const {ariaLabel, index} = await this.focusedItemButton();
		expect(index, comment).to.equal(expectedIndex);
		expect(ariaLabel, comment).to.equal('Delete');
	}

	async expectItemWrapperClass (expectedClass, comment = 'item wrapper class') {
		const {classList} = await this.findItemWrapper();
		expect(classList?.includes?.(expectedClass), comment).to.be.true();
	}
}

module.exports = new ScrollerPage();
