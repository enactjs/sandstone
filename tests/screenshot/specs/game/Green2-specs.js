const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('./SandstonePage');

runTest({
	testName: 'Sandstone Game',
	Page: Page,
	skin: 'game',
	highContrast: false,
	green: true,
	concurrency: 2
});
