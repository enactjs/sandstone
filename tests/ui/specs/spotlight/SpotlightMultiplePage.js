'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'Spotlight Multiple Containers';
	}

	open (urlExtra) {
		super.open('Spotlight-View', urlExtra);
	}

	get item1 () {
		return $('#item1');
	}
	get item2 () {
		return $('#item2');
	}
	get item3 () {
		return $('#item3');
	}
	get item4 () {
		return $('#item4');
	}
	get nonSpottableItem2 () {
		return $('#itemns2');
	}
	get itemA () {
		return $('#itemA');
	}
	get itemB () {
		return $('#itemB');
	}
	get nonSpottableItemB () {
		return $('#itemnsB');
	}
	get itemC () {
		return $('#itemC');
	}
	get itemD () {
		return $('#itemD');
	}
	get itemParent () {
		return $('#itemParent');
	}
	get itemChild () {
		return $('#itemChild');
	}
	get focusButton () {
		return $('#focusButton');
	}
	get restoreButton () {
		return $('#restoreButton');
	}
}

module.exports = new SpotlightMultiplePage();
