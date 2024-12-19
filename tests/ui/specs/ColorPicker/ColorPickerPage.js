'use strict';
const {element, getComponent, Page} = require('@enact/ui-test-utils/utils');

const getTabs = getComponent({component: 'TabLayout', child: 'tabs'});
const colorPicker = getComponent({component: 'ColorPicker', child: 'colorPicker'});

class ColorPickerInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return browser.$(this.selector);
	}

	async tabItems () {
		return await (await this.tabs()).$$('.Button_Button_button');
	}
	
	async tabs () {
		return await getTabs(this.self);
	}

	async colorBlock () {
		return await (await this.gridColumns()).$$('.ColorPicker_ColorPickerGrid_colorBlock');
	}
	
	async gridColumns () {
		return await colorPicker(this.self);
	}

	get selectedColor () {
		return element('.ColorPicker_ColorPicker_selectedColor', browser);
	}

	get spectrumIndicator () {
		return element('.ColorPicker_ColorPickerSpectrum_circleIndicator', browser);
	}

	get canvas () {
		return element('.ColorPicker_ColorPickerSpectrum_gradientCanvas', browser);
	}

	async sliders () {
		return await (await this.sliderColorPicker()).$$('.ColorPicker_ColorPickerSlider_sliderCell');
	}
	
	async slidersOutput () {
		return await (await this.sliderColorPicker()).$$('.ColorPicker_ColorPickerSlider_outputText');
	}
	
	async slidersLabel () {
		return await (await this.sliderColorPicker()).$$('.ColorPicker_ColorPickerSlider_labelText');
	}
	
	async sliderColorPicker () {
		return await colorPicker(this.self);
	}

	get slidersDropdown () {
		return element('.ColorPicker_ColorPickerSlider_pickerSelect', browser);
	}
}

class ColorPickerPage extends Page {
	constructor () {
		super();
		this.title = 'ColorPicker Test';
		this.components = {};
		this.components.colorPicker = new ColorPickerInterface('colorPicker');
	}

	async open (urlExtra) {
		await super.open('ColorPicker-View', urlExtra);
	}
}

module.exports = new ColorPickerPage();
