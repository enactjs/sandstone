'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class InputInterface {

	constructor (className) {
		this.className = className;
	}

	get backButton () {
		return element('.Input_Input_back', browser);
	}

	get background () {
		return element('.Popup_Popup_popup', browser);
	}

	get inputField () {
		return element('.Input_InputField_input', browser);
	}

	get numberButton () {
		return element('.Input_Input_key', browser);
	}

	get numberCell () {
		return element('.Input_Input_numberCell', browser);
	}

	get title () {
		return element('.Input_Input_titles', browser);
	}

	get self () {
		return element(`.${this.className}`, browser);
	}
}

class InputPage extends Page {
	constructor () {
		super();
		this.title = 'Input Test';

		this.components = {};
		this.components.input1 = new InputInterface('input1');
		this.components.input2 = new InputInterface('input2');
		this.components.input3 = new InputInterface('input3');
		this.components.input4 = new InputInterface('input4');
		this.components.input5 = new InputInterface('input5');
		this.components.input6 = new InputInterface('input6');
		this.components.input7 = new InputInterface('input7');
		this.components.input8 = new InputInterface('input8');
		this.components.input9 = new InputInterface('input9');
		this.components.input10 = new InputInterface('input10');
	}

	async open (urlExtra) {
		await super.open('Input-View', urlExtra);
	}
}

module.exports = new InputPage();
