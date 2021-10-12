const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('./SandstonePage');

runTest({
	testName: 'Sandstone Light',
	Page: Page,
	skin: 'light',
	highContrast: false,
	concurrency: 6
});
