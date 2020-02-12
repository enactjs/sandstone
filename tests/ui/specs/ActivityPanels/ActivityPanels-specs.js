let Page = require('./ActivityPanelsPage');

describe('ActivityPanels', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should load first panel.', function () {
		expect(Page.panelTitle.toLowerCase()).to.equal('FIRST'.toLowerCase());
	});

	it('should have breadcrumb on second panel', function () {
		Page.waitTransitionEnd(5000, undefined, () => {
			Page.button1.click();
		});

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
			Page.button1.moveToObject();
			Page.spotlightSelect();
			Page.waitForPanelLeave(0);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

			Page.item8.moveToObject();
			Page.spotlightSelect();
			Page.waitForPanelLeave(1);

			expect(Page.panelTitle.toLowerCase()).to.equal('THIRD'.toLowerCase());
		});

		it('should move to first panel from the third', function () {
			Page.button1.moveToObject();
			Page.spotlightSelect();
			Page.waitForPanelLeave(0);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

			Page.item8.moveToObject();
			Page.spotlightSelect();
			Page.waitForPanelLeave(1);

			expect(Page.panelTitle.toLowerCase()).to.equal('THIRD'.toLowerCase());

			Page.breadcrumbHeader.moveToObject();
			Page.spotlightSelect();
			Page.waitForPanelLeave(2);

			expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

			Page.item8.moveToObject();
			Page.breadcrumbHeader.moveToObject();
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
			expect(Page.item1.hasFocus()).to.be.true();
		});

		describe('pointer', function () {
			// The ESC button (Back Key) does _not_ unset the pointer mode and does _not_ focus [ENYO-5865] [ENYO-5882]
			it('should Not spot last focused item when transitioning back', function () {
				Page.item2.click();
				Page.waitForPanelLeave(0);

				Page.backKey();
				Page.waitForPanelLeave(1);

				expect(Page.item2.hasFocus()).to.be.false();
			});

			// The ESC button (Back Key) does _not_ unset the pointer mode and does _not_ focus [ENYO-5865] [ENYO-5882]
			it('should Not spot last focused item when transitioning back after moving pointer', function () {
				Page.item2.click();
				Page.waitForPanelLeave(0);

				Page.item8.moveToObject();
				Page.backKey();
				Page.waitForPanelLeave(1);

				expect(Page.item2.hasFocus()).to.be.false();
			});
		});


		describe('5way', function () {
			it('should spot first item on second panel', function () {
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.item5.hasFocus()).to.be.true();
			});

			it('should spot last focused item when transitioning back using back key', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.item5.hasFocus()).to.be.true();

				Page.backKey();
				Page.waitForPanelLeave(1);

				expect(Page.item2.hasFocus()).to.be.true();
			});

			// Revisit this test.  As we can't focus the breadcrumb with 5-way by going down right now
			// we can't have button 4 have the last focus.  Possibly related to ENYO-5151.
			it('should spot last focused item when transitioning back from Third panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.item5.hasFocus(), 'Item 5 focus').to.be.true();

				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.button3.hasFocus(), 'Button 3 focus').to.be.true();

				Page.spotlightRight();

				expect(Page.button4.hasFocus(), 'Button 4 focus').to.be.true();

				Page.spotlightLeft();
				Page.spotlightLeft();

				expect(Page.breadcrumb.hasFocus(), 'Breadcrumb focus').to.be.true();

				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				expect(Page.item5.hasFocus(), 'Item 5 refocus').to.be.true();
			});

			it('should spot last focused item in first panel when transitioning after deep navigation', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				Page.spotlightDown();

				expect(Page.item6.hasFocus(), 'Item 6 focus').to.be.true();

				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.button3.hasFocus(), 'Button 3 focus').to.be.true();

				Page.backKey();
				Page.waitForPanelLeave(2);

				expect(Page.item6.hasFocus(), 'Item 6 refocus').to.be.true();

				Page.backKey();
				Page.waitForPanelLeave(1);

				expect(Page.item2.hasFocus(), 'Item 2 refocus').to.be.true();
			});

			// Panel does not remember last focused item when moving forward to already visited panel
			// from 2.4.0, panel no longer remembers the children when going forward. It will land on the default item - first item - on the panel
			it('should spot the fifth item on second panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.item5.hasFocus()).to.be.true();

				Page.spotlightLeft();

				expect(Page.breadcrumb.hasFocus()).to.be.true();

				Page.spotlightRight();

				expect(Page.item5.hasFocus()).to.be.true();

				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();

				expect(Page.item5.hasFocus()).to.be.true(); // only from 2.4.0
				// expect(Page.item8.hasFocus()).to.be.true(); // on 2.3.0 and prior
			});

			it('should spot the seventh item on last panel', function () {
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				expect(Page.item5.hasFocus()).to.be.true();

				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightLeft();

				expect(Page.breadcrumb.hasFocus()).to.be.true();

				Page.spotlightRight();

				expect(Page.item7.hasFocus()).to.be.true();
			});

			it('should spot third item on first panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.item5.hasFocus()).to.be.true();

				Page.spotlightLeft();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.item3.hasFocus()).to.be.true();
			});
		});

		describe('5way and pointer', function () {
			it('should not spot in None panel', function () {
				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

				Page.item8.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.button3.hasFocus()).to.be.true();

				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				expect(Page.body.hasFocus()).to.be.true();
			});

			it('should spot default item in Default panel', function () {
				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.panelTitle.toLowerCase()).to.equal('SECOND'.toLowerCase());

				Page.item8.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.panelTitle.toLowerCase()).to.equal('THIRD'.toLowerCase());
				Page.button4.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				expect(Page.panelTitle.toLowerCase()).to.equal('NONE'.toLowerCase());

				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				expect(Page.item5.hasFocus()).to.be.true();
			});

			it('should re-spot last focused in last focused panel', function () {
				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.item5.hasFocus(), 'item 5 focus 1').to.be.true();

				Page.item8.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.button3.hasFocus(), 'button 3 focus').to.be.true();

				Page.spotlightSelect();
				Page.waitForPanelLeave(2);

				expect(Page.body.hasFocus(), 'body focus').to.be.true();

				Page.spotlightDown();

				expect(Page.breadcrumb.hasFocus(), 'breadcrumb focus').to.be.true();

				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				expect(Page.item5.hasFocus(), 'item 5 focus 2').to.be.true();

				// Focus to item 6 so it can be last-focused item when returning
				Page.spotlightDown();
				Page.backKey();
				Page.waitForPanelLeave(4);

				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitForPanelLeave(3);

				expect(Page.item6.hasFocus(), 'item 6').to.be.true();
			});

			// This test is failing intermittently (only when running the full suite and not when
			// running this component only) so we're skipping it for now
			it.skip('should spot last focused item when transitioning back with Back key, deep navigation', function () {
				Page.item3.moveToObject();
				Page.spotlightSelect();
				Page.waitForPanelLeave(0);

				expect(Page.item5.hasFocus()).to.be.true();

				Page.spotlightSelect();
				Page.waitForPanelLeave(1);

				expect(Page.button3.hasFocus()).to.be.true();

				Page.backKey();
				Page.waitForPanelLeave(2);

				expect(Page.item5.hasFocus()).to.be.true();

				Page.backKey();
				Page.waitForPanelLeave(1);

				expect(Page.item3.hasFocus()).to.be.true();
			});
		});
	});
});
