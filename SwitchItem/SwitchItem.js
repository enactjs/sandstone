/**
 * Provides Sandstone-themed item component and interactive toggleable switch.
 *
 * @example
 * <SwitchItem>
 * 	Item
 * </SwitchItem>
 *
 * @module sandstone/SwitchItem
 * @exports SwitchItem
 * @exports SwitchItemBase
 */

import kind from '@enact/core/kind';
import ComponentOverride from '@enact/ui/ComponentOverride';
import EnactPropTypes from '@enact/core/internal/prop-types';
import React from 'react';
import PropTypes from 'prop-types';

import Switch from '../Switch';
import ToggleItem from '../ToggleItem';

import componentCss from './SwitchItem.module.less';

/**
 * Renders an item with a [Switch]{@link sandstone/Switch}.
 *
 * @class SwitchItem
 * @memberof sandstone/SwitchItem
 * @extends sandstone/ToggleItem.ToggleItem
 * @omit iconComponent
 * @ui
 * @public
 */
const SwitchItemBase = kind({
	name: 'SwitchItem',

	propTypes: /** @lends sandstone/SwitchItem.SwitchItem.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `switchItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Customize the component used as the switch.
		 *
		 * @type {Element|Component}
		 * @default {@link sandstone/Switch.Switch}
		 * @private
		 */
		iconComponent: EnactPropTypes.componentOverride
	},

	defaultProps: {
		iconComponent: Switch
	},

	styles: {
		css: componentCss,
		className: 'switchItem',
		publicClassNames: ['switchItem']
	},

	computed: {
		iconComponent: ({css, iconComponent}) => (
			<ComponentOverride
				component={iconComponent}
				className={css.switch}
			/>
		)
	},

	render: (props) => (
		<ToggleItem
			data-webos-voice-intent="SetToggleItem"
			{...props}
			css={props.css}
			iconPosition="after"
		/>
	)
});

export default SwitchItemBase;
export {
	SwitchItemBase as SwitchItem,
	SwitchItemBase
};
