'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class PickerInterface {
	constructor (className) {
		this.className = className;
		this.selector = `.${this.className}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`.${this.className}>div`));
	}

	focusJoined () {
		return browser.execute((el) => el.focus(), $(`.${this.className}`));
	}

	get self () {
		return $(this.selector);
	}

	get picker () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer (picker) {
		return element('.internal_Picker_Picker_decrementer', picker);
	}

	incrementer (picker) {
		return element('.internal_Picker_Picker_incrementer', picker);
	}

	currentValue (picker) {
		return element('.internal_Picker_Picker_valueWrapper', picker);
	}
}

class PickerPage extends Page {
	constructor () {
		super();
		this.title = 'Picker Test';
		const pickerDefault = new PickerInterface('pickerDefault');
		const pickerDisabled = new PickerInterface('pickerDisabled');
		const pickerWithDefaultValue = new PickerInterface('pickerWithDefaultValue');
		const pickerWrap = new PickerInterface('pickerWrap');
		const pickerJoined = new PickerInterface('pickerJoined');
		const pickerVertical = new PickerInterface('pickerVertical');
		const pickerDisabledVertical = new PickerInterface('pickerDisabledVertical');
		const pickerWithDefaultValueVertical = new PickerInterface('pickerWithDefaultValueVertical');
		const pickerWrapVertical = new PickerInterface('pickerWrapVertical');
		const pickerJoinedVertical = new PickerInterface('pickerJoinedVertical');
		const pickerVerticalWrapJoined = new PickerInterface('pickerVerticalWrapJoined');
		this.components = {pickerDefault, pickerDisabled, pickerWithDefaultValue, pickerWrap, pickerJoined, pickerVertical, pickerDisabledVertical, pickerWithDefaultValueVertical, pickerWrapVertical, pickerJoinedVertical, pickerVerticalWrapJoined};
	}

	open (urlExtra) {
		super.open('Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();
