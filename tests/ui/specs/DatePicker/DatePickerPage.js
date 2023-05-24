// 'use strict';
// const {element, getComponent, getText, Page} = require('@enact/ui-test-utils/utils');
import {element, getComponent, getText, Page} from '@enact/ui-test-utils/utils/index.js';

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

	get day () {
		return element('.DatePicker_DatePicker_day', this.self);
	}

	get month () {
		return element('.DatePicker_DatePicker_month', this.self);
	}

	get year () {
		return element('.DatePicker_DatePicker_year', this.self);
	}
	get dateLabel () {
		return element('.internal_DateTime_DateTime_heading', this.self);
	}

	decrementer (picker) {
		return element('.internal_Picker_Picker_decrementer', picker);
	}
	incrementer (picker) {
		return element('.internal_Picker_Picker_incrementer', picker);
	}
	item (picker) {
		return element('.internal_Picker_Picker_item', picker);
	}

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
		this.components.datePickerCheckMinValue = new PickerInterface('datePickerCheckMinValue');
		this.components.datePickerCheckMaxValue = new PickerInterface('datePickerCheckMaxValue');
	}

	async open (urlExtra) {
		await super.open('DatePicker-View', urlExtra);
	}
}

//module.exports = new DatePickerPage();
export default new DatePickerPage();
