import {useScrollbar as useScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {memo, useCallback, useEffect} from 'react';

import ScrollbarTrack from './ScrollbarTrack';
import Skinnable from '../Skinnable';

import panelCss from '../Panels/Panel.module.less';

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
		initialHiddenHeight,
		onInteractionForScroll,
		rtl,
		...rest
	} = restProps;

	const
		{className, ref: scrollbarContainerRef} = scrollbarProps,
		{ref: scrollbarTrackRef} = scrollbarTrackProps,
		{vertical} = props;

	useEffect(() => {
		if (initialHiddenHeight && scrollbarContainerRef.current) {
			const
				scrollbarNode = scrollbarContainerRef.current,
				{height} = scrollbarNode.getBoundingClientRect(),
				scale = (height - initialHiddenHeight) / height;

			scrollbarNode.style.setProperty('--scrollbar-scale', scale);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
				clickThumb = clickPoint > thumbPosition && clickPoint < thumbPosition + thumbSize,
				scrollParam = {
					inputType: 'track',
					isForward: clickPoint > thumbPosition,
					isPagination: true,
					isVerticalScrollBar: vertical
				};

			if (!clickThumb) {
				onInteractionForScroll(scrollParam);
			}
		}
	}, [focusableScrollbar, onInteractionForScroll, scrollbarContainerRef, scrollbarTrackRef, vertical]);

	return {
		restProps: rest,
		scrollbarProps: {
			...scrollbarProps,
			className: classNames(className, {[panelCss.scrollbar]: initialHiddenHeight}),
			onClick
		},
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
