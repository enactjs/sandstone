import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import FixedPopupPanelsBase from '../FixedPopupPanels';

const FixedPopupPanels = deprecate(
	(props) => <FixedPopupPanelsBase {...props} />,
	{
		name: 'Panels.FixedPopupPanels',
		until: '1.0.0-rc.1',
		replacedBy: 'FixedPopupPanels'
	}
);

export default FixedPopupPanels;
export {
	FixedPopupPanels
};
