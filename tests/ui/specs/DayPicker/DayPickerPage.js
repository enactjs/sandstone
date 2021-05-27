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

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}

	item (index) {
		return element(`.DayPicker_DayPicker_item[data-index="${index}"]`, this.self);
	}
}

class DayPickerPage extends Page {
	constructor () {
		super();
		this.title = 'DayPicker Test';
		const defaultDayPicker = new DayPickerInterface('dayPickerDefault');
		const disabledDayPicker = new DayPickerInterface('dayPickerDisabled');

		this.components = {defaultDayPicker, disabledDayPicker};
	}

	open (urlExtra) {
		super.open('DayPicker-View', urlExtra);
	}
}

module.exports = new DayPickerPage();
