'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');
const {element, getSubComponent, getText} = require('@enact/ui-test-utils/test/utils.js');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

class SelectableItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return getText(getMarqueeText(this.self)); }
	get isSelected () { return !!element('.SelectableItem_SelectableIcon_selected', this.self).value; }
	get isToggled () { return !!element('.enact_ui_ToggleIcon_ToggleIcon_selected', this.self).value; }
	get isInline () { return browser.isExisting(`#${this.id}.Item_Item_inline`); }
}

class SelectableItemPage extends Page {
	constructor () {
		super();
		this.title = 'SelectableItem Test';
		const selectableDefault = new SelectableItemInterface('selectableItem1');
		const selectableDefaultSelected = new SelectableItemInterface('selectableItem2');
		const selectableInline = new SelectableItemInterface('selectableItem3');
		const selectableDisabled = new SelectableItemInterface('selectableItem4');
		const selectableInlineDisabled = new SelectableItemInterface('selectableItem5');

		this.components = {selectableDefault, selectableDefaultSelected, selectableInline, selectableDisabled, selectableInlineDisabled};
	}

	open (urlExtra) {
		super.open('SelectableItem-View', urlExtra);
	}
}

module.exports = new SelectableItemPage();
