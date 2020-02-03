'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');
const {componentSelector, getComponent, getSubComponent, getText, hasClass} = require('@enact/ui-test-utils/test/utils.js');

const getIcon = getComponent({component:'Icon'});
const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

class FormCheckboxItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return getText(getMarqueeText(this.self)); }
	get icon () { return getIcon(this.self);}
	get iconSymbol () { return getText(this.icon); }
	get isChecked () { return this.self.isExisting(componentSelector({component: 'FormCheckbox', child: 'selected'})); }
	get isAfter () { return this.self.isExisting(componentSelector({component: 'SlotItem', child: 'after'})); }
	get isBefore () { return this.self.isExisting(componentSelector({component: 'SlotItem', child: 'before'})); }
	get isInline () { return hasClass(componentSelector({component: 'Item', child: 'inline'}), this.self); }
}

class FormCheckboxItemPage extends Page {
	constructor () {
		super();
		this.title = 'FormCheckboxItem Test';
		const formCheckboxDefault = new FormCheckboxItemInterface('formCheckboxItem1');
		const formCheckboxDefaultSelected = new FormCheckboxItemInterface('formCheckboxItem2');
		const formCheckboxIconAfter = new FormCheckboxItemInterface('formCheckboxItem3');
		const formCheckboxInline = new FormCheckboxItemInterface('formCheckboxItem4');
		const formCheckboxInlineAfter = new FormCheckboxItemInterface('formCheckboxItem5');
		const formCheckboxDisabled = new FormCheckboxItemInterface('formCheckboxItem6');
		const formCheckboxInlineDisabled = new FormCheckboxItemInterface('formCheckboxItem7');

		this.components = {formCheckboxDefault, formCheckboxDefaultSelected, formCheckboxIconAfter, formCheckboxInline, formCheckboxInlineAfter, formCheckboxDisabled, formCheckboxInlineDisabled};
	}

	open (urlExtra) {
		super.open('FormCheckboxItem-View', urlExtra);
	}
}

module.exports = new FormCheckboxItemPage();
