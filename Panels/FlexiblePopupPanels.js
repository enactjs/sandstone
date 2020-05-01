import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import FlexiblePopupPanelsBase from '../FlexiblePopupPanels';

const FlexiblePopupPanels = deprecate(
	(props) => <FlexiblePopupPanelsBase {...props} />,
	{
		name: 'Panels.FlexiblePopupPanels',
		until: '1.0.0-beta.3',
		replacedBy: 'FlexiblePopupPanels'
	}
);

export default FlexiblePopupPanels;
export {
	FlexiblePopupPanels
};
