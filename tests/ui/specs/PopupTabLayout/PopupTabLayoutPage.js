'use strict';
const {getComponent, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getContent = getComponent({component: 'TabLayout', child: 'content'});
const getTabPanels = getComponent({component: 'PopupTabLayout', child: 'panels'});
const getTabLayout = getComponent({component: 'TabLayout'});
// const getTabs = getComponent({component: 'TabLayout', child: 'tabs'});

class PopupTabLayoutInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	hoverScroller () {
		return $(this.tabsScroller.selector).moveTo();
	}

	hoverTabs () {
		return $(this.tabs.selector).moveTo();
	}

	get self () {return browser.$(this.selector);}
	get content () {return getContent(this.self);}
	get currentView () {return getTabPanels(this.content);}
	get tabLayout () { return getTabLayout(this.self);}
	get isCollapsed () {return hasClass('collapsed', this.tabLayout);}
	// get tabIcons () {return this.tabs.$$('.Icon_Icon_icon');}
	// get tabItems () {return this.tabs.$$('.Item_Item_item');}
	// get tabs () {return getTabs(this.self);}
	// get tabsScroller () {return getScroller(this.self);}
}

class PopupTabLayoutPage extends Page {
	constructor () {
		super();
		this.title = 'TabLayout Test';
		const popupTabLayout = new PopupTabLayoutInterface('tabLayout');

		this.components = {
			popupTabLayout
		};
	}

	open (urlExtra) {
		super.open('PopupTabLayout-View', urlExtra);
	}

	waitForExist (selector, timeout) {
		$(selector).waitForExist({timeout});
	}
}

module.exports = new PopupTabLayoutPage();
