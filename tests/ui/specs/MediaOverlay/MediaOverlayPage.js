'use strict';
const {getSubComponent, getText, Page} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component: 'Marquee', child: 'text'});

class MediaOverlayInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
		this.marqueeAnimatedSelector = `#${this.id} > div .enact_ui_Marquee_Marquee_animate`;
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
		return $(this.marqueeAnimatedSelector).isExisting();
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
