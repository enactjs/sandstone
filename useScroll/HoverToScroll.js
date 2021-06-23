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
		scrollContainerHandle: {current = null} = {},
		scrollWatcher: {addWatcherOnScroll = nop, removeWatcherOnScroll = nop} = {}
	} = props;

	// Mutable value

	const mutableRef = useRef({
		hoveredPosition: null,
		hoverToScrollRafId: null,
		scrollContainer: null
	});

	const [enableAfter, setEnableAfter] = useState();
	const [enableBefore, setEnableBefore] = useState();

	mutableRef.current.scrollContainer = current;

	// Functions

	const handleGlobalKeyDown = useCallback(({keyCode}) => {
		const scrollContainer = mutableRef.current.scrollContainer;
		let position = mutableRef.current.hoveredPosition;

		if (scrollContainer.rtl && direction === 'horizontal') {
			position = position === 'after' ? 'before' : 'after';
		}

		if (getDirection(keyCode) || is('enter', keyCode)) {
			Spotlight.focusNextFromPoint(
				directionToFocus[direction][position],
				getLastPointerPosition()
			);
			scrollContainer.stop();
		}
	}, [direction]);

	const startRaf = useCallback((job) => {
		if (typeof window === 'object') {
			mutableRef.current.hoverToScrollRafId = window.requestAnimationFrame(job);
			if (typeof document === 'object') {
				document.addEventListener('keydown', handleGlobalKeyDown, {capture: true});
			}
		}
	}, [handleGlobalKeyDown]);

	const stopRaf = useCallback(() => {
		if (typeof window === 'object' && mutableRef.current.hoverToScrollRafId !== null) {
			window.cancelAnimationFrame(mutableRef.current.hoverToScrollRafId);
			mutableRef.current.hoverToScrollRafId = null;
			if (typeof document === 'object') {
				document.removeEventListener('keydown', handleGlobalKeyDown, {capture: true});
			}
		}
	}, [handleGlobalKeyDown]);

	const getPointerEnterHandler = useCallback((position) => {
		if (typeof window === 'object') {
			const scrollContainer = mutableRef.current.scrollContainer;
			const {axis, clientSize, maxPosition, scrollPosition} = getBoundsPropertyNames(direction);
			const bounds = scrollContainer.getScrollBounds();

			return function ({pointerType}) {
				if (pointerType === 'mouse') {
					const distance =
						(position === 'before' ? -1 : 1) * // scroll direction
						bounds[clientSize] * // scroll page size
						hoverToScrollMultiplier; // a scrolling speed factor

					mutableRef.current.hoveredPosition = position;

					const scrollByHover = () => {
						if (getLastInputType() === 'mouse') {
							scrollContainer.scrollTo({
								position: {
									[axis]: clamp(
										0,
										bounds[maxPosition],
										scrollContainer[scrollPosition] + distance
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
	}, [direction, startRaf, stopRaf]);

	const activate = useCallback(() => {
		const {canScrollFunc, maxPosition, scrollPosition} = getBoundsPropertyNames(direction);
		const {[canScrollFunc]: canScroll, getScrollBounds, [scrollPosition]: currentPosition} = mutableRef.current.scrollContainer;
		const bounds = getScrollBounds();
		const position = mutableRef.current.hoveredPosition;
		let curEnableAfter, curEnableBefore;

		if (canScroll(bounds)) {
			curEnableAfter = currentPosition < bounds[maxPosition] - epsilon;
			curEnableBefore = currentPosition > 0;
		} else {
			curEnableAfter = false;
			curEnableBefore = false;
		}

		if (enableAfter !== curEnableAfter && position === 'after' || enableBefore !== curEnableBefore && position === 'before') {
			stopRaf();
		}

		setEnableAfter(curEnableAfter);
		setEnableBefore(curEnableBefore);
	}, [direction, enableAfter, enableBefore, stopRaf]);

	// Hooks

	useLayoutEffect(() => {
		addWatcherOnScroll(activate);
		return () => {
			removeWatcherOnScroll(activate);
		};
	}, [activate, addWatcherOnScroll, removeWatcherOnScroll]);

	useLayoutEffect(() => {
		const scrollContainer = mutableRef.current.scrollContainer;
		if (scrollContainer) {
			const {[getBoundsPropertyNames(direction).canScrollFunc]: canScroll, getScrollBounds} = scrollContainer;
			if (canScroll && getScrollBounds) {
				activate();
			} else {
				setEnableAfter(null);
				setEnableBefore(null);
			}
		}
	}, [activate, direction, mutableRef.current.scrollContainer]);

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
			{enableBefore ? renderHoverArea('before') : null}
			{enableAfter ? renderHoverArea('after') : null}
		</>
	);
};

HoverToScrollBase.displayName = 'HoverToScrollBase';

HoverToScrollBase.propTypes = /** @lends sandstone/useScroll.HoverToScroll.HoverToScrollBase.prototype */ {
	direction: PropTypes.string,
	scrollContainerHandle: PropTypes.object
};

/**
 * A hover area to scroll.
 *
 * @class HoverToScroll
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const HoverToScroll = (props) => {
	return (
		<>
			<HoverToScrollBase {...props} direction="horizontal" />
			<HoverToScrollBase {...props} direction="vertical" />
		</>
	);
};

HoverToScroll.displayName = 'HoverToScroll';

HoverToScroll.propTypes = /** @lends sandstone/useScroll.HoverToScroll.prototype */ {
	scrollContainerHandle: PropTypes.object
};

export default HoverToScroll;
export {HoverToScroll};
