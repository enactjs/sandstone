import {ScrollThumb as UiScrollThumb} from '@enact/ui/Scrollable/Scrollbar';
import PropTypes from 'prop-types';
import React, {forwardRef, useEffect} from 'react';

const nop = () => {};

/**
 * A Sandstone-styled scroll thumb with sandstone behavior
 *
 * @class ScrollThumb
 * @memberof sandstone/Scrollable
 * @extends ui/Scrollable/ScrollThumb
 * @ui
 * @private
 */
const ScrollThumb = forwardRef(({cbAlertThumb, ...rest}, ref) => {
	useEffect (() => {
		cbAlertThumb();
	});

	return <UiScrollThumb {...rest} ref={ref} />;
});

ScrollThumb.displayName = 'ScrollThumb';

ScrollThumb.propTypes = /** @lends sandstone/Scrollable.ScrollThumb.prototype */ {
	/**
	 * Called when [ScrollThumb]{@link sandstone/Scrollable.ScrollThumb} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertThumb: PropTypes.func
};

ScrollThumb.defaultProps = {
	cbAlertThumb: nop
};

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
