// import ApiDecorator from '@enact/core/internal/ApiDecorator';
import {useScrollbar} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import React, {forwardRef, memo, useImperativeHandle} from 'react';

import ScrollThumb from './ScrollThumb';
// import Skinnable from '../Skinnable';

import componentCss from './Scrollbar.module.less';

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
		className,
		getContainerRef,
		scrollbarProps,
		scrollbarTrackRef,
		showScrollbarTrack,
		startHidingScrollbarTrack,
		uiScrollbarContainerRef,
		update,
		vertical
	} = useScrollbar(props);

	const {
		cbAlertThumb,
		focusableScrollbar,
		onInteractionForScroll,
		rtl,
		...rest
	} = scrollbarProps;

	useImperativeHandle(ref, () => ({
		getContainerRef,
		showScrollbarTrack,
		startHidingScrollbarTrack,
		update
	}));

	return (
		<div
			{...rest}
			className={className}
			ref={uiScrollbarContainerRef}
		>
			<ScrollThumb
				cbAlertThumb={cbAlertThumb}
				focusableScrollbar={focusableScrollbar}
				onInteractionForScroll={onInteractionForScroll}
				ref={scrollbarTrackRef}
				rtl={rtl}
				vertical={vertical}
			/>
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
		'showThumb',
		'startHidingThumb',
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
