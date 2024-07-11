import {IconButton, Icons, TooltipLinkList, WithTooltip} from '@storybook/components';
import PropTypes from 'prop-types';
import React from 'react';

import ColorPicker from './ColorPicker';

const ToolbarButton = React.memo(({active = true, buttonName, colorPickerType, tooltipName}) => {
	const tooltipLink = {
		center: <ColorPicker colorPickerType={colorPickerType} />,
		id: colorPickerType,
		key: colorPickerType,
		left: <span style={{color: 'white'}}>{tooltipName || colorPickerType}</span>,
		title: true
	};

	const tooltip = <TooltipLinkList links={[tooltipLink]} />;

	return (
		<WithTooltip closeOnClick tooltip={tooltip} placement="bottom" trigger="click">
			<IconButton
				active={active}
				key={colorPickerType}
				style={{display:'flex', flexDirection:'column'}}
			>
				<Icons /> {buttonName || colorPickerType}
			</IconButton>
		</WithTooltip>
	);
});

ToolbarButton.prototypes = {
	active: PropTypes.boolean,
	buttonName: PropTypes.string,
	colorPickerType: PropTypes.string.isRequired,
	tooltipName: PropTypes.string
};

export default ToolbarButton;
