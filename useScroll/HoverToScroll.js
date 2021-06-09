import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getLastPointerPosition} from '@enact/spotlight/src/pointer';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback, useLayoutEffect, useRef} from 'react';

import {getLastInputType} from '../ThemeDecorator';

import css from './HoverToScroll.module.less';

const nop = () => {};
const propertyNames = (direction) => {
	return direction === 'vertical' ? {
		axis: 'y',
		client: 'clientHeight',
		maxPosition: 'maxTop',
		scrollPosition: 'scrollTop'
	} : {
		axis: 'x',
		client: 'clientWidth',
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
	const {direction, scrollContainerHandle} = props;
	const bounds = scrollContainerHandle.current.getScrollBounds();

	// Mutable value

	const mutableRef = useRef({
		hoverToScrollRafId: null,
		hoveredPosition: null
	});

	// Functions

	const handleGlobalKeyDown = useCallback((ev) => {
		const keyCode = ev.keyCode;
		let position = mutableRef.current.hoveredPosition;

		if (scrollContainerHandle.current.rtl && direction === 'horizontal') {
			position = position === 'after' ? 'before' : 'after';
		}

		if (getDirection(keyCode) || is('enter', keyCode)) {
			Spotlight.focusNextFromPoint(
				directionToFocus[direction][position],
				getLastPointerPosition()
			);
			scrollContainerHandle.current.stop();
		}
	}, [direction, scrollContainerHandle]);

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
			const {axis, client, maxPosition, scrollPosition} = propertyNames(direction);
			const distance =
				(position === 'before' ? -1 : 1) * // scroll direction
				bounds[client] * // scroll page size
				hoverToScrollMultiplier; // a scrolling speed factor

			return function (ev) {
				if (ev.pointerType === 'mouse') {
					mutableRef.current.hoveredPosition = position;
					const scrollByHover = () => {
						if (getLastInputType() === 'mouse') {
							scrollContainerHandle.current.scrollTo({
								position: {
									[axis]: clamp(
										0,
										bounds[maxPosition],
										scrollContainerHandle.current[scrollPosition] + distance
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
	}, [bounds, direction, scrollContainerHandle, startRaf, stopRaf]);

	// Hooks

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
			{renderHoverArea('before')}
			{renderHoverArea('after')}
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
	const {scrollContainerHandle} = props;
	const {canScrollHorizontally, canScrollVertically, getScrollBounds} = scrollContainerHandle.current;
	const bounds = getScrollBounds && getScrollBounds() || null;

	return (
		<>
			{bounds && canScrollHorizontally(bounds) ? <HoverToScrollBase {...props} direction="horizontal" /> : null}
			{bounds && canScrollVertically(bounds) ? <HoverToScrollBase {...props} direction="vertical" /> : null}
		</>
	);
};

HoverToScroll.displayName = 'HoverToScroll';

HoverToScroll.propTypes = /** @lends sandstone/useScroll.HoverToScroll.prototype */ {
	scrollContainerHandle: PropTypes.object
};

export default HoverToScroll;
export {HoverToScroll};
