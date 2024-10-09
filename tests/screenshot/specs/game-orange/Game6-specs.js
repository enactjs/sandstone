const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('./SandstonePage');

runTest({
	testName: 'Sandstone Game Orange',
	Page: Page,
	skin: 'game',
	highContrast: false,
	concurrency: 6,
	orange: true
});
