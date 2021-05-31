import {clamp} from '@enact/core/util';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback, useRef} from 'react';

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

/**
 * A hover area to scroll
 *
 * @class HoverToScroll
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const HoverToScroll = (props) => {
	const {direction, hoverToScroll, scrollContainerHandle} = props;
	const {canScrollHorizontally, canScrollVertically, getScrollBounds, scrollTo} = scrollContainerHandle.current;
	const bounds = getScrollBounds && getScrollBounds() || null;
	const enabled = hoverToScroll && bounds && (direction === 'vertical' ?
		canScrollVertically(bounds) :
		canScrollHorizontally(bounds)
	);

	// Mutable value

	const mutableRef = useRef({
		hoverToScrollRafId: null
	});

	// Functions

	const startRaf = useCallback((job) => {
		if (typeof window === 'object') {
			mutableRef.current.hoverToScrollRafId = window.requestAnimationFrame(job);
		}
	}, []);

	const stopRaf = useCallback(() => {
		if (typeof window === 'object' && mutableRef.current.hoverToScrollRafId !== null) {
			window.cancelAnimationFrame(mutableRef.current.hoverToScrollRafId);
			mutableRef.current.hoverToScrollRafId = null;
		}
	}, []);

	const scrollJob = useCallback((position) => {
		if (enabled && typeof window === 'object') {
			const {axis, client, maxPosition, scrollPosition} = propertyNames(direction);
			const distance =
				(position === 'before' ? -1 : 1) * // scroll direction
				bounds[client] * // scroll page size
				hoverToScrollMultiplier; // a scrolling speed factor

			return function (ev) {
				if (ev.pointerType === 'mouse') {
					const scrollByHover = () => {
						if (getLastInputType() === 'mouse') {
							scrollTo({
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
	}, [bounds, direction, enabled, scrollContainerHandle, scrollTo, startRaf, stopRaf]);

	// Render

	if (enabled) {
		const renderHoverArea = (position) => {
			return (
				<div
					key={'hover' + direction + position}
					className={classNames(css.hoverToScroll, css[direction], css[position])}
					onPointerEnter={scrollJob(position)}
					onPointerLeave={stopRaf}
				/>
			);
		};

		return (
			<>
				{renderHoverArea('before')}
				{renderHoverArea('after')}
			</>
		);
	} else {
		stopRaf(); // for hover condition change during hovering
		return null;
	}
};

HoverToScroll.displayName = 'HoverToScroll';

HoverToScroll.propTypes = /** @lends sandstone/useScroll.HoverToScroll.prototype */ {
	direction: PropTypes.string,
	hoverToScroll: PropTypes.bool,
	scrollContainerHandle: PropTypes.object
};

export default HoverToScroll;
export {HoverToScroll};
