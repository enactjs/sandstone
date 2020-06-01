import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import {FadeAndSlideArranger, PopupDecorator, Viewport} from '../internal/Panels';

import css from './FlexiblePopupPanels.module.less';

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the left
 * or right side of the screen inside a popup. This panel flexes both horizontally and vertically,
 * with the Header positioned outside the Panel background area. This is typically used for a single
 * setting or control at a time, for maximum background area viewing.
 *
 * @class FlexiblePopupPanels
 * @memberof sandstone/FlexiblePopupPanels
 * @ui
 * @public
 */
const FlexiblePopupPanelsBase = kind({
	name: 'FlexiblePopupPanels',

	propTypes: /** @lends sandstone/FlexiblePopupPanels.FlexiblePopupPanels.prototype */ {
		/**
		 * Specifies when and how to show `nextButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `nextButton` on every `FlexiblePopupPanels.Panel`, enabling `nextButton` to be overridden on each Panel
		 * * `'always'` will display `nextButton` button on every Panel in the `FlexiblePopupPanels.Panel`
		 * * `'never'` will hide the `nextButton` on all `FlexiblePopupPanels.Panel`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this
		 * case, a customized `nextButton` on `FlexiblePopupPanels.Panel` will take precedence over the
		 * `nextButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		* Called when the index value is changed.
		*
		* @type {Function}
		* @param {Object} event
		* @public
		*/
		onChange: PropTypes.func,

		/**
		 * Called when the next button is clicked in `FlexiblePopupPanels.Panel`.
		 *
		 * Calling `preventDefault` on the passed event will prevent advancing to the next panel.
		 *
		 * @type {Function}
		 * @public
		 */
		onNextClick: PropTypes.func,

		/**
		 * Called when the previous button is clicked in `FlexiblePopupPanels.Panel`.
		 *
		 * Calling `preventDefault` on the passed event will prevent navigation to the previous panel.
		 *
		 * @type {Function}
		 * @public
		 */
		onPrevClick: PropTypes.func,

		/**
		 * Specifies when and how to show `prevButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `prevButton` on every `FlexiblePopupPanels.Panel`, enabling `prevButton` to be overridden on each Panel
		 * * `'always'` will display `prevButton` button on every Panel in the `FlexiblePopupPanels.Panel`
		 * * `'never'` will hide the `prevButton` on all `FlexiblePopupPanels.Panel`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this case,
		 * if user provides a customized `prevButton` on `FlexiblePopupPanels.Panel` will take precedence over the `prevButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never'])
	},

	defaultProps: {
		nextButtonVisibility: 'auto',
		prevButtonVisibility: 'auto'
	},

	styles: {
		css,
		className: 'viewport'
	},

	computed: {
		children: ({children, nextButtonVisibility, onChange, onNextClick, onPrevClick, prevButtonVisibility}) => React.Children.map(children, (child) => {
			if (child) {
				const props = {
					nextButtonVisibility,
					onChange,
					onNextClick,
					onPrevClick,
					prevButtonVisibility
				};

				return React.cloneElement(child, props);
			} else {
				return null;
			}
		}),
		onBack: ({onChange}) => onChange
	},

	render: (props) => {
		delete props.nextButtonVisibility;
		delete props.onChange;
		delete props.onNextClick;
		delete props.onPrevClick;
		delete props.prevButtonVisibility;

		return (<Viewport {...props} />);
	}
});

const FlexiblePopupPanels = PopupDecorator(
	{
		className: 'flexiblePopupPanels',
		css,
		panelArranger: FadeAndSlideArranger,
		panelType: 'flexiblePopup'
	},
	FlexiblePopupPanelsBase
);

// Directly set the defaultProps for position to the left side so it initially draws on the correct
// side. The real default is assigned in PopupDecorator, but should still be overridable by an app.
FlexiblePopupPanels.defaultProps = {
	...FlexiblePopupPanels.defaultProps,
	position: 'left'
};

export default FlexiblePopupPanels;
export {
	FlexiblePopupPanels,
	FlexiblePopupPanelsBase
};
