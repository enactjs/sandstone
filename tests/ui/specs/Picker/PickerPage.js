'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class PickerInterface {
	constructor (className) {
		this.className = className;
		this.selector = `.${this.className}`;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`.${this.className}>div`));
	}

	async focusJoined () {
		return browser.execute((el) => el.focus(), await $(`.${this.className}`));
	}

	get self () {
		return $(this.selector);
	}

	get picker () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer (picker) {
		return element(`.${this.className} .internal_Picker_Picker_decrementer`, picker);
	}

	incrementer (picker) {
		return element(`.${this.className} .internal_Picker_Picker_incrementer`, picker);
	}

	decrementerVertical (picker) {
		return element(`.${this.className} .internal_Picker_Picker_incrementer`, picker);
	}

	incrementerVertical (picker) {
		return element(`.${this.className} .internal_Picker_Picker_decrementer`, picker);
	}

	currentValue (picker) {
		return element(`.${this.className} .internal_Picker_Picker_valueWrapper`, picker);
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
		const pickerJoinedChangedByArrow = new PickerInterface('pickerJoinedChangedByArrow');
		const pickerVertical = new PickerInterface('pickerVertical');
		const pickerDisabledVertical = new PickerInterface('pickerDisabledVertical');
		const pickerWrapVertical = new PickerInterface('pickerWrapVertical');
		const pickerJoinedVertical = new PickerInterface('pickerJoinedVertical');
		const pickerVerticalWrapJoined = new PickerInterface('pickerVerticalWrapJoined');
		this.components = {pickerDefault, pickerDisabled, pickerWithDefaultValue, pickerWrap, pickerJoined, pickerJoinedChangedByArrow, pickerVertical, pickerDisabledVertical, pickerWrapVertical, pickerJoinedVertical, pickerVerticalWrapJoined};
	}

	async open (urlExtra) {
		await super.open('Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();
