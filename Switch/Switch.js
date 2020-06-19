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
import Touchable from '@enact/ui/Touchable';
import Toggleable from '@enact/ui/Toggleable';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Switch.module.less';

/**
 * Renders the base level DOM structure of the component.
 *
 * @class SwitchBase
 * @memberof sandstone/Switch
 * @extends sandstone/Icon.Icon
 * @ui
 * @public
 */
const SwitchBase = kind({
	name: 'Switch',

	propTypes: /** @lends sandstone/Switch.SwitchBase.prototype */ {
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
		publicClassNames: ['switch', 'selected', 'client']
	},

	computed: {
		className: ({noAnimation, selected, styler}) => styler.append({
			animated: !noAnimation,
			selected
		})
	},

	render: ({children, css, selected, ...rest}) => {
		delete rest.noAnimation;

		return (
			<div
				{...rest}
				aria-pressed={selected}
				role="button"
			>
				<div className={css.bg} />
				<div className={css.client}>
					<Icon
						size="small"
						className={css.icon}
					>
						{children}
					</Icon>
				</div>
			</div>
		);
	}
});

/**
 * Adds interactive functionality to `Switch`.
 *
 * @class SwitchDecorator
 * @memberof sandstone/Switch
 * @mixes ui/Toggleable.Toggleable
 * @mixes spotlight/Spottable.Spottable
 * @hoc
 * @public
 */
const SwitchDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Touchable,
	Spottable,
	Skinnable
);

/**
 * A Sandstone-styled component that looks like a toggle switch.
 *
 * `Switch` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless set
 * directly.
 *
 * @class Switch
 * @memberof sandstone/Switch
 * @extends sandstone/Switch.SwitchBase
 * @mixes sandstone/Switch.SwitchDecorator
 * @ui
 * @public
 */
const Switch = SwitchDecorator(SwitchBase);

export default Switch;
export {
	Switch,
	SwitchBase,
	SwitchDecorator
};
