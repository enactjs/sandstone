/**
 * Provides Sandstone styled icon components and behaviors.
 *
 * @example
 * <Icon>flag</Icon>
 *
 * @module sandstone/Icon
 * @exports Icon
 * @exports IconBase
 * @exports IconDecorator
 * @exports icons
 */

import kind from '@enact/core/kind';
import {scaleToRem} from '@enact/ui/resolution';
import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';

import css from './IconSprite.module.less';

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
 * Renders a sandstone-styled icon without any behavior.
 *
 * @class IconBase
 * @memberof sandstone/Icon
 * @extends ui/Icon.Icon
 * @ui
 * @public
 */
const IconSpriteBase = kind({
	name: 'IconSprite',

	functional: true,

	propTypes: /** @lends sandstone/Icon.IconBase.prototype */ {
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
		className: 'iconSprite'
	},

	computed: {
		className: ({orientation, paused, styler}) => styler.append(orientation, {paused}),
		style: ({offsetTop, offsetLeft, rows, columns, duration, height, width, style}) => ({
			...style,
			'--sand-icon-sprite-offset-top': scaleToRem(offsetTop),
			'--sand-icon-sprite-offset-left': scaleToRem(offsetLeft),
			'--sand-icon-sprite-rows': rows,
			'--sand-icon-sprite-columns': columns,
			'--sand-icon-sprite-duration': duration,
			'--sand-icon-sprite-height': scaleToRem(height),
			'--sand-icon-sprite-width': scaleToRem(width)
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

					// console.log('keyframes:', keyframes);
					const spriteAnimation = node.animate(
						keyframes,
						{
							// fill: 'forwards',
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
			[] // disconnect on unmount
		);

		return (
			<div className={className} style={style}>
				<Image {...rest} ref={imageRef} className={css.image} />
			</div>
		);
	}
});


export default IconSpriteBase;
export {
	IconSpriteBase as IconSprite,
	IconSpriteBase
};
