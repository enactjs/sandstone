import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import kind from '@enact/core/kind';

import {secondsToPeriod, secondsToTime} from './util';

import css from './Times.module.less';

/**
 * Sandstone-styled formatted time component.
 *
 * @class Times
 * @memberof sandstone/MediaPlayer
 * @ui
 * @public
 */
const TimesBase = kind({
	name: 'Times',

	propTypes: /** @lends sandstone/MediaPlayer.Times.prototype */ {
		/**
		 * An instance of a Duration Formatter from i18n.
		 *
		 * Must has a `format()` method that returns a string.
		 *
		 * @type {Object}
		 * @required
		 * @public
		 */
		formatter: PropTypes.object.isRequired,

		/**
		 * The current time in seconds of the video source.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		current: PropTypes.number,

		/**
		 * Removes the current time.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noCurrentTime: PropTypes.bool,

		/**
		 * Removes the total time.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noTotalTime: PropTypes.bool,

		/**
		 * The total time (duration) in seconds of the loaded video source.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		total: PropTypes.number
	},

	defaultProps: {
		current: 0,
		total: 0
	},

	styles: {
		css,
		className: 'times'
	},

	computed: {
		currentPeriod:   ({current}) => secondsToPeriod(current),
		currentReadable: ({current, formatter}) => secondsToTime(current, formatter),
		noSeparator: ({noCurrentTime, noTotalTime}) => noCurrentTime || noTotalTime,
		totalPeriod:     ({total}) => secondsToPeriod(total),
		totalReadable:   ({total, formatter}) => secondsToTime(total, formatter)
	},

	render: ({currentPeriod, currentReadable, noCurrentTime, noSeparator, noTotalTime, totalPeriod, totalReadable, ...rest}) => {
		delete rest.current;
		delete rest.formatter;
		delete rest.total;

		return (
			<div {...rest}>
				{noCurrentTime ?
					null :
					<time className={css.currentTime} dateTime={currentPeriod}>{currentReadable}</time>
				}
				{noSeparator ?
					null :
					<span className={css.separator}>/</span>
				}
				{noTotalTime ?
					null :
					<time className={css.totalTime} dateTime={totalPeriod}>{totalReadable}</time>
				}
			</div>
		);
	}
});

const Times = onlyUpdateForKeys(['current', 'formatter', 'total'])(TimesBase);

export default Times;
export {Times, TimesBase};
