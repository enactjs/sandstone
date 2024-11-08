const Page = require('./TransferListPage');

describe('TransferList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	const transferList = Page.components.transferList;

	describe('drag and drop', function () {
		it('should transfer an item from the first list into the second list', async function () {
			const origin = await transferList.firstList;
			const targetOrigin = await transferList.secondList;
			const originSize = await origin.getSize();
			const itemSize = await transferList.getItemSize();
			const originalItemAtPosition = await transferList.secondListItem[2];

			await browser.action('pointer')
				// position the pointer inside the first list. Increase/decrease the value of y to select other items
				.move({duration: 1000, x: Math.floor(originSize.width / 2), y: Math.floor(originSize.height - (itemSize.height * 4))})
				.down({button: 0}) // left button
				.pause(10)
				.move({duration: 1000, origin: await targetOrigin})
				.up({button: 0})
				.perform()
			const itemAfterDragAndDrop = await transferList.secondListItem[2];

			expect(originalItemAtPosition).not.toBe(itemAfterDragAndDrop);
		});

		it('should scroll inside the first list and transfer an item into the second list', async function () {
			const origin = await transferList.firstList;
			const targetOrigin = await transferList.secondList;
			const originSize = await origin.getSize();
			const itemSize = await transferList.getItemSize();
			const originalItemAtPosition = await transferList.secondListItem[2];

			await browser.actions([
				browser.action('wheel').scroll({
					origin,
					deltaY: 300,
					duration: 1000
				}),
				browser.action('pointer')
					// position the pointer inside the first list. Increase/decrease the value of y to select other items
					.move({duration: 1000, x: Math.floor(originSize.width / 2), y: Math.floor(originSize.height - (itemSize.height))})
					.down({button: 0}) // left button
					.pause(10)
					.move({duration: 1000, origin: await targetOrigin})
					.up({button: 0})
			]);
			const itemAfterDragAndDrop = await transferList.secondListItem[2];

			expect(originalItemAtPosition).not.toBe(itemAfterDragAndDrop);
		});

		it('should transfer an item from the second list into the first list', async function () {
			const origin = await transferList.secondList;
			const targetOrigin = await transferList.firstList;
			const originSize = await origin.getSize();
			const itemSize = await transferList.getItemSize();

			const originRect = await browser.execute((el) => {
				return el.getBoundingClientRect().toJSON();
			}, origin);
			const absoluteX = originRect.left;

			const originalItemAtPosition = await transferList.firstListItem[2];
			await browser.action('pointer')
				.move({duration: 1000, x: Math.floor(absoluteX + (itemSize.width / 2)), y: Math.floor(originSize.height - (itemSize.height * 4))})
				.down({button: 0}) // left button
				.pause(10)
				.move({duration: 1000, origin: await targetOrigin})
				.up({button: 0})
				.perform()
			const itemAfterDragAndDrop = await transferList.firstListItem[2];

			expect(originalItemAtPosition).not.toBe(itemAfterDragAndDrop);
		});

		it('should scroll inside the second list and transfer an item into the first list', async function () {
			const origin = await transferList.secondList;
			const targetOrigin = await transferList.firstList;
			const originSize = await origin.getSize();
			const itemSize = await transferList.getItemSize();

			const originRect = await browser.execute((el) => {
				return el.getBoundingClientRect().toJSON();
			}, origin);
			const absoluteX = originRect.left;
			const originalItemAtPosition = await transferList.firstListItem[2];

			await browser.actions([
				browser.action('wheel').scroll({
					origin,
					deltaY: 300,
					duration: 1000
				}),
				browser.action('pointer')
					// position the pointer inside the second list. Increase/decrease the value of y to select other items
					.move({duration: 1000, x: Math.floor(absoluteX + (itemSize.width / 2)), y: Math.floor(originSize.height - (itemSize.height * 3))})
					.down({button: 0}) //left button
					.pause(10)
					.move({duration: 1000, origin: await targetOrigin})
					.up({button: 0})
			]);
			const itemAfterDragAndDrop = await transferList.firstListItem[2];

			expect(originalItemAtPosition).not.toBe(itemAfterDragAndDrop);
		});
	});
});
