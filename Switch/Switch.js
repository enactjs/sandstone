/**
 * Provides a Sandstone-themed pill-shaped toggle switch component.
 *
 * @example
 * <Switch />
 *
 * @module sandstone/Switch
 * @exports Switch
 * @exports SwitchBase
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Switch.module.less';

/**
 * Renders the base level DOM structure of the component.
 *
 * @class Switch
 * @memberof sandstone/Switch
 * @extends sandstone/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const SwitchBase = kind({
	name: 'Switch',

	propTypes: /** @lends sandstone/Switch.Switch.prototype */ {
		children: PropTypes.string,
		css: PropTypes.object,

		/**
		 * Disables animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Sets whether this control is in the 'on' or 'off' state. `true` for 'on', `false` for 'off'.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		children: 'circle',
		noAnimation: false,
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'switch',
		publicClassNames: ['switch', 'selected']
	},

	computed: {
		className: ({noAnimation, selected, styler}) => styler.append({
			animated: !noAnimation,
			selected
		})
	},

	render: ({children, css, ...rest}) => {
		delete rest.noAnimation;

		return (
			<div {...rest}>
				<Icon
					size="small"
					className={css.icon}
				>
					{children}
				</Icon>
			</div>
		);
	}
});

const SkinnableSwitchBase = Skinnable(SwitchBase);

const SwitchDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Spottable
);

const Switch = SwitchDecorator(SkinnableSwitchBase);

export default Switch;

export {
	Switch,
	SkinnableSwitchBase as SwitchBase
};
