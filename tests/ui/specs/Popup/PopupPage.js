'use strict';
const Page = require('@enact/ui-test-utils/test/Page.js');
const {element, getText} = require('@enact/ui-test-utils/test/utils.js');

class PopupCommon {

	get buttonPopup1 () { return element('#buttonPopup1', browser); }
	get buttonPopup2 () { return element('#buttonPopup2', browser); }
	get buttonPopup3 () { return element('#buttonPopup3', browser); }
	get buttonPopup4 () { return element('#buttonPopup4', browser); }
	get buttonPopup5 () { return element('#buttonPopup5', browser); }
	get buttonPopup6 () { return element('#buttonPopup6', browser); }
	get buttonPopup7 () { return element('#buttonPopup7', browser); }
	get buttonPopup8 () { return element('#buttonPopup8', browser); }
	get buttonPopup9 () { return element('#buttonPopup9', browser); }
	get   popupLayer () { return element('#floatLayer', browser); }
	get isPopupExist () { return this.popupLayer.isExisting('.Popup_Popup_popup'); }
	get isScrimExist () { return this.popupLayer.isExisting('.enact_ui_FloatingLayer_Scrim_scrim'); }
}

class PopupInterface {

	constructor (id) {
		this.id = id;
	}

	get          self () { return element(`#${this.id}`, browser); }
	get      buttonOK () { return element(`#${this.id} #buttonOK`, browser); }
	get  buttonCancel () { return element(`#${this.id} #buttonCancel`, browser); }
	get   buttonClose () { return element(`#${this.id} .IconButton_IconButton_iconButton`, browser); }
	get   closeSymbol () { return getText(element(`#${this.id} .Icon_Icon_icon`, browser)); }
	get         popup () { return element(`#${this.id}`, browser); }
	get         title () { return getText(element(`#${this.id}>div>div`, browser)); }
	get isCloseButton () { return this.self.isExisting('.IconButton_IconButton_iconButton'); }
}

class PopupPage extends Page {

	constructor () {
		super();
		this.title = 'Popup Test';

		this.components = {};
		this.popupCommon = new PopupCommon('popupMain');
		this.components.popup1 = new PopupInterface('popup1');
		this.components.popup2 = new PopupInterface('popup2');
		this.components.popup3 = new PopupInterface('popup3');
		this.components.popup4 = new PopupInterface('popup4');
		this.components.popup5 = new PopupInterface('popup5');
		this.components.popup6 = new PopupInterface('popup6');
		this.components.popup7 = new PopupInterface('popup7');
		this.components.popup8 = new PopupInterface('popup8');
		this.components.popup9 = new PopupInterface('popup9');
	}

	open (urlExtra) {
		super.open('Popup-View', urlExtra);
	}

	clickPopupFloatLayer () {
		browser.click('#floatLayer');
	}

	clickPopupMain () {
		browser.click('#popupMain');
	}
}

module.exports = new PopupPage();
