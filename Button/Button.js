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
import React from 'react';
import compose from 'ramda/src/compose';

import {IconBase} from '../Icon';
import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';

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
		 * Valid value is: `'transparent'`.
		 *
		 * @type {(transparent')}
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['transparent']),

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
		 * The size of the button.
		 *
		 * @type {('large'|'small')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.string,

		/**
		 * The button type.
		 *
		 * Grid buttons are intended to be grouped with other related buttons.
		 *
		 * @type {('grid'|'round')}
		 * @default 'grid'
		 * @public
		 */
		type: PropTypes.oneOf(['grid', 'round'])
	},

	defaultProps: {
		iconPosition: 'before',
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['button', 'bg', 'client', 'large', 'pressed', 'selected', 'small', 'transparent']
	},

	computed: {
		className: ({backgroundOpacity, iconOnly, iconPosition, size, styler, type}) => styler.append(
			{iconOnly},
			backgroundOpacity,
			`icon${cap(iconPosition)}`,
			size,
			type
		),
		minWidth: ({iconOnly}) => !iconOnly
	},

	render: ({css, ...rest}) => {
		delete rest.backgroundOpacity;
		delete rest.iconOnly;
		delete rest.iconPosition;

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
			iconOnly: ({children}) => (React.Children.count(children) === 0 || children === '')
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
 * 	backgroundOpacity="transparent"
 * 	size="small"
 *  icon="home"
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
