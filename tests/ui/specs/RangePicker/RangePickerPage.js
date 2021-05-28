'use strict';

const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class RangePickerInterface {
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

	get rangePicker () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer (rangePicker) {
		return element('.internal_Picker_Picker_decrementer', rangePicker);
	}

	incrementer (rangePicker) {
		return element('.internal_Picker_Picker_incrementer', rangePicker);
	}

	currentValue (rangePicker) {
		return element('.internal_Picker_Picker_valueWrapper', rangePicker);
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
		const rangePickerVertical = new RangePickerInterface('rangePickerVertical');
		const rangePickerVerticalDisabled = new RangePickerInterface('rangePickerVerticalDisabled');
		const rangePickerWithNegativeValuesVertical = new RangePickerInterface('rangePickerWithNegativeValuesVertical');
		const rangePickerVerticalWrap = new RangePickerInterface('rangePickerVerticalWrap');
		const rangePickerVerticalJoined = new RangePickerInterface('rangePickerVerticalJoined');
		const rangePickerVerticalWrapJoined = new RangePickerInterface('rangePickerVerticalWrapJoined');
		this.components = {rangePickerDefault, rangePickerDisabled, rangePickerWithNegativeValues, rangePickerWrap, rangePickerJoined, rangePickerVertical, rangePickerVerticalDisabled, rangePickerWithNegativeValuesVertical, rangePickerVerticalWrap, rangePickerVerticalJoined, rangePickerVerticalWrapJoined};
	}

	open (urlExtra) {
		super.open('RangePicker-View', urlExtra);
	}
}

module.exports = new RangePickerPage();
