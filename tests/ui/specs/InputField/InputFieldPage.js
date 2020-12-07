'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'InputField Test';
	}

	open (urlExtra) {
		super.open('InputField-View', urlExtra);
	}

	get input1 () {
		return $('#input1');
	}
	get input2 () {
		return $('#input2');
	}
	get input3 () {
		return $('#input3');
	}
	get input4 () {
		return $('#input4');
	}
	get disabledInput () {
		return $('#input5');
	}
	get inputElement1 () {
		return $('#input1 input');
	}
}

module.exports = new SpotlightMultiplePage();
