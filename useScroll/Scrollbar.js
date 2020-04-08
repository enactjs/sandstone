import {useScrollbar as useScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

import ScrollbarTrack from './ScrollbarTrack';
import Skinnable from '../Skinnable';

import componentCss from './Scrollbar.module.less';

const useThemeScrollbar = (props) => {
	const {
		restProps,
		scrollbarProps,
		scrollbarTrackProps
	} = useScrollbarBase(props);

	const {
		cbAlertScrollbarTrack,
		focusableScrollbar,
		onInteractionForScroll,
		rtl,
		...rest
	} = restProps;

	return {
		restProps: rest,
		scrollbarProps,
		scrollbarTrackProps: {
			...scrollbarTrackProps,
			cbAlertScrollbarTrack,
			focusableScrollbar,
			onInteractionForScroll,
			rtl
		}
	};
};

/**
 * A Sandstone-styled scrollbar base component.
 *
 * @class ScrollbarBase
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const ScrollbarBase = memo((props) => {
	const {
		restProps,
		scrollbarProps,
		scrollbarTrackProps
	} = useThemeScrollbar(props);

	return (
		<div {...restProps} {...scrollbarProps}>
			<ScrollbarTrack {...scrollbarTrackProps} />
		</div>
	);
});

ScrollbarBase.displayName = 'ScrollbarBase';

ScrollbarBase.propTypes = /** @lends sandstone/useScroll.Scrollbar.prototype */ {
	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `scrollbar` - The scrollbar component class
	 *
	 * @type {Object}
	 * @public
	 */
	css: PropTypes.object,

	/**
	 * Registers the Scrollbar component with an
	 * {@link core/internal/ApiDecorator.ApiDecorator}.
	 *
	 * @type {Function}
	 * @private
	 */
	// setApiProvider: PropTypes.func,

	/**
	 * The minimum size of the thumb.
	 * This value will be applied ri.scale.
	 *
	 * @type {number}
	 * @public
	 */
	minThumbSize: PropTypes.number,

	/**
	 * The scrollbar will be oriented vertically.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	vertical: PropTypes.bool
};

ScrollbarBase.defaultProps = {
	css: componentCss,
	minThumbSize: 120,
	vertical: true
};

/**
 * A Sandstone-styled scroll bar.
 *
 * @class Scrollbar
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const Scrollbar = Skinnable(ScrollbarBase);

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
export {
	Scrollbar,
	ScrollbarBase
};
