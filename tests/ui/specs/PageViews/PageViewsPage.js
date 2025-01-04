'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class PageViewsInterface {
	constructor (id) {
		this.id = `${id}`;
	}

	get self () {
		return $(`#${this.id}`);
	}

	get nextButton () {
		return $(`#NextNavButton`);
	}

	get prevButton () {
		return $(`#PrevNavButton`);
	}

	get isPageExist () {
		return this.self.isExisting();
	}
}

class ItemInterface {
	constructor (id) {
		this.id = `${id}`;
	}

	get self () {
		return $(`#${this.id}`);
	}
}

class PageViewsPage extends Page {
	constructor () {
		super();
		this.title = 'PageView Test';
		const pageViewsPage1 = new PageViewsInterface('PageViewsPage1');
		const pageViewsPage2 = new PageViewsInterface('PageViewsPage2');
		const pageViewsItem1 = new ItemInterface('PageViewsItem1');
		const pageViewsItem3 = new ItemInterface('PageViewsItem3');

		this.components = {
			pageViewsPage1,
			pageViewsPage2,
			pageViewsItem1,
			pageViewsItem3
		};
	}

	async open (specification = '', urlExtra) {
		await super.open(`PageViews${specification}-View`, urlExtra);
	}

	get focusedText () {
		return browser.execute(() => {
			return document.activeElement === document.body ? null : document.activeElement.textContent;
		});
	}
}

module.exports = new PageViewsPage();
