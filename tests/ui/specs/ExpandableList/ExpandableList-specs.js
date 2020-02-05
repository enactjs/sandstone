const Page = require('./ExpandableListPage'),
	{validateTitle, expectClosed, expectOpen} = require('./ExpandableList-utils.js');

describe('ExpandableList', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first expandable at start', function () {
		expect(Page.components.radioSelect.title.hasFocus()).to.be.true();
	});

	describe('radio select', function () {
		const expandable = Page.components.radioSelect;

		validateTitle(expandable, 'ExpandableList Radio Select');

		it('should have correct none text', function () {
			expect(expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should close when moving up to header', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expect(expandable.isOpen).to.be.true();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightUp();
				});
				expect(expandable.isOpen).to.be.false();
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should not allow 5-way exit from bottom', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expect(expandable.isOpen).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(expandable.item(2).hasFocus()).to.be.true();
				Page.spotlightDown();
				expect(expandable.item(2).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should only allow one selected item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expectOpen(expandable);
			});

			it('should close on title click when open', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.true();
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should only allow one selected item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expandable.item(1).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});
	});

	describe('multi select', function () {
		const expandable = Page.components.multiSelect;

		validateTitle(expandable, 'ExpandableList Multi Select');

		it('should have correct none text', function () {
			expect(expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should allow multiple selected items', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should combine value text with multi-select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.spotlightUp();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1, option2');
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expectOpen(expandable);
			});

			it('should close on title click when open', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.true();
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should allow multiple selected items', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expandable.item(1).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});
	});

	describe('single select', function () {
		const expandable = Page.components.singleSelect;

		validateTitle(expandable, 'ExpandableList Single Select');

		it('should have correct none text', function () {
			expect(expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should reset none text if nothing selected', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('Nothing Selected');
			});

			it('should not allow multiple selected items', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expectOpen(expandable);
			});

			it('should close on title click when open', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.true();
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.valueText).to.equal('option1');
			});

			it('should unselect item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should only allow one selected item', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expandable.item(0).click();
				expandable.item(1).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});
	});

	describe('no lock bottom', function () {
		const expandable = Page.components.noLockBottom;

		validateTitle(expandable, 'ExpandableList No Lock Bottom');

		describe('5-way', function () {
			it('should allow 5-way out when open', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expect(expandable.isOpen).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(expandable.item(2).hasFocus()).to.be.true();
				Page.spotlightDown();
				expect(Page.components.noAutoClose.title.hasFocus()).to.be.true();
			});
		});
	});

	describe('no auto close', function () {
		const expandable = Page.components.noAutoClose;

		validateTitle(expandable, 'ExpandableList No Auto Close');

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should not close when navigating up to title', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				Page.spotlightUp();
				expectOpen(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});
		});
	});

	describe('default open', function () {
		const expandable = Page.components.defaultOpen;

		validateTitle(expandable, 'ExpandableList Default Open');

		it('should be initially open', function () {
			expectOpen(expandable);
		});

		describe('5-way', function () {
			it('should close on select', function () {
				expandable.focus();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should close when navigating up to title', function () {
				expandable.focus();
				Page.spotlightDown();
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightUp();
				});
				expect(expandable.isOpen).to.be.false();
				expect(expandable.chevron).to.equal('󯿭');
				expect(expandable.item(0).isVisible()).to.be.false();
				expect(expandable.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.false();
				expect(expandable.chevron).to.equal('󯿭');
				expect(expandable.item(0).isVisible()).to.be.false();
			});

			it('should open on title click when closed', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.false();
				Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(expandable.isOpen).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const expandable = Page.components.disabled;

		validateTitle(expandable, 'ExpandableList Disabled');

		it('should be initially closed', function () {
			expect(expandable.isOpen).to.be.false();
			expect(expandable.chevron).to.equal('󯿭');
		});

		describe('5-way', function () {
			it('should be spottable', function () {
				expandable.focus();
				expect(expandable.title.hasFocus()).to.be.true();
			});
			it('should stay closed on title selected', function () {
				expandable.focus();
				Page.spotlightSelect();
				// In this case, it should never fire, but we need to wait just in case.
				browser.pause(500);
				expect(expandable.isOpen).to.be.false();
				expect(expandable.chevron).to.equal('󯿭');
			});
		});

		describe('pointer', function () {
			it('should stay closed on title click', function () {
				expandable.title.click();
				// In this case, it should never fire, but we need to wait just in case.
				browser.pause(500);
				expect(expandable.isOpen).to.be.false();
				expect(expandable.chevron).to.equal('󯿭');
			});
		});
	});

	describe('general 5-way navigation', function () {
		it('should not stop 5-way down when closed', function () {
			Page.spotlightDown();
			expect(Page.components.multiSelect.title.hasFocus()).to.be.true();
		});
	});

	describe('general pointer operation', function () {
		it('should not close other expandable when opening', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.components.radioSelect.title.click();
			});
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.components.multiSelect.title.click();
			});
			expect(Page.components.radioSelect.isOpen).to.be.true();
			expect(Page.components.multiSelect.isOpen).to.be.true();
		});
	});
});
