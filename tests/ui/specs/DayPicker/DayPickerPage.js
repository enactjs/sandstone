'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class DayPickerInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return $(`#${this.id}`);
	}

	async focus () {
		return await browser.execute((el) => el.focus(), $(this.selector));
	}

	item (index) {
		return element(`#${this.id} .DayPicker_DayPicker_item[data-index="${index}"]`, this.self);
	}

	async extractSelectedDayString () {
		return await browser.execute(function () {
			return document.activeElement.innerText.split('\n')[1];
		});
	}
}

class DayPickerPage extends Page {
	constructor () {
		super();
		this.title = 'DayPicker Test';
		const defaultDayPicker = new DayPickerInterface('dayPickerDefault');
		const disabledDayPicker = new DayPickerInterface('dayPickerDisabled');
		const getDayStringDayPicker = new DayPickerInterface('dayPickerGetDayString');

		this.components = {defaultDayPicker, disabledDayPicker, getDayStringDayPicker};
	}

	async open (specification = '', urlExtra) {
		await super.open(`DayPicker${specification}-View`, urlExtra);
	}
}

module.exports = new DayPickerPage();
