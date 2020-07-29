/**
 * A "sprite" is an animated sequence of cells.
 *
 * Cells, like a film-strip, are pre-arranged in one or more rows and one or more columns.
 * This component steps through those cells to create an animation.
 *
 * @example
 * <Sprite
 * 	src="images/sprite-sheet.png"
 * 	height={60}
 * 	width={60}
 * 	rows={5}
 * 	columns={10}
 * />
 *
 * @module sandstone/Sprite
 * @exports Sprite
 * @exports SpriteBase
 */

import kind from '@enact/core/kind';
import {scaleToRem} from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../Image';

import css from './Sprite.module.less';

const createKeyframe = ({dimension, axis, vertical, offset}) => {
	const x = scaleToRem(vertical ? axis : dimension);
	const y = scaleToRem(vertical ? dimension : axis);
	const keyframe = {
		transform: `translate(${x}, ${y})`
	};
	if (offset != null) keyframe.offset = offset;
	return keyframe;
};

/**
 * Renders a Sprite animation.
 *
 * @class SpriteBase
 * @memberof sandstone/Sprite
 * @ui
 * @public
 */
const SpriteBase = kind({
	name: 'Sprite',

	functional: true,

	propTypes: /** @lends sandstone/Sprite.SpriteBase.prototype */ {
		/**
		 * The amount of animation cells spread across the X (horizontal) axis.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		columns: PropTypes.number,

		/**
		 * The length of the animation in milliseconds.
		 *
		 * @type {Number}
		 * @default 1000
		 * @public
		 */
		duration: PropTypes.number,

		/**
		 * The height of a single cell in pixels.
		 *
		 * @type {Number}
		 * @default 120
		 * @public
		 */
		height: PropTypes.number,

		/**
		 * The number of times the animation should repeat.
		 *
		 * The JavaScript reserved word `Infinity` is a valid option here (set by default) that
		 * means "repeat indefinitely".
		 *
		 * @type {Number}
		 * @default Infinity
		 * @public
		 */
		iterations: PropTypes.number,

		/**
		 * Sets the left distance that the first cell is from the top left corner.
		 *
		 * This can be useful if you have several sprite animations in one image file.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		offsetLeft: PropTypes.number,

		/**
		 * Sets the top distance that the first cell is from the top left corner.
		 *
		 * This can be useful if you have several sprite animations in one image file.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		offsetTop: PropTypes.number,

		/**
		 * Event callback for when animation events occur.
		 *
		 * This callback can be used for more fine-grained control of the sprite animation.
		 * The arguments payload contains an object with the following keys:
		 *  * `animation`: the `animate` handle {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/animate}
		 *  * `playing`: boolean representing the "playing" vs "stopped" state
		 *  * `paused`: boolean representing whether the animation has paused
		 *
		 * Note: Playing and paused are handled separately, since a paused animation is
		 * still in a playing state, while a stopped animation is both not paused and
		 * not playing.
		 *
		 * @type {Function}
		 * @public
		 */
		onSpriteAnimation: PropTypes.func,

		/**
		 * Sets the orientation of the frames on the sprite sheet (`src`).
		 *
		 * A horizontal setting would indicate that the cells are arranged left to right with the
		 * next row starting below the first row.
		 * A vertical setting would indicate that the cells are arranged top to bottom with the
		 * next column starting to the right of the first column.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Pauses the animation, holding on the current frame.
		 *
		 * @type {Boolean}
		 * @private
		 */
		paused: PropTypes.bool,

		/**
		 * The amount of animation cells spread across the Y (vertical) axis.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		rows: PropTypes.number,

		/**
		 * The sprite-sheet image with all of the cells on it.
		 *
		 * @see {@link ui/Image.Image.src}
		 * @type {String|Object}
		 * @public
		 */
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Stops the animation from playing, resetting to the beginning.
		 *
		 * @type {Boolean}
		 * @public
		 */
		stopped: PropTypes.bool,

		/**
		 * The width of a single cell in pixels.
		 *
		 * @type {Number}
		 * @default 120
		 * @public
		 */
		width: PropTypes.number
	},

	defaultProps: {
		columns: 1,
		duration: 1000,
		height: 120,
		iterations: Infinity,
		offsetLeft: 0,
		offsetTop: 0,
		orientation: 'horizontal',
		paused: false,
		rows: 1,
		width: 120
	},

	styles: {
		css,
		className: 'sprite'
	},

	computed: {
		style: ({offsetTop, offsetLeft, rows, columns, height, width, style}) => ({
			...style,
			'--sand-sprite-offset-top': scaleToRem(offsetTop),
			'--sand-sprite-offset-left': scaleToRem(offsetLeft),
			'--sand-sprite-rows': rows,
			'--sand-sprite-columns': columns,
			'--sand-sprite-height': scaleToRem(height),
			'--sand-sprite-width': scaleToRem(width)
		})
	},

	render: ({
		columns,
		duration,
		height,
		iterations,
		onSpriteAnimation,
		orientation,
		paused,
		rows,
		stopped,
		src,
		width,
		...rest
	}) => {
		delete rest.offsetTop;
		delete rest.offsetLeft;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const imageRef = React.useRef();
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const animation = React.useRef();

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const keyframes = React.useMemo(() => {
			const framesets = [];

			const vertical = (orientation === 'vertical');

			// Orientation agnostic terms to generate keyframes
			const steps = (vertical ? rows : columns);
			const sets = (vertical ? columns : rows);
			const dimension = (vertical ? height : width);
			const axis = (vertical ? width : height);

			for (let i = 0; i < sets; i++) {
				const axisValue = (i * axis * -1);
				const dimentionValue = ((steps - 0) * dimension * -1);
				framesets.push(
					createKeyframe({
						offset: (i / sets),
						vertical,
						dimension: 0,
						axis: axisValue
					}),
					createKeyframe({
						offset: ((i + 1) / sets),
						vertical,
						dimension: dimentionValue,
						axis: axisValue
					})
				);
			}
			return framesets;
		}, [
			// Only update if these change
			columns,
			height,
			orientation,
			rows,
			width
		]);

		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useLayoutEffect(
			() => {
				if (imageRef && imageRef.current) {
					const node = imageRef.current;
					const frameCount = (columns * rows);

					if (animation.current) {
						animation.current.cancel();
					}

					animation.current = node.animate(
						keyframes,
						{
							easing: `steps(${frameCount}, end)`,
							duration,
							iterations
						}
					);

					// Playing and paused are handled separately, since a paused animation is
					// still in a playing state, while a stopped animation is both not paused and
					// not playing.
					const eventPayload = {
						type: 'onSpriteAnimation',
						animation: animation.current,
						value: 'testing',
						paused: false,
						playing: false
					};

					if (stopped) {
						animation.current.pause();
					} else if (paused) {
						animation.current.pause();

						eventPayload.paused = true;
						eventPayload.playing = true;
					} else {
						animation.current.play();

						eventPayload.playing = true;
					}

					if (typeof onSpriteAnimation === 'function') {
						onSpriteAnimation(eventPayload);
					}
				}
			},
			[
				// Only update if these change
				columns,
				duration,
				iterations,
				keyframes,
				onSpriteAnimation,
				paused,
				rows,
				stopped
			]
		);

		return (
			<div {...rest}>
				<Image src={src} ref={imageRef} className={css.image} />
			</div>
		);
	}
});


export default SpriteBase;
export {
	SpriteBase as Sprite,
	SpriteBase
};
