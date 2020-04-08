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
 * @deprecated Will be removed in 1.0.0-beta.1. Use {@link sandstone/Button} instead.
 */

import kind from '@enact/core/kind';
import deprecate from '@enact/core/internal/deprecate';
import {IconButtonDecorator as UiIconButtonDecorator} from '@enact/ui/IconButton';
import Pure from '@enact/ui/internal/Pure';
import Spottable from '@enact/spotlight/Spottable';
import compose from 'ramda/src/compose';
import React from 'react';

import {ButtonBase} from '../Button';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

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
