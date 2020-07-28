/**
 * A "sprite" is an animated sequence of cells.
 *
 * Cells, like a film-strip are pre-arranged in one or more rows and one or more columns.
 * This component steps through those cells to create an animation.
 *
 * @example
 * <Sprite
 * 	src="images/sprite-sheet.png"
 * 	height={60}
 *  width={60}
 * 	rows={5}
 * 	columns={10}
 * />
 *
 * @module sandstone/Sprite
 * @exports Sprite
 * @exports SpriteBase
 * @exports SpriteDecorator
 * @exports Sprites
 */

import kind from '@enact/core/kind';
import {scaleToRem} from '@enact/ui/resolution';
import React from 'react';
import PropTypes from 'prop-types';

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
 * @extends ui/Sprite.Sprite
 * @ui
 * @public
 */
const SpriteBase = kind({
	name: 'Sprite',

	functional: true,

	propTypes: /** @lends sandstone/Sprite.SpriteBase.prototype */ {
		/**
		 * The amount of animation cells spread across the X (horizontal) axis
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		columns: PropTypes.number,

		/**
		 * The length of the animation
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		duration: PropTypes.number,

		/**
		 * The height of a single cell in pixels
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		height: PropTypes.number,

		/**
		 * The number of times the animation should repeat
		 *
		 * Changing this value sets future animation loops to this number of repeats, so if it was
		 * previously set to 3 and it is changed shortly after to 1, it will complete the 3, then
		 * complete 1 last loop, then stop. Changing from `Infinity` to something else requires
		 * pausing and unpausing to break out of the infinite loop.
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
		 * Sets the left distance that the first cell is from the top left corner
		 *
		 * This can be useful if you have several sprite animations in one image file.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		offsetLeft: PropTypes.number,

		/**
		 * Sets the top distance that the first cell is from the top left corner
		 *
		 * This can be useful if you have several sprite animations in one image file.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		offsetTop: PropTypes.number,

		/**
		 * Sets the orientation of the frames on the sprite sheet (`src`)
		 *
		 * A horizontal setting would indicate that the cells are arranged left to right with the
		 * next row starting below the first row.
		 * A vertical setting would indicate that the cells are arranged top to bottom with the
		 * next row starting to the right of the first row.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Stops the animation from playing
		 *
		 * @type {Boolean}
		 * @public
		 */
		paused: PropTypes.bool,

		/**
		 * The amount of animation cells spread across the Y (vertical) axis
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		rows: PropTypes.number,

		/**
		 * The sprite-sheet image with all of the cells on it
		 *
		 * @see {@link ui/Image.Image.src}
		 * @type {String|Object}
		 * @public
		 */
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * The width of a single cell in pixels
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
		style: ({offsetTop, offsetLeft, rows, columns, duration, height, width, style}) => ({
			...style,
			'--sand-sprite-offset-top': scaleToRem(offsetTop),
			'--sand-sprite-offset-left': scaleToRem(offsetLeft),
			'--sand-sprite-rows': rows,
			'--sand-sprite-columns': columns,
			'--sand-sprite-duration': duration,
			'--sand-sprite-height': scaleToRem(height),
			'--sand-sprite-width': scaleToRem(width)
		})
	},

	render: ({
		className,
		style,
		orientation,
		columns,
		rows,
		height,
		width,
		duration,
		iterations,
		paused,
		...rest
	}) => {
		delete rest.offsetTop;
		delete rest.offsetLeft;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const imageRef = React.useRef();

		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useLayoutEffect(
			() => {
				if (imageRef && imageRef.current) {
					const node = imageRef.current;

					const vertical = (orientation === 'vertical');
					const keyframes = [];
					const frameCount = (columns * rows);

					// Orientation agnostic terms to generate keyframes
					const steps = (vertical ? rows : columns);
					const sets = (vertical ? columns : rows);
					const dimension = (vertical ? height : width);
					const axis = (vertical ? width : height);

					for (let i = 0; i < sets; i++) {
						const axisValue = (i * axis * -1);
						const dimentionValue = ((steps - 0) * dimension * -1);
						keyframes.push(
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

					const spriteAnimation = node.animate(
						keyframes,
						{
							easing: `steps(${frameCount}, end)`,
							duration,
							iterations
						}
					);

					if (paused) {
						spriteAnimation.pause();
					} else {
						spriteAnimation.play();
					}
				}
			},
			[
				// Only update if these change
				columns,
				duration,
				height,
				iterations,
				orientation,
				paused,
				rows,
				width
			]
		);

		return (
			<div className={className} style={style}>
				<Image {...rest} ref={imageRef} className={css.image} />
			</div>
		);
	}
});


export default SpriteBase;
export {
	SpriteBase as Sprite,
	SpriteBase
};
