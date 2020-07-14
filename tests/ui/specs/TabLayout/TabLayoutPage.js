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

	hoverTabs () {
		return this.tabs.moveTo({xOffset: 100, yOffset: 100});	// Moving to center could be off tab buttons
	}

	view (number) {
		return $(`#view${number}`);
	}

	get content () {return getContent(this.self);}
	get currentView () {return this.content.$('div');}
	get isCollapsed () {return hasClass('collapsed', this.self);}
	get self () {return browser.$(this.selector);}
	get tabItems () {return this.tabs.$$('.Button_Button_button');}
	get tabs () {
		if (this.isCollapsed) {
			return getCollapsedTabs(this.self);
		}

		return getTabs(this.self);
	}
	get tabsScroller () {return getScroller(this.self);}
}

class TabLayoutPage extends Page {
	constructor () {
		super();
		this.title = 'TabLayout Test';
		this.tabLayout = new TabLayoutInterface('tabLayout');
	}

	open (layout = '', urlExtra) {
		super.open(`TabLayout${layout}-View`, urlExtra);
	}

	waitForExist (selector, timeout) {
		$(selector).waitForExist({timeout});
	}
}

module.exports = new TabLayoutPage();
