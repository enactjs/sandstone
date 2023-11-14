import {addons, types} from '@storybook/addons';
import React from 'react';  // eslint-disable-line

import {BACKGROUND_ADDON_ID, TEXT_ADDON_ID, TOOLBAR_ADDON_ID} from './constants';
import ToolbarButton from './ToolbarButton';

addons.register(TOOLBAR_ADDON_ID, () => {
	const renderBackgroundColorButton = () => <ToolbarButton colorPickerType={BACKGROUND_ADDON_ID} />;
	const renderTextColorButton = () => <ToolbarButton colorPickerType={TEXT_ADDON_ID} />;

	addons.add(BACKGROUND_ADDON_ID, {
		title: BACKGROUND_ADDON_ID,
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: renderBackgroundColorButton
	});

	addons.add(TEXT_ADDON_ID, {
		title: BACKGROUND_ADDON_ID,
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: renderTextColorButton
	});
});
