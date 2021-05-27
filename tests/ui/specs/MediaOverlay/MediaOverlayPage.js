'use strict';
const {getSubComponent, getText, hasClass, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component: 'Marquee', child: 'text'});

class MediaOverlayInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}

	get self () {
		return $(this.selector);
	}

	get valueText () {
		return getText(getMarqueeText(this.self));
	}

	get isMarqueeAnimated () {
		return hasClass('enact_ui_Marquee_Marquee_animate', getMarqueeText(this.self));
	}

}

class MediaOverlayPage extends Page {
	constructor () {
		super();
		this.title = 'MediaOverlay Test';
		const mediaOverlay1 = new MediaOverlayInterface('mediaOverlay1');
		const mediaOverlay2LongText = new MediaOverlayInterface('mediaOverlay2LongText');
		this.components = {mediaOverlay1, mediaOverlay2LongText};
	}

	open (urlExtra) {
		super.open('MediaOverlay-View', urlExtra);
	}
}

module.exports = new MediaOverlayPage();
