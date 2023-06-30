import QuickGuidePanels from '@enact/sandstone/QuickGuidePanels';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/controls';

QuickGuidePanels.displayName = 'QuickGuidePanels';

const propOptions = {
	buttonVisibility: ['auto', 'always', 'never']
};

export default {
	title: 'Sandstone/QuickGuidePanels',
	component: 'QuickGuidePanels'
};

export const _QuickGuidePanels = (args) => (
	<QuickGuidePanels
		current={args['current']}
		nextButtonVisibility={args['nextButtonVisibility']}
		onBack={action('onBack')}
		onChange={action('onChange')}
		onClose={action('onClose')}
		onNextClick={action('onNextClick')}
		onPrevClick={action('onPrevClick')}
		prevButtonVisibility={args['prevButtonVisibility']}
		total={args['total']}
	>
		<QuickGuidePanels.Panel>
			This is Panel 0
		</QuickGuidePanels.Panel>
		<QuickGuidePanels.Panel>
			<div style={{height: '100%', width: '100%', backgroundColor: 'grey'}}>
				This is Panel 1
			</div>
		</QuickGuidePanels.Panel>
		<QuickGuidePanels.Panel>
			This is Panel 2
		</QuickGuidePanels.Panel>
	</QuickGuidePanels>
);

number('current', _QuickGuidePanels, 0);
select('nextButtonVisibility', _QuickGuidePanels, propOptions.buttonVisibility, 'auto');
select('prevButtonVisibility', _QuickGuidePanels, propOptions.buttonVisibility, 'auto');
number('total', _QuickGuidePanels, 0);

_QuickGuidePanels.storyName = 'QuickGuidePanels';
_QuickGuidePanels.parameters = {
	props: {
		noPanel: true
	}
};
