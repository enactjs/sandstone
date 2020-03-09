'use strict';
const {getComponent, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getContent = getComponent({component: 'TabLayout', child: 'content'});
const getTabs = getComponent({component: 'TabLayout', child: 'tabs'});

class TabLayoutInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get content () {return getContent(this.self);}
	get currentView () {return this.content.element('div');}
	get isCollapsed () {return hasClass('collapsed', this.self);}
	get self () {return browser.element(this.selector);}
	get tabGroup () {return this.self.element('[role=group]');}
	get tabIcons () {return this.tabs.elements('.Icon_Icon_icon');}
	get tabItems () {return this.tabs.elements('[data-index]');}
	get tabOrientation () {return this.tabGroup.getAttribute('orientation');}
	get tabs () {return getTabs(this.self);}
}

class TabLayoutPage extends Page {
	constructor () {
		super();
		this.title = 'TabLayout Test';
		const tabLayoutDefaultWithoutIcons = new TabLayoutInterface('tabLayoutDefaultWithoutIcons');
		const tabLayoutCollapsedWithoutIcons = new TabLayoutInterface('tabLayoutCollapsedWithoutIcons');
		const tabLayoutCollapsedWithIcons = new TabLayoutInterface('tabLayoutCollapsedWithIcons');
		const tabLayoutHorizontal = new TabLayoutInterface('tabLayoutHorizontal');


		this.components = {
			tabLayoutDefaultWithoutIcons,
			tabLayoutCollapsedWithoutIcons,
			tabLayoutCollapsedWithIcons,
			tabLayoutHorizontal
		};
	}

	open (urlExtra) {
		super.open('TabLayout-View', urlExtra);
	}
}

module.exports = new TabLayoutPage();
