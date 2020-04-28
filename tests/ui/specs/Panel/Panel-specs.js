const Page = require('./PanelPage');

describe('Panel', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('Collapsing Header', function () {
		it('should collapse header on page down', function () {

			// Get focus in scroller
			Page.panel.content.moveTo();
			Page.pageDown();


		})
	})
});
