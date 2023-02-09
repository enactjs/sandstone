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
		 * The background color or gradient typed image of this item.
		 * Accepts any format of color and gradient type value.
		 * 
		 * Example: '#ff0000', radial-gradient(crimson, skyblue)
		 *
		 * @type {String}
		 * @public
		 */
		background: PropTypes.string,
		
		/**
		 * Source for the background image.
		 * String value or Object of values used to determine which image will appear on
		 * a specific screenSize.
		 *
		 * @type {String|Object}
		 * @public
		 */
		backgroundImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

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
		  * Source for the image.
		  * String value or Object of values used to determine which image will appear on
		  * a specific screenSize.
		  *
		  * @type {String|Object}
		  * @public
		  */
		imageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * A caption displayed in the content.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * Placeholder image used while {@link sandstone/TileItem.TileItem#imageSrc|imageSrc}
		 * is loaded.
		 *
		 * @type {String}
		 * @default 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
		 * '9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
		 * 'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
		 * '4NCg=='
		 * @public
		 */
		placeholder: PropTypes.string
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

		children: ({children, css, icon, imageSrc, label}) => {
			if (children) return children;

			let ImgComponent;

			if (icon) {
				ImgComponent = () => <Icon>icon</Icon>;
			} else if (imageSrc) {
				ImgComponent = () => <Image className={css.image} src={imageSrc} />;
			}
			
			if (!ImgComponent && !children && !label) return;
			
			return (
				<Column>
					<Cell>
						{ImgComponent ? ImgComponent() : null}
					</Cell>
					{typeof label !== 'undefined' ? (
						<Cell>
							<Marquee className={css.label}>{label}</Marquee>
						</Cell>
					) : null}
				</Column>
			);
		}
	},

	render: ({children, disabled,  ...rest}) => {
		delete rest.bordered;
		delete rest.icon;
		delete rest.imageSrc;
		delete rest.label;
		delete rest.placeholder;

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
