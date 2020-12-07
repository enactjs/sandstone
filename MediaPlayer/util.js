import React from 'react';
// MediaPlayer utils.js
//

/**
 * Create a time object (hour, minute, second) from an amount of seconds.
 *
 * @param  {Number|String} value A duration of time represented in seconds
 *
 * @returns {Object}       An object with keys {hour, minute, second} representing the duration
 *                        seconds provided as an argument.
 * @private
 */
const parseTime = (value) => {
	value = parseFloat(value);
	const time = {};
	const hour = Math.floor(value / (60 * 60));
	time.minute = Math.floor((value / 60) % 60);
	time.second = Math.floor(value % 60);
	if (hour) {
		time.hour = hour;
	}
	return time;
};

/**
 * Generate a time usable by <time datetime />.
 *
 * @param  {Number|String} seconds A duration of time represented in seconds
 *
 * @returns {String}      String formatted for use in a `datetime` field of a `<time>` tag.
 * @private
 */
const secondsToPeriod = (seconds) => {
	return 'P' + seconds + 'S';
};

/**
 * Formats a duration in seconds into a human-readable time.
 *
 * @type {Function}
 * @param  {Number|String} seconds A duration of time represented in seconds
 * @param  {DurationFmt}   durfmt  An instance of a `ilib.DurationFmt` object from iLib configured
 *                                 to display time
 * @param  {Object}        config  Additional configuration object that includes `includeHour`
 *
 * @returns {String} Formatted duration string
 * @memberof sandstone/MediaPlayer
 * @public
 */
const secondsToTime = (seconds, durfmt, config) => {
	const includeHour = config && config.includeHour;

	if (durfmt) {
		const parsedTime = parseTime(seconds);
		const timeString = durfmt.format(parsedTime).toString();

		if (includeHour && !parsedTime.hour) {
			return '00:' + timeString;
		} else {
			return timeString;
		}
	}

	return includeHour ? '00:00:00' : '00:00';
};

/**
 * Safely count the children nodes and exclude null & undefined values for an accurate count of
 * real children
 *
 * @param {component} children React.Component or React.PureComponent
 * @returns {Number} Number of children nodes
 * @private
 */
const countReactChildren = (children) => React.Children.toArray(children).filter(n => n != null).length;

export {
	countReactChildren,
	parseTime,
	secondsToPeriod,
	secondsToTime
};
