'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');
const {element, getComponent, getSubComponent, getText} = require('@enact/ui-test-utils/test/utils.js');

const getIcon = getComponent({component: 'Icon'});
const getInput = getComponent({component: 'Input'});
const getLabeledItem = getComponent({component: 'LabeledItem'});
const getLabeledItemTitle = getSubComponent({component: 'LabeledItem', child: 'title'});
const getLabeledItemValue = getSubComponent({component: 'LabeledItem', child: 'label'});
const getLabeledItemIcon = getSubComponent({component: 'LabeledItem', child: 'icon'});

class ExpandableInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get self () { return element(`#${this.id}`, browser); }
	get input () { return getInput(this.self); }
	get chevron () { return getText(getIcon(this.self)); }
	get title () { return getLabeledItem(this.self); }
	get titleText () { return getText(getLabeledItemTitle(this.self)); }
	get titleTextMarquee () { return getLabeledItemTitle(this.self).element('.enact_ui_Marquee_Marquee_text'); }
	get titleIcon () { return getLabeledItemIcon(this.self); }
	get label () { return getLabeledItemValue(this.self); }
	get labelText () { return getText(this.label); }
	get isLabelExists () { return this.self.isVisible('.LabeledItem_LabeledItem_label'); }
	get isOpen () {
		return !(!this.self.isExisting('.enact_ui_Transition_Transition_transition') ||
		!this.self.isExisting('.enact_ui_Transition_Transition_shown') && this.self.isExisting('.enact_ui_Transition_Transition_hidden'));
	}
	get iconBefore () { return element('.Input_Input_iconBefore', this.self); }
	get iconBeforeSymbol () { return getText(this.iconBefore); }
	get iconAfter () { return element('.Input_Input_iconAfter', this.self); }
	get iconAfterSymbol () { return getText(this.iconAfter); }
	get isIconBefore () { return this.self.isExisting('.Input_Input_iconBefore');}
	get isIconAfter () { return this.self.isExisting('.Input_Input_iconAfter');}
	get placeHolder () { return this.self.getAttribute('.Input_Input_input', 'placeholder'); }

}

class ExpandableInputPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableInput Test';
		this.components = {};
		this.components.default = new ExpandableInterface('expandable1');
		this.components.defaultValue = new ExpandableInterface('expandable2');
		this.components.defaultOpen = new ExpandableInterface('expandable3');
		this.components.password = new ExpandableInterface('expandable4');
		this.components.placeholder = new ExpandableInterface('expandable5');
		this.components.iconBefore = new ExpandableInterface('expandable6');
		this.components.iconAfter = new ExpandableInterface('expandable7');
		this.components.iconBeforeAfter = new ExpandableInterface('expandable8');
		this.components.disabled = new ExpandableInterface('expandable9');
	}

	open (urlExtra) {
		super.open('ExpandableInput-View', urlExtra);
	}

	escape () {
		super.keyDelay('Escape');
	}

	hover () {
		browser.moveToObject('#expandable2');
	}

}

module.exports = new ExpandableInputPage();
