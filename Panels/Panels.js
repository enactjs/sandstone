import kind from '@enact/core/kind';
import handle, {adaptEvent, forwardWithPrevent} from '@enact/core/handle/handle';
import IdProvider from '@enact/ui/internal/IdProvider';
import {shape, SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import CancelDecorator from './CancelDecorator';
import Viewport from './Viewport';

import css from './Panels.module.less';

/**
 * Basic Panels component without breadcrumbs or default [arranger]{@link ui/ViewManager.Arranger}
 *
 * @class Panels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const PanelsBase = kind({
	name: 'Panels',

	propTypes: /** @lends sandstone/Panels.Panels.prototype */ {
		/**
		 * Function that generates unique identifiers for Panel instances.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		generateId: PropTypes.func.isRequired,

		/**
		 * Set of functions that control how the panels are transitioned into and out of the
		 * viewport.
		 *
		 * @see {@link ui/ViewManager.SlideArranger}
		 * @type {ui/ViewManager.Arranger}
		 * @default ui/ViewManager.SlideLeftArranger
		 * @public
		 */
		arranger: shape,

		/**
		 * Sets the hint string read when focusing the back button.
		 *
		 * @type {String}
		 * @default 'Go to previous'
		 * @public
		 */
		backButtonAriaLabel: PropTypes.string,

		/**
		 * The background opacity of the application back button.
		 *
		 * * Values: `'opaque'`, `'transparent'`
		 *
		 * @type {String}
		 * @default 'transparent'
		 * @public
		 */
		backButtonBackgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

		/**
		 * [`Panel`s]{@link sandstone/Panels.Panel} to be rendered
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Sets the hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * The background opacity of the application close button.
		 *
		 * * Values: `'opaque'`, `'transparent'`
		 *
		 * @type {String}
		 * @default 'transparent'
		 * @public
		 */
		closeButtonBackgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

		/**
		 * Unique identifier for the Panels instance.
		 *
		 * When defined, `Panels` will manage the presentation state of `Panel` instances in order
		 * to restore it when returning to the `Panel`. See
		 * [noSharedState]{@link sandstone/Panels.Panels.noSharedState} for more details on shared
		 * state.
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Omits the back button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noBackButton: PropTypes.bool,

		/**
		 * Omits the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Prevents maintaining shared state for framework components within this `Panels` instance.
		 *
		 * When `false`, each `Panel` will track the state of some framework components in order to
		 * restore that state when the Panel is recreated. For example, the scroll position of a
		 * `sandstone/Scroller` within a `Panel` will be saved and restored when returning to that
		 * `Panel`.
		 *
		 * This only applied when navigating "back" (to a lower index) to `Panel`. When navigating
		 * "forwards" (to a higher index), the `Panel` and its contained components will use their
		 * default state.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noSharedState: PropTypes.bool,

		/**
		 * Called with cancel/back key events.
		 *
		 * @type {Function}
		 * @public
		 */
		onBack: PropTypes.func,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func
	},

	defaultProps: {
		arranger: SlideLeftArranger,
		index: 0,
		noAnimation: false,
		noCloseButton: false,
		noSharedState: false
	},

	styles: {
		css,
		className: 'panels enact-fit'
	},

	computed: {
		viewportId: ({id}) => id && `${id}-viewport`
	},

	handlers: {
		onBack: handle(
			adaptEvent(
				(ev, {index}) => ({index: Math.max(index - 1, 0)}),
				forwardWithPrevent('onBack')
			)
		)
	},

	render: ({arranger, backButtonBackgroundOpacity, children, closeButtonAriaLabel, closeButtonBackgroundOpacity, generateId, id, index, noAnimation, noBackButton, noCloseButton, noSharedState, onClose, onBack, viewportId, ...rest}) => {
		return (
			<div {...rest} id={id}>
				<Viewport
					arranger={arranger}
					backButtonBackgroundOpacity={backButtonBackgroundOpacity}
					closeButtonAriaLabel={closeButtonAriaLabel}
					closeButtonBackgroundOpacity={closeButtonBackgroundOpacity}
					generateId={generateId}
					id={viewportId}
					index={index}
					noAnimation={noAnimation}
					noBackButton={noBackButton}
					noCloseButton={noCloseButton}
					noSharedState={noSharedState}
					onBack={onBack}
					onClose={onClose}
				>
					{children}
				</Viewport>
			</div>
		);
	}
});

const PanelsDecorator = compose(
	CancelDecorator({cancel: 'onBack'}),
	IdProvider,
	Skinnable
);

const Panels = PanelsDecorator(PanelsBase);

export default Panels;
export {
	Panels,
	PanelsBase
};
