import {useRef, useState, useCallback, Children} from 'react';
import EnactPropTypes from '@enact/core/internal/prop-types';
import useChainRefs from '@enact/core/useChainRefs';
import PropTypes from 'prop-types';

import {useAutoFocus} from '../internal/Panels';

import useFocusOnTransition from './useFocusOnTransition';
import useToggleRole from './useToggleRole';
import {QuickGuidePanelsContext} from './QuickGuidePanels';

// single-index ViewManagers need some help knowing when the transition direction needs to change
// because the index is always 0 from its perspective.
function useReverseTransition (index = -1, rtl) {
	const prevIndex = useRef(index);
	const reverse = useRef(rtl);
	// If the index was changed, the panel transition is occured on the next cycle by `Panel`
	const prev = {reverseTransition: reverse.current, prevIndex: prevIndex.current};

	if (prevIndex.current !== index) {
		reverse.current = rtl ? (index > prevIndex.current) : (index < prevIndex.current);
		prevIndex.current = index;
	}

	return prev;
}

/**
 * QuickGuidePanelsRouter passes the children from
 * {@link sandstone/QuickGuidePanels.QuickGuidePanel|QuickGuidePanel} to
 * {@link sandstone/QuickGuidePanels.QuickGuidePanelsBase|QuickGuidePanelsBase}.
 *
 * @class QuickGuidePanelsRouter
 * @memberof sandstone/QuickGuidePanels
 * @private
 */
function QuickGuidePanelsRouter (Wrapped) {
	const QuickGuidePanelsProvider = ({
		children,
		componentRef,
		'data-spotlight-id': spotlightId,
		index,
		onTransition,
		onWillTransition,
		rtl,
		...rest
	}) => {
		const [panel, setPanel] = useState(null);
		const {ref: a11yRef, onWillTransition: a11yOnWillTransition} = useToggleRole();
		const autoFocus = useAutoFocus({autoFocus: 'default-element', hideChildren: panel == null});
		const ref = useChainRefs(autoFocus, a11yRef, componentRef);
		const {prevIndex} = useReverseTransition(index, rtl);
		const {
			onWillTransition: focusOnWillTransition,
			...transition
		} = useFocusOnTransition({onTransition, onWillTransition, spotlightId});

		const handleWillTransition = useCallback((ev) => {
			focusOnWillTransition(ev);
			a11yOnWillTransition(ev);
		}, [a11yOnWillTransition, focusOnWillTransition]);

		const totalPanels = panel ? Children.count(children) : 0;
		// eslint-disable-next-line enact/prop-types
		delete rest.onBack;

		return (
			<QuickGuidePanelsContext.Provider value={setPanel}>
				{Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...panel}
					{...transition}
					componentRef={ref}
					data-spotlight-id={spotlightId}
					index={index}
					onWillTransition={handleWillTransition}
					totalPanels={totalPanels}
				>
					{panel && panel.children ? (
						<div className="enact-fit" key={`panel${prevIndex}`}>
							{panel.children}
						</div>
					) : null}
				</Wrapped>
			</QuickGuidePanelsContext.Provider>
		);
	};

	QuickGuidePanelsProvider.propTypes =  /** @lends sandstone/QuickGuidePanels.QuickGuidePanelsRouter.prototype */  {
		/**
		 * Obtains a reference to the root node.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		componentRef: EnactPropTypes.ref,

		/**
		* The spotlight id for the panel
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
		* Called when a transition completes
		*
		* @type {Function}
		* @private
		*/
		onTransition: PropTypes.func,

		/**
		* Called when a transition begins
		*
		* @type {Function}
		* @private
		*/
		onWillTransition: PropTypes.func,

		/**
		 * Used to determine the transition direction
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool
	};

	QuickGuidePanelsProvider.defaultProps = {
		index: 0
	};

	return QuickGuidePanelsProvider;
}

export default QuickGuidePanelsRouter;
export {
	QuickGuidePanelsRouter
};
