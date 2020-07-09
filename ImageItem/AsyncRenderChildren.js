import PropTypes from 'prop-types';
import React from 'react';

// A delay that prevents children from being rendered to some extent
// when the user continues to wheel through the list
const delayToRenderChildren = 600;

/**
 * Render the `children` prop asynchronously when the `index` prop is defined and changes.
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
	const aync = (children !== cachedChildren && typeof index !== 'undefined' && index !== prevIndexRef.current);

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
	 * Render while waiting for the `children` prop to render. It could be any React elements.
	 *
	 * @type {*}
	 * @private
	 */
	fallback: PropTypes.any,

	/**
	 * Render the `children` prop asynchronously when the `index` is defined and changes.
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
