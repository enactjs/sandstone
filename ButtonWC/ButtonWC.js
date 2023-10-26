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
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from '@enact/ui/ButtonWC';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Children} from 'react';

import Icon from '../Icon';
import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

import componentCss from './ButtonWC.module.less';

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
		 * Additional DOM nodes which may be necessary for decorating the Button.
		 *
		 * @type {Node}
		 * @private
		 */
		decoration: PropTypes.node,

		/**
		 * Applies the `disabled` class.
		 *
		 * When `true`, the button is shown as disabled.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Set the visual effect applied to the button when focused.
		 *
		 * @type {('expand'|'static')}
		 * @default 'expand'
		 * @private
		 */
		focusEffect: PropTypes.oneOf(['expand', 'static']),

		/**
		 * The icon displayed within the Button.
		 *
		 * The icon will be displayed before the natural reading order of the text, regardless
		 * of locale. Any string that is valid for its {@link ui/Button.Button.iconComponent} is
		 * valid here. If `icon` is specified as a string and `iconButton` is undefined, the icon is
		 * not rendered.
		 *
		 * This also supports a custom icon, in the form of a DOM node or a Component,
		 * with the caveat that if you supply a custom icon, you are responsible for sizing and
		 * locale positioning of the custom component.
		 *
		 * Setting this to `true` means the `iconComponent` will be rendered but with empty content.
		 * This may be useful if you've customized the `iconComponent` to render the icon content
		 * externally.
		 *
		 * @type {Node|Boolean}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

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
		 * Flips the icon.
		 *
		 * @see {@link ui/Icon.IconBase.flip}
		 * @type {String}
		 * @public
		 */
		iconFlip: PropTypes.string,

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
		 * Indicates the component is depressed.
		 *
		 * Applies the `pressed` CSS class which can be customized by
		 * {@link /docs/developer-guide/theming/|theming}.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		pressed: PropTypes.bool,

		/**
		 * True if both sides of button are fully rounded.
		 *
		 * @type {Boolean}
		 * @public
		 */
		roundBorder: PropTypes.bool,

		/**
		 * Indicates the component is selected.
		 *
		 * Applies the `selected` CSS class which can be customized by
		 * {@link /docs/developer-guide/theming/|theming}.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Adds shadow to the text.
		 * It is only applied when the background opacity of the button is `transparent`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		shadowed: PropTypes.bool,

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
		className: ({
			backgroundOpacity, collapsable, collapsed, color, css, focusEffect, icon, iconOnly, iconPosition,
			minWidth, roundBorder, pressed, selected, shadowed, size, styler}) => styler.append(
			{
				hasColor: color,
				hasIcon: (!!icon),
				iconOnly,
				minWidth: ((minWidth != null) ? minWidth : !iconOnly),
				collapsable,
				collapsed,
				roundBorder,
				pressed,
				selected,
				shadowed: shadowed && (backgroundOpacity ? backgroundOpacity === 'transparent' : iconOnly)
			},
			backgroundOpacity || (iconOnly ? 'transparent' : 'opaque'), // Defaults to opaque, unless otherwise specified
			color,
			`focus${cap(focusEffect)}`,
			// iconBefore/iconAfter only applies when using text and an icon
			!iconOnly && `icon${cap(iconPosition)}`,
			size,
			css.button
		),
		minWidth: ({iconOnly, minWidth}) => ((minWidth != null) ? minWidth : !iconOnly),
		iconComponent: ({css, icon, iconComponent, iconFlip, size}) => {
			if (icon == null || icon === false) return;

			// Establish the base collection of props for the most basic `iconComponent` type, an
			// HTML element string.
			const props = {
				className: css.icon,
				component: iconComponent
			};

			// Add in additional props that any Component supplied to `iconComponent` should be
			// configured to handle.
			if (typeof iconComponent !== 'string') {
				props.size = size;
				// the following inadvertently triggers a linting rule
				// eslint-disable-next-line enact/prop-types
				props.flip = iconFlip;
			}

			if (icon !== true) {
				props.children = icon;
			}

			return (
				<ComponentOverride {...props} />
			);
		}
	},

	render: ({children, className, css, decoration, iconComponent, ...rest}) => {
		delete rest.backgroundOpacity;
		delete rest.color;
		delete rest.collapsable;
		delete rest.collapsed;
		delete rest.iconOnly;
		delete rest.iconPosition;
		delete rest.focusEffect;
		delete rest.roundBorder;
		delete rest.shadowed;

		if (rest.disabled) {
			rest['aria-disabled'] = true;
		} else {
			delete rest.disabled;
		}

		/*
		.button {
			.bg
			.client
			.icon
		*/

		return (
			<UiButtonBase data-webos-voice-intent="Select" {...rest} css={css} className={className}>
				<div slot="decoration">{decoration ?? null}</div>
				<div slot="background" className={css.bg} />
				<div className={css.client}>
					{iconComponent}
					{children}
				</div>
			</UiButtonBase>
		);
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
 * @mixes sandstone/TooltipDecorator.TooltipDecorator
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
