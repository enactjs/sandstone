'use strict';
const {componentSelector, getComponent, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component:'Icon'});

class FormCheckboxItemInterface {
	constructor (id) {
		this.id = id;
		this.slotBeforeIcon = `#${this.id} > .Item_Item_slotBefore`;
		this.slotBeforeNodeSelector = `#${this.id} > .Item_Item_slotBefore > div:last-child`;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(`#${this.id}`));
	}

	get self () {
		return $(`#${this.id}`);
	}
	get valueText () {
		return getText($(`#${this.id} > div .enact_ui_Marquee_Marquee_text`));
	}
	get labelText () {
		return $(`#${this.id} .Item_Item_label`).getText();
	}
	get icon () {
		return getIcon(this.self);
	}
	get iconSymbol () {
		return getText(this.icon);
	}
	get isChecked () {
		return this.self.$(componentSelector({component: 'FormCheckbox', child: 'selected'}).isExisting());
	}
	get slotBefore () {
		return $(this.slotBeforeIcon).isExisting();
	}
	get isInline () {
		return hasClass(componentSelector({component: 'Item', child: 'inline'}), this.self);
	}
	get slotBeforeNode () {
		return $(this.slotBeforeNodeSelector).isExisting();
	}
	get slotBeforeIconSymbol () {
		return $(this.slotBeforeNodeSelector).getText();
	}
	get indeterminateIconSymbol () {
		return $(`#${this.id} .Checkbox_Checkbox_indeterminate`).getText();
	}
	get hasLabelBelow () {
		return $(`#${this.id} .Item_Item_labelBelow`).isExisting();
	}
	get hasLabelAbove () {
		return $(`#${this.id} .Item_Item_labelAbove`).isExisting();
	}
	get hasLabelBefore () {
		return $(`#${this.id} .Item_Item_labelBefore`).isExisting();
	}
	get hasLabelAfter () {
		return $(`#${this.id} .Item_Item_labelAfter`).isExisting();
	}
}

class FormCheckboxItemPage extends Page {
	constructor () {
		super();
		this.title = 'FormCheckboxItem Test';
		const formCheckboxDefault = new FormCheckboxItemInterface('formCheckboxItem1');
		const formCheckboxDefaultSelected = new FormCheckboxItemInterface('formCheckboxItem2');
		const formCheckboxIndeterminate = new FormCheckboxItemInterface('formCheckboxItem3');
		const formCheckboxSlotBefore = new FormCheckboxItemInterface('formCheckboxItem4');
		const formCheckboxInline = new FormCheckboxItemInterface('formCheckboxItem5');
		const formCheckboxInlineSlotBefore = new FormCheckboxItemInterface('formCheckboxItem6');
		const formCheckboxLabelBelow = new FormCheckboxItemInterface('formCheckboxItem7');
		const formCheckboxLabelAbove = new FormCheckboxItemInterface('formCheckboxItem8');
		const formCheckboxLabelBefore = new FormCheckboxItemInterface('formCheckboxItem9');
		const formCheckboxLabelAfter = new FormCheckboxItemInterface('formCheckboxItem10');
		const formCheckboxDisabled = new FormCheckboxItemInterface('formCheckboxItem11');
		const formCheckboxInlineDisabled = new FormCheckboxItemInterface('formCheckboxItem12');

		this.components = {
			formCheckboxDefault,
			formCheckboxDefaultSelected,
			formCheckboxIndeterminate,
			formCheckboxSlotBefore,
			formCheckboxLabelBelow,
			formCheckboxLabelAbove,
			formCheckboxLabelBefore,
			formCheckboxInline,
			formCheckboxInlineSlotBefore,
			formCheckboxLabelAfter,
			formCheckboxDisabled,
			formCheckboxInlineDisabled
		};
	}

	async open (urlExtra) {
		await super.open('FormCheckboxItem-View', urlExtra);
	}
}

module.exports = new FormCheckboxItemPage();
