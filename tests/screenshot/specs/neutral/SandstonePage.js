'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SandstonePage extends Page {
	constructor () {
		super();
		this.title = 'Sandstone Test';
	}

	async open (urlExtra) {
		await super.open('Sandstone-View', urlExtra);
	}

	get component () {
		return $('[data-ui-test-id="test"]');
	}
}

module.exports = new SandstonePage();
