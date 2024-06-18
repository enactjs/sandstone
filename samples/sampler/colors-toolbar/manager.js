import {platform} from '@enact/webos/platform';
import {addons, types} from '@storybook/addons';
import React from 'react'; // eslint-disable-line

import {
	BACKGROUNDCOLOR_ADDON_ID,
	FOCUSBGCOLOR_ADDON_ID,
	POPUPBGCOLOR_ADDON_ID,
	TEXT_ADDON_ID,
	SUBTEXTCOLOR_ADDON_ID,
	TOOLBAR_ADDON_ID
} from './constants';
import ToolbarButton from './ToolbarButton';

// render colors Globals only when running in non-webos environment
if (!platform.tv) {
	addons.register(TOOLBAR_ADDON_ID, () => {
		const renderBackgroundColorButton = () => <ToolbarButton colorPickerType={BACKGROUNDCOLOR_ADDON_ID} />;
		const renderFocusBgColorButton = () => <ToolbarButton colorPickerType={FOCUSBGCOLOR_ADDON_ID} />;
		const renderPopupBgColor = () => <ToolbarButton colorPickerType={POPUPBGCOLOR_ADDON_ID} />;
		const renderTextColorButton = () => <ToolbarButton colorPickerType={TEXT_ADDON_ID} />;
		const renderSubTextColorButton = () => <ToolbarButton colorPickerType={SUBTEXTCOLOR_ADDON_ID} />;

		addons.add(BACKGROUNDCOLOR_ADDON_ID, {
			title: BACKGROUNDCOLOR_ADDON_ID,
			type: types.TOOL,
			match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
			render: renderBackgroundColorButton
		});

		addons.add(FOCUSBGCOLOR_ADDON_ID, {
			title: FOCUSBGCOLOR_ADDON_ID,
			type: types.TOOL,
			match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
			render: renderFocusBgColorButton
		});

		addons.add(POPUPBGCOLOR_ADDON_ID, {
			title: POPUPBGCOLOR_ADDON_ID,
			type: types.TOOL,
			match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
			render: renderPopupBgColor
		});

		addons.add(TEXT_ADDON_ID, {
			title: TEXT_ADDON_ID,
			type: types.TOOL,
			match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
			render: renderTextColorButton
		});

		addons.add(SUBTEXTCOLOR_ADDON_ID, {
			title: SUBTEXTCOLOR_ADDON_ID,
			type: types.TOOL,
			match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
			render: renderSubTextColorButton
		});
	});
}
