'use strict';
const {element, getComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
	}

	get      self () {
		return element(`#${this.id}`, browser);
	}
	get   chevron () {
		return getText(getIcon(this.self));
	}

	get hour () {
		return element('.TimePicker_TimePicker_hourPicker', this.self);
	}
	get meridiem () {
		return element('.TimePicker_TimePicker_meridiemPicker', this.self);
	}
	get minute () {
		return element('.TimePicker_TimePicker_minutePicker', this.self);
	}

	get timeLabel () {
		return element('.internal_DateTime_DateTime_heading', this.self);
	}

	decrementer (type) {
		return $(`#${this.id} .TimePicker_TimePicker_${type}Picker > .internal_Picker_Picker_decrementer`);
	}
	incrementer (type) {
		return $(`#${this.id} .TimePicker_TimePicker_${type}Picker > .internal_Picker_Picker_incrementer`);
	}
	item (type) {
		return $(`#${this.id} .TimePicker_TimePicker_${type}Picker > .internal_Picker_Picker_valueWrapper`);
	}
}

class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Test';
		this.components = {};
		this.components.timePickerDefault = new PickerInterface('timePickerDefault');
		this.components.timePickerWithDefaultValue = new PickerInterface('timePickerWithDefaultValue');
		this.components.timePickerDisabled = new PickerInterface('timePickerDisabled');
		this.components.timePickerDisabledWithDefaultValue = new PickerInterface('timePickerDisabledWithDefaultValue');
	}

	async open (urlExtra) {
		await super.open('TimePicker-View', urlExtra);
	}
}

module.exports = new TimePickerPage();
