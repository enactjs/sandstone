// const {runTest} = require('@enact/ui-test-utils/utils');
//
// const Page = require('./SandstonePage');

import {runTest} from '@enact/ui-test-utils/utils/index.js';

import Page from './SandstonePage.js';

runTest({
	testName: 'Sandstone',
	Page: Page,
	skin: 'neutral',
	highContrast: false,
	concurrency: 1
});
