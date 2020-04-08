// import ApiDecorator from '@enact/core/internal/ApiDecorator';
import {useScrollbar as useScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import pick from 'ramda/src/pick';
import React, {forwardRef, memo, useImperativeHandle} from 'react';

import ScrollbarTrack from './ScrollbarTrack';
// import Skinnable from '../Skinnable';

import componentCss from './Scrollbar.module.less';

const useThemeScrollbar = (props) => {
	const {
		imperativeHandles,
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
		imperativeHandles,
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
const ScrollbarBase = memo(forwardRef((props, ref) => {
	const {
		imperativeHandles,
		restProps,
		scrollbarProps,
		scrollbarTrackProps
	} = useThemeScrollbar(props);

	useImperativeHandle(ref, () => {
		const handles = pick([
			'getContainerRef',
			'showScrollbarTrack',
			'startHidingScrollbarTrack',
			'update'
		], imperativeHandles);
		return handles;
	});

	return (
		<div {...restProps} {...scrollbarProps}>
			<ScrollbarTrack {...scrollbarTrackProps} />
		</div>
	);
}));

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
/* TODO: Is it possible to use ApiDecorator?
const Scrollbar = ApiDecorator(
	{api: [
		'showScrollbarTrack',
		'startHidingScrollbarTrack',
		'update'
	]}, Skinnable(ScrollbarBase)
);
*/
const Scrollbar = ScrollbarBase;

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
export {
	Scrollbar,
	ScrollbarBase
};
