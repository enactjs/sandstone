/* global MutationObserver ResizeObserver */

import {forProp, forward, handle, not} from '@enact/core/handle';
import {Job} from '@enact/core/util';
import {useI18nContext} from '@enact/i18n/I18nDecorator';
import {FloatingLayerBase} from '@enact/ui/FloatingLayer';
import ri from '@enact/ui/resolution';

import {Tooltip, defaultArrowAnchor, defaultDirection} from './Tooltip';
import {adjustDirection, adjustAnchor, calcOverflow, getLabelOffset, getPosition} from './util';

let currentTooltip; // needed to know whether or not we should stop a showing job when unmounting

import useHandlers from '@enact/core/useHandlers';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

function getDirectionAnchor (tooltipPosition, tooltipType) {
	const position = tooltipPosition || (defaultDirection(tooltipType) + ' ' + defaultArrowAnchor(tooltipType));
	const arr = position.split(' ');

	if (arr.length === 2) {
		return {
			tooltipDirection: arr[0],
			arrowAnchor: arr[1]
		};
	} else {
		return {
			tooltipDirection: position === 'below' ? 'below' : 'above',
			arrowAnchor: 'right'
		};
	}
}

const removeTooltipProps = ({...props}) => {
	delete props.rtl;
	delete props.screenEdgeKeepout;
	delete props.tooltipDelay;
	delete props.tooltipMarquee;
	delete props.tooltipPosition;
	delete props.tooltipProps;
	delete props.tooltipRelative;
	delete props.tooltipText;
	delete props.tooltipType;
	delete props.tooltipUpdateDelay;
	delete props.tooltipWidth;

	return props;
};

// A hook to show Sandstone-styled tooltip components.
function useTooltip (props = {}) {
	const {
		screenEdgeKeepout = (24 + 24), // Do NOT forget to check TooltipDecorator's default config value also.
		tooltipDelay = 500, tooltipType = 'balloon', tooltipUpdateDelay = 400,
		tooltipMarquee, tooltipPosition, tooltipProps, tooltipRelative, tooltipText, tooltipWidth
	} = props;
	const rtl = useI18nContext()?.rtl;

	const [showing, setShowing] = useState(false);
	const [layoutInfo, setLayoutInfo] = useState({
		arrowAnchor: null,
		labelOffset: null,
		position: {top: 0, left: 0},
		tooltipDirection: null
	});
	const mutableRef = useRef({
		mutationObserver: null,
		resizeObserver: null,
		showTooltipJob: null,
		setTooltipLayoutJob: null
	});
	const clientRef = useRef(null);
	const tooltipRef = useRef(null);

	const showTooltip = useCallback((client) => {
		if (tooltipText) {
			clientRef.current = client;
			currentTooltip = client;
			mutableRef.current.showTooltipJob?.startAfter(tooltipDelay);
			mutableRef.current.mutationObserver?.observe(clientRef.current, {attributes: true, childList: true});
			mutableRef.current.resizeObserver?.observe(clientRef.current);
		}
	}, [clientRef, tooltipDelay, tooltipText]);

	const hideTooltip = useCallback(() => {
		if (tooltipText) {
			mutableRef.current.mutationObserver?.disconnect();
			mutableRef.current.resizeObserver?.disconnect();

			clientRef.current = null;
			currentTooltip = null;

			mutableRef.current.showTooltipJob?.stop();
			mutableRef.current.setTooltipLayoutJob?.stop();

			setShowing(false);
		}
	}, [clientRef, tooltipText]);

	const startTooltipLayoutJob = useCallback(() => {
		mutableRef.current.setTooltipLayoutJob?.startAfter(tooltipUpdateDelay);
	}, [tooltipUpdateDelay]);

	const handlers = useHandlers({
		// Recalculate tooltip layout on keydown to make sure tooltip is positioned correctly in case something changes as a result of the keydown.
		onKeyDown: handle(
			forward('onKeyDown'),
			not(forProp('disabled', false)),
			() => {
				startTooltipLayoutJob();
			}
		),
		onMouseOver: handle(
			forward('onMouseOver'),
			forProp('disabled', true),
			(ev) => {
				showTooltip(ev.currentTarget);
			}
		),
		onMouseOut: handle(
			forward('onMouseOut'),
			forProp('disabled', true),
			(ev) => {
				if (clientRef.current && !clientRef.current.contains(ev.relatedTarget)) {
					hideTooltip();
				}
			}
		),
		onFocus: handle(
			forward('onFocus'),
			({target}) => showTooltip(target)
		),
		onBlur: handle(
			forward('onBlur'),
			hideTooltip
		)
	}, props);

	useEffect(() => {
		const mutableRefCurrent = mutableRef.current;

		if (window.MutationObserver) {
			mutableRefCurrent.mutationObserver = new MutationObserver(startTooltipLayoutJob);
		}

		if (window.ResizeObserver) {
			mutableRefCurrent.resizeObserver = new ResizeObserver(startTooltipLayoutJob);
		}

		return () => {
			if (currentTooltip === clientRef.current) {
				currentTooltip = null;

				mutableRefCurrent.mutationObserver?.disconnect();
				mutableRefCurrent.resizeObserver?.disconnect();

				mutableRefCurrent.showTooltipJob.stop();
				mutableRefCurrent.setTooltipLayoutJob.stop();
			}
		};
	}, [startTooltipLayoutJob]);

	const setTooltipLayout = useCallback(() => {
		if (!tooltipText || !tooltipRef.current || !clientRef.current) {
			return;
		}

		const newLayoutInfo = getDirectionAnchor(tooltipPosition, tooltipType);

		const tooltipNode = tooltipRef.current.getBoundingClientRect(); // label bound
		const clientNode = clientRef.current.getBoundingClientRect(); // client bound
		const overflow = calcOverflow(tooltipNode, clientNode, newLayoutInfo.tooltipDirection, ri.scale(screenEdgeKeepout));

		newLayoutInfo.tooltipDirection = adjustDirection(newLayoutInfo.tooltipDirection, overflow, rtl);
		newLayoutInfo.arrowAnchor = adjustAnchor(newLayoutInfo.arrowAnchor, newLayoutInfo.tooltipDirection, overflow, rtl);
		newLayoutInfo.position = getPosition(clientNode, newLayoutInfo.tooltipDirection);
		newLayoutInfo.labelOffset = newLayoutInfo.arrowAnchor === 'center' ? getLabelOffset(tooltipNode, newLayoutInfo.tooltipDirection, newLayoutInfo.position, overflow) : null;

		if (
			(newLayoutInfo.position.top !== layoutInfo.position.top) ||
			(newLayoutInfo.position.left !== layoutInfo.position.left) ||
			(newLayoutInfo.labelOffset !== layoutInfo.labelOffset) ||
			(newLayoutInfo.arrowAnchor !== layoutInfo.arrowAnchor)
		) {
			setLayoutInfo(newLayoutInfo);
		}
	}, [tooltipText, rtl, tooltipPosition, tooltipType, screenEdgeKeepout, layoutInfo, tooltipRef, clientRef]);

	useLayoutEffect(() => {
		mutableRef.current.showTooltipJob = new Job(() => {
			if (!showing) {
				setShowing(true);
			}
		});
	}, [showing]);

	useLayoutEffect(() => {
		mutableRef.current.setTooltipLayoutJob = new Job(() => {
			setTooltipLayout();
		});
	}, [setTooltipLayout]);

	const getTooltipRef = useCallback((node) => {
		tooltipRef.current = node;
		if (node) {
			setTooltipLayout();
		}
	}, [setTooltipLayout]);

	const renderTooltip = useCallback(() => {
		const {top, left} = layoutInfo.position;
		const tooltipStyle = {
			// Moving the position to CSS variables where there are additional offset calculations
			'--tooltip-position-top': tooltipRelative ? null : ri.unit(top, 'rem'),
			'--tooltip-position-left': tooltipRelative ? null : ri.unit(left, 'rem')
		};

		/**
		 * Conditionally creates the FloatingLayer and Tooltip based on the presence of
		 * `tooltipText` and returns a property bag to pass onto the Wrapped component
		 *
		 * @returns {Object} Prop object
		 * @private
		 */
		const renderedTooltip = (
			<Tooltip
				aria-hidden
				labelOffset={layoutInfo.labelOffset}
				{...tooltipProps}
				arrowAnchor={layoutInfo.arrowAnchor}
				direction={layoutInfo.tooltipDirection}
				marquee={tooltipMarquee}
				relative={tooltipRelative}
				style={tooltipStyle}
				tooltipRef={getTooltipRef}
				type={tooltipType}
				width={tooltipWidth}
			>
				{tooltipText}
			</Tooltip>
		);

		if (!tooltipRelative) {
			return (
				<FloatingLayerBase open={showing} noAutoDismiss onDismiss={hideTooltip} scrimType="none" key="tooltipFloatingLayer">
					{renderedTooltip}
				</FloatingLayerBase>
			);
		} else if (showing) {
			return renderedTooltip;
		} else {
			return null;
		}
	}, [getTooltipRef, hideTooltip, layoutInfo.arrowAnchor, layoutInfo.labelOffset, layoutInfo.position, layoutInfo.tooltipDirection, showing, tooltipMarquee, tooltipProps, tooltipRelative, tooltipText, tooltipType, tooltipWidth]);

	return {
		tooltipChildren: tooltipText ? renderTooltip() : null,
		handlers,
		restProps: removeTooltipProps(props)
	};
}

export default useTooltip;
export {
	useTooltip
};
