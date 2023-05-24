//const {runTest} = require('@enact/ui-test-utils/utils');
import {runTest} from '@enact/ui-test-utils/utils/index.js';

//const Page = require('./SandstonePage');
import Page from './SandstonePage.js';

runTest({
	testName: 'Sandstone Light',
	Page: Page,
	skin: 'light',
	highContrast: false,
	concurrency: 1
});
