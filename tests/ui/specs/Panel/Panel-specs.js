const Page = require('./PanelPage');

describe('Panel', function () {

	beforeEach(function () {
		Page.open();
	});

	describe('Collapsing Header', function () {
		it('should collapse header on page down', function () {
			const y = Page.panel.getHeaderTop();

			// Get focus in scroller
			Page.panel.content.moveTo();
			Page.pageDown();
			Page.delay(500);

			expect(Page.panel.getHeaderTop()).to.be.lessThan(y);
		})
	})
});
