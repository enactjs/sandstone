/**
 * Provides a Sandstone-themed Item component with an interactive radio toggle icon.
 *
 * @example
 * <RadioItem>Item</RadioItem>
 *
 * @module sandstone/RadioItem
 * @exports RadioItem
 * @exports RadioItemBase
 */

import kind from '@enact/core/kind';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Icon from '../Icon';
import Item from '../Item';

import componentCss from './RadioItem.module.less';

/**
 * An item component with a radio toggle icon.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [RadioItem]{@link sandstone/RadioItem.RadioItem}.
 *
 * @class RadioItemBase
 * @memberof sandstone/RadioItem
 * @extends sandstone/Item.Item
 * @ui
 * @public
 */
const RadioItemBase = kind({
	name: 'RadioItem',

	propTypes: /** @lends sandstone/RadioItem.RadioItem.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `radioItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon to display when selected.
		 *
		 * @type {String}
		 * @default 'circle'
		 * @see {@link sandstone/Icon.Icon}
		 */
		icon: PropTypes.string
	},

	defaultProps: {
		icon: 'circle'
	},

	styles: {
		css: componentCss,
		className: 'radioItem',
		publicClassNames: ['radioItem']
	},

	render: ({children, css, icon, ...rest}) => {
		return (
			<Item
				data-webos-voice-intent="SelectRadioItem"
				role="checkbox"
				{...rest}
				css={css}
			>
				<Icon slot="slotBefore" className={css.icon} size="tiny">{icon}</Icon>
				{children}
			</Item>
		);
	}
});

/**
 * Sandstone specific behaviors to apply to [RadioItem]{@link sandstone/RadioItem.RadioItemBase}.
 *
 * @hoc
 * @memberof sandstone/RadioItem
 * @mixes ui/Toggleable.Toggleable
 * @public
 */
const RadioItemDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
);

/**
 * Renders an `Item` with a radio-dot component. Useful to show a selected state on an Item.
 *
 * @class RadioItem
 * @memberof sandstone/RadioItem
 * @extends sandstone/RadioItem.RadioItemBase
 * @mixes sandstone/RadioItem.RadioItemDecorator
 * @ui
 * @public
 */
const RadioItem = RadioItemDecorator(RadioItemBase);

export default RadioItem;
export {
	RadioItem,
	RadioItemBase,
	RadioItemDecorator
};
