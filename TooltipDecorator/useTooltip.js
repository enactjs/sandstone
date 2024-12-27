/* global MutationObserver ResizeObserver */

import {forward} from '@enact/core/handle';
import {Job} from '@enact/core/util';
import {useI18nContext} from '@enact/i18n/I18nDecorator';
import {FloatingLayerBase} from '@enact/ui/FloatingLayer';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {Tooltip, defaultArrowAnchor, defaultDirection} from './Tooltip';
import {adjustDirection, adjustAnchor, calcOverflow, getLabelOffset, getPosition} from './util';

let currentTooltip; // needed to know whether or not we should stop a showing job when unmounting

const getTooltipDirection = (tooltipPosition, tooltipType) => {
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
};

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

/*
 * The boundary around the screen which the tooltip should never cross, typically involving
 * flipping to an alternate orientation or adjusting its offset to remain on screen.
 * The default of 48 is derived from a standard 24px screen-keepout size plus the standard
 * Spotlight-outset (24px) margin/padding value which keeps elements and text aligned inside a
 * Panel. Note: This value will be scaled according to the resolution.
 */
const defaultScreenEdgeKeepout = (24 + 24);

// A hook to show Sandstone-styled tooltip components.
const useTooltip = (props) => {
	const {
		screenEdgeKeepout = defaultScreenEdgeKeepout,
		tooltipDelay = 500,
		tooltipType = 'balloon',
		tooltipUpdateDelay = 400,
		tooltipMarquee,
		tooltipPosition,
		tooltipProps,
		tooltipRelative,
		tooltipText,
		tooltipWidth
	} = props;

	const rtlI18nContext = useI18nContext()?.rtl;
	const rtl = (typeof props.rtl === 'boolean') ? props.rtl : rtlI18nContext;

	const [showing, setShowing] = useState(false);
	const [layout, setLayout] = useState({
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

	// Recalculate tooltip layout on keydown to make sure tooltip is positioned correctly in case something changes as a result of the keydown.
	const onKeyDown = useCallback((ev) => {
		forward('onKeyDown', ev, props);
		if (!props.disabled) {
			startTooltipLayoutJob();
		}
	}, [props, startTooltipLayoutJob]);

	const onMouseOver = useCallback((ev) => {
		forward('onMouseOver', ev, props);
		if (props.disabled) {
			showTooltip(ev.currentTarget);
		}
	}, [props, showTooltip]);

	const onMouseOut = useCallback((ev) => {
		forward('onMouseOut', ev, props);
		if (props.disabled) {
			if (clientRef.current && !clientRef.current.contains(ev.relatedTarget)) {
				hideTooltip();
			}
		}
	}, [hideTooltip, props]);

	const onFocus = useCallback((ev) => {
		forward('onFocus', ev, props);
		showTooltip(ev.target);
	}, [props, showTooltip]);

	const onBlur = useCallback((ev) => {
		forward('onBlur', ev, props);
		hideTooltip();
	}, [hideTooltip, props]);

	const handlers = {
		onKeyDown,
		onMouseOver,
		onMouseOut,
		onFocus,
		onBlur
	};

	useEffect(() => {
		const mutableRefCurrent = mutableRef.current;

		if (typeof window !== 'undefined' && window.MutationObserver) {
			mutableRefCurrent.mutationObserver = new MutationObserver(startTooltipLayoutJob);
		}

		if (typeof window !== 'undefined' && window.ResizeObserver) {
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
		if (!tooltipRef.current || !clientRef.current) {
			return;
		}

		const newLayout = getTooltipDirection(tooltipPosition, tooltipType);

		const tooltipNode = tooltipRef.current.getBoundingClientRect(); // label bound
		const clientNode = clientRef.current.getBoundingClientRect(); // client bound
		const overflow = calcOverflow(tooltipNode, clientNode, newLayout.tooltipDirection, ri.scale(screenEdgeKeepout));

		newLayout.tooltipDirection = adjustDirection(newLayout.tooltipDirection, overflow, rtl);
		newLayout.arrowAnchor = adjustAnchor(newLayout.arrowAnchor, newLayout.tooltipDirection, overflow, rtl);
		newLayout.position = getPosition(clientNode, newLayout.tooltipDirection);
		newLayout.labelOffset = newLayout.arrowAnchor === 'center' ? getLabelOffset(tooltipNode, newLayout.tooltipDirection, newLayout.position, overflow) : null;

		if (
			(newLayout.position.top !== layout.position.top) ||
			(newLayout.position.left !== layout.position.left) ||
			(newLayout.labelOffset !== layout.labelOffset) ||
			(newLayout.arrowAnchor !== layout.arrowAnchor)
		) {
			setLayout(newLayout);
		}
	}, [rtl, tooltipPosition, tooltipType, screenEdgeKeepout, layout, tooltipRef, clientRef]);

	useLayoutEffect(() => {
		mutableRef.current.showTooltipJob = new Job(() => {
			setShowing(true);
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

	/*
	 * Conditionally creates the FloatingLayer and Tooltip based on the presence of `tooltipText`
	 */
	const renderTooltip = useCallback(() => {
		const {top, left} = layout.position;
		const tooltipStyle = {
			// Moving the position to CSS variables where there are additional offset calculations
			'--tooltip-position-top': tooltipRelative ? null : ri.unit(top, 'rem'),
			'--tooltip-position-left': tooltipRelative ? null : ri.unit(left, 'rem')
		};

		const renderedTooltip = (
			<Tooltip
				aria-hidden
				labelOffset={layout.labelOffset}
				{...tooltipProps}
				arrowAnchor={layout.arrowAnchor}
				direction={layout.tooltipDirection}
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
	}, [getTooltipRef, hideTooltip, layout, showing, tooltipMarquee, tooltipProps, tooltipRelative, tooltipText, tooltipType, tooltipWidth]);

	return {
		tooltip: tooltipText ? renderTooltip() : null,
		handlers,
		restProps: removeTooltipProps(props)
	};
};

export default useTooltip;
export {
	defaultScreenEdgeKeepout,
	useTooltip
};
