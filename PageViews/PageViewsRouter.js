import {useRef, useCallback, Children} from 'react';
import EnactPropTypes from '@enact/core/internal/prop-types';
import useChainRefs from '@enact/core/useChainRefs';
import PropTypes from 'prop-types';

import {useAutoFocus} from '../internal/Panels';

import useFocusOnTransition from '../WizardPanels/useFocusOnTransition';
import useToggleRole from '../WizardPanels/useToggleRole';

// single-index ViewManagers need some help knowing when the transition direction needs to change
// because the index is always 0 from its perspective.
function useReverseTransition (index, rtl) {
	const prevIndex = useRef(index);
	let reverse = false;
	if (prevIndex.current !== index) {
		reverse = rtl ? (index > prevIndex.current) : (index < prevIndex.current);
	}
	prevIndex.current = index;
	return  {reverseTransition: reverse};
}

/**
 * PageViewsRouter passes children, index and transition handlers
 *
 * @class PageViewsRouter
 * @memberof sandstone/PageViews
 * @private
 */
function PageViewsRouter (Wrapped) {
	const PageViewsProvider = ({
		children,
		componentRef,
		'data-spotlight-id': spotlightId,
		index,
		onTransition,
		onWillTransition,
		rtl,
		...rest
	}) => {
		const totalIndex = Children.count(children);
		const {ref: a11yRef, onWillTransition: a11yOnWillTransition} = useToggleRole();
		const autoFocus = useAutoFocus({autoFocus: 'default-element'});
		const ref = useChainRefs(autoFocus, a11yRef, componentRef);
		const {reverseTransition} = useReverseTransition(index, rtl);
		const {
			onWillTransition: focusOnWillTransition,
			...transition
		} = useFocusOnTransition({onTransition, onWillTransition, spotlightId});

		const handleWillTransition = useCallback((ev) => {
			focusOnWillTransition(ev);
			a11yOnWillTransition(ev);
		}, [a11yOnWillTransition, focusOnWillTransition]);

		return (
			<Wrapped
				{...rest}
				{...transition}
				componentRef={ref}
				data-spotlight-id={spotlightId}
				index={index}
				totalIndex={totalIndex}
				onWillTransition={handleWillTransition}
				reverseTransition={reverseTransition}
			>
				{children}
			</Wrapped>
		);
	};

	PageViewsProvider.propTypes =  /** @lends sandstone/PageViews.PageViewsRouter.prototype */  {
		/**
		 * Obtains a reference to the root node.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		componentRef: EnactPropTypes.ref,

		/**
		* The spotlight id for the panel.
		*
		* @type {String}
		* @private
		*/
		'data-spotlight-id': PropTypes.string,

		/**
		* The currently selected step.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		index: PropTypes.number,

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		* Called when a transition completes.
		*
		* @type {Function}
		* @private
		*/
		onTransition: PropTypes.func,

		/**
		* Called when a transition begins.
		*
		* @type {Function}
		* @private
		*/
		onWillTransition: PropTypes.func,

		/**
		 * Used to determine the transition direction.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool
	};

	PageViewsProvider.defaultProps = {
		index: 0
	};

	return PageViewsProvider;
}

export default PageViewsRouter;
export {
	PageViewsRouter
};
