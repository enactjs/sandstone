import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getLastPointerPosition} from '@enact/spotlight/src/pointer';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback, useLayoutEffect, useRef, useState} from 'react';

import {getLastInputType} from '../ThemeDecorator';

import css from './HoverToScroll.module.less';

const nop = () => {};
const getBoundsPropertyNames = (direction) => {
	return direction === 'vertical' ? {
		axis: 'y',
		canScroll: 'canScrollVertically',
		clientSize: 'clientHeight',
		maxPosition: 'maxTop',
		scrollPosition: 'scrollTop'
	} : {
		axis: 'x',
		canScroll: 'canScrollHorizontally',
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
	const {direction, scrollContainerHandle: {current: scrollContainer = null} = {}} = props;

	// Mutable value

	const mutableRef = useRef({
		hoverToScrollRafId: null,
		hoveredPosition: null
	});


	// Hooks

	const [enable, setEnable] = useState();

	useLayoutEffect(() => {
		if (scrollContainer) {
			const {[getBoundsPropertyNames(direction).canScroll]: canScroll, getScrollBounds} = scrollContainer;
			setEnable(canScroll && getScrollBounds ? canScroll(getScrollBounds()) : null);
		}
	}, [direction, enable, scrollContainer]);

	// Functions

	const handleGlobalKeyDown = useCallback(({keyCode}) => {
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
	}, [direction, scrollContainer]);

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
			const {axis, clientSize, maxPosition, scrollPosition} = getBoundsPropertyNames(direction);
			const bounds = scrollContainer.getScrollBounds();
			const distance =
				(position === 'before' ? -1 : 1) * // scroll direction
				bounds[clientSize] * // scroll page size
				hoverToScrollMultiplier; // a scrolling speed factor

			return function ({pointerType}) {
				if (pointerType === 'mouse') {
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
	}, [direction, scrollContainer, startRaf, stopRaf]);

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

	return (enable ? (
		<>
			{renderHoverArea('before')}
			{renderHoverArea('after')}
		</>
	) : null);
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
