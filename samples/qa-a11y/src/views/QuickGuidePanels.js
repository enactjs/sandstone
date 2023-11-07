import QuickGuidePanels from '@enact/sandstone/QuickGuidePanels';

const QuickGuidePanelsView = () => (
	<QuickGuidePanels>
		<QuickGuidePanels.Panel aria-label={'Panel 0'} >
			This is Panel 0
		</QuickGuidePanels.Panel>
		<QuickGuidePanels.Panel aria-label={'Panel 1'} >
			This is Panel 1
		</QuickGuidePanels.Panel>
		<QuickGuidePanels.Panel >
			This is Panel 2
		</QuickGuidePanels.Panel>
	</QuickGuidePanels>
);

export default QuickGuidePanelsView;
