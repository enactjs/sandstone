'use strict';
const {element, getComponent, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getContent = getComponent({component: 'TabLayout', child: 'content'});
const getTabPanels = getComponent({component: 'PopupTabLayout', child: 'panels'});
const getTabLayout = getComponent({component: 'TabLayout'});
const getTabs = getComponent({component: 'TabLayout', child: 'tabsExpanded'});
const getCollapsedTabs = getComponent({component: 'TabLayout', child: 'tabs'});
const getHeaderSlot = (slot, el) => element(`.Panels_Header_${slot}`, el);
const getHelpButton = async el => await getComponent({component: 'Button'}, await getHeaderSlot('slotAfter', el));
const getPrevButton = async el => await getComponent({component: 'Button'}, await getHeaderSlot('slotBefore', el));

class PopupTabLayoutInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async hoverScroller () {
		return await $(this.tabsScroller.selector).moveTo();
	}

	async hoverTabs () {
		return await $(this.tabs.selector).moveTo();
	}

	async helpButton () {
		return await getHelpButton(this.self);
	}
	async prevButton () {
		return await getPrevButton(this.self);
	}

	get self () {
		return browser.$(this.selector);
	}
	get content () {
		return getContent(this.self);
	}
	get currentView () {
		return getTabPanels(this.content);
	}
	get tabLayout () {
		return getTabLayout(this.self);
	}
	get isCollapsed () {
		return hasClass('collapsed', this.tabLayout);
	}
	// get tabIcons () {return this.tabs.$$('.Icon_Icon_icon');}
	get tabItems () {
		return this.tabs.$$('.Button_Button_button');
	}
	get tabs () {
		return getTabs(this.self);
	}
	// get tabsScroller () {return getScroller(this.self);}
	get collapsedTabs () {
		return getCollapsedTabs(this.self);
	}
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

	async open (layout = '', urlExtra) {
		await super.open(`PopupTabLayout${layout}-View`, urlExtra);
	}

	async waitForExist (selector, timeout) {
		await $(selector).waitForExist({timeout});
	}

	async buttonPadding () {
		return await browser.execute(function () {
			return Math.round(document.querySelector('#withButtonDisplay').getBoundingClientRect().bottom - document.querySelector('#button').getBoundingClientRect().bottom);
		});
	}

	async getAriaLabel () {
		return await browser.execute(function () {
			return document.activeElement.getAttribute('aria-label');
		});
	}
}

module.exports = new PopupTabLayoutPage();
