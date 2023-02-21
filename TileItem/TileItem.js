/**
 * Provides Sandstone styled tile item components and behaviors.
 *
 * @example
 * <TileItem
 *   background="#ffffff"
 *   bordered
 *   icon="gamepad"
 * />
 *
 * @module sandstone/TileItem
 * @exports TileItem
 * @exports TileItemBase
 * @exports TileItemDecorator
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

import componentCss from './TileItem.module.less';

/**
 * A Sandstone styled base component for {@link sandstone/TileItem.TileItem|TileItem}.
 *
 * @class TileItemBase
 * @memberof sandstone/TileItem
 * @ui
 * @public
 */
const TileItemBase = kind({
	name: 'TileItem',

	propTypes: /** @lends sandstone/TileItem.TileItemBase.prototype */ {
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
		 * The custom component rendred as the content of this TileItem.
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
		 * * `tileItem` - The tile item component class
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
		 * Disable TileItem and becomes non-interactive.
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
		style: PropTypes.object
	},

	defaultProps: {
		'data-webos-voice-intent': 'Select',
	},

	styles: {
		css: componentCss,
		className: 'tileItem',
		publicClassNames: true
	},

	computed: {
		className: ({bordered, image, labelOn, styler}) => styler.append({
			bordered,
			labelOnFocus: labelOn === 'focus',
			hasImage: image
		}),

		children: ({children, css, icon, image, label}) => {
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
			
			if (!ImgComponent && !children && !label) return;
			
			return (
				<Column align="center center">
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
		}
	},

	render: ({background, children, css, disabled, style, ...rest}) => {
		delete rest.bordered;
		delete rest.icon;
		delete rest.image;
		delete rest.label;
		delete rest.labelOn;

		return (
			<div
				{...rest}
				aria-disabled={disabled}
				disabled={disabled}
				style={{
					background,
					...style
				}}
			>
				{children}
			</div>
		);
	}
});

/**
 * Sandstone-specific TileItem behaviors to apply to
 * {@link sandstone/TileItem.TileItem|TileItem}.
 *
 * @hoc
 * @memberof sandstone/TileItem
 * @mixes sandstone/Marquee.MarqueeController
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const TileItemDecorator = compose(
	MarqueeController({marqueeOnFocus: true}),
	Spottable,
	Skinnable
);

/**
 * A sandstone-styled tile item, Marquee and Spottable applied.
 *
 * Usage:
 * ```
 * <TileItem
 *   background="#ffffff"
 *   bordered
 *   icon="gamepad"
 * />
 * ```
 *
 * @class TileItem
 * @memberof sandstone/TileItem
 * @extends sandstone/TileItem.TileItemBase
 * @mixes sandstone/TileItem.TileItemDecorator
 * @see {@link sandstone/TileItem.TileItemBase}
 * @ui
 * @public
 */
const TileItem = TileItemDecorator(TileItemBase);
TileItem.displayName = 'TileItem';

export default TileItem;
export {
	TileItem,
	TileItemBase,
	TileItemDecorator
};
