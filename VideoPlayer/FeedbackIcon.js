import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import Skinnable from '../Skinnable';

import Icon from '../Icon';
import iconMap from './FeedbackIcons.js';

import css from './Feedback.module.less';


/**
 * Feedback Icon for {@link sandstone/VideoPlayer.Feedback}.
 *
 * @class FeedbackIcon
 * @memberof sandstone/VideoPlayer
 * @ui
 * @private
 */
const FeedbackIconBase = kind({
	name: 'FeedbackIcon',

	propTypes: /** @lends sandstone/VideoPlayer.FeedbackIcon.prototype */ {
		/**
		 * Refers to one of the following possible media playback states.
		 * `'play'`, `'pause'`, `'rewind'`, `'fastForward'` ,
		 * `'jumpBackward'`, `'jumpForward'`, `'jumpToStart'`, `'jumpToEnd'`, `'stop'`.
		 *
		 * @type {String}
		 * @public
		 */
		children: PropTypes.oneOf(Object.keys(iconMap))
	},

	styles: {
		css,
		className: 'icon'
	},

	computed: {
		children: ({children}) => children && iconMap[children] && iconMap[children].icon
	},

	render: ({children, ...rest}) => {
		if (children) {
			return (
				<Icon {...rest}>{children}</Icon>
			);
		}

		return null;
	}
});

const FeedbackIcon = Skinnable(FeedbackIconBase);

export default FeedbackIcon;
export {
	FeedbackIcon,
	FeedbackIconBase
};
