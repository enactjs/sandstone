'use strict';
const {getComponent, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getScroller = getComponent({lib: 'ui', component: 'useScroll', child: 'scroll'});

class TabLayoutInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	hoverScroller () {
		return this.tabsScroller.moveTo({xOffset: 100, yOffset: 100});
	}

	async hoverTabs () {
		return (await this.tabs()).moveTo({xOffset: 100, yOffset: 100});	// Moving to center could be off tab buttons
	}

	async view (number) {
		return await $(`#view${number}`);
	}

	get content () {
		return $(`#${this.id} .TabLayout_TabLayout_content > div`);
	}
	async currentView () {
		return (await this.content);
	}
	get isCollapsed () {
		return hasClass('collapsed', this.self);
	}
	get self () {
		return browser.$(this.selector);
	}
	async tabItems () {
		if (await this.isCollapsed) {
			return await $$(`.TabLayout_TabLayout_tabs > div .TabLayout_TabGroup_tab`);
		} else {
			return await $$(`.TabLayout_TabLayout_tabsExpanded > div .TabLayout_TabGroup_tab`);
		}
	}
	async tabs () {
		if (await this.isCollapsed) {
			return await $(`#${this.id} .TabLayout_TabLayout_tabs`);
		}

		return await $(`#${this.id} .TabLayout_TabLayout_tabsExpanded`);
	}
	get tabsScroller () {
		return getScroller(this.self);
	}
	async isSelectedTab (number) {
		return await hasClass('selected', $$('.TabLayout_TabGroup_tab')[number]);
	}
}

class TabLayoutPage extends Page {
	constructor () {
		super();
		this.title = 'TabLayout Test';
		this.tabLayout = new TabLayoutInterface('tabLayout');
	}

	async open (layout = '', urlExtra) {
		await super.open(`TabLayout${layout}-View`, urlExtra);
	}

	async waitForExist (selector, timeout) {
		await $(selector).waitForExist({timeout});
	}
}

module.exports = new TabLayoutPage();
