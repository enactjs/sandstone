//'use strict';
//const {element, getText, Page} = require('@enact/ui-test-utils/utils');
import {element, getText, Page} from '@enact/ui-test-utils/utils/index.js';

class AlertCommon {
	get buttonFullscreen () {
		return element('#openFullscreen', browser);
	}
	get buttonOverlay () {
		return element('#openOverlay', browser);
	}
	get alertLayer () {
		return element('#floatLayer', browser);
	}
	get outsideOverlay () {
		return element('.outsideOverlay', browser);
	}
	get isAlertExist () {
		return this.alertLayer.$('.Alert_Alert_alert').isExisting();
	}
}

class AlertInterface {
	constructor (id) {
		this.id = id;
	}

	get self () {
		return element(`#${this.id}`, browser);
	}
	get buttonOK () {
		return element(`#${this.id} #buttonOK`, browser);
	}
	get  buttonCancel () {
		return element(`#${this.id} #buttonCancel`, browser);
	}
	get title () {
		return getText(element(`#${this.id}>div>div`, browser));
	}
}

class AlertPage extends Page {
	constructor () {
		super();
		this.title = 'Alert Test';

		this.components = {};
		this.alertCommon = new AlertCommon('alertMain');
		this.components.alertFullscreen = new AlertInterface('alertFullscreen');
		this.components.alertOverlay = new AlertInterface('alertOverlay');
	}

	async open (urlExtra) {
		await super.open('Alert-View', urlExtra);
	}
}

//module.exports = new AlertPage();
export default new AlertPage();
