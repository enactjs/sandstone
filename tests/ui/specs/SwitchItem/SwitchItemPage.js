'use strict';
const {element, getText, Page} = require('@enact/ui-test-utils/utils');


class SwitchItemInterface {
	constructor (id) {
		this.id = id;
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
	get isSelected () {
		return element(`#${this.id} .Switch_Switch_selected`, this.self).isExisting();
	}
	get isInline () {
		return $(`#${this.id}.Item_Item_inline`).isExisting();
	}
}

class SwitchItemPage extends Page {
	constructor () {
		super();
		this.title = 'SwitchItem Test';
		const switchDefault = new SwitchItemInterface('switchItem1');
		const switchDefaultSelected = new SwitchItemInterface('switchItem2');
		const switchInline = new SwitchItemInterface('switchItem3');
		const switchDisabled = new SwitchItemInterface('switchItem4');
		const switchInlineDisabled = new SwitchItemInterface('switchItem5');

		this.components = {switchDefault, switchDefaultSelected, switchInline, switchDisabled, switchInlineDisabled};
	}

	async open (urlExtra) {
		await super.open('SwitchItem-View', urlExtra);
	}
}

module.exports = new SwitchItemPage();
