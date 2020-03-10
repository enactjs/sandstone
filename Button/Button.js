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
import Spottable from '@enact/spotlight/Spottable';
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {IconBase} from '../Icon';
import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

import componentCss from './Button.module.less';

// Make a basic Icon in case we need it later. This cuts `Pure` out of icon for a small gain.
const Icon = Skinnable(IconBase);

/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Button]{@link sandstone/Button.Button}.
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
		// `transparent` and `client` were intentionally excluded from the above documented
		// exported classes as they do not appear to provide value to the end-developer, but are
		// needed by IconButton internally for its design guidelines.
		// Same for `pressed` which is used by Dropdown to nullify the key-press activate animation.
		css: PropTypes.object,

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
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		minWidth: PropTypes.bool,

		/**
		 * The size of the button.
		 *
		 * @type {('large'|'small')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOf(['large', 'small'])
	},

	defaultProps: {
		backgroundOpacity: null,
		iconPosition: 'before',
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['button', 'bg', 'client', 'large', 'pressed', 'selected', 'small']
	},

	computed: {
		className: ({backgroundOpacity, color, iconOnly, iconPosition, size, styler}) => styler.append(
			{
				hasColor: color,
				iconOnly
			},
			backgroundOpacity || (iconOnly ? 'transparent' : 'opaque'), // Defaults to opaque, unless otherwise specified
			color,
			`icon${cap(iconPosition)}`,
			size
		),
		minWidth: ({iconOnly, minWidth}) => ((minWidth != null) ? minWidth : !iconOnly)
	},

	render: ({css, ...rest}) => {
		delete rest.backgroundOpacity;
		delete rest.color;
		delete rest.iconOnly;
		delete rest.iconPosition;
		delete rest.size;

		return UiButtonBase.inline({
			'data-webos-voice-intent': 'Select',
			...rest,
			css,
			iconComponent: Icon
		});
	}
});


/**
 * A higher-order component that determines if it is an
 * `IconButton`, a button that only displays an icon.
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
			iconOnly: ({children}) => (React.Children.toArray(children).filter(Boolean).length === 0)
		},
		render: (props) => {
			return (
				<Wrapped {...props} />
			);
		}
	});
});

/**
 * Applies Sandstone specific behaviors to [Button]{@link sandstone/Button.ButtonBase} components.
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
	MarqueeDecorator({className: componentCss.marquee}),
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
