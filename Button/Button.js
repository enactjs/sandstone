/* global ENACT_PACK_NO_ANIMATION */
/**
 * Sandstone styled button components and behaviors.
 *
 * @example
 * <Button>Hello Enact!</Button>
 *
 * @module sandstone/Button
 * @exports Button
 * @exports ButtonBase
 * @exports ButtonDecorator
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import {cap} from '@enact/core/util';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Spottable from '@enact/spotlight/Spottable';
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Children} from 'react';

import Icon from '../Icon';
import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

import componentCss from './Button.module.less';

/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/Button.Button|Button}.
 *
 * @class ButtonBase
 * @memberof sandstone/Button
 * @extends ui/Button.ButtonBase
 * @ui
 * @public
 */
const ButtonBase = kind({
	name: 'Button',

	propTypes: /** @lends sandstone/Button.ButtonBase.prototype */ {
		/**
		 * The background opacity of this button.
		 *
		 * Text buttons and icon+text buttons, by default are opaque, while icon-only buttons
		 * default to transparent. This value can be overridden by setting this prop.
		 *
		 * Valid values are: `'opaque'`, and `'transparent'`.
		 *
		 * @type {('opaque'|'transparent')}
		 * @default 'opaque'
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

		/**
		 * Enables the `collapsed` feature.
		 *
		 * This requires that both the text and {@link sandstone/Button.Button#icon|icon} are
		 * defined.
		 *
		 * Use {@link sandstone/Button.Button#collapsed|collapsed} to toggle the collapsed state.
		 *
		 * @type {Boolean}
		 * @default false
		 * @see {@link sandstone/Button.Button#collapsed}
		 * @private
		 */
		collapsable: PropTypes.bool,

		/**
		 * Toggles the collapsed state of this button, down to just its icon.
		 *
		 * This requires that {@link sandstone/Button.Button#collapsable|collapsable} is enabled
		 * and both the text and {@link sandstone/Button.Button#icon|icon} are defined.
		 *
		 * @type {Boolean}
		 * @default false
		 * @see {@link sandstone/Button.Button#collapsable}
		 * @private
		 */
		collapsed: PropTypes.bool,

		/**
		 * The color of the underline beneath button's content.
		 *
		 * Accepts one of the following color names, which correspond with the colored buttons on a
		 * standard remote control: `'red'`, `'green'`, `'yellow'`, `'blue'`.
		 *
		 * @type {('red'|'green'|'yellow'|'blue')}
		 * @public
		 */
		color: PropTypes.oneOf(['red', 'green', 'yellow', 'blue']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `button` - The root class name
		 * * `bg` - The background node of the button
		 * * `large` - Applied to a `size='large'` button
		 * * `selected` - Applied to a `selected` button
		 * * `small` - Applied to a `size='small'` button
		 *
		 * @type {Object}
		 * @public
		 */
		// `client` was intentionally excluded from the above documented exported classes as they do
		// not appear to provide value to the end-developer, but are needed by PopupTabLayout
		// internally for its design guidelines. Same for `pressed` which is used by Dropdown to
		// nullify the key-press activate animation.
		css: PropTypes.object,

		/**
		 * Set the visual effect applied to the button when focused.
		 *
		 * @type {('expand'|'static')}
		 * @default 'expand'
		 * @private
		 */
		focusEffect: PropTypes.oneOf(['expand', 'static']),

		/**
		 * The component used to render the {@link sandstone/Button.ButtonBase.icon|icon}.
		 *
		 * This component will receive the `icon` class to customize its styling.
		 *
		 * @type {Component|Node}
		 * @private
		 */
		iconComponent: EnactPropTypes.componentOverride,

		/**
		 * True if button is an icon only button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		iconOnly: PropTypes.bool,

		/**
		 * Specifies on which side (`'before'` or `'after'`) of the text the icon appears.
		 *
		 * @type {('before'|'after')}
		 * @default 'before'
		 * @public
		 */
		iconPosition: PropTypes.oneOf(['before', 'after']),

		/**
		 * Boolean controlling whether this component should enforce the "minimum width" rules.
		 *
		 * *NOTE*: If you don't specify this prop, it works as `false` for icon only Button
		 * and as `true` for other Buttons.
		 *
		 * @type {Boolean}
		 * @public
		 */
		minWidth: PropTypes.bool,

		/**
		 * True if both sides of button are fully rounded.
		 *
		 * @type {Boolean}
		 * @public
		 */
		roundBorder: PropTypes.bool,

		/**
		 * The size of the button.
		 *
		 * @type {('large'|'small')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['large', 'small'])
	},

	defaultProps: {
		backgroundOpacity: null,
		collapsable: false,
		collapsed: false,
		focusEffect: 'expand',
		iconComponent: Icon,
		iconOnly: false,
		iconPosition: 'before',
		roundBorder: false,
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['button', 'bg', 'client', 'hasIcon', 'icon', 'iconAfter', 'iconBefore', 'large', 'pressed', 'selected', 'small']
	},

	computed: {
		className: ({backgroundOpacity, collapsable, collapsed, color, focusEffect, iconOnly, iconPosition, roundBorder, size, styler}) => styler.append(
			{
				hasColor: color,
				iconOnly,
				collapsable,
				collapsed,
				roundBorder,
				noAnimation: ENACT_PACK_NO_ANIMATION
			},
			backgroundOpacity || (iconOnly ? 'transparent' : 'opaque'), // Defaults to opaque, unless otherwise specified
			color,
			`focus${cap(focusEffect)}`,
			// iconBefore/iconAfter only applies when using text and an icon
			!iconOnly && `icon${cap(iconPosition)}`,
			size
		),
		minWidth: ({iconOnly, minWidth}) => ((minWidth != null) ? minWidth : !iconOnly)
	},

	render: ({css, ...rest}) => {
		delete rest.backgroundOpacity;
		delete rest.color;
		delete rest.collapsable;
		delete rest.collapsed;
		delete rest.iconOnly;
		delete rest.iconPosition;
		delete rest.focusEffect;
		delete rest.roundBorder;

		return UiButtonBase.inline({
			'data-webos-voice-intent': 'Select',
			...rest,
			css
		});
	}
});


/**
 * A higher-order component that determines if it is a button that only displays an icon.
 *
 * @class IconButtonDecorator
 * @memberof sandstone/Button
 * @hoc
 * @private
 */
const IconButtonDecorator = hoc((config, Wrapped) => {
	return kind({
		name: 'IconButtonDecorator',

		computed: {
			iconOnly: ({children}) => (Children.toArray(children).filter(Boolean).length === 0)
		},

		render: (props) => {
			return (
				<Wrapped {...props} />
			);
		}
	});
});

/**
 * Applies Sandstone specific behaviors to {@link sandstone/Button.ButtonBase|Button} components.
 *
 * @hoc
 * @memberof sandstone/Button
 * @mixes sandstone/Marquee.MarqueeDecorator
 * @mixes ui/Button.ButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ButtonDecorator = compose(
	Pure,
	IconButtonDecorator,
	TooltipDecorator({tooltipDestinationProp: 'decoration'}),  // Future note: This should eventually be conditionally applied via hooks (after refactoring)
	MarqueeDecorator({css: componentCss}),
	UiButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * A button component, ready to use in Sandstone applications.
 *
 * Usage:
 * ```
 * <Button
 *	backgroundOpacity="transparent"
 *	size="small"
 *	icon="home"
 * >
 * 	Press me!
 * </Button>
 * ```
 *
 * @class Button
 * @memberof sandstone/Button
 * @extends sandstone/Button.ButtonBase
 * @mixes sandstone/Button.ButtonDecorator
 * @ui
 * @public
 */
const Button = ButtonDecorator(ButtonBase);

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
