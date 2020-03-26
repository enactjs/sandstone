/**
 * Provides Sandstone styled image item components and behaviors.
 *
 * @example
 * <ImageItem
 *   caption="image0"
 *   src="http://placehold.it/100x100/9037ab/ffffff&text=Image0"
 *   subCaption="sub-image0"
 * />
 *
 * @module sandstone/ImageItem
 * @exports ImageItem
 * @exports ImageItemBase
 * @exports ImageItemDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Icon from '../Icon';
import {ImageBase as Image} from '../Image';
import {Marquee, MarqueeController} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './ImageItem.module.less';

const
	defaultPlaceholder =
	'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
	'9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
	'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
	'4NCg==';

/**
 * A Sandstone styled base component for [ImageItem]{@link sandstone/ImageItem.ImageItem}.
 *
 * @class ImageItemBase
 * @extends ui/ImageItem.ImageItem
 * @memberof sandstone/ImageItem
 * @ui
 * @public
 */
const ImageItemBase = kind({
	name: 'ImageItem',

	propTypes: /** @lends sandstone/ImageItem.ImageItemBase.prototype */ {
		/**
		 * The primary caption string to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		caption: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `caption` - The caption component class
		 * * `image` - The image component class
		 * * `imageItem` - The image item component class
		 * * `imageIcon` - The image icon component class
		 * * `selected` - Applied when `selected` prop is `true`
		 * * `selectionIcon` - The icon component class for default selection component
		 * * `subCaption` - The subCaption component class
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
		 * @memberof sandstone/ImageItem.ImageItemBase.prototype
		 * @public
		 */
		'data-webos-voice-intent': PropTypes.string,

		/**
		 * The component used to render the image icon component.
		 *
		 * @type {Component}
		 * @default sandstone/Image.Image
		 * @public
		 */
		imageIconComponent: EnactPropTypes.component,

		/**
		 * Source for the image icon.
		 * String value or Object of values used to determine which image will appear on
		 * a specific screenSize.
		 * This feature is only valid when `orientation` is `'vertical'.
		 *
		 * @type {String|Object}
		 * @public
		 */
		imageIconSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * The layout orientation of the component.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Placeholder image used while [src]{@link sandstone/ImageItem.ImageItem#src}
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
		 * Applies a selected visual effect to the image, but only if `showSelection`
		 * is also `true`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The custom selection component to render. A component can be a stateless functional
		 * component, `kind()` or React component. The following is an example with custom selection
		 * kind.
		 *
		 * Usage:
		 * ```
		 * const SelectionComponent = kind({
		 * 	render: () => <div>custom selection component</div>
		 * });
		 *
		 * <ImageItem selectionComponent={SelectionComponent} />
		 * ```
		 *
		 * @type {Function}
		 * @public
		 */
		selectionComponent: PropTypes.func,

		/**
		 * Shows a selection component with a centered icon. When `selected` is true, a check mark is shown.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showSelection: PropTypes.bool,

		/**
		 * Source for the image.
		 * String value or Object of values used to determine which image will appear on
		 * a specific screenSize.
		 *
		 * @type {String|Object}
		 * @public
		 */
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * The second caption line to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		subCaption: PropTypes.string
	},

	defaultProps: {
		'data-webos-voice-intent': 'Select',
		imageIconComponent: Image,
		orientation: 'vertical',
		placeholder: defaultPlaceholder,
		selected: false,
		showSelection: false
	},

	styles: {
		css: componentCss,
		publicClassNames: ['caption', 'image', 'imageIcon', 'imageItem', 'selected', 'selectionIcon', 'subCaption']
	},

	computed: {
		caption: ({caption, css, subCaption, imageIconComponent, imageIconSrc, orientation}) => {
			const hasImageIcon = imageIconSrc && orientation === 'vertical';

			if (!hasImageIcon && !caption && !subCaption) return;

			return (
				<Row className={css.captions}>
					{hasImageIcon ? (
						<Cell
							className={css.imageIcon}
							component={imageIconComponent}
							src={imageIconSrc}
							shrink
						/>
					) : null}
					<Cell>
						<Marquee className={css.caption} marqueeOn="hover">{caption}</Marquee>
						<Marquee className={css.subCaption} marqueeOn="hover">{subCaption}</Marquee>
					</Cell>
				</Row>
			);
		}
	},

	render: ({css, selectionComponent: SelectionComponent, showSelection, ...rest}) => {
		delete rest.imageIconComponent;
		delete rest.imageIconSrc;
		delete rest.subCaption;

		if (SelectionComponent) {
			rest['role'] = 'checkbox';
			rest['aria-checked'] = rest.selected;
		}

		return (
			<UiImageItem
				{...rest}
				css={css}
				imageComponent={
					<Image>
						{showSelection ? (
							<div className={css.selectionContainer}>
								{SelectionComponent ? (
									<SelectionComponent />
								) : (
									<div className={css.selectionComponent}>
										<Icon className={css.selectionIcon}>check</Icon>
									</div>
								)}
							</div>
						) : null}
					</Image>
				}
			/>
		);
	}
});

/**
 * Sandstone-specific ImageItem behaviors to apply to
 * [ImageItem]{@link sandstone/ImageItem.ImageItem}.
 *
 * @hoc
 * @memberof sandstone/ImageItem
 * @mixes sandstone/Marquee.MarqueeController
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ImageItemDecorator = compose(
	MarqueeController({marqueeOnFocus: true}),
	Spottable,
	Skinnable
);

/**
 * A sandstone-styled image item, Marquee and Spottable applied.
 *
 * Usage:
 * ```
 * <ImageItem
 * 	caption="image0"
 * 	src="http://placehold.it/300x300/9037ab/ffffff&text=Image0"
 * 	subCaption="sub-image0"
 * />
 * ```
 *
 * @class ImageItem
 * @memberof sandstone/ImageItem
 * @extends sandstone/ImageItem.ImageItemBase
 * @mixes sandstone/ImageItem.ImageItemDecorator
 * @see {@link sandstone/ImageItem.ImageItemBase}
 * @ui
 * @public
 */
const ImageItem = ImageItemDecorator(ImageItemBase);

export default ImageItem;
export {
	ImageItem,
	ImageItemBase,
	ImageItemDecorator
};
