import PropTypes from 'prop-types';
import React from 'react';

// A delay that prevents children from being rendered to some extent
// when the user continues to wheel through the list
const delayToRenderChildren = 600;

/**
 * This component introduced to enhance scroll performance when `ImageItem` used in `VirtualGridList`.
 * Basically it renders `children` asynchronously when `children` and `index` changed.
 * When `ImageItem` used in other components, it will render immediately.
 *
 * @class AsyncRenderChildren
 * @memberof sandstone/ImageItem
 * @ui
 * @private
 */
function AsyncRenderChildren ({children: cachedChildren, fallback = '', index}) {
	const [children, setChildren] = React.useState(cachedChildren);
	const prevIndexRef = React.useRef(index);
	const timerRef = React.useRef(null);
	const aync = (children != cachedChildren && typeof index !== 'undefined' && index !== prevIndexRef.current);

	prevIndexRef.current = index;

	React.useEffect(() => {
		if (aync) {
			timerRef.current = setTimeout(() => {
				timerRef.current = null;
				setChildren(cachedChildren);
			}, delayToRenderChildren);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	});

	return (!aync) ? children : fallback;
}

AsyncRenderChildren.propTypes = /** @lends sandstone/ImageItem.AsyncRenderChildren.prototype */ {
	/**
	 * The fallback element that shows before `children` render.
	 *
	 * @type {*}
	 * @private
	 */
	fallback: PropTypes.any,

	/**
	 * `data-index` of [ImageItem]{@link sandstone/ImageItem}.
	 * Renders `children` asynchronously when this value changed.
	 *
	 * @type {Number}
	 * @private
	 */
	index: PropTypes.number
};

export default AsyncRenderChildren;
export {
	AsyncRenderChildren
};
