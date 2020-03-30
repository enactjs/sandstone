import classNames from 'classnames';
import {is} from '@enact/core/keymap';
import Accelerator from '@enact/spotlight/Accelerator';
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

const SpotlightAccelerator = new Accelerator();

/**
 * A Sandstone-styled scroll thumb with sandstone behavior
 *
 * @class ScrollThumb
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
let ScrollThumb = forwardRef((props, ref) => {
	const
		{cbAlertThumb, focusableScrollbar, onInteractionForScroll, rtl, vertical, ...rest} = props,
		className = classNames(css.scrollTrack, {[css.vertical]: vertical, [css.focusableScrollbar]: focusableScrollbar}),
		ScrollThumbDiv = focusableScrollbar ? Spottable('div') : 'div';

	useEffect (() => {
		cbAlertThumb();
	});

	useEffect (() => {
		SpotlightAccelerator.reset();
		return () => {
			SpotlightAccelerator.reset();
		};
	}, []);

	const consumeEventWithScroll = useCallback((scrollParam, ev) => {
		ev.preventDefault();
		ev.nativeEvent.stopImmediatePropagation();
		onInteractionForScroll(scrollParam);
	}, [onInteractionForScroll]);

	const onKeyDown = useCallback((ev) => {
		if (SpotlightAccelerator.processKey(ev, nop)) {
			ev.nativeEvent.stopImmediatePropagation();
		} else {
			const
				{keyCode} = ev,
				isLeftRight = isLeft(keyCode) || isRight(keyCode),
				isUpDown = isUp(keyCode) || isDown(keyCode),
				isPageKey = isPageUp(keyCode) || isPageDown(keyCode),
				scrollParam = {
					inputType: isPageKey ? 'pageKey' : 'arrowKey',
					isPagination: isPageKey,
					isForward: (!rtl && isRight(keyCode)) || (rtl && isLeft(keyCode)) || isDown(keyCode) || isPageDown(keyCode),
					isVerticalScrollBar: vertical
				};

			if ((vertical && (isUpDown || isPageKey)) || (!vertical && (isLeftRight))) {
				// Do nothing when (!vertical && pageKey)
				consumeEventWithScroll(scrollParam, ev);
			}

			if (!ev.repeat) {
				SpotlightAccelerator.reset();
			}
		}
	}, [consumeEventWithScroll, rtl, vertical]);

	const onClick = useCallback((ev) => {
		// Click the track. If user click the thumb, do nothing.
		if (ref && ev.target === ref.current) {
			const
				clickPoint = vertical ? ev.nativeEvent.offsetY : ev.nativeEvent.offsetX,
				thumbPosition = vertical ? ev.target.children[0].offsetTop : ev.target.children[0].offsetLeft;

			consumeEventWithScroll(
				{
					inputType: 'track',
					isPagination: true,
					isForward: clickPoint > thumbPosition,
					isVerticalScrollBar: vertical
				},
				ev
			);
		}
	}, [consumeEventWithScroll, ref, vertical]);

	return (
		<div {...rest} className={className} onClick={onClick} ref={ref}>
			<ScrollThumbDiv className={css.thumb} onKeyDown={onKeyDown}>
				<div className={classNames(css.directionIndicator, css.backward)} />
				<div className={classNames(css.directionIndicator, css.forward)} />
			</ScrollThumbDiv>
		</div>
	);
});

ScrollThumb.displayName = 'ScrollThumb';

ScrollThumb.propTypes = /** @lends sandstone/useScroll.ScrollThumb.prototype */ {
	/**
	 * Called when [ScrollThumb]{@link sandstone/useScroll.ScrollThumb} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertThumb: PropTypes.func,

	/**
	 * `true` if scroll thumb is spottable.
	 *
	 * @type {Boolean|String}
	 * @private
	 */
	focusableScrollbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['byEnter'])]),

	/**
	 * Called when the user requests scroll.
	 *
	 * @type {Function}
	 * @private
	 */
	onInteractionForScroll: PropTypes.func,

	/**
	 * `true` if rtl, `false` if ltr.
	 *
	 * @type {Boolean}
	 * @private
	 */
	rtl: PropTypes.bool,

	/**
	 * `true` if vertical scroll, `false` if horizontal scroll.
	 *
	 * @type {Boolean}
	 * @private
	 */
	vertical: PropTypes.bool
};

ScrollThumb.defaultProps = {
	cbAlertThumb: nop,
	focusableScrollbar: false,
	onInteractionForScroll: nop,
	rtl: false,
	vertical: true
};

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
