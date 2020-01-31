const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('./SandstonePage');

runTest({
	testName: 'Sandstone High Contrast',
	Page: Page,
	skin: 'dark',
	highContrast: true
});
