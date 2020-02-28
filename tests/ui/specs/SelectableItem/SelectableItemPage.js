'use strict';
const {element, getSubComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

class SelectableItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}

	get self () { return $(`#${this.id}`); }
	get valueText () { return getText(getMarqueeText(this.self)); }
	get isSelected () { return element('.SelectableItem_SelectableIcon_selected', this.self).isExisting(); }
	get isToggled () { return element('.enact_ui_ToggleIcon_ToggleIcon_selected', this.self).isExisting(); }
	get isInline () { return $(`#${this.id}.Item_Item_inline`).isExisting(); }
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
