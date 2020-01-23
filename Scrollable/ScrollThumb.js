import {ScrollThumb as UiScrollThumb} from '@enact/ui/Scrollable/Scrollbar';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

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
class ScrollThumb extends Component {
	static propTypes = /** @lends sandstone/Scrollable.ScrollThumb.prototype */ {
		/**
		 * Called when [ScrollThumb]{@link sandstone/Scrollable.ScrollThumb} is updated.
		 *
		 * @type {Function}
		 * @private
		 */
		cbAlertThumb: PropTypes.func
	}

	static defaultProps = {
		cbAlertThumb: nop
	}

	componentDidUpdate () {
		this.props.cbAlertThumb();
	}

	render () {
		const props = Object.assign({}, this.props);

		delete props.cbAlertThumb;

		return <UiScrollThumb {...props} />;
	}
}

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
