'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class CheckboxInterface {
	constructor (id) {
		this.id = `${id}`;
	}

	get self () {
		return $(`#${this.id}`);
	}

	get isChecked () {
		return $(`#${this.id}.Checkbox_Checkbox_selected`).isExisting();
	}
}

class CheckboxPage extends Page {
	constructor () {
		super();
		this.title = 'Checkbox Test';
		const checkbox1 = new CheckboxInterface('Checkbox1');
		const checkbox2 = new CheckboxInterface('Checkbox2');
		const checkbox3 = new CheckboxInterface('Checkbox3');
		const checkbox4 = new CheckboxInterface('Checkbox4');

		this.components = {
			checkbox1,
			checkbox2,
			checkbox3,
			checkbox4
		};
	}

	async open (urlExtra) {
		await super.open('Checkbox-View', urlExtra);
	}
}

module.exports = new CheckboxPage();
