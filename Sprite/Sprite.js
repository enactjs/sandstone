/**
 * Provides Sandstone styled Sprite components and behaviors.
 *
 * @example
 * <Sprite
 * 	src="images/sprite-sheet.png"
 * 	height={60}
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
 * Renders a sandstone-styled Sprite without any behavior.
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
		columns: PropTypes.number,
		duration: PropTypes.number,
		height: PropTypes.number,
		iterations: PropTypes.number,
		offsetLeft: PropTypes.number,
		offsetTop: PropTypes.number,
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),
		paused: PropTypes.bool,
		rows: PropTypes.number,
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
