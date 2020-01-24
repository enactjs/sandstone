// Not actually an exported module
/*
 * Provides Sandstone-themed circle component and interactive toggleable capabilities.
 *
 * @module sandstone/SelectableIcon
 * @exports SelectableIcon
 * @exports SelectableIconBase
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import ToggleIcon from '../ToggleIcon';

import componentCss from './SelectableIcon.module.less';

/**
 * Renders a circle shaped component which supports a Boolean state.
 *
 * @class SelectableIconBase
 * @memberof sandstone/SelectableIcon
 * @extends sandstone/ToggleIcon.ToggleIcon
 * @ui
 * @private
 */
const SelectableIconBase = kind({
	name: 'SelectableIcon',

	propTypes: {
		children: PropTypes.string
	},

	defaultProps: {
		children: 'circle'
	},

	render: ({children, ...rest}) => {
		return (
			<ToggleIcon {...rest} css={componentCss}>{children}</ToggleIcon>
		);
	}
});

export default SelectableIconBase;
export {
	SelectableIconBase as Selectable,
	SelectableIconBase
};
