'use strict';
const {element, getComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	get      self () { return element(`#${this.id}`, browser); }
	get   chevron () { return getText(getIcon(this.self)); }
	get valueText () { return getText(this.value); }

	get hour () { return element('.TimePicker_TimePicker_hourComponents .internal_Picker_Picker_picker', this.self); }
	get meridiem () { return element('.TimePicker_TimePicker_meridiemComponent .internal_Picker_Picker_picker', this.self); }
	get minute () { return element('.TimePicker_TimePicker_minutesComponents .internal_Picker_Picker_picker', this.self); }

	decrementer (picker) { return element('.internal_Picker_Picker_decrementer', picker); }
	incrementer (picker) { return element('.internal_Picker_Picker_incrementer', picker); }
	item (picker) { return element('.internal_Picker_Picker_item', picker); }
}

class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Test';
		this.components = {};
		this.components.timePickerDefaultClosedWithoutNoneText = new PickerInterface('timePickerDefault');
		this.components.timePickerWithDefaultValue = new PickerInterface('timePickerWithDefaultValue');
		this.components.timePickerDisabledWithNoneText = new PickerInterface('timePickerDisabled');
		this.components.timePickerDisabledWithDefaultValue = new PickerInterface('timePickerDisabledWithDefaultValue');
	}

	open (urlExtra) {
		super.open('TimePicker-View', urlExtra);
	}
}

module.exports = new TimePickerPage();
