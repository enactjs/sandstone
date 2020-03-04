/**
 * Provides a media component with image and text overlay support.
 *
 * @example
 * <MediaOverlay text="overlay">
 *   <source src="http://media.w3.org/2010/05/sintel/trailer.mp4" />
 * </MediaOverlay>
 *
 * @module sandstone/MediaOverlay
 * @exports MediaOverlay
 * @exports MediaOverlayBase
 * @exports MediaOverlayDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Layout, Cell} from '@enact/ui/Layout';
import Media from '@enact/ui/Media';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Image from '../Image';
import {Marquee} from '../Marquee';
import ProgressBar from '../ProgressBar';
import Skinnable from '../Skinnable';

import componentCss from './MediaOverlay.module.less';

/**
 * A media component with image and text overlay support.
 *
 * @class MediaOverlayBase
 * @memberof sandstone/MediaOverlay
 * @ui
 * @public
 */
const MediaOverlayBase = kind({
	name: 'MediaOverlay',

	propTypes: /** @lends sandstone/MediaOverlay.MediaOverlayBase.prototype */ {
		/**
		 * Any children `<source>` tag elements will be sent directly to the media element as
		 * sources.
		 *
		 * @type {Node}
		 * @public
		 */
		source: PropTypes.node.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `image` - class name for image
		 * * `textLayout` - class name for text layout
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Image path for image overlay.
		 *
		 * NOTE: When image is displayed, media is not displayed even though it is playing.
		 *
		 * @type {String|Object}
		 * @public
		 */
		imageOverlay: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Media component to use.
		 *
		 * The default (`'video'`) renders an `HTMLVideoElement`. Custom media components must have
		 * a similar API structure, exposing the following APIs:
		 *
		 * Methods:
		 * * `load()` - load media
		 *
		 * @type {String|Component}
		 * @default 'video'
		 * @public
		 */
		mediaComponent: EnactPropTypes.renderable,

		/**
		 * Placeholder for image overlay.
		 *
		 * @type {String}
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progress: PropTypes.number,

		/**
		 * Progress Bar visibility
		 *
		 * @type {Boolean}
		 * @public
		 */
		progressBarShowing: PropTypes.bool,

		/**
		 * Text to display over media.
		 *
		 * @type {String}
		 * @public
		 */
		text: PropTypes.string,

		/**
		 * Aligns the `text` vertically within the component.
		 *
		 * Allowed values are:
		 *
		 * * `"center"`, the default, aligns the text in the middle
		 * * `"start"` aligns the text to the top
		 * * `"end"` aligns the text to the bottom
		 *
		 * @type {String}
		 * @public
		 * @default "center"
		 */
		textAlign: PropTypes.string
	},

	defaultProps: {
		mediaComponent: 'video',
		progress: 0,
		textAlign: 'center'
	},

	styles: {
		css: componentCss,
		className: 'mediaOverlay',
		publicClassNames: ['mediaOverlay', 'image', 'textLayout']
	},

	render: ({css, imageOverlay, mediaComponent, placeholder, progress, progressBarShowing, source, text, textAlign, ...rest}) => {
		return (
			<div {...rest}>
				<div className={css.bg} />
				<Media
					autoPlay
					className={css.media}
					controls={false}
					mediaComponent={mediaComponent}
					source={source}
				/>
				{imageOverlay ? (
					<Image
						className={css.image}
						placeholder={placeholder}
						sizing="fill"
						src={imageOverlay}
					/>
				) : null}
				{text ? (
					<Layout align={textAlign} className={css.textLayout}>
						<Cell component={Marquee} alignment="center" className={css.text} marqueeOn="render">
							{text}
						</Cell>
					</Layout>
				) : null}
				{progressBarShowing ?
					<ProgressBar
						css={css}
						orientation="horizontal"
						progress={progress}
					/> : null
				}
			</div>
		);
	}
});

/**
 * A higher-order component that adds Sandstone specific behaviors to `MediaOverlay`.
 *
 * @hoc
 * @memberof sandstone/MediaOverlay
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Slottable.Slottable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const MediaOverlayDecorator = compose(
	Pure,
	Spottable,
	Slottable({slots: ['source']}),
	Skinnable
);

/**
 * A Sandstone-styled `Media` component.
 *
 * Usage:
 * ```
 * <MediaOverlay>
 *     <source type='' src=''/>
 * </MediaOverlay>
 * ```
 *
 * @class MediaOverlay
 * @memberof sandstone/MediaOverlay
 * @extends sandstone/MediaOverlay.MediaOverlayBase
 * @mixes sandstone/MediaOverlay.MediaOverlayDecorator
 * @ui
 * @public
 */
const MediaOverlay = MediaOverlayDecorator(MediaOverlayBase);

export default MediaOverlay;
export {
	MediaOverlay,
	MediaOverlayBase,
	MediaOverlayDecorator
};
