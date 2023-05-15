'use strict';
const {getComponent, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getContent = getComponent({component: 'TabLayout', child: 'content'});
const getScroller = getComponent({lib: 'ui', component: 'useScroll', child: 'scroll'});
const getTabs = getComponent({component: 'TabLayout', child: 'tabsExpanded'});
const getCollapsedTabs = getComponent({component: 'TabLayout', child: 'tabs'});

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
		return getContent(this.self);
	}
	async currentView () {
		return (await this.content).$('div');
	}
	get isCollapsed () {
		return hasClass('collapsed', this.self);
	}
	get self () {
		return browser.$(this.selector);
	}
	async tabItems () {
		return await (await this.tabs()).$$('.Button_Button_button');
	}
	async tabs () {
		if (await this.isCollapsed) {
			return getCollapsedTabs(this.self);
		}

		return await getTabs(this.self);
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
