'use strict';

const {element, Page} = require('@enact/ui-test-utils/utils');

class RangePickerInterface {
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

	get rangePicker () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer (rangePicker) {
		return element(`.${this.className} .internal_Picker_Picker_decrementer`, rangePicker);
	}

	incrementer (rangePicker) {
		return element(`.${this.className} .internal_Picker_Picker_incrementer`, rangePicker);
	}

	currentValue (rangePicker) {
		return element(`.${this.className} .internal_Picker_Picker_valueWrapper`, rangePicker);
	}
}

class RangePickerPage extends Page {
	constructor () {
		super();
		this.title = 'RangePicker Test';
		const rangePickerDefault = new RangePickerInterface('rangePickerDefault');
		const rangePickerDisabled = new RangePickerInterface('rangePickerDisabled');
		const rangePickerWithNegativeValues = new RangePickerInterface('rangePickerWithNegativeValues');
		const rangePickerWrap = new RangePickerInterface('rangePickerWrap');
		const rangePickerJoined = new RangePickerInterface('rangePickerJoined');
		const rangePickerMaxValues = new RangePickerInterface('rangePickerMaxValues');
		const rangePickerMinValues = new RangePickerInterface('rangePickerMinValues');
		const rangePickerVertical = new RangePickerInterface('rangePickerVertical');
		const rangePickerVerticalDisabled = new RangePickerInterface('rangePickerVerticalDisabled');
		const rangePickerWithNegativeValuesVertical = new RangePickerInterface('rangePickerWithNegativeValuesVertical');
		const rangePickerVerticalWrap = new RangePickerInterface('rangePickerVerticalWrap');
		const rangePickerVerticalJoined = new RangePickerInterface('rangePickerVerticalJoined');
		const rangePickerVerticalWrapJoined = new RangePickerInterface('rangePickerVerticalWrapJoined');
		this.components = {rangePickerDefault, rangePickerDisabled, rangePickerWithNegativeValues, rangePickerWrap, rangePickerMaxValues, rangePickerMinValues, rangePickerJoined, rangePickerVertical, rangePickerVerticalDisabled, rangePickerWithNegativeValuesVertical, rangePickerVerticalWrap, rangePickerVerticalJoined, rangePickerVerticalWrapJoined};
	}

	async open (urlExtra) {
		await super.open('RangePicker-View', urlExtra);
	}
}

module.exports = new RangePickerPage();
