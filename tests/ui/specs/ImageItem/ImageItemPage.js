'use strict';
const {element, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

class ImageItemInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(`#${this.id}`));
	}
	get self () {
		return $(`#${this.id}`);
	}
	get textContent () {
		return getText(element(`#${this.id} .ImageItem_ImageItem_caption`, this.self));
	}
	get valueText () {
		return getText($(`#${this.id} > div .enact_ui_Marquee_Marquee_text`));
	}
	get image () {
		return $(`#${this.id} .ImageItem_ImageItem_image`).isExisting();
	}
	get isSelected () {
		return hasClass('selected', this.self);
	}
	get hasLabel () {
		return $(`#${this.id} .ImageItem_ImageItem_label`).isExisting();
	}
}

class ImageItemPage extends Page {
	constructor () {
		super();
		this.title = 'ImageItem Test';
		const imageItemDefault = new ImageItemInterface('imageItem1');
		const imageItemLongCaption = new ImageItemInterface('imageItem2');
		const imageItemCentered = new ImageItemInterface('imageItem3');
		const imageItemDisabled = new ImageItemInterface('imageItem4');
		const imageItemSelected = new ImageItemInterface('imageItem5');
		const imageItemWithLabel = new ImageItemInterface('imageItem6');

		this.components = {
			imageItemDefault,
			imageItemLongCaption,
			imageItemCentered,
			imageItemDisabled,
			imageItemSelected,
			imageItemWithLabel
		};
	}

	async open (urlExtra) {
		await super.open('ImageItem-View', urlExtra);
	}
}

module.exports = new ImageItemPage();
