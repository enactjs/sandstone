import classNames from 'classnames';
import {is} from '@enact/core/keymap';
import Accelerator from '@enact/spotlight/Accelerator';
import Spottable from '@enact/spotlight/Spottable';
import {Announce} from '@enact/ui/AnnounceDecorator';
import PropTypes from 'prop-types';
import {forwardRef, useCallback, useEffect, useRef} from 'react';

import $L from '../internal/$L';

import css from './ScrollbarTrack.module.less';

const nop = () => {};
const
	isDown = is('down'),
	isLeft = is('left'),
	isPageUp = is('pageUp'),
	isPageDown = is('pageDown'),
	isRight = is('right'),
	isUp = is('up');

const scrollStopWaiting = 500; // Wait for finishing scroll animation.

const SpotlightAccelerator = new Accelerator();
const SpottableDiv = Spottable('div');

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
		{'aria-label': ariaLabel, cbAlertScrollbarTrack, focusableScrollbar, onInteractionForScroll, rtl, scrollbarTrackCss, vertical, ...rest} = props,
		className = classNames(css.scrollbarTrack, {[css.vertical]: vertical, [css.focusableScrollbar]: focusableScrollbar}),
		ScrollbarThumb = focusableScrollbar ? SpottableDiv : 'div',
		announceRef = useRef({});

	useEffect (() => {
		cbAlertScrollbarTrack();
		SpotlightAccelerator.reset();

		return () => {
			SpotlightAccelerator.reset();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const consumeEventWithScroll = useCallback((scrollParam, ev) => {
		ev.preventDefault();
		ev.stopPropagation(); // stop propagation of React synthetic event to other components like PopupDecorator
		ev.nativeEvent.stopImmediatePropagation(); // stop propagation of browser native event to Spotlight
		onInteractionForScroll(scrollParam);
	}, [onInteractionForScroll]);

	const onKeyDown = useCallback((ev) => {
		if (SpotlightAccelerator.processKey(ev, nop)) {
			ev.stopPropagation(); // stop propagation of React synthetic event to other components like PopupDecorator
			ev.nativeEvent.stopImmediatePropagation(); // stop propagation of browser native event to Spotlight
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
				},
				scrollProgress = Number(ref.current && ref.current.style.getPropertyValue('--scrollbar-thumb-progress-ratio')),
				scrollSize = Number(ref.current && ref.current.style.getPropertyValue('--scrollbar-thumb-size-ratio'));

			if ((vertical && (isUpDown || isPageKey)) || (!vertical && (isLeftRight))) {
				// Do nothing when (!vertical && pageKey)

				if (!ev.repeat && announceRef.current.announce) {
					announceRef.current.announce(
						(isDown(keyCode) || isPageDown(keyCode)) && $L('DOWN') ||
						(isUp(keyCode) || isPageUp(keyCode)) && $L('UP') ||
						isLeft(keyCode) && $L('LEFT') ||
						$L('RIGHT') // the case that isRight(keyCode) is true
					);
				}

				if (ev.repeat || (scrollSize !== 1) && ((scrollParam.isForward && scrollProgress !== 1) || (!scrollParam.isForward && scrollProgress !== 0))) {
					consumeEventWithScroll(scrollParam, ev);

					setTimeout(() => {
						const updatedScrollProgress = Number(ref.current && ref.current.style.getPropertyValue('--scrollbar-thumb-progress-ratio'));
						const horizontalReachLeftMost = rtl ? updatedScrollProgress === 1 : updatedScrollProgress === 0;
						const horizontalReachRightMost = rtl ? updatedScrollProgress === 0 : updatedScrollProgress === 1;

						// Current UX announce only after Scroll via Scrollthumb.
						if (announceRef.current.announce && (updatedScrollProgress === 0 || updatedScrollProgress === 1)) {
							announceRef.current.announce(
								(isDown(keyCode) || isPageDown(keyCode)) && updatedScrollProgress === 1 && $L('DOWNMOST') ||
								(isUp(keyCode) || isPageUp(keyCode)) && updatedScrollProgress === 0 && $L('UPMOST') ||
								(isLeft(keyCode) && horizontalReachLeftMost && $L('LEFTMOST')) ||
								(isRight(keyCode) && horizontalReachRightMost && $L('RIGHTMOST')) // the case that isRight(keyCode) is true
							);
						}
					}, scrollStopWaiting);
				}
			}

			if (!ev.repeat) {
				SpotlightAccelerator.reset();
			}
		}
	}, [consumeEventWithScroll, ref, rtl, vertical]);
	return (
		<div {...rest} className={classNames(className, scrollbarTrackCss && scrollbarTrackCss.scrollbarTrack)} ref={ref}>
			<ScrollbarThumb
				aria-label={ariaLabel}
				className={classNames(css.thumb, scrollbarTrackCss && scrollbarTrackCss.thumb, (typeof ENACT_PACK_NO_ANIMATION !== 'undefined' && ENACT_PACK_NO_ANIMATION) ? css.noAnimation : null)}
				data-spotlight-ignore-restore
				onKeyDown={onKeyDown}
			>
				<div className={classNames(css.directionIndicator, css.backward)} />
				<div className={classNames(css.directionIndicator, css.forward)} />
			</ScrollbarThumb>
			<Announce
				key="announce"
				ref={announceRef}
			/>
		</div>
	);
});

ScrollbarTrack.displayName = 'ScrollbarTrack';

ScrollbarTrack.propTypes = /** @lends sandstone/useScroll.ScrollbarTrack.prototype */ {
	/**
	 * Called when {@link sandstone/useScroll.ScrollbarTrack|ScrollbarTrack} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertScrollbarTrack: PropTypes.func,

	/**
	 * `true` if scroll thumb is spottable.
	 *
	 * @type {Boolean|'byEnter'}
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
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `scrollbarTrack` - The scrollbarTrack component class
	 * * `thumb` - The scrollbar thumb component class
	 *
	 * @type {Object}
	 * @public
	 */
	scrollbarTrackCss: PropTypes.object,

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
