import QuickGuidePanels, {Panel} from '../../../../QuickGuidePanels';

import {withConfig} from './utils';

const defaultQuickGuidePanelsTests = [
	<QuickGuidePanels>
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</QuickGuidePanels>,
	<QuickGuidePanels index={1}>
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</QuickGuidePanels>
];

const QuickGuidePanelsTests = [
	...withConfig({wrapper: {full: true}}, defaultQuickGuidePanelsTests),
	...withConfig({wrapper: {full: true}, locale: 'vi-VN'}, defaultQuickGuidePanelsTests), // Tallglyph validation
	...withConfig({wrapper: {full: true}, locale: 'ar-SA'}, defaultQuickGuidePanelsTests)  // RTL validation
];

export default QuickGuidePanelsTests;
