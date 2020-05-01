import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import {
	WizardPanels,
	WizardPanelsBase as WizardPanelBase,
	WizardPanel as WizardPanelView
} from '../WizardPanels';

const WizardPanel = deprecate(
	(props) => <WizardPanels {...props} />,
	{
		name: 'Panels.WizardPanel',
		until: '1.0.0-beta.3',
		replacedBy: 'WizardPanels'
	}
);

const View = deprecate(
	(props) => <WizardPanelView {...props} />,
	{
		name: 'Panels.WizardPanel.View',
		until: '1.0.0-beta.3',
		replacedBy: 'WizardPanels.Panel'
	}
);

WizardPanel.View = View;

export default WizardPanel;
export {
	WizardPanel,
	WizardPanelBase,
	View
};
