import handle, {forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import useClass from '@enact/core/useClass';
import useHandlers from '@enact/core/useHandlers';
import {Job} from '@enact/core/util';
import Spotlight from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import PropTypes from 'prop-types';
import React from 'react';

import {FadeAndSlideArranger, PopupDecorator, Viewport} from '../internal/Panels';

import css from './FlexiblePopupPanels.module.less';

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the left
 * or right side of the screen inside a popup. This panel flexes both horizontally and vertically,
 * with the Header positioned outside the Panel background area. This is typically used for a single
 * setting or control at a time, for maximum background area viewing.
 *
 * @class FlexiblePopupPanels
 * @memberof sandstone/FlexiblePopupPanels
 * @ui
 * @public
 */
const FlexiblePopupPanelsBase = kind({
	name: 'FlexiblePopupPanels',

	propTypes: /** @lends sandstone/FlexiblePopupPanels.FlexiblePopupPanels.prototype */ {
		/**
		 * Specifies when and how to show `nextButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `nextButton` if more than one `FlexiblePopupPanels.Panel` exists
		 * * `'always'` will always display the `nextButton`
		 * * `'never'` will always hide the `nextButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this
		 * case, a customized `nextButton` on `FlexiblePopupPanels.Panel` will take precedence over the
		 * `nextButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		* Called when the index value is changed.
		*
		* @type {Function}
		* @param {Object} event
		* @public
		*/
		onChange: PropTypes.func,

		/**
		 * Called when the next button is clicked in `FlexiblePopupPanels.Panel`.
		 *
		 * Calling `preventDefault` on the passed event will prevent advancing to the next panel.
		 *
		 * @type {Function}
		 * @public
		 */
		onNextClick: PropTypes.func,

		/**
		 * Called when the previous button is clicked in `FlexiblePopupPanels.Panel`.
		 *
		 * Calling `preventDefault` on the passed event will prevent navigation to the previous panel.
		 *
		 * @type {Function}
		 * @public
		 */
		onPrevClick: PropTypes.func,

		/**
		 * Specifies when and how to show `prevButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `prevButton` if more than one `FlexiblePopupPanels.Panel` exists
		 * * `'always'` will always display the `prevButton`
		 * * `'never'` will always hide the `prevButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this case,
		 * if user provides a customized `prevButton` on `FlexiblePopupPanels.Panel` will take precedence over the `prevButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never'])
	},

	defaultProps: {
		nextButtonVisibility: 'auto',
		prevButtonVisibility: 'auto'
	},

	styles: {
		css,
		className: 'viewport'
	},

	computed: {
		children: ({children, nextButtonVisibility, onChange, onNextClick, onPrevClick, prevButtonVisibility}) => React.Children.map(children, (child) => {
			if (child) {
				const props = {
					nextButtonVisibility,
					onChange,
					onNextClick,
					onPrevClick,
					prevButtonVisibility
				};

				return React.cloneElement(child, props);
			} else {
				return null;
			}
		}),
		onBack: ({onChange}) => onChange
	},

	render: (props) => {
		delete props.nextButtonVisibility;
		delete props.onChange;
		delete props.onNextClick;
		delete props.onPrevClick;
		delete props.prevButtonVisibility;

		return (<Viewport {...props} />);
	}
});


const prevButtonSelector = `.${css.navCellBefore} .${css.navButton}`;
const nextButtonSelector = `.${css.navCellAfter} .${css.navButton}`;

class RestoreButtonFocus {
	constructor () {
		this.pause = new Pause('RestoreButtonFocus');
		this.target = false;
	}

	captureTarget = () => {
		const current = Spotlight.getCurrent();
		if (current && current.classList.contains(css.navButton)) {
			const prevButtonFocused = current.matches(prevButtonSelector);

			this.pause.pause();
			this.target = prevButtonFocused ? prevButtonSelector : nextButtonSelector;
		} else {
			this.target = false;
		}
	}

	restoreFocus = (index) => {
		if (this.shouldRestoreFocus()) {
			this.pause.resume();
			const selector = `.${css.panel}[data-index="${index}"] ${this.target}`;
			const button = document.querySelector(selector);

			button.focus();
		}

		this.target = false;
	}

	shouldRestoreFocus = () => {
		return this.target !== false;
	}
}

const transitionHandlers = {
	onTransition: handle(
		forward('onTransition'),
		(ev, props, {restoreButtonFocus}) => restoreButtonFocus.shouldRestoreFocus(),
		(ev, props, {index, job}) => job.start(index)
	),
	onWillTransition: handle(
		forward('onWillTransition'),
		(ev, props, {job}) => job.stop()
	)
};

const ButtonFocusDecorator = Wrapped => function BFD ({index, ...rest}) {
	const restoreButtonFocus = useClass(RestoreButtonFocus);
	const {current: ref} = React.useRef({
		restoreButtonFocus,
		index
	});

	if (!ref.job) {
		ref.job = new Job(restoreButtonFocus.restoreFocus, 1000);
	}

	if (index !== ref.index) {
		restoreButtonFocus.captureTarget();
		ref.index = index;
	}

	const handlers = useHandlers(transitionHandlers, rest, ref);

	// be sure the job is cleaned up on unmount
	React.useEffect(() => ref.job.stop, [ref]);

	return (
		<Wrapped
			{...rest}
			{...handlers}
			index={index}
		/>
	);
};

const FlexiblePopupPanels = PopupDecorator(
	{
		className: 'flexiblePopupPanels',
		css,
		noAlertRole: true,
		panelArranger: FadeAndSlideArranger,
		panelType: 'flexiblePopup'
	},
	ButtonFocusDecorator(
		FlexiblePopupPanelsBase
	)
);

// Directly set the defaultProps for position to the left side so it initially draws on the correct
// side. The real default is assigned in PopupDecorator, but should still be overridable by an app.
FlexiblePopupPanels.defaultProps = {
	...FlexiblePopupPanels.defaultProps,
	position: 'left'
};

export default FlexiblePopupPanels;
export {
	FlexiblePopupPanels,
	FlexiblePopupPanelsBase
};
