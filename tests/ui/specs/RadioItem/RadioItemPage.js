'use strict';
const {getSubComponent, getText, componentSelector, hasClass, Page} = require('@enact/ui-test-utils/utils');

const isSelected = hasClass(componentSelector({component: 'RadioItem', child: 'selected'}));
const getMarqueeText = getSubComponent({lib: 'ui', component: 'Marquee', child: 'text'});

class RadioItemInterface {
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
		return isSelected(this.self);
	}
	get isInline () {
		return $(`#${this.id}.Item_Item_inline`).isExisting();
	}
}

class RadioItemPage extends Page {
	constructor () {
		super();
		this.title = 'RadioItem Test';
		const radioDefault = new RadioItemInterface('radioItem1');
		const radioDefaultSelected = new RadioItemInterface('radioItem2');
		const radioInline = new RadioItemInterface('radioItem3');
		const radioDisabled = new RadioItemInterface('radioItem4');
		const radioInlineDisabled = new RadioItemInterface('radioItem5');

		this.components = {radioDefault, radioDefaultSelected, radioInline, radioDisabled, radioInlineDisabled};
	}

	open (urlExtra) {
		super.open('RadioItem-View', urlExtra);
	}
}

module.exports = new RadioItemPage();
