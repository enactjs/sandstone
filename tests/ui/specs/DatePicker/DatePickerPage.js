'use strict';
const {element, getComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});
const getPickerChild = (child, picker) => getComponent({internal: true, component: 'Picker', child}, picker);

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	get      self () { return element(`#${this.id}`, browser); }
	get   chevron () { return getText(getIcon(this.self)); }

	get day () { return element('.DatePicker_DatePicker_day', this.self); }

	get month () { return element('.DatePicker_DatePicker_month', this.self); }

	get year () { return element('.DatePicker_DatePicker_year', this.self); }
	get dateLabel () { return getComponent({internal: true, component: 'Picker'}, getComponent({component: 'DatePicker', child: 'dateLabel'}, this.self));}

	decrementer (picker) { return element('.internal_Picker_Picker_decrementer', picker); }
	incrementer (picker) { return element('.internal_Picker_Picker_incrementer', picker); }
	item (picker) { return element('.internal_Picker_Picker_item', picker); }

}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.components = {};
		this.components.datePickerDefault = new PickerInterface('datePickerDefault');
		this.components.datePickerWithDefaultValue = new PickerInterface('datePickerWithDefaultValue');
		this.components.datePickerDisabled = new PickerInterface('datePickerDisabled');
		this.components.datePickerDisabledWithDefaultValue = new PickerInterface('datePickerDisabledWithDefaultValue');
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();
