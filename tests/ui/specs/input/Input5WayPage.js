'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'Input 5-Way Test';
	}

	open (urlExtra) {
		super.open('Input-View', urlExtra);
	}

	get input1 () { return browser.element('#input1'); }
	get input2 () { return browser.element('#input2'); }
	get input3 () { return browser.element('#input3'); }
	get input4 () { return browser.element('#input4'); }
	get disabledInput () { return browser.element('#input5'); }
	get inputElement1 () { return browser.element('#input1 input'); }
}

module.exports = new SpotlightMultiplePage();

