import classnames from 'classnames';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import Heading from '../../Heading/Heading';
import {Picker} from './Picker';

import componentCss from './TitlePicker.module.less';

/**
 * {@link sandstone/internal/TitlePicker.TitlePicker} provides the surrounding
 * markup and styling for a {@link sandstone/Picker} and
 * {@link sandstone/RangePicker}.
 *
 * @class TitlePicker
 * @memberof sandstone/internal/TitlePicker
 * @ui
 * @private
 */
const TitlePickerBase = kind({
	name: 'TitlePicker',

	propTypes:  /** @lends sandstone/internal/TitlePicker.TitlePicker.prototype */ {
		/**
		 * Applies inline styling to the title.
		 *
		 * @type {Boolean}
		 * @public
		 */
		inlineTitle: PropTypes.bool,

		/**
		 * The primary text of the `Picker`.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,
	},

	styles: {
		css: componentCss
	},

	render: ({children, css, inlineTitle, title, ...rest}) => (
		<>
			{title ? <Heading className={classnames(css.title, {[css.inline]: inlineTitle})} size="tiny">{title}</Heading> : null}
			<Picker {...rest} >
				{children}
			</Picker>
		</>
	)
});

export default TitlePickerBase;
export {
	TitlePickerBase,
	TitlePickerBase as TitlePicker
};
