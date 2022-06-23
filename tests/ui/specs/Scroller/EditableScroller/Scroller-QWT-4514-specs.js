const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem} = require('../Scroller-utils');

describe.skip('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('EditableItem');
	});

	it('Should change item position with 5-way mode', async function () {
		// Step 3: 5-way Spot and Select Image 0.
		await ScrollerPage.spotlightDown();
		// Step 3-1 Verify: Spotlight is on Image 0.
		await expectFocusedItem(0);
		await browser.performActions([
			{
			  type: 'key',
			  id: 'keyboard',
			  actions: [
				{type: 'keyDown', value: '\uE007'},
			]
			}
		]);
		// Step 3-2 Verify: Image 0 rises upper
		expect(await ScrollerPage.checkEditableItem()).to.be.true();

		// Step 4: 5-way Right.
		await ScrollerPage.spotlightRight();
		// STep 4 Verify: Position of Image 0 and Image 1 are switched.
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);

		// Step 5: 5-way Right 3 times.
		// Step 5 Verify: Image are switched for each 5-way right.
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(5);

		// 5-way spot Item0.
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		// Step 6: 5-way Left.
		// Step 6 Verify: Position of Image 0 and Image 4 are switched.
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(4);
	});
});
