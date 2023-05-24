// 'use strict';
// const {element, getText, Page} = require('@enact/ui-test-utils/utils');
import {element, getText, Page} from '@enact/ui-test-utils/utils/index.js';

class TooltipButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
		this.marqueeAnimatedSelector = `#${this.id} > div .enact_ui_Marquee_Marquee_marquee`;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(this.selector));
	}

	async hover () {
		return await $(this.selector).moveTo({xOffset: 0, yOffset: 0});
	}

	get self () {
		return $(this.selector);
	}

	get tooltipText () {
		return getText(element('.enact-fit.enact-clip.enact-untouchable>div', browser));
	}

	get isTooltipShowing () {
		return element('.enact-fit.enact-clip.enact-untouchable>div', browser).isExisting();
	}

	get isMarqueeAnimated () {
		return $(this.marqueeAnimatedSelector).isExisting();
	}
}

class TooltipDecoratorPage extends Page {
	constructor () {
		super();
		this.title = 'TooltipDecorator Test';
		const tooltipButtonDefault = new TooltipButtonInterface('tooltipButton1');
		const tooltipButtonDelayed = new TooltipButtonInterface('tooltipButton2');
		const tooltipButtonDisabled = new TooltipButtonInterface('tooltipButton3');
		const tooltipButtonWithMarquee = new TooltipButtonInterface('tooltipButton4');

		this.components = {tooltipButtonDefault, tooltipButtonDelayed, tooltipButtonDisabled, tooltipButtonWithMarquee};
	}

	async open (urlExtra) {
		await super.open('TooltipDecorator-View', urlExtra);
	}
}

//module.exports = new TooltipDecoratorPage();
export default new TooltipDecoratorPage();
