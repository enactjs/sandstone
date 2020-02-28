import {getContainersForNode} from '@enact/spotlight/src/container';
import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';
import Spotlight from '@enact/spotlight';
import Spottable from '@enact/spotlight/Spottable';
import {add, is} from '@enact/core/keymap';

import overscrollCss from '../useScroll/OverscrollEffect.module.less';
import thumbCss from '../useScroll/ScrollThumb.module.less';

import css from './SpotlightScroller.module.less';

add('esc', 27);

const
	isEsc = is('esc'),
	isEnter = is('enter');

const SpotlightScrollerDecorator = hoc({}, (config, Wrapped) => {
	function FocusableBodyHoc (props) {
		let spotlightId;
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

		const focusableBodyProps = {
			className: [css.focusableBody],
			onFocus: (ev) => {
				const {target} = ev;
				if (target.classList.contains(css.focusableBody)) {
					if (!spotlightId) {
						spotlightId = getContainersForNode(target.children[0]).pop();
					}
					setNavigableFilter('thumb', target);
				} else if (target.classList.contains(thumbCss.thumb)) {
					if (!spotlightId) {
						spotlightId = getContainersForNode(target).pop();
					}
					setNavigableFilter('body');
				}
			},

			onBlur: () => {
				setNavigableFilter('thumb'); // Focus out to external element.
			},

			onKeyDown: (ev) => {
				const {keyCode, target} = ev;
				if (isEnter(keyCode) && target.classList.contains(css.focusableBody)) {
					// Enter key on scroll Body.
					// Scroll thumb get focus.

					// To support nested scroller, find nearest scroll thumb
					// instead of depth first search (target.querySelector(`.${thumbCss.thumb}`))
					const innerContainer = target.querySelector(`.${overscrollCss.overscrollFrame}`),
						nextTarget = innerContainer.nextSibling.querySelector(`.${thumbCss.thumb}`);

					setNavigableFilter('body');
					consumeEventWithFocus(ev, nextTarget);
				} else if (isEsc(keyCode) && target.classList.contains(thumbCss.thumb)) {
					// Esc key on scroll thumb.
					// Scroll body get focus.
					setNavigableFilter('thumb');
					consumeEventWithFocus(ev, target.closest(`.${css.focusableBody}`));
				}
			}
		};

		const SpottableDiv = Spottable('div');
		return  (props.focusableScrollbar === 'byEnter') ?
			<SpottableDiv {...focusableBodyProps}> <Wrapped {...props} /> </SpottableDiv> :
			(<Wrapped {...props} />);

	}

	FocusableBodyHoc.displayName = 'SpotlightScrollerDecorator';

	FocusableBodyHoc.propTypes = /** @lends Scroller.SpotlightScrollerDecorator.prototype */ {
		/**
		 * Allows 5-way navigation to the scroll thumb.
		 * By default, 5-way will not move focus to the scroll thumb.
		 * If `true`, the scroll thumb will get focus by directional keys.
		 * If `'byEnter'`, scroll body will get focus first by directional keys,
		 * then the scroll thumb will get focus by enter key pressed on scroll body.
		 *
		 * @type {Boolean|String}
		 * @default false
		 * @public
		 */
		focusableScrollbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['byEnter'])])
	};

	FocusableBodyHoc.defaultProps = {
		focusableScrollbar: false // eslint-disable-line react/default-props-match-prop-types
	};

	return FocusableBodyHoc;
});

export default SpotlightScrollerDecorator;
export {
	SpotlightScrollerDecorator
};
