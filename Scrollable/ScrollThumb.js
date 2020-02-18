import classNames from 'classnames';
import {is} from '@enact/core/keymap';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import React, {forwardRef, useCallback, useEffect} from 'react';

import css from './ScrollThumb.module.less';

const nop = () => {};
const
	isDown = is('down'),
	isLeft = is('left'),
	isPageUp = is('pageUp'),
	isPageDown = is('pageDown'),
	isRight = is('right'),
	isUp = is('up');

/**
 * A Sandstone-styled scroll thumb with sandstone behavior
 *
 * @class ScrollThumb
 * @memberof sandstone/Scrollable
 * @extends ui/Scrollable/ScrollThumb
 * @ui
 * @private
 */
let ScrollThumb = forwardRef((props, ref) => {
	const
		{cbAlertThumb, focusableThumb, scroll, vertical, ...rest} = props,
		className = classNames(css.ScrollThumb, vertical ? css.vertical : null),
		ScrollbarDiv = focusableThumb ?  Spottable('div') : 'div';

	useEffect (() => {
		cbAlertThumb();
	});

	const consumeEventWithScroll = useCallback((scrollParam, ev) => {
		ev.preventDefault();
		ev.nativeEvent.stopImmediatePropagation();
		scroll(scrollParam);
	}, [scroll]);

	const onKeyDown = useCallback((ev) => {
		const
			{keyCode} = ev,
			scrollParam = {
				isPreviousScrollButton: isUp(keyCode) || isLeft(keyCode) || isPageUp(keyCode),
				isVerticalScrollBar: vertical
			};

		if (vertical && (isUp(keyCode) || isDown(keyCode))) {
			// Scroll distance of Chrome browser is 40px.
			scrollParam.distance = 42;
			consumeEventWithScroll(scrollParam, ev);
		} else if (!vertical && (isLeft(keyCode) || isRight(keyCode))) {
			scrollParam.distance = 42;
			consumeEventWithScroll(scrollParam, ev);
		} else if (vertical && (isPageUp(keyCode) || isPageDown(keyCode))) {
			consumeEventWithScroll(scrollParam, ev);
		} // Do nothing when (!vertical && page key)
	}, [consumeEventWithScroll, vertical]);

	const onClick = useCallback((ev) => {
		// Click the track. If user click the thumb, do nothing.
		if (ev.target === ref.current || ev.target === ref.current.node) {
			const
				clickPoint = vertical ? ev.nativeEvent.offsetY : ev.nativeEvent.offsetX,
				thumbPosition = vertical ? ev.target.children[0].offsetTop : ev.target.children[0].offsetLeft,
				scrollParam = {isVerticalScrollBar: vertical, isPreviousScrollButton: (clickPoint < thumbPosition)};

			consumeEventWithScroll(scrollParam, ev);
		}
	}, [consumeEventWithScroll, vertical, ref]);

	return (
		<div {...rest} className={className} onClick={onClick} ref={ref}>
			<ScrollbarDiv className={css.Thumb} onKeyDown={onKeyDown}>
				<div className={css.TriangleUp} />
				<div className={css.TriangleDown} />
			</ScrollbarDiv>
		</div>);
});

ScrollThumb.displayName = 'ScrollThumb';

ScrollThumb.propTypes = /** @lends sandstone/Scrollable.ScrollThumb.prototype */ {
	/**
	 * Called when [ScrollThumb]{@link sandstone/Scrollable.ScrollThumb} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertThumb: PropTypes.func,
	scroll: PropTypes.func
};

ScrollThumb.defaultProps = {
	cbAlertThumb: nop
};

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
