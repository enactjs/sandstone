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
		return browser.moveToObject(this.tabsScroller.selector);
	}

	hideSelf () {
		const hide = (id) => {
			const el = document.getElementById(id);
			el.style.display = 'none';
			return el;
		};
		browser.execute(hide, this.id);
	}

	hoverTabs () {
		return browser.moveToObject(this.tabs.selector);
	}

	showSelf () {
		const show = (id) => {
			const el = document.getElementById(id);

			document.activeElement.blur();
			el.style.display = 'flex';
			return el;
		};
		browser.execute(show, this.id);
	}

	get content () {return getContent(this.self);}
	get currentView () {return this.content.element('div');}
	get isCollapsed () {return hasClass('collapsed', this.self);}
	get self () {return browser.element(this.selector);}
	get tabGroup () {return this.self.element('[role=group]');}
	get tabIcons () {return this.tabs.elements('.Icon_Icon_icon');}
	get tabItems () {return this.tabs.elements('.Item_Item_item');}
	get tabOrientation () {return this.tabGroup.getAttribute('orientation');}
	get tabs () {return getTabs(this.self);}
	get tabsScroller () {return getScroller(this.self);}
}

class TabLayoutPage extends Page {
	constructor () {
		super();
		this.title = 'TabLayout Test';
		const tabLayoutWithoutIcons = new TabLayoutInterface('tabLayoutWithoutIcons');
		const tabLayoutWithIcons = new TabLayoutInterface('tabLayoutWithIcons');
		const tabLayoutCollapsedWithoutIcons = new TabLayoutInterface('tabLayoutCollapsedWithoutIcons');
		const tabLayoutCollapsedWithIcons = new TabLayoutInterface('tabLayoutCollapsedWithIcons');
		const tabLayoutHorizontal = new TabLayoutInterface('tabLayoutHorizontal');
		const tabLayoutHorizontalCollapsed = new TabLayoutInterface('tabLayoutHorizontalCollapsed');


		this.components = {
			tabLayoutWithoutIcons,
			tabLayoutWithIcons,
			tabLayoutCollapsedWithoutIcons,
			tabLayoutCollapsedWithIcons,
			tabLayoutHorizontal,
			tabLayoutHorizontalCollapsed
		};
	}

	hideAll () {
		for (let c in this.components) {
			this.components[c].hideSelf();
		}
	}

	open (urlExtra) {
		super.open('TabLayout-View', urlExtra);
	}
}

module.exports = new TabLayoutPage();
