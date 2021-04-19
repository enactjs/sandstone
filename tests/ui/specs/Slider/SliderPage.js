'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SliderInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}`));
	}

	get self () {
		return $(this.selector);
	}

	get knob () {
		return $(this.selector + ' .Slider_Slider_knob');
	}

	get knobPositionHorizontal () {
		return parseInt(this.knob.getCSSProperty('left').value);
	}

	get knobPositionVertical () {
		return parseInt(this.knob.getCSSProperty('bottom').value);
	}

	get sliderFillWidth () {
		return parseInt($(this.selector + ' .Slider_Slider_fill').getCSSProperty('width').value);
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

	numPad (num) {
		let Inputnum = 'numpad' + String(num);
		return this.keyDelay(Inputnum);
	}

	open (urlExtra) {
		super.open('Slider-View', urlExtra);
	}
}

module.exports = new SliderPage();
