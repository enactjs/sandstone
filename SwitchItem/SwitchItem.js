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
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Toggleable from '@enact/ui/Toggleable';

import Item from '../Item';
import Skinnable from '../Skinnable';
import {SwitchBase} from '../Switch';

import componentCss from './SwitchItem.module.less';

const Switch = Skinnable(SwitchBase);
Switch.displayName = 'Switch';

/**
 * Renders an item with a [Switch]{@link sandstone/Switch}.
 *
 * @class SwitchItemBase
 * @memberof sandstone/SwitchItem
 * @extends sandstone/Item.Item
 * @omit iconComponent
 * @ui
 * @public
 */
const SwitchItemBase = kind({
	name: 'SwitchItem',

	propTypes: /** @lends sandstone/SwitchItem.SwitchItemBase.prototype */ {
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
		 * If true the switch will be selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'switchItem',
		publicClassNames: ['switchItem']
	},

	render: ({children, css, selected, ...rest}) => (
		<Item
			data-webos-voice-intent="SetToggleItem"
			role="button"
			{...rest}
			aria-pressed={selected}
			css={css}
			selected={selected}
		>
			{children}
			<Switch selected={selected} slot="slotAfter" css={css} />
		</Item>
	)
});

/**
 * Adds interactive functionality to `SwitchItem`.
 *
 * @class SwitchItemDecorator
 * @memberof sandstone/SwitchItem
 * @mixes ui/Toggleable.Toggleable
 * @hoc
 * @public
 */
const SwitchItemDecorator = compose(
	Toggleable({toggleProp: 'onClick'})
);

/**
 * A Sandstone-styled item with a switch component.
 *
 * `SwitchItem` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless set
 * directly.
 *
 * @class SwitchItem
 * @memberof sandstone/SwitchItem
 * @extends sandstone/SwitchItem.SwitchItemBase
 * @mixes sandstone/SwitchItem.SwitchItemDecorator
 * @ui
 * @public
 */
const SwitchItem = SwitchItemDecorator(SwitchItemBase);

export default SwitchItem;
export {
	SwitchItem,
	SwitchItemBase,
	SwitchItemDecorator
};
