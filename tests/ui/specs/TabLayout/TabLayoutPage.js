'use strict';
const {getComponent, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getContent = getComponent({component: 'TabLayout', child: 'content'});
const getScroller = getComponent({lib: 'ui', component: 'useScroll', child: 'scroll'});
const getTabs = getComponent({component: 'TabLayout', child: 'tabs'});

class TabLayoutInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focusScroller () {
		const focus = (selector) => {
			const el = document.querySelector(selector);
			el.focus();
			return el;
		}

		browser.execute(focus, this.tabsScroller.selector);
	}

	hoverScroller () {
		return $(this.tabsScroller.selector).moveTo();
	}

	hoverTabs () {
		return $(this.tabs.selector).moveTo();
	}

	get content () {return getContent(this.self);}
	get currentView () {return this.content.$('div');}
	get isCollapsed () {return hasClass('collapsed', this.self);}
	get self () {return browser.$(this.selector);}
	get tabGroup () {return this.self.$('[role=group]');}
	get tabIcons () {return this.tabs.$$('.Icon_Icon_icon');}
	get tabItems () {return this.tabs.$$('.Item_Item_item');}
	get tabOrientation () {return this.tabGroup.getAttribute('orientation');}
	get tabs () {return getTabs(this.self);}
	get tabsScroller () {return getScroller(this.self);}
}

class TabLayoutPage extends Page {
	constructor () {
		super();
		this.title = 'TabLayout Test';
		const tabLayout = new TabLayoutInterface('tabLayout');

		this.components = {
			tabLayout
		};
	}

	open (layout, urlExtra) {
		super.open(`TabLayout${layout}-View`, urlExtra);
	}
}

module.exports = new TabLayoutPage();
