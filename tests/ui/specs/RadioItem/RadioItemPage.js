'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');
const {getSubComponent, getText} = require('@enact/ui-test-utils/test/utils.js');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

class RadioItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return getText(getMarqueeText(this.self)); }
	get isSelected () { return this.self.isExisting('.RadioItem_RadioItem_selected'); }
	get isInline () { return browser.isExisting(`#${this.id}.Item_Item_inline`); }
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
