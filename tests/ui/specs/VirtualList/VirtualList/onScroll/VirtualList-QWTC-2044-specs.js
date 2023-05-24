// const Page = require('../VirtualListPage');
// const {expectFocusedItem} = require('../../VirtualList-utils');
import Page from '../VirtualListPage.js';
import {expectFocusedItem} from '../../VirtualList-utils.js';

describe('Item Animates', function () {
	beforeEach(async function () {
		await Page.open();
	});
	// TODO: Need to api for press holding page down/up key.
	it('should animate Items via Channel Down [QWTC-2044]', async function () {
		// Step 3: Position the pointer on the first item('Item 000)
		await Page.showPointerByKeycode();
		await (await Page.item(0)).moveTo();
		await expectFocusedItem(0);
		// Step 4: Press Channel Down 2 times.
		// Step 4 Verify: The list Scrolls Up page by page.
		await Page.checkScrollbyPagekey('down');
		await Page.checkScrollbyPagekey('down');
		// Step 6: Channel Up 2 times
		// Step 6 Verify: The list Scrolls Up page by page.
		await Page.checkScrollbyPagekey('up');
		await Page.checkScrollbyPagekey('up');
	});
});
