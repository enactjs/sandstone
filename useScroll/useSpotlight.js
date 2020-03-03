import {add, is} from '@enact/core/keymap';
import Spotlight from '@enact/spotlight';
import {useContext, useEffect} from 'react';

import {SharedState} from '../internal/SharedStateDecorator/SharedStateDecorator';

import thumbCss from './ScrollThumb.module.less';
import css from './useScroll.module.less';

add('esc', 27);

const
	isEsc = is('esc'),
	isEnter = is('enter');

const setFocusableBodyProps = ({scrollContainerRef}, assignProperties) => {
	const spotlightId = scrollContainerRef.current && scrollContainerRef.current.dataset.spotlightId;

	const setNavigableFilter = (filterTarget) => {
		if (spotlightId) {
			const targetClassName = (filterTarget === 'body') ? css.focusableBody : thumbCss.thumb;
			Spotlight.set(spotlightId, {
				navigableFilter: (elem) => (typeof elem === 'string' || !elem.classList.contains(targetClassName))
			});
		}
	};

	const consumeEventWithFocus = (ev, nextTarget) => {
		ev.preventDefault();
		ev.nativeEvent.stopImmediatePropagation();
		Spotlight.focus(nextTarget);
	};

	assignProperties('focusableBodyProps', {
		className: [css.focusableBody],

		onFocus: (ev) => {
			const {currentTarget, target} = ev;
			if (currentTarget === target) {
				setNavigableFilter('thumb', target);
			} else if (target.classList.contains(thumbCss.thumb)) {
				setNavigableFilter('body');
			}
		},

		onBlur: () => {
			// Focus out to external element.
			setNavigableFilter('thumb');
		},

		onKeyDown: (ev) => {
			const {keyCode, currentTarget, target} = ev;
			if (isEnter(keyCode) && currentTarget === target) {
				// Enter key on scroll Body.
				// Scroll thumb get focus.
				setNavigableFilter('body');
				const spottableDescendants = Spotlight.getSpottableDescendants(spotlightId);
				if (spottableDescendants.length > 0) {
					// Last spottable descendant(thumb) get focus.
					consumeEventWithFocus(ev, spottableDescendants.pop());
				}
			} else if (isEsc(keyCode) && currentTarget !== target) {
				// Esc key on scroll thumb.
				// Scroll body get focus.
				setNavigableFilter('thumb');
				consumeEventWithFocus(ev, currentTarget);
			}
		}
	});
};

const useSpotlightRestore = (props, instances) => {
	const {scrollContainerHandle} = instances;
	const context = useContext(SharedState);

	// Hooks

	useEffect(() => {
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
};

export {
	setFocusableBodyProps,
	useSpotlightRestore
};
