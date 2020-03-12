import {adaptEvent, forward, handle} from '@enact/core/handle';
import {add, is} from '@enact/core/keymap';
import Spotlight from '@enact/spotlight';
import {useContext, useEffect} from 'react';

import {SharedState} from '../internal/SharedStateDecorator/SharedStateDecorator';

import thumbCss from './ScrollThumb.module.less';
import css from './useScroll.module.less';

add('esc', 27);

const
	isEsc = is('esc'),
	isEnter = is('enter'),
	isBody = (elem) => (elem.classList.contains(css.focusableBody));

const setFocusableBodyProps = ({className, style}, {scrollContainerRef}, assignProperties) => {
	console.log("ss/useScroll/setFocusableBodyProps start===================");
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

	assignProperties('focusableBodyProps', {
		className: [className, css.focusableBody],
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
	});
	console.log("ss/useScroll/setFocusableBodyProps end===================");
};

const useSpotlightRestore = (props, instances) => {
	console.log("ss/useScroll/useSpotlightRestore start===================");
	const {scrollContainerHandle} = instances;
	const context = useContext(SharedState);

	// Hooks

	useEffect(() => {
		console.log("ss/useScroll/useSpotlightRestore useEffect1 restoreScrollPosition");
		// Only intended to be used within componentDidMount, this method will fetch the last stored
		// scroll position from SharedState and scroll (without animation) to that position
		function restoreScrollPosition () {
			const {id} = props;
			if (id && context && context.get) {
				const scrollPosition = context.get(`${id}.scrollPosition`);

				if (scrollPosition) {
					scrollContainerHandle.current.scrollTo({
						position: scrollPosition,
						animate: false
					});
				}
			}
		}

		restoreScrollPosition();
	}, [context, props, scrollContainerHandle]);
	console.log("ss/useScroll/useSpotlightRestore end===================");
};

export {
	setFocusableBodyProps,
	useSpotlightRestore
};
