'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('../../../../../../ui-test-utils/utils');

class ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Test';
	}

	get buttonEditMode () {
		return element('#editMode', browser);
	}

	get buttonRemoveItem () {
		return element('#removeItem', browser);
	}

	get buttonShowItem () {
		return element('#showItem', browser);
	}

	get inputFieldNumItems () {
		return element('#numItems', browser);
	}

	async backSpace () {
		return await this.keyDelay('Backspace');
	}

	async getActiveElementRect () {
		return await browser.execute(function () {
			return document.activeElement.getBoundingClientRect();
		});
	}

	async moveSpotlight (times = 0, directionFunc = 'spotlightRight') {
		for (let i = 0; i < times; i++) {
			await this[directionFunc]();
		}
	}

	async numPad (num) {
		let inputNum = 'numpad' + String(num);
		return await this.keyDelay(inputNum);
	}

	async open (layout = '', urlExtra) {
		await super.open(`EditableScrollerItem${layout}-View`, urlExtra);
	}
}

module.exports = new ScrollerPage();
