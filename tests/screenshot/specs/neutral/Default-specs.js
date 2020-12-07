const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('./SandstonePage');

runTest({
	testName: 'Sandstone',
	Page: Page,
	skin: 'neutral',
	highContrast: false,
	concurrency: 1
});
