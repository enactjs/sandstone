import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../Heading';

import componentCss from './DateTime.module.less';

/**
 * {@link sandstone/internal/DateTime.DateTime} provides the surrounding
 * markup and styling for a {@link sandstone/DatePicker} and
 * {@link sandstone/TimePicker}.
 *
 * @class DateTime
 * @memberof sandstone/internal/DateTime
 * @ui
 * @private
 */
const DateTimeBase = kind({
	name: 'DateTime',

	propTypes:  /** @lends sandstone/internal/DateTime.DateTime.prototype */ {
		css: PropTypes.object,

		/**
		 * The label to display above the picker
		 *
		 * @type {String}
		 */
		label: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'dateTime',
		publicClassNames: ['dateTime', 'pickers']
	},

	render: ({children, css, label, ...rest}) => (
		<div {...rest}>
			<Heading className={css.heading}>{label}</Heading>
			<div className={css.pickers}>
				{children}
			</div>
		</div>
	)
});

export default DateTimeBase;
export {
	DateTimeBase,
	DateTimeBase as DateTime
};
