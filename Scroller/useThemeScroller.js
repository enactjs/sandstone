import {adaptEvent, forward, handle} from '@enact/core/handle';
import {add, is} from '@enact/core/keymap';
import Spotlight from '@enact/spotlight';
import {getRect} from '@enact/spotlight/src/utils';
import ri from '@enact/ui/resolution';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import classNames from 'classnames';
import React, {useCallback, useEffect, useRef} from 'react';

import {useEventKey} from './useEvent';

import css from './Scroller.module.less';
import thumbCss from '../useScroll/ScrollThumb.module.less';

import {assign, Machine, interpret} from 'xstate';
import {useMachine} from '@xstate/react';
//import {useMachine} from 'use-machine';
import { createMachine } from '@xstate/fsm';

add('esc', 27);

const
	fadeoutSize = 48,
	isEsc = is('esc'),
	isEnter = is('enter'),
	isBody = (elem) => (elem.classList.contains(css.focusableBody));

const getFocusableBodyProps = ({className, scrollContainerRef, style}) => {
	const spotlightId = scrollContainerRef.current && scrollContainerRef.current.dataset.spotlightId;

	const setNavigableFilter = ({filterTarget}) => {
		if (spotlightId && filterTarget) {
			const targetClassName = (filterTarget === 'body') ? css.focusableBody : thumbCss.thumb;
			Spotlight.set(spotlightId, {
				navigableFilter: (elem) => (typeof elem === 'string' || !elem.classList.contains(targetClassName))
			});
			return true;
		}
	};

	const getNavigableFilterTarget = (ev) => {
		const {keyCode, target, type} = ev;
		let filterTarget = null;

		if (type === 'focus') {
			filterTarget = isBody(target) ? 'thumb' : 'body';
		} else if (type === 'blur') {
			filterTarget = 'thumb';
		} else if (type === 'keydown') {
			filterTarget =
				isEnter(keyCode) && isBody(target) && 'body' ||
				isEsc(keyCode) && !isBody(target) && 'thumb' ||
				null;
		}

		return {
			filterTarget
		};
	};

	const consumeEventWithFocus = (ev) => {
		const {target} = ev;
		let nextTarget;

		if (isBody(target)) {
			// Enter key on scroll Body.
			// Scroll thumb get focus.
			const spottableDescendants = Spotlight.getSpottableDescendants(spotlightId);
			if (spottableDescendants.length > 0) {
				// Last spottable descendant(thumb) get focus.
				nextTarget = spottableDescendants.pop();

				// If there are both thumbs, vertical thumb is the next target
				const verticalThumb = spottableDescendants.pop();
				nextTarget = (verticalThumb && verticalThumb.classList.contains(thumbCss.thumb)) ? verticalThumb : nextTarget;
			}
		} else {
			// Esc key on scroll thumb.
			// Scroll body get focus.
			nextTarget = target.closest(`.${css.focusableBody}`);
		}

		if (nextTarget) {
			Spotlight.focus(nextTarget);
			ev.preventDefault();
			ev.nativeEvent.stopImmediatePropagation();
		}
	};

	return {
		className: classNames(className, css.focusableBody),
		onFocus: handle(
			forward('onFocus'),
			adaptEvent(getNavigableFilterTarget, setNavigableFilter),
		),
		onBlur: handle(
			// Focus out to external element.
			forward('onBlur'),
			adaptEvent(getNavigableFilterTarget, setNavigableFilter),
		),
		onKeyDown: handle(
			forward('onKeyDown'),
			adaptEvent(getNavigableFilterTarget, setNavigableFilter),
			consumeEventWithFocus
		),
		style
	};
};

/*
const increment = context => context.count + 1;
const decrement = context => context.count - 1;
const counterMachine = Machine({
	initial: 'active',
	context: {
	  count: 0
	},
	states: {
	  active: {
		on: {
		  INC: { actions: assign({ count: increment }) },
		  DEC: { actions: assign({ count: decrement }) }
		}
	  }
	}
  });

  const counterService = interpret(counterMachine)
	.onTransition(state => console.log(state.context.count))
	.start();
  // => 0

  counterService.send('INC');
  // => 1

  counterService.send('INC');
  // => 2

  counterService.send('DEC');

const toggleMachine = Machine({
	id: 'toggle',
	initial: 'inactive',
	states: {
	  inactive: {
		on: { TOGGLE: 'active' }
	  },
	  active: {
		on: { TOGGLE: 'inactive' }
	  }
	}
  });
*/

const focusableBodyMachine = Machine({
	id: 'Scroller',
	initial: 'focusableBody',
	context: {
		focusableScrollbar: 'byEnter',
		filters: [],
	},
	states: {
		construct: {
			entry: [
				{target: 'focusableBody', cond: 'isBodyFocusable'},
				{target: 'noFocusableBody'}
			],
		},
		noFocusableBody: {
			type: 'final'
		},
		focusableBody: {
			id: 'focusableBody',
			initial: 'keyMode',
			states: {
				keyMode: {
					id: 'keyMode',
					initial: 'notFocused',
					entry: [
						assign({
							filters: 'thumb'
						}),
						'setNavigableFilter',
					],
					exit: [
						assign({
							filters: 'body'
						}),
						'setNavigableFilter',
					],
					states: {
						notFocused: {
							entry: [
								() => {console.log('focused entry');},
							],
							on: {
								FOCUS: {
									target: 'focused', cond: 'isBodyFocused'
								}
							},
						},
						focused: {
							id: 'containerFocused',
							initial: 'bodyFocused',
							entry: [
								() => {console.log('focused entry');},
							],
							states: {
								bodyFocused: {
									entry: [
										() => {console.log('bodyFocused entry');},
										// assign({
										// 	filters: 'thumb'
										// }),
										// 'setNavigableFilter',
										// 'initBodyFocused',
									],
									on: {
										KEY_DOWN: {
											target: 'thumbFocused', cond: 'isEnterPressed'
										},
										BLUR: {
											target: '#keyMode.notFocused',
											cond: 'isNotThumbFocused'
										}
									},
								},
								thumbFocused: {
									entry: [
										() => {console.log('thumbFocused entry');},
										assign({
											filters: 'body'
										}),
										'setNavigableFilter',
										'initThumbFocused',
									],
									on: {
										KEY_DOWN: {
											target: 'bodyFocused', cond: 'isESCPressed'
										}
									}
								},
							}
						}, // focused
					}, // states
					on: {
						MOUSE_MOVE: {
							target: '#pointerMode'
						}
					}
				}, // keyMode
				pointerMode: {
					id: 'pointerMode',
					initial: 'idle',
					states: {
						idle: {
							on: {
								KEY_DOWN: {
									target: '#keyMode',
									cond: 'isDirectionKey',
								}
							}
						}
					},
				}, // pointerMode
			},
		}, // focusableBody
	},
}, {
	actions: {
		setNavigableFilter: ctx => (true),
		initBodyFocused: ctx => (true),
		initThumbFocused: ctx => (true),
	},
	guards: {
		isBodyFocusable: ctx => (ctx.focusableScrollbar === 'byEnter'),
		isBodyFocused: (ctx, ev) => (true),
		isThumbFocused: (ctx, ev) => (console.log(ev) && true),
		isNotThumbFocused: (ctx, ev) => (console.log(ev) && true),
		isEnterPressed: (ctx, ev) => (console.log(ev) && true),
		isESCPressed: (ctx, ev) => (console.log(ev) && true),
		isDirectionKey: (ctx, ev) => (console.log(ev) && true),
		isEnterPressed4: (ctx, ev) => (console.log(ev) && true),
		isPointerMoved: (ctx, ev) => (console.log(ev) && true),
	},
});

// const scrollerMachine = Machine(focusableBodyMachine);

// const scrollerService = interpret(scrollerMachine)
// 		.onTransition(state => console.log(JSON.stringify(state.value)))
// 		.start();

const useFocusableBodyProps = ({className, scrollContainerRef, style}) => {
	const spotlightId = scrollContainerRef.current && scrollContainerRef.current.dataset.spotlightId;

	// const mutableRef = useRef();
	// mutableRef.current = mutableRef.current || interpret(scrollerMachine)
	// // 	.onTransition(state => console.log(JSON.stringify(state.value)))
	// 	.start();

	const [state, send] = useMachine(focusableBodyMachine);

	//scrollerService.send('FOCUS');

	console.log('current', JSON.stringify(state.value));

	return {
		className: classNames(className, css.focusableBody),
		onFocus: handle(
			forward('onFocus'),
			(ev) => console.log('onFocus') && send('FOCUS', {type: ev.type, target: ev.target}),
			// adaptEvent(getNavigableFilterTarget, setNavigableFilter),
		),
		onBlur: handle(
			// Focus out to external element.
			forward('onBlur'),
			(ev) => console.log('onBlur') && send('BLUR', {type: ev.type, target: ev.target}),
			// adaptEvent(getNavigableFilterTarget, setNavigableFilter),
		),
		onKeyDown: handle(
			forward('onKeyDown'),
			(ev) => {
				debugger
				return console.log('onKeyDown') && send('KEY_DOWN', {type: ev.type, keyCode: ev.keyCode})
			},
			// adaptEvent(getNavigableFilterTarget, setNavigableFilter),
			// consumeEventWithFocus
		),
		// onKeyDown: (ev) => {
		// 	debugger
		// 	console.log('onKeyDown')
		// 	machine.send('TOGGLE', {type: ev.type, keyCode: ev.keyCode})
		// 	// adaptEvent(getNavigableFilterTarget, setNavigableFilter),
		// 	// consumeEventWithFocus
		// },
		style
	};
}

const useSpottable = (props, instances) => {
	const {scrollContainerRef, scrollContentHandle, scrollContentRef} = instances;

	// Hooks

	const {addGlobalKeyDownEventListener, removeGlobalKeyDownEventListener} = useEventKey();

	const setContainerDisabled = useCallback((bool) => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.dataset.spotlightContainerDisabled = bool;

			if (bool) {
				addGlobalKeyDownEventListener(() => {
					setContainerDisabled(false);
				});
			} else {
				removeGlobalKeyDownEventListener();
			}
		}
	}, [addGlobalKeyDownEventListener, removeGlobalKeyDownEventListener, scrollContainerRef]);

	useEffect(() => {
		return () => setContainerDisabled(false);
	}, [setContainerDisabled]);

	useEffect(() => {
		const {onUpdate} = props;

		if (onUpdate) {
			onUpdate();
		}
	});

	// Functions

	function getContentSize ({clientWidth, clientHeight}) {
		return {
			clientWidth: Math.max(clientWidth - 2 * ri.scale(fadeoutSize), 0),
			clientHeight: Math.max(clientHeight - 2 * ri.scale(fadeoutSize), 0)
		};
	}

	/**
	 * Returns the first spotlight container between `node` and the scroller
	 *
	 * @param {Node} node A DOM node
	 *
	 * @returns {Node|Null} Spotlight container for `node`
	 * @private
	 */
	function getSpotlightContainerForNode (node) {
		do {
			if (node.dataset.spotlightId && node.dataset.spotlightContainer && !node.dataset.expandableContainer) {
				return node;
			}
		} while ((node = node.parentNode) && node !== scrollContentRef.current);
	}

	/**
	 * Calculates the "focus bounds" of a node. If the node is within a spotlight container, that
	 * container is scrolled into view rather than just the element.
	 *
	 * @param {Node} node Focused node
	 *
	 * @returns {Object} Bounds as returned by `getBoundingClientRect`
	 * @private
	 */
	function getFocusedItemBounds (node) {
		node = getSpotlightContainerForNode(node) || node;
		return node.getBoundingClientRect();
	}

	/**
	 * Calculates the new `scrollTop`.
	 *
	 * @param {Node} focusedItem node
	 * @param {Number} itemTop of the focusedItem / focusedContainer
	 * @param {Number} itemHeight of focusedItem / focusedContainer
	 * @param {Object} scrollInfo position info. Uses `scrollInfo.previousScrollHeight`
	 * and `scrollInfo.scrollTop`
	 * @param {Number} scrollPosition last target position, passed scroll animation is ongoing
	 *
	 * @returns {Number} Calculated `scrollTop`
	 * @private
	 */
	function calculateScrollTop (item) {
		const threshold = ri.scale(48);
		const roundToStart = (sb, st) => {
			// round to start
			if (st < threshold) return 0;

			return st;
		};
		const roundToEnd = (sb, st, sh) => {
			// round to end
			if (sh - (st + sb.height) < threshold) return sh - sb.height;

			return st;
		};
		// adding threshold into these determinations ensures that items that are within that are
		// near the bounds of the scroller cause the edge to be scrolled into view even when the
		// item itself is in view (e.g. due to margins)
		const isItemBeforeView = (ib, sb, d) => ib.top + d - threshold < sb.top;
		const isItemAfterView = (ib, sb, d) => ib.top + d + ib.height + threshold > sb.top + sb.height;
		const canItemFit = (ib, sb) => ib.height <= sb.height;
		const calcItemAtStart = (ib, sb, st, d) => ib.top + st + d - sb.top;
		const calcItemAtEnd = (ib, sb, st, d) => ib.top + ib.height + st + d - (sb.top + sb.height);
		const calcItemInView = (ib, sb, st, sh, d) => {
			if (isItemBeforeView(ib, sb, d)) {
				return roundToStart(sb, calcItemAtStart(ib, sb, st, d));
			} else if (isItemAfterView(ib, sb, d)) {
				return roundToEnd(sb, calcItemAtEnd(ib, sb, st, d), sh);
			}
			return st;
		};

		const container = getSpotlightContainerForNode(item);
		const scrollerBounds = scrollContentRef.current.getBoundingClientRect();
		let {scrollHeight, scrollTop} = scrollContentRef.current;

		const scrollerContentBounds = {
			top: scrollerBounds.top + ri.scale(fadeoutSize),
			height: Math.max(scrollerBounds.height - 2 * ri.scale(fadeoutSize), 0)
		};

		let scrollTopDelta = 0;

		const adjustScrollTop = (v) => {
			scrollTopDelta = scrollTop - v;
			scrollTop = v;
		};

		if (container) {
			const containerBounds = container.getBoundingClientRect();

			// if the entire container fits in the scroller, scroll it into view
			if (canItemFit(containerBounds, scrollerContentBounds)) {
				return calcItemInView(containerBounds, scrollerContentBounds, scrollTop, scrollHeight, scrollTopDelta);
			}

			// if the container doesn't fit, adjust the scroll top ...
			if (containerBounds.top > scrollerContentBounds.top) {
				// ... to the top of the container if the top is below the top of the scroller
				adjustScrollTop(calcItemAtStart(containerBounds, scrollerContentBounds, scrollTop, scrollTopDelta));
			}
			// removing support for "snap to bottom" for 2.2.8
			// } else if (containerBounds.top + containerBounds.height < scrollerContentBounds.top + scrollerContentBounds.height) {
			// 	// ... to the bottom of the container if the bottom is above the bottom of the
			// 	// scroller
			// 	adjustScrollTop(calcItemAtEnd(containerBounds, scrollerContentBounds, scrollTop, scrollTopDelta));
			// }

			// N.B. if the container covers the scrollable area (its top is above the top of the
			// scroller and its bottom is below the bottom of the scroller), we need not adjust the
			// scroller to ensure the container is wholly in view.
		}

		const itemBounds = item.getBoundingClientRect();

		return calcItemInView(itemBounds, scrollerContentBounds, scrollTop, scrollHeight, scrollTopDelta);
	}

	/**
	 * Calculates the new `scrollLeft`.
	 *
	 * @param {Node} focusedItem node
	 * @param {Number} scrollPosition last target position, passed when scroll animation is ongoing
	 *
	 * @returns {Number} Calculated `scrollLeft`
	 * @private
	 */
	function calculateScrollLeft (item, scrollPosition) {
		const scrollContentNode = scrollContentRef.current;
		const {
			left: itemLeft,
			width: itemWidth
		} = getFocusedItemBounds(item);

		const
			{rtl} = props,
			{clientWidth} = scrollContentHandle.current.scrollBounds,
			rtlDirection = rtl ? -1 : 1,
			{left: containerLeft} = scrollContentNode.getBoundingClientRect(),
			scrollLastPosition = scrollPosition ? scrollPosition : scrollContentHandle.current.scrollPos.left,
			currentScrollLeft = rtl ? (scrollContentHandle.current.scrollBounds.maxLeft - scrollLastPosition) : scrollLastPosition,
			// calculation based on client position
			newItemLeft = scrollContentNode.scrollLeft + (itemLeft - containerLeft - ri.scale(fadeoutSize));
		let nextScrollLeft = scrollContentHandle.current.scrollPos.left;

		if (newItemLeft + itemWidth > (clientWidth + currentScrollLeft) && itemWidth < clientWidth) {
			// If focus is moved to an element outside of view area (to the right), scroller will move
			// to the right just enough to show the current `focusedItem`. This does not apply to
			// `focusedItem` that has a width that is bigger than `scrollBounds.clientWidth`.
			nextScrollLeft += rtlDirection * ((newItemLeft + itemWidth) - (clientWidth + currentScrollLeft));
		} else if (newItemLeft < currentScrollLeft) {
			// If focus is outside of the view area to the left, move scroller to the left accordingly.
			nextScrollLeft += rtlDirection * (newItemLeft - currentScrollLeft);
		}

		return nextScrollLeft;
	}

	/**
	 * Calculates the new top and left position for scroller based on focusedItem.
	 *
	 * @param {Node} item node
	 * @param {Object} scrollInfo position info. `calculateScrollTop` uses
	 * `scrollInfo.previousScrollHeight` and `scrollInfo.scrollTop`
	 * @param {Number} scrollPosition last target position, passed scroll animation is ongoing
	 *
	 * @returns {Object} with keys {top, left} containing calculated top and left positions for scroll.
	 * @private
	 */
	function calculatePositionOnFocus ({item, scrollPosition}) {
		const containerNode = scrollContentRef.current;
		const horizontal = scrollContentHandle.current.isHorizontal();
		const vertical = scrollContentHandle.current.isVertical();

		if (!vertical && !horizontal || !item || !utilDOM.containsDangerously(containerNode, item)) {
			return;
		}

		const containerRect = getRect(containerNode);
		const itemRect = getRect(item);

		if (horizontal && !(itemRect.left >= containerRect.left && itemRect.right <= containerRect.right)) {
			scrollContentHandle.current.scrollPos.left = calculateScrollLeft(item, scrollPosition);
		}

		if (vertical && !(itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom)) {
			scrollContentHandle.current.scrollPos.top = calculateScrollTop(item);
		}

		return scrollContentHandle.current.scrollPos;
	}

	function focusOnNode (node) {
		if (node) {
			Spotlight.focus(node);
		}
	}

	// Return

	return {
		calculatePositionOnFocus,
		focusOnNode,
		getContentSize,
		setContainerDisabled
	};
};

const useThemeScroller = ({className, focusableScrollbar, style}, props) => {
	const {scrollContainerRef, ...rest} = props;
	const {scrollContentHandle, scrollContentRef} = rest;

	delete rest.children;
	delete rest.onUpdate;
	delete rest.scrollContainerContainsDangerously;
	delete rest.scrollContainerHandle;
	delete rest.scrollContainerRef;
	delete rest.scrollContentHandle;
	delete rest.setThemeScrollContentHandle;
	delete rest.spotlightId;

	// Hooks

	const {calculatePositionOnFocus, focusOnNode, getContentSize, setContainerDisabled} = useSpottable(props, {scrollContainerRef, scrollContentHandle, scrollContentRef});
	// const focusableBodyProps = (focusableScrollbar === 'byEnter') ? getFocusableBodyProps({className, scrollContainerRef, style}) : {};
	const focusableBodyProps = useFocusableBodyProps({className, scrollContainerRef, style});

	useEffect(() => {
		props.setThemeScrollContentHandle({
			calculatePositionOnFocus,
			focusOnNode,
			setContainerDisabled
		});
	}, [calculatePositionOnFocus, focusOnNode, props, props.setThemeScrollContentHandle, setContainerDisabled]);

	// Render

	rest.children = (
		<div className={css.contentWrapper}>
			{props.children}
		</div>
	);
	rest.getContentSize = getContentSize;

	return {focusableBodyProps, themeScrollContentProps: rest};
};

export default useThemeScroller;
export {
	useThemeScroller
};
