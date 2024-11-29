import QuickGuidePanels, {Panel as QuickGuidePanel} from '../../../../QuickGuidePanels';

import {withConfig} from './utils';

const defaultQuickGuidePanelsTests = [
	<QuickGuidePanels>
		<QuickGuidePanel>View 1</QuickGuidePanel>
		<QuickGuidePanel>View 2</QuickGuidePanel>
		<QuickGuidePanel>View 3</QuickGuidePanel>
	</QuickGuidePanels>,
	<QuickGuidePanels index={1}>
		<QuickGuidePanel>View 1</QuickGuidePanel>
		<QuickGuidePanel>View 2</QuickGuidePanel>
		<QuickGuidePanel>View 3</QuickGuidePanel>
	</QuickGuidePanels>,
	<QuickGuidePanels index={2}>
		<QuickGuidePanel>View 1</QuickGuidePanel>
		<QuickGuidePanel>View 2</QuickGuidePanel>
		<QuickGuidePanel>View 3</QuickGuidePanel>
	</QuickGuidePanels>,
	<QuickGuidePanels>
		<QuickGuidePanel>View 1</QuickGuidePanel>
	</QuickGuidePanels>
];

const QuickGuidePanelsTests = [
	...withConfig({wrapper: {full: true}}, defaultQuickGuidePanelsTests),
	...withConfig({wrapper: {full: true}, locale: 'vi-VN'}, defaultQuickGuidePanelsTests), // Tallglyph validation
	...withConfig({wrapper: {full: true}, locale: 'ar-SA'}, defaultQuickGuidePanelsTests)  // RTL validation
];

export default QuickGuidePanelsTests;
