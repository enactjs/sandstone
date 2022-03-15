'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SliderInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(`#${this.id}`));
	}

	get self () {
		return $(this.selector);
	}

	get knob () {
		return $(this.selector + ' .Slider_Slider_knob');
	}

	async knobPositionHorizontal () {
		return parseInt((await this.knob.getCSSProperty('left')).value);
	}

	async knobPositionVertical () {
		return parseInt((await this.knob.getCSSProperty('bottom')).value);
	}

	async sliderFillWidth () {
		return parseInt((await $(this.selector + ' .Slider_Slider_fill').getCSSProperty('width')).value);
	}
}

class SliderPage extends Page {
	constructor () {
		super();
		this.title = 'Slider Test';
		const sliderDefault = new SliderInterface('sliderDefault');
		const sliderDisabled = new SliderInterface('sliderDisabled');
		const sliderCustomProgressAnchor = new SliderInterface('sliderCustomProgressAnchor');
		const sliderVertical = new SliderInterface('sliderVertical');
		const sliderVerticalDisabled = new SliderInterface('sliderVerticalDisabled');
		const sliderActivateOnSelect = new SliderInterface('sliderActivateOnSelect');
		this.components = {sliderDefault, sliderDisabled, sliderCustomProgressAnchor, sliderVertical, sliderVerticalDisabled, sliderActivateOnSelect};
	}

	async numPad (num) {
		let Inputnum = 'numpad' + String(num);
		return await this.keyDelay(Inputnum);
	}

	async open (urlExtra) {
		await super.open('Slider-View', urlExtra);
	}
}

module.exports = new SliderPage();
