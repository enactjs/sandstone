'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

const panelSelector = panel => `#panel${panel}`;

class FixedPopupPanelsInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	waitForOpen (duration = 1000) {
		this.self.waitForExist(duration);
	}

	waitForClose (duration = 1000) {
		this.self.waitForExist(duration, true);
	}

	waitTransitionToIndex (index, delay = 3000, msg = 'timed out waiting for transitionend', callback) {
		browser.execute(
			function () {
				window.__index = -1;
			}
		);
		if (callback) {
			callback();
		}
		browser.waitUntil(
			function () {
				return browser.execute(
					function (_index) {
						return window.__index === _index;
					},
					index
				);
			},
			delay,
			msg
		);
	}

	clickBelowPopup () {
		const offset = browser.execute(function () {
			const {top, left: left1} = document.querySelector('#openButton').getBoundingClientRect();
			const {bottom, left: left2} = document.querySelector('#panel1').getBoundingClientRect();

			return {x: Math.ceil(left2 - left1) + 12, y: Math.ceil(bottom - top) + 12};
		});

		$('#openButton').click(offset);
	}

	waitForEnter (panel, callback, duration = 1000, msg) {
		// Panel index in transition end is 0 based!
		this.waitTransitionToIndex(panel - 1, duration, msg, callback);
	}

	focusOpenButton () {
		return browser.execute((el) => el.focus(), this.openButton);
	}

	focusBackButton () {
		// TODO:  Hover and click back button after it reveals
		return browser.execute((el) => el.focus(), $('[aria-label="Go to previous"]'));
	}

	get self () {
		return browser.$(this.selector);
	}

	get openButton () {
		return browser.$('#openButton');
	}
	get item1 () {
		return this.self.$('#item1');
	}

	get panel1 () {
		return this.self.$(panelSelector(1));
	}
	get panel2 () {
		return this.self.$(panelSelector(2));
	}
}

class FixedPopupPanelsPage extends Page {
	constructor () {
		super();
		this.title = 'FixedPopupPanels Test';
		this.fixedPopupPanels = new FixedPopupPanelsInterface('fixedpopuppanels');
	}

	open (urlExtra) {
		super.open('FixedPopupPanels-View', urlExtra);
	}

	waitForFocus (target, {targetName = 'item', timeoutMsg = `timed out waiting for ${targetName} focused`, timeout = 1200, interval = 200} = {}) {
		browser.waitUntil(() => target.isExisting() && target.isFocused(), {timeout, timeoutMsg, interval});
	}
}

module.exports = new FixedPopupPanelsPage();
