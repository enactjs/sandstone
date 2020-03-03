let Page = require('./ActivityPanelsPage');

describe('ActivityPanels', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should load first panel.', function () {
		expect(Page.panelTitle.toLowerCase()).to.equal('FIRST'.toLowerCase());
	});

	it('should have breadcrumb on second panel', function () {
		Page.button1.click();
		Page.waitForPanelLeave(0);

		expect(Page.breadcrumbHeader.getText()).to.include('01');
	});

	describe('Transition', function () {
		it('should move from first panel to the second', function () {
			Page.button1.click();
			Page.waitForPanelLeave(0);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());
		});

		it('should navigate to Last Focused', function () {
			Page.item1.click();

			Page.waitToClick('#item5');
			// wait for the panel to leave so button4 is within the viewport
			Page.waitForPanelLeave(1);

			Page.waitToClick('#button4');

			Page.waitToClick('#item2');
			Page.waitForPanelLeave(3);

			expect(Page.panelTitle.toLowerCase()).to.equal('Last Focused'.toLowerCase());
		});

		it('should navigate back to the First panel from clicking on breadcrumb', function () {
			Page.item1.click();

			Page.waitToClick('#item5');
			// wait for the panel to leave so button4 is within the viewport
			Page.waitForPanelLeave(1);

			Page.waitToClick('#button4');

			Page.waitToClick('#item2');
			Page.waitForPanelLeave(3);

			Page.breadcrumb.click();
			Page.waitForPanelLeave(4);

			Page.breadcrumb.click();
			Page.waitForPanelLeave(3);

			Page.breadcrumb.click();
			Page.waitForPanelLeave(2);

			Page.breadcrumb.click();
			Page.waitForPanelLeave(1);

			expect(Page.panelTitle.toLowerCase()).to.equal('FIRST'.toLowerCase());
		});

		it('should navigate back to the Third panel from clicking on breadcrumb', function () {
			Page.item1.click();

			Page.waitToClick('#item5');
			Page.waitForPanelLeave(1);

			Page.breadcrumb.click();

			Page.waitToClick('#item8');
			Page.waitForPanelLeave(1);

			Page.waitToClick('#button4');
			Page.waitForPanelLeave(2);

			Page.breadcrumb.click();
			Page.waitForPanelLeave(3);

			expect(Page.panelTitle.toLowerCase()).to.equal('THIRD'.toLowerCase());
		});

		it('should move from first panel to the third', function () {
			Page.button1.moveTo();
			Page.spotlightSelect();
			Page.waitForPanelLeave(0);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

			Page.item8.moveTo();
			Page.spotlightSelect();
			Page.waitForPanelLeave(1);

			expect(Page.panelTitle.toLowerCase()).to.equal('THIRD'.toLowerCase());
		});

		it('should move to first panel from the third', function () {
			Page.button1.moveTo();
			Page.spotlightSelect();
			Page.waitForPanelLeave(0);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

			Page.item8.moveTo();
			Page.spotlightSelect();
			Page.waitForPanelLeave(1);

			expect(Page.panelTitle.toLowerCase()).to.equal('THIRD'.toLowerCase());

			Page.breadcrumbHeader.moveTo();
			Page.spotlightSelect();
			Page.waitForPanelLeave(2);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

			Page.item8.moveTo();
			Page.breadcrumbHeader.moveTo();
			Page.spotlightSelect();
			Page.waitForPanelLeave(1);

			expect(Page.panelTitle.toLowerCase()).to.equal('FIRST'.toLowerCase());
		});

		it('should transition back to First panel with back key', function () {
			Page.button1.click();
			Page.waitForPanelLeave(0);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

			Page.backKey();
			Page.waitForPanelLeave(1);

			expect(Page.panelTitle.toLowerCase()).to.equal('FIRST'.toLowerCase());
		});
	});

	describe('Spotlight', function () {
		it('should spot item 1 on render', function () {
			browser.waitUntil(() => Page.item1.isFocused(), 3000, undefined, 100);
		});

		describe('pointer', function () {
			// The ESC button (Back Key) does _not_ unset the pointer mode and does _not_ focus [ENYO-5865] [ENYO-5882]
			it('should Not spot last focused item when transitioning back', function () {
				Page.item2.click();
				Page.waitForPanelLeave(0);

				Page.backKey();
				Page.waitForPanelLeave(1);

				expect(Page.item2.isFocused()).to.be.false();
			});

			// The ESC button (Back Key) does _not_ unset the pointer mode and does _not_ focus [ENYO-5865] [ENYO-5882]
			it('should Not spot last focused item when transitioning back after moving pointer', function () {
				Page.item2.click();
				Page.waitForPanelLeave(0);

				Page.item8.moveTo();
				Page.backKey();
				Page.waitForPanelLeave(1);

				expect(Page.item2.isFocused()).to.be.false();
			});
		});


		describe('5way', function () {
			it('should spot first item on second panel', function () {
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);
			});

			it('should spot last focused item when transitioning back using back key', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);

				Page.backKey();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.item2.isFocused(), 3000, undefined, 100);
			});

			// Revisit this test.  As we can't focus the breadcrumb with 5-way by going down right now
			// we can't have button 4 have the last focus.  Possibly related to ENYO-5151.
			it('should spot last focused item when transitioning back from Third panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, 'Item 5 focus', 100);

				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.button3.isFocused(), 3000, 'Button 3 focus', 100);

				Page.spotlightRight();

				browser.waitUntil(() => Page.button4.isFocused(), 3000, 'Button 4 focus', 100);

				Page.spotlightLeft();
				Page.spotlightLeft();

				browser.waitUntil(() => Page.breadcrumb.isFocused(), 3000, 'Breadcrumb focus', 100);

				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, 'Item 5 refocus', 100);
			});

			it('should spot last focused item in first panel when transitioning after deep navigation', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				Page.item6.waitForExist();
				Page.spotlightDown();

				browser.waitUntil(() => Page.item6.isFocused(), 3000, 'Item 6 focus', 100);

				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.button3.isFocused(), 3000, 'Button 3 focus', 100);

				Page.backKey();
				Page.waitForPanelLeave(2);

				browser.waitUntil(() => Page.item6.isFocused(), 3000, 'Item 6 refocus', 100);

				Page.backKey();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.item2.isFocused(), 3000, 'Item 2 refocus', 100);
			});

			// Panel does not remember last focused item when moving forward to already visited panel
			// from 2.4.0, panel no longer remembers the children when going forward. It will land on the default item - first item - on the panel
			it('should spot the fifth item on second panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);

				Page.spotlightLeft();

				browser.waitUntil(() => Page.breadcrumb.isFocused(), 3000, undefined, 100);

				Page.spotlightRight();

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);

				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100); // only from 2.4.0
				// browser.waitUntil(() => Page.item8.isFocused(), 3000, undefined, 100); // on 2.3.0 and prior
			});

			it('should spot the seventh item on last panel', function () {
				browser.waitUntil(() => Page.item1.isFocused(), 3000, undefined, 100);
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.button3.isFocused(), 3000, undefined, 100);
				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);

				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightLeft();

				browser.waitUntil(() => Page.breadcrumb.isFocused(), 3000, undefined, 100);

				Page.spotlightRight();

				browser.waitUntil(() => Page.item7.isFocused(), 3000, undefined, 100);
			});

			it('should spot third item on first panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);

				Page.spotlightLeft();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.item3.isFocused(), 3000, undefined, 100);
			});
		});

		describe('5way and pointer', function () {
			it('should not spot in None panel', function () {
				Page.button1.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

				Page.item8.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.button3.isFocused(), 3000, undefined, 100);

				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				browser.waitUntil(() => Page.body.isFocused(), 3000, undefined, 100);
			});

			it('should spot default item in Default panel', function () {
				Page.button1.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

				Page.item8.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.panelTitle.toLowerCase()).to.equal('THIRD'.toLowerCase());
				Page.button4.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				expect(Page.panelTitle.toLowerCase()).to.equal('NONE'.toLowerCase());

				Page.button1.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);
			});

			it('should re-spot last focused in last focused panel', function () {
				Page.button1.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, 'item 5 focus 1', 100);

				Page.item8.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.button3.isFocused(), 3000, 'button 3 focus', 100);

				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				browser.waitUntil(() => Page.body.isFocused(), 3000, 'body focus', 100);

				Page.button1.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, 'item 5 focus 2', 100);

				// Focus to item 6 so it can be last-focused item when returning
				Page.spotlightDown();
				browser.waitUntil(() => Page.item6.isFocused(), 3000, 'item 5 focus 2', 100);
				Page.backKey();
				Page.waitForPanelLeave(4);

				Page.item2.moveTo();	// Can't be sure what will be focused on down, be explicit
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				browser.waitUntil(() => Page.item6.isFocused(), 3000, 'item 6', 100);
			});

			// This test is failing intermittently (only when running the full suite and not when
			// running this component only) so we're skipping it for now
			it.skip('should spot last focused item when transitioning back with Back key, deep navigation', function () {
				Page.item3.moveTo();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);

				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.button3.isFocused(), 3000, undefined, 100);

				Page.backKey();
				Page.waitForPanelLeave(2);

				browser.waitUntil(() => Page.item5.isFocused(), 3000, undefined, 100);

				Page.backKey();
				Page.waitForPanelLeave(1);

				browser.waitUntil(() => Page.item3.isFocused(), 3000, undefined, 100);
			});
		});
	});
});
