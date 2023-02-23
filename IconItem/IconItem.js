/**
 * Provides Sandstone styled icon item components and behaviors.
 *
 * @example
 * <IconItem
 *   background="#ffffff"
 *   bordered
 *   icon="gamepad"
 * />
 *
 * @module sandstone/IconItem
 * @exports IconItem
 * @exports IconItemBase
 * @exports IconItemDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Column} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Image from '../Image';
import {Marquee, MarqueeController} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './IconItem.module.less';

/**
 * A Sandstone styled base component for {@link sandstone/IconItem.IconItem|IconItem}.
 *
 * @class IconItemBase
 * @memberof sandstone/IconItem
 * @ui
 * @public
 */
const IconItemBase = kind({
	name: 'IconItem',

	propTypes: /** @lends sandstone/IconItem.IconItemBase.prototype */ {
		/**
		 * The background color, gradient, or image of this item.
		 * Accepts any format of color, gradient type value, and image url.
		 *
		 * Example: '#ff0000', 'radial-gradient(crimson, skyblue)', 'url(http://example.com/image.png) center / cover'
		 *
		 * @type {String}
		 * @public
		 */
		background: PropTypes.string,

		/**
		 * Specifies bordered or borderless.
		 *
		 * @type {Boolean}
		 * @public
		 */
		bordered: PropTypes.bool,

		/**
		 * The custom component rendred as the content of this IconItem.
		 *
		 * @type {Component}
		 * @public
		 */
		children: PropTypes.any,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `iconItem` - The icon item component class
		 * * `bordered` - The border class
		 * * `image` - The image component class
		 * * `label` - The label component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The voice control intent.
		 *
		 * @type {String}
		 * @default 'Select'
		 * @public
		 */
		'data-webos-voice-intent': PropTypes.string,

		/**
		 * Disable IconItem and becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The icon content.
		 * If this is specified, {@link sandstone/Icon.Icon|Icon} will be shown as the content.
		 *
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Source and size for the image.
		 * String value or Object of values used to determine which image will appear on
		 * a specific screenSize.
		 *
		 * @type {Object}
		 * @public
		 */
		image: PropTypes.object,

		/**
		 * A label displayed in the content.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * Determines what triggers the label to show.
		 *
		 * @type {('focus'|'render')}
		 * @default 'render'
		 * @public
		 */
		labelOn: PropTypes.oneOf(['focus', 'render']),

		/**
		 * A style object.
		 *
		 * @type {Object}
		 * @public
		 */
		style: PropTypes.object,

		/**
		 * Title text showing below the icon.
		 *
		 * @type {String}
		 * @public
		 */
		 title: PropTypes.string,

		 /**
		 * Determines what triggers the title to show.
		 *
		 * @type {('focus'|'render')}
		 * @default 'render'
		 * @public
		 */
		titleOn: PropTypes.oneOf(['focus', 'render']),
	},

	defaultProps: {
		'data-webos-voice-intent': 'Select',
		labelOn: 'render',
		titleOn: 'render'
	},

	styles: {
		css: componentCss,
		className: 'iconItem',
		publicClassNames: true
	},

	computed: {
		className: ({bordered, labelOn, styler, titleOn}) => styler.append({
			bordered,
			labelOnFocus: labelOn === 'focus',
			titleOnFocus: titleOn === 'focus',
		}),

		children: ({background, children, css, icon, image, label, labelOn, title}) => {
			if (children) return children;

			let ImgComponent;

			if (icon) {
				ImgComponent = () => <Icon className={css.icon}>{icon}</Icon>;
			} else if (image) {
				ImgComponent = () =>
					<Image
						className={css.image}
						src={image?.src}
						style={{
							width: image?.size?.width,
							height: image?.size?.height
						}}
					/>;
			}

			if (!ImgComponent && !children && !label && !title) return;

			let align = label && labelOn === 'render'? 'center' : 'center center';

			const iconContent = (
				<Column align={align} className={css.content} style={{background}}>
					<Cell shrink>
						{ImgComponent ? ImgComponent() : null}
					</Cell>
					{label ? (
						<Cell shrink className={css.labelContainer}>
							<Marquee alignment="center" className={css.label} marqueeOn="hover">{label}</Marquee>
						</Cell>
					) : null}
				</Column>
			);

			return (
				title ?
					<Column>
						{iconContent}
						<Marquee alignment="center" className={css.title} marqueeOn="hover">{title}</Marquee>
					</Column>
				: iconContent
			);
		}
	},

	render: ({children, css, disabled, ...rest}) => {
		delete rest.background;
		delete rest.bordered;
		delete rest.icon;
		delete rest.image;
		delete rest.label;
		delete rest.labelOn;
		delete rest.title;
		delete rest.titleOn;

		return (
			<div
				{...rest}
				aria-disabled={disabled}
				disabled={disabled}
			>
				{children}
			</div>
		);
	}
});

/**
 * Sandstone-specific IconItem behaviors to apply to
 * {@link sandstone/IconItem.IconItem|IconItem}.
 *
 * @hoc
 * @memberof sandstone/IconItem
 * @mixes sandstone/Marquee.MarqueeController
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const IconItemDecorator = compose(
	MarqueeController({marqueeOnFocus: true}),
	Spottable,
	Skinnable
);

/**
 * A sandstone-styled icon item, Marquee and Spottable applied.
 *
 * Usage:
 * ```
 * <IconItem
 *   background="#ffffff"
 *   bordered
 *   icon="gamepad"
 * />
 * ```
 *
 * @class IconItem
 * @memberof sandstone/IconItem
 * @extends sandstone/IconItem.IconItemBase
 * @mixes sandstone/IconItem.IconItemDecorator
 * @see {@link sandstone/IconItem.IconItemBase}
 * @ui
 * @public
 */
const IconItem = IconItemDecorator(IconItemBase);
IconItem.displayName = 'IconItem';

export default IconItem;
export {
	IconItem,
	IconItemBase,
	IconItemDecorator
};
