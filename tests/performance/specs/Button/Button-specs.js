const Page = require('./ButtonPage');
const {getWebVitalsMetrics} = require('../../utils');

describe('Button', async function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		button,
	} = Page.components;

	describe('5-way', async function () {
		it('should focus disabled button on 5-way right', function () {
			button.focus();
			Page.spotlightRight();
			console.log(getWebVitalsMetrics(Page));
	});
	});
});
