'use strict';
const {element, getText, Page} = require('@enact/ui-test-utils/utils');

class TooltipButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
		this.marqueeAnimatedSelector = `#${this.id} > div .enact_ui_Marquee_Marquee_animate`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}

	hover () {
		return $(this.selector).moveTo({xOffset: 0, yOffset: 0});
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

	open (urlExtra) {
		super.open('TooltipDecorator-View', urlExtra);
	}
}

module.exports = new TooltipDecoratorPage();
