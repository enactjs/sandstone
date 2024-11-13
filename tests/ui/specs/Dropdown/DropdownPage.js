'use strict';

const {element, componentSelector, getComponent, Page} = require('@enact/ui-test-utils/utils');

const scrollbarSelector = '.useScroll_ScrollbarTrack_scrollbarTrack';

class DropdownInterface {
	constructor (id) {
		this.id = id;
	}

	async focusActivator () {
		return await browser.execute((el) => el.focus(), await $(`#${this.id} > div .Dropdown_Dropdown_button`));
	}

	get button () {
		return getComponent({component: 'Dropdown', child: 'button'}, this.self);
	}

	item (index) {
		return element(
			`${componentSelector({component: 'Item'})}[data-index="${index}"]`,
			this.list
		);
	}

	get list () {
		return getComponent({component: 'Dropdown', child: 'dropdownList'}, browser);
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

	get self () {
		return element(`#${this.id}`, browser);
	}

	async getScrollThumbPosition (index = 0) {
		return await browser.execute(function (_scrollbarSelector, _index) {
			const scrollbar = document.querySelectorAll(_scrollbarSelector)[_index];
			return scrollbar.style.getPropertyValue('--scrollbar-thumb-progress-ratio');
		}, scrollbarSelector, index);
	}

}

class DropdownPage extends Page {
	constructor () {
		super();
		this.title = 'Dropdown Test';
		this.components = new Proxy({}, {
			get: (target, name) => new DropdownInterface(name)
		});
	}

	async openDropdown (component) {
		await component.focusActivator();
		await this.spotlightSelect();
	}

	async open (layout = '', urlExtra) {
		await super.open(`Dropdown${layout}-View`, urlExtra);
	}

}

module.exports = new DropdownPage();
