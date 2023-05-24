// 'use strict';
// const {getComponent, getSubComponent, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');
import {getComponent, getSubComponent, getText, hasClass, Page} from '@enact/ui-test-utils/utils/index.js';

const getIcon = getComponent({component:'Icon'});
const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});

class ButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
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
	get valueText () {
		return getText(getMarqueeText(this.self));
	}
	get icon () {
		return getIcon(this.self);
	}
	get iconSymbol () {
		return getText(this.icon);
	}
	get isIconAfter () {
		return hasClass('iconAfter', this.self);
	}
	get isIconBefore () {
		return hasClass('iconBefore', this.self);
	}
	get isIconButton () {
		return hasClass('iconOnly', this.self);
	}
	get isLarge () {
		return hasClass('large', this.self);
	}
	get isMinWidth () {
		return hasClass('minWidth', this.self);
	}
	get isOpaque () {
		return hasClass('opaque', this.self);
	}
	get isTransparent () {
		return hasClass('transparent', this.self);
	}
}

class ButtonPage extends Page {
	constructor () {
		super();
		this.title = 'Button Test';
		const buttonDefault = new ButtonInterface('button1');
		const buttonDisabled = new ButtonInterface('button2');
		const buttonTransparent = new ButtonInterface('button3');
		const buttonWithCheckIcon = new ButtonInterface('button4');
		const buttonWithIconAfter = new ButtonInterface('button5');
		const buttonFalseMinWidth = new ButtonInterface('button6');
		const buttonSizeSmall = new ButtonInterface('button7');
		const iconButton = new ButtonInterface('button8');

		this.components = {
			buttonDefault,
			buttonDisabled,
			buttonTransparent,
			buttonWithCheckIcon,
			buttonWithIconAfter,
			buttonFalseMinWidth,
			buttonSizeSmall,
			iconButton
		};
	}

	async open (urlExtra) {
		await super.open('Button-View', urlExtra);
	}
}

//module.exports = new ButtonPage();
export default new ButtonPage();
