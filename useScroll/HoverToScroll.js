import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getLastPointerPosition} from '@enact/spotlight/src/pointer';
import {constants} from '@enact/ui/useScroll';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback, useLayoutEffect, useRef, useState} from 'react';

import {getLastInputType} from '../ThemeDecorator';

import css from './HoverToScroll.module.less';

const {epsilon} = constants;
const nop = () => {};
const getBoundsPropertyNames = (direction) => {
	return direction === 'vertical' ? {
		axis: 'y',
		canScrollFunc: 'canScrollVertically',
		clientSize: 'clientHeight',
		maxPosition: 'maxTop',
		scrollPosition: 'scrollTop'
	} : {
		axis: 'x',
		canScrollFunc: 'canScrollHorizontally',
		clientSize: 'clientWidth',
		maxPosition: 'maxLeft',
		scrollPosition: 'scrollLeft'
	};
};
const hoverToScrollMultiplier = 0.04;
const directionToFocus = {
	horizontal: {
		before: 'right',
		after: 'left'
	},
	vertical: {
		before: 'down',
		after: 'up'
	}
};

/**
 * A hover area to scroll for a single direction.
 *
 * @class HoverToScrollBase
 * @memberof sandstone/useScroll.HoverToScroll
 * @ui
 * @private
 */
const HoverToScrollBase = (props) => {
	const {
		direction,
		scrollContainerHandleRef,
		scrollObserver: {addObserverOnScroll, removeObserverOnScroll}
	} = props;

	// Mutable value

	const mutableRef = useRef({
		hoveredPosition: null,
		hoverToScrollRafId: null
	});

	const [after, setAfter] = useState();
	const [before, setBefore] = useState();

	// Functions

	const handleGlobalKeyDown = useCallback(({keyCode}) => {
		let position = mutableRef.current.hoveredPosition;

		if (scrollContainerHandleRef.rtl && direction === 'horizontal') {
			position = position === 'after' ? 'before' : 'after';
		}

		if (getDirection(keyCode) || is('enter', keyCode)) {
			Spotlight.focusNextFromPoint(
				directionToFocus[direction][position],
				getLastPointerPosition()
			);
			scrollContainerHandleRef.stop();
		}
	}, [direction, scrollContainerHandleRef]);

	const startRaf = useCallback((job) => {
		scrollContainerHandleRef.isHoveringToScroll = true;
		if (typeof window === 'object') {
			mutableRef.current.hoverToScrollRafId = window.requestAnimationFrame(job);
			if (typeof document === 'object') {
				document.addEventListener('keydown', handleGlobalKeyDown, {capture: true});
			}
		}
	}, [handleGlobalKeyDown, scrollContainerHandleRef]);

	const stopRaf = useCallback(() => {
		scrollContainerHandleRef.isHoveringToScroll = false;
		if (typeof window === 'object' && mutableRef.current.hoverToScrollRafId !== null) {
			window.cancelAnimationFrame(mutableRef.current.hoverToScrollRafId);
			mutableRef.current.hoverToScrollRafId = null;
			if (typeof document === 'object') {
				document.removeEventListener('keydown', handleGlobalKeyDown, {capture: true});
			}
		}
	}, [handleGlobalKeyDown, scrollContainerHandleRef]);

	const getPointerEnterHandler = useCallback((position) => {
		if (typeof window === 'object') {
			const {axis, clientSize, maxPosition, scrollPosition} = getBoundsPropertyNames(direction);
			const bounds = scrollContainerHandleRef.getScrollBounds();

			return function ({pointerType}) {
				if (pointerType === 'mouse') {
					const distance =
						(position === 'before' ? -1 : 1) * // scroll direction
						bounds[clientSize] * // scroll page size
						hoverToScrollMultiplier; // a scrolling speed factor

					mutableRef.current.hoveredPosition = position;

					const scrollByHover = () => {
						if (getLastInputType() === 'mouse') {
							scrollContainerHandleRef.scrollTo({
								position: {
									[axis]: clamp(
										0,
										bounds[maxPosition],
										scrollContainerHandleRef[scrollPosition] + distance
									)
								},
								animate: false
							});
							startRaf(scrollByHover);
						} else {
							stopRaf(); // for other type input during hovering
						}
					};
					startRaf(scrollByHover);
				}
			};
		} else {
			return nop;
		}
	}, [direction, scrollContainerHandleRef, startRaf, stopRaf]);

	const update = useCallback(() => {
		const {canScrollFunc, maxPosition, scrollPosition} = getBoundsPropertyNames(direction);
		const {[canScrollFunc]: canScroll, getScrollBounds, [scrollPosition]: currentPosition} = scrollContainerHandleRef;
		const bounds = getScrollBounds();
		const position = mutableRef.current.hoveredPosition;
		let curAfter = false, curBefore = false;

		if (canScroll(bounds)) {
			curAfter = currentPosition < bounds[maxPosition] - epsilon;
			curBefore = currentPosition > 0;
		}

		if (after !== curAfter && position === 'after' || before !== curBefore && position === 'before') {
			stopRaf();
		}

		setAfter(curAfter);
		setBefore(curBefore);
	}, [direction, after, before, scrollContainerHandleRef, stopRaf]);

	// Hooks

	useLayoutEffect(() => {
		addObserverOnScroll(update);
		return () => {
			removeObserverOnScroll(update);
		};
	}, [update, addObserverOnScroll, removeObserverOnScroll]);

	useLayoutEffect(() => {
		if (scrollContainerHandleRef) {
			const {[getBoundsPropertyNames(direction).canScrollFunc]: canScroll, getScrollBounds} = scrollContainerHandleRef;
			if (canScroll && getScrollBounds) {
				update();
			} else {
				setAfter(null);
				setBefore(null);
			}
		}
	}, [update, direction, scrollContainerHandleRef]);

	useLayoutEffect(() => {
		return () => {
			stopRaf(); // for hoverToScroll prop change during hovering
		};
	}, [stopRaf]);

	// Render

	const renderHoverArea = useCallback((position) => {
		return (
			<div
				key={'hover' + direction + position}
				className={classNames(css.hoverToScroll, css[direction], css[position])}
				onPointerEnter={getPointerEnterHandler(position)}
				onPointerLeave={stopRaf}
			/>
		);
	}, [direction, getPointerEnterHandler, stopRaf]);

	return (
		<>
			{before ? renderHoverArea('before') : null}
			{after ? renderHoverArea('after') : null}
		</>
	);
};

HoverToScrollBase.displayName = 'HoverToScrollBase';

HoverToScrollBase.propTypes = /** @lends sandstone/useScroll.HoverToScroll.HoverToScrollBase.prototype */ {
	direction: PropTypes.string,
	scrollContainerHandleRef: PropTypes.object
};

/**
 * A hover area to scroll.
 *
 * @class HoverToScroll
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const HoverToScroll = ({scrollContainerHandleRef, ...rest}) => {
	return scrollContainerHandleRef ? (
		<>
			<HoverToScrollBase scrollContainerHandleRef={scrollContainerHandleRef} {...rest} direction="horizontal" />
			<HoverToScrollBase scrollContainerHandleRef={scrollContainerHandleRef} {...rest} direction="vertical" />
		</>
	) : null;
};

HoverToScroll.displayName = 'HoverToScroll';

HoverToScroll.propTypes = /** @lends sandstone/useScroll.HoverToScroll.prototype */ {
	scrollContainerHandleRef: PropTypes.object
};

export default HoverToScroll;
export {HoverToScroll};
