const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('./SandstonePage');

runTest({
	testName: 'Sandstone Game Green',
	Page: Page,
	skin: 'game',
	highContrast: false,
	concurrency: 2,
	green: true
});
