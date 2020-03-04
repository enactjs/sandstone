'use strict';
const {getComponent, Page} = require('@enact/ui-test-utils/utils');

const getContent = getComponent({component: 'TabLayout', child: 'content'});

class TabLayoutInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get currentView () {return this.content.element('div');}
	get self () {return browser.element(this.selector);}
	get content () {return getContent(this.self);}
	get tabOrientation () {return this.tabContainer.getAttribute('orientation');}
	get tabContainer () {return this.self.element('[role=group]');}
	get tabs () {return this.tabContainer.elements('[data-index]');}
}

class TabLayoutPage extends Page {
	constructor () {
		super();
		this.title = 'TabLayout Test';
		const tabLayoutDefaultWithoutIcons = new TabLayoutInterface('tabLayoutDefaultWithoutIcons');
		const tabLayoutCollapsedWithoutIcons = new TabLayoutInterface('tabLayoutCollapsedWithoutIcons');
		const tabLayoutDefaultWithIcons = new TabLayoutInterface('tabLayoutDefaultWithIcons');
		const tabLayoutCollapsedWithIcons = new TabLayoutInterface('tabLayoutCollapsedWithIcons');
		const tabLayoutHorizontalWithoutIcons = new TabLayoutInterface('tabLayoutHorizontalWithoutIcons');
		const tabLayoutHorizontalCollapsedWithoutIcons = new TabLayoutInterface('tabLayoutHorizontalCollapsedWithoutIcons');
		const tabLayoutHorizontalWithIcons = new TabLayoutInterface('tabLayoutHorizontalWithIcons');
		const tabLayoutHorizontalCollapsedWithIcons = new TabLayoutInterface('tabLayoutHorizontalCollapsedWithIcons');


		this.components = {
			tabLayoutDefaultWithoutIcons,
			tabLayoutCollapsedWithoutIcons,
			tabLayoutDefaultWithIcons,
			tabLayoutCollapsedWithIcons,
			tabLayoutHorizontalWithoutIcons,
			tabLayoutHorizontalCollapsedWithoutIcons,
			tabLayoutHorizontalWithIcons,
			tabLayoutHorizontalCollapsedWithIcons
		};
	}

	open (urlExtra) {
		super.open('TabLayout-View', urlExtra);
	}
}

module.exports = new TabLayoutPage();
