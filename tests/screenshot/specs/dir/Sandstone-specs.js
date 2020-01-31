const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('./SandstonePage');

runTest({
	testName: 'Sandstone',
	Page: Page,
	skin: 'dark',
	highContrast: false
});
