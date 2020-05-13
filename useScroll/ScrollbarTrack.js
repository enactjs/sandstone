import classNames from 'classnames';
import {is} from '@enact/core/keymap';
import Accelerator from '@enact/spotlight/Accelerator';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import React, {forwardRef, useCallback, useEffect} from 'react';

import css from './ScrollbarTrack.module.less';

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
 * A Sandstone-styled scrollbar track with sandstone behavior
 *
 * @class ScrollbarTrack
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const ScrollbarTrack = forwardRef((props, ref) => {
	const
		{cbAlertScrollbarTrack, focusableScrollbar, onInteractionForScroll, rtl, vertical, ...rest} = props,
		className = classNames(css.scrollbarTrack, {[css.vertical]: vertical, [css.focusableScrollbar]: focusableScrollbar}),
		ScrollbarThumb = focusableScrollbar ? Spottable('div') : 'div';

	useEffect (() => {
		console.log('ScrollbarTrack: useEffect1: componentDidMount & componentDidUpdate : cbAlertScrollbarTrack()');
		cbAlertScrollbarTrack();
	});

	useEffect (() => {
		console.log('ScrollbarTrack: useEffect2: componentDidMount : SpotlightAccelerator.reset');
		SpotlightAccelerator.reset();
		return () => {
			console.log('ScrollbarTrack: useEffect2: componentWillUnMount : SpotlightAccelerator.reset');
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

	return (
		<div {...rest} className={className} ref={ref}>
			<ScrollbarThumb className={css.thumb} onKeyDown={onKeyDown}>
				<div className={classNames(css.directionIndicator, css.backward)} />
				<div className={classNames(css.directionIndicator, css.forward)} />
			</ScrollbarThumb>
		</div>
	);
});

ScrollbarTrack.displayName = 'ScrollbarTrack';

ScrollbarTrack.propTypes = /** @lends sandstone/useScroll.ScrollbarTrack.prototype */ {
	/**
	 * Called when [ScrollbarTrack]{@link sandstone/useScroll.ScrollbarTrack} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertScrollbarTrack: PropTypes.func,

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

ScrollbarTrack.defaultProps = {
	cbAlertScrollbarTrack: nop,
	focusableScrollbar: false,
	onInteractionForScroll: nop,
	rtl: false,
	vertical: true
};

export default ScrollbarTrack;
export {
	ScrollbarTrack,
	ScrollbarTrack as ScrollbarTrackBase
};
