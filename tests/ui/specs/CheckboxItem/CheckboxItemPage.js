'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');

class CheckboxItemInterface {
	constructor (id) {
		this.id = id;
		this.marqueeTextSelector = `#${this.id} > div .enact_ui_Marquee_Marquee_text`;
		this.iconSelector = `#${this.id} > div .Icon_Icon_icon`;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get value () { return browser.element(this.marqueeTextSelector); }
	get valueText () { return this.value.getText(); }
	get icon () { return browser.element(this.iconSelector); }
	get iconSymbol () { return this.icon.getText(); }
	get isChecked () { return browser.isExisting(`#${this.id} .Checkbox_Checkbox_selected`); }
	get isAfter () { return browser.isExisting(`#${this.id} .SlotItem_SlotItem_after`); }
	get isBefore () { return browser.isExisting(`#${this.id} .SlotItem_SlotItem_before`); }
	get isInline () { return browser.isExisting(`#${this.id}.Item_Item_inline`); }
}

class CheckboxItemPage extends Page {
	constructor () {
		super();
		this.title = 'CheckboxItem Test';
		const checkboxDefault = new CheckboxItemInterface('checkboxItem1');
		const checkboxDefaultSelected = new CheckboxItemInterface('checkboxItem2');
		const checkboxIconAfter = new CheckboxItemInterface('checkboxItem3');
		const checkboxInline = new CheckboxItemInterface('checkboxItem4');
		const checkboxInlineAfter = new CheckboxItemInterface('checkboxItem5');
		const checkboxDisabled = new CheckboxItemInterface('checkboxItem6');


		this.components = {checkboxDefault, checkboxDefaultSelected, checkboxIconAfter, checkboxInline, checkboxInlineAfter, checkboxDisabled};
	}

	open (urlExtra) {
		super.open('CheckboxItem-View', urlExtra);
	}
}

module.exports = new CheckboxItemPage();
