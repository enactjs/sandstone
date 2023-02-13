/**
 * Provides Sandstone styled tile item components and behaviors.
 *
 * @example
 * <TileItem
 * >
 * 	The primary caption for the image
 * </TileItem>
 *
 * @module sandstone/TileItem
 * @exports TileItem
 * @exports TileItemBase
 * @exports TileItemDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
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

const
	defaultPlaceholder =
	'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
	'9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
	'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
	'4NCg==';

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
		children: EnactPropTypes.component,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
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
		 * A caption displayed in the content.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * Placeholder image used while {@link sandstone/TileItem.TileItem#image|image}
		 * is loaded.
		 *
		 * @type {String}
		 * @default 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
		 * '9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
		 * 'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
		 * '4NCg=='
		 * @public
		 */
		placeholder: PropTypes.string,

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
		placeholder: defaultPlaceholder
	},

	styles: {
		css: componentCss,
		className: 'tileItem',
		publicClassNames: ['tileItem', 'image', 'label']
	},

	computed: {
		className: ({bordered, styler}) => styler.append({
			bordered
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
						src={image.src}
						style={{
							width: image.size.width,
							height: image.size.height
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
						<Cell align="center">
							<Marquee className={css.label}>{label}</Marquee>
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
		delete rest.placeholder;

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
 * >
 * 	The primary caption for the image
 * </TileItem>
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
