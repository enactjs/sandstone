'use strict';
const {element, getSubComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});


class SwitchItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}

	get self () {
		return $(`#${this.id}`);
	}
	get valueText () {
		return getText(getMarqueeText(this.self));
	}
	get isSelected () {
		return element('.Switch_Switch_selected', this.self).isExisting();
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

	open (urlExtra) {
		super.open('SwitchItem-View', urlExtra);
	}
}

module.exports = new SwitchItemPage();
