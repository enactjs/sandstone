/**
 * An [Icon]{@link sandstone/Icon.Icon} that acts like a [Button]{@link sandstone/Button.Button}.
 * You may specify an image or a font-based icon by setting the `children` to either the path
 * to the image or a string from an [iconList]{@link sandstone/Icon.IconBase.iconList}.
 *
 * @example
 * <IconButton size="small">plus</IconButton>
 *
 * @module sandstone/IconButton
 * @exports IconButton
 * @exports IconButtonBase
 * @exports IconButtonDecorator
 */

import kind from '@enact/core/kind';
import deprecate from '@enact/core/internal/deprecate';
import {IconButtonDecorator as UiIconButtonDecorator} from '@enact/ui/IconButton';
import Pure from '@enact/ui/internal/Pure';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {ButtonBase} from '../Button';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

import componentCss from './IconButton.module.less';

/**
 * A sandstone-styled icon button without any behavior.
 *
 * @class IconButtonBase
 * @memberof sandstone/IconButton
 * @extends sandstone/Button.ButtonBase
 * @extends ui/IconButton.IconButtonBase
 * @omit buttonComponent
 * @omit iconComponent
 * @ui
 * @public
 */
const IconButtonBase = kind({
	name: 'IconButton',

	propTypes: /** @lends sandstone/IconButton.IconButtonBase.prototype */ {
		/**
		 * The background-color opacity of this icon button.
		 *
		 * Valid values are:
		 * * `'translucent'`,
		 * * `'lightTranslucent'`, and
		 * * `'transparent'`.
		 *
		 * @type {String}
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['translucent', 'lightTranslucent', 'transparent']),

		/**
		 * The color of the underline beneath the icon.
		 *
		 * This property accepts one of the following color names, which correspond with the
		 * colored buttons on a standard remote control: `'red'`, `'green'`, `'yellow'`, `'blue'`
		 *
		 * @type {String}
		 * @public
		 */
		color: PropTypes.oneOf(['red', 'green', 'yellow', 'blue']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `iconButton` - The root class name
		 * * `bg` - The background node of the icon button
		 * * `large` - Applied to a `size='large'` icon button
		 * * `selected` - Applied to a `selected` icon button
		 * * `small` - Applied to a `size='small'` icon button
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	defaultProps: {
		size: 'small'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['iconButton', 'bg', 'large', 'selected', 'small']
	},

	computed: {
		className: ({color, styler}) => styler.append(color)
	},

	render: ({children, ...rest}) => {
		deprecate({
			name: 'sandstone/IconButton',
			replacedBy: 'sandstone/Button',
			message: 'Use `sandstone/Button` and its `icon` prop'
		});

		return (
			<ButtonBase {...rest} minWidth={false} icon={children} iconOnly />
		);
	}
});

/**
 * Sandstone-specific button behaviors to apply to
 * [IconButton]{@link sandstone/IconButton.IconButtonBase}.
 *
 * @hoc
 * @memberof sandstone/IconButton
 * @mixes sandstone/TooltipDecorator.TooltipDecorator
 * @mixes ui/IconButton.IconButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const IconButtonDecorator = compose(
	Pure,
	TooltipDecorator({tooltipDestinationProp: 'decoration'}),
	UiIconButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * `IconButton` does not have `Marquee` like `Button` has, as it should not contain text.
 *
 * Usage:
 * ```
 * <IconButton onClick={handleClick} size="small">
 *     plus
 * </IconButton>
 * ```
 *
 * @class IconButton
 * @memberof sandstone/IconButton
 * @extends sandstone/IconButton.IconButtonBase
 * @mixes sandstone/IconButton.IconButtonDecorator
 * @ui
 * @public
 */
const IconButton = IconButtonDecorator(IconButtonBase);

export default IconButton;
export {
	IconButton,
	IconButtonBase,
	IconButtonDecorator
};
