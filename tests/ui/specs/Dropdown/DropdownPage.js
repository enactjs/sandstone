/* global document */

'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class DropdownInterface {
	constructor (id) {
		this.id = id;
	}

	focusActivator () {
		return browser.execute((el) => el.focus(), this.self.$('[role="button"]'));
	}

	get focusedItemText () {
		return browser.execute(() => {
			const focused = document.activeElement;
			// naive test that the focused element is a dropdown item
			if (focused.dataset.index) {
				return focused.textContent;
			}

			return null;
		});
	}

	get self () { return element(`#${this.id}`, browser); }

}

class DropdownPage extends Page {
	constructor () {
		super();
		this.title = 'Dropdown Test';
		this.components = {
			dropdownDefault: new DropdownInterface('dropdownDefault'),
			dropdownSelected: new DropdownInterface('dropdownSelected'),
			dropdownChangeSelected: new DropdownInterface('dropdownChangeSelected'),
			dropdownChangeChildren: new DropdownInterface('dropdownChangeChildren'),
			dropdownChangeLessChildren: new DropdownInterface('dropdownChangeLessChildren')
		};
	}

	openDropdown (component) {
		component.focusActivator();
		this.spotlightSelect();
	}

	open (urlExtra) {
		super.open('Dropdown-View', urlExtra);
	}
}

module.exports = new DropdownPage();
