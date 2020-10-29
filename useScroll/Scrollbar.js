import {useScrollbar as useScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import React, {memo, useCallback} from 'react';

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
		'aria-label': ariaLabel,
		focusableScrollbar,
		onInteractionForScroll,
		rtl,
		...rest
	} = restProps;

	const
		{ref: scrollbarContainerRef} = scrollbarProps,
		{ref: scrollbarTrackRef} = scrollbarTrackProps,
		{vertical} = props;

	const onClick = useCallback((ev) => {
		// Click on bodyText scrollbar.
		const {nativeEvent, target} = ev;

		if (!focusableScrollbar || !scrollbarTrackRef.current) {
			return;
		}

		// Click the scrollbar area. If user click the thumb, do nothing.
		if ((target === scrollbarContainerRef.current) ||
			(target === scrollbarTrackRef.current)) {
			const
				clickPoint = nativeEvent[vertical ? 'offsetY' : 'offsetX'],
				thumb = scrollbarTrackRef.current.children[0],
				thumbPosition = thumb[vertical ? 'offsetTop' : 'offsetLeft'],
				thumbSize = thumb[vertical ? 'offsetHeight' : 'offsetWidth'],
				clickThumb = clickPoint > thumbPosition && clickPoint < thumbPosition + thumbSize;

			if (!clickThumb) {
				ev.preventDefault();
				ev.nativeEvent.stopImmediatePropagation();
				onInteractionForScroll({
					inputType: 'track',
					isForward: clickPoint > thumbPosition,
					isPagination: true,
					isVerticalScrollBar: vertical
				});
			}
		}
	}, [focusableScrollbar, onInteractionForScroll, scrollbarContainerRef, scrollbarTrackRef, vertical]);

	return {
		restProps: rest,
		scrollbarProps: {
			...scrollbarProps,
			onClick
		},
		scrollbarTrackProps: {
			...scrollbarTrackProps,
			'aria-label': ariaLabel,
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
