/**
 * Provides Sandstone styled icon item components and behaviors.
 *
 * @example
 * <IconItem
 *   background="#1b1b1b"
 *   bordered
 *   icon="usb"
 *   style={{
 *      height: 80,
 *      width: 104
 *   }}
 * />
 *
 * @module sandstone/IconItem
 * @exports IconItem
 * @exports IconItemBase
 * @exports IconItemDecorator
 * @public
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Column} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Image from '../Image';
import {MarqueeController, MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './IconItem.module.less';

/**
 * The shape for image of {@link sandstone/IconItem|IconItem}.
 *
 * @typedef {Object} ImageShape
 * @memberof sandstone/IconItem
 * @property {Object} size Size for the image.
 *  The following properties should be provided:
 *
 * * `height` - The height of the image
 * * `width` - The width of the image
 * @property {String|Object} src Source for the image.
 *  String value or Object of values used to determine which image will appear on
 *  a specific screenSize.
 * @public
 */
const ImageShape = PropTypes.shape({
	size: PropTypes.shape({
		height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
		width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
	}).isRequired,
	src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
});

const MarqueeBase = ({...rest}) => {
	// eslint-disable-next-line enact/prop-types
	delete rest.order;

	return <div {...rest} />;
};

const Marquee = MarqueeDecorator({invalidateProps: ['remeasure', 'order']}, MarqueeBase);

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
		 * * `content` - The class for the content area except title
		 * * `bordered` - The border class
		 * * `icon` - The icon component class
		 * * `image` - The image component class
		 * * `labelContainer` - The label container class
		 * * `label` - The label component class
		 * * `title` - The title component class
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
		 * @see {@link ui/Icon.Icon.children}
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Source and size for the image.
		 * See the datails in {@link sandstone/IconItem.ImageShape|ImageShape}
		 *
		 * @type {sandstone/IconItem.ImageShape}
		 * @public
		 */
		image: ImageShape,

		/**
		 * A label displayed in the content.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * The color of label.
		 *
		 * @type {('dark'|'light')}
		 * @default 'light'
		 * @public
		 */
		labelColor: PropTypes.oneOf(['dark', 'light']),

		/**
		 * Determines what triggers the label to show.
		 *
		 * @type {('focus'|'render')}
		 * @default 'render'
		 * @public
		 */
		labelOn: PropTypes.oneOf(['focus', 'render']),

		/**
		 * The order of the item.
		 * Invalidates Marquee when the order changes.
		 *
		 * @type {Number}
		 * @private
		 */
		order: PropTypes.number,

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
		titleOn: PropTypes.oneOf(['focus', 'render'])
	},

	defaultProps: {
		'data-webos-voice-intent': 'Select',
		labelColor: 'light',
		labelOn: 'render',
		titleOn: 'render'
	},

	styles: {
		css: componentCss,
		className: 'iconItem',
		publicClassNames: true
	},

	computed: {
		className: ({bordered, labelColor, labelOn, styler, titleOn}) => styler.append({
			bordered,
			labelOnFocus: labelOn === 'focus',
			titleOnFocus: titleOn === 'focus',
			darkLabel: labelColor === 'dark',
			noAnimation: typeof ENACT_PACK_NO_ANIMATION !== 'undefined' && ENACT_PACK_NO_ANIMATION
		}),

		children: ({background, children, css, icon, image, label, labelOn, order, title}) => {
			if (children) return children;

			let imageComponent;

			if (icon) {
				imageComponent = <Icon className={css.icon} size="large">{icon}</Icon>;
			} else if (image) {
				imageComponent = (
					<Image
						className={css.image}
						src={image?.src}
						style={{
							width: image?.size?.width,
							height: image?.size?.height
						}}
					/>
				);
			}

			if (!imageComponent && !children && !label && !title) return;

			let align = label && labelOn === 'render' ? 'center' : 'center center';

			const iconContent = (
				<Column align={align} className={css.content} style={{background}}>
					<Cell shrink>
						{imageComponent ? imageComponent : null}
					</Cell>
					{label ? (
						<Cell shrink className={css.labelContainer}>
							<Marquee alignment="center" className={css.label} marqueeOn="focus" order={order}>{label}</Marquee>
						</Cell>
					) : null}
				</Column>
			);

			return (
				title ? (
					<Column>
						{iconContent}
						<Marquee alignment="center" className={css.title} marqueeOn="focus" order={order}>{title}</Marquee>
					</Column>
				) : iconContent
			);
		}
	},

	render: ({children, disabled, ...rest}) => {
		delete rest.background;
		delete rest.bordered;
		delete rest.icon;
		delete rest.image;
		delete rest.label;
		delete rest.labelColor;
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
 *   background="#1b1b1b"
 *   bordered
 *   icon="usb"
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
