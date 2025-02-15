/* global page */

function log (message) {
	// eslint-disable-next-line no-console
	console.log(message);
}

function pad2 (n) {
	return n < 10 ? '0' + n : n;
}

function getFileName (testName) {
	const date = new Date();
	const formattedDate = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds());
	const filename = `./performance/traces/${testName}_${formattedDate}.json`;

	return filename;
}

async function scrollAtPoint (elem, selector, amount) {
	await elem.evaluate((scrollerSelector, scrollAmount) => {
		let evt = document.createEvent('MouseEvents');
		evt.initEvent('wheel', true, true);
		evt.deltaY = scrollAmount;
		const node = document.querySelector(scrollerSelector);
		node.dispatchEvent(evt);
	}, selector, amount);
}

const extractFirstContentfulPaintTime = async () => {
	return await page.evaluate( () => {
		let perf = window.performance.getEntriesByType('paint');
		let paintTime = 0;
		for (let entry of perf) {
			if (entry.name === 'first-paint') {
				paintTime -= entry.startTime + entry.duration;
			} else if (entry.name === 'first-contentful-paint') {
				paintTime += entry.startTime + entry.duration;
			}
		}
		return paintTime;
	});
};

/**
 * Calualates the average paint time per number of reloads.
 *
 * @param {String|Number|Function} waitFor https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagewaitforselectororfunctionortimeout-options-args
 * @param {Number} count The number of time to reload the page. Defaults to 1.
 */
const getAveragePaintTimeFor = async (waitFor, count = 1) => {
	let total = 0;
	for (let i = 0; i < count; i++) {
		await page.waitFor(waitFor);
		total += await extractFirstContentfulPaintTime();
		if (i !== count - 1) {
			await page.reload();
		}
	}

	return (total / count).toFixed(3);
};

module.exports = {
	getAveragePaintTimeFor,
	getFileName,
	log,
	scrollAtPoint
};
