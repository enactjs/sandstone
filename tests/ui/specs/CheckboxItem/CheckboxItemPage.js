'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class CheckboxItemInterface {
	constructor (id) {
		this.id = id;
		this.marqueeTextSelector = `#${this.id} > div .enact_ui_Marquee_Marquee_text`;
		this.iconSelector = `#${this.id} > div .Icon_Icon_icon`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}

	get self () {
		return $(`#${this.id}`);
	}
	get value () {
		return $(this.marqueeTextSelector);
	}
	get valueText () {
		return this.value.getText();
	}
	get icon () {
		return $(this.iconSelector);
	}
	get iconSymbol () {
		return this.icon.getText();
	}
	get isChecked () {
		return $(`#${this.id} .Checkbox_Checkbox_selected`).isExisting();
	}
	get isAfter () {
		return $(`#${this.id} .Item_Item_after`).isExisting();
	}
	get isBefore () {
		return $(`#${this.id} .Item_Item_before`).isExisting();
	}
	get isInline () {
		return $(`#${this.id}.Item_Item_inline`).isExisting();
	}
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
