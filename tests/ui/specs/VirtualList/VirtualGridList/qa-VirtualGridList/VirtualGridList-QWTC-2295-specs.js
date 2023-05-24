// const Page = require('../VirtualGridListPage');
// const {expectFocusedItem} = require('../../VirtualList-utils');
import Page from '../VirtualGridListPage.js';
import {expectFocusedItem} from '../../VirtualList-utils.js';

describe('qa-VirtualGridList translate mode', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should spotlight moves to right upper item [QWTC-2295]', async function () {
		// Step 2: Uncheck the "Native Scrolling" CheckboxItem.
		await Page.buttonModeChange.moveTo();
		await Page.spotlightSelect();
		// Step 3-1: DataSize is 100.
		// Step 3-2: Adjust the DataSize to a smaller number like 98 for example.
		// To speed up the test, set dataSize to 27.
		await Page.inputNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(2);
		await Page.numPad(7);
		await Page.spotlightRight();

		// Step 3-3: Move focus to the last item.
		await (await Page.item(1)).moveTo();
		await Page.spotlightSelect();
		for (let i =  0; i < 3; i++) {
			await Page.pageDown();
			await Page.delay(1000);
		}
		// Step 3 Verify: Spotlight is on last item.
		await expectFocusedItem(26);

		// Step 4: 5-way Right.
		await Page.spotlightRight();
		// Step 4 Verify: Spotlight is on the Upper Right item.
		await expectFocusedItem(22);
	});
});
