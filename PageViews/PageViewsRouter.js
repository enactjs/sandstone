import {useRef, useState, useCallback, Children} from 'react';
import EnactPropTypes from '@enact/core/internal/prop-types';
import useChainRefs from '@enact/core/useChainRefs';
import PropTypes from 'prop-types';

import {useAutoFocus} from '../internal/Panels';

import useFocusOnTransition from '../WizardPanels/useFocusOnTransition';
import useToggleRole from '../WizardPanels/useToggleRole';
import {WizardPanelsContext} from '../WizardPanels/WizardPanels';

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
 * WizardPanelsRouter passes the children, footer, subtitle, and title from
 * {@link sandstone/WizardPanels.Panel|WizardPanel} to
 * {@link sandstone/WizardPanels.WizardPanelsBase|WizardPanelsBase}.
 *
 * @class WizardPanelsRouter
 * @memberof sandstone/WizardPanels
 * @private
 */
function WizardPanelsRouter (Wrapped) {
	const WizardPanelsProvider = ({
		children,
		componentRef,
		'data-spotlight-id': spotlightId,
		index,
		onTransition,
		onWillTransition,
		subtitle,
		title,
		rtl,
		...rest
	}) => {
		const [panel, setPanel] = useState(null);
		const {ref: a11yRef, onWillTransition: a11yOnWillTransition} = useToggleRole();
		const autoFocus = useAutoFocus({autoFocus: 'default-element', hideChildren: panel == null});
		const ref = useChainRefs(autoFocus, a11yRef, componentRef);
		const {reverseTransition, prevIndex} = useReverseTransition(index, rtl);
		const {
			onWillTransition: focusOnWillTransition,
			...transition
		} = useFocusOnTransition({onTransition, onWillTransition, spotlightId});

		const handleWillTransition = useCallback((ev) => {
			focusOnWillTransition(ev);
			a11yOnWillTransition(ev);
		}, [a11yOnWillTransition, focusOnWillTransition]);

		const totalPanels = panel ? Children.count(children) : 0;
		const currentTitle = panel && panel.title ? panel.title : title;
		const currentSubTitle = panel && panel.subtitle ? panel.subtitle : subtitle;
		// eslint-disable-next-line enact/prop-types
		delete rest.onBack;

		return (
			<WizardPanelsContext.Provider value={setPanel}>
				{Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...panel}
					{...transition}
					componentRef={ref}
					data-spotlight-id={spotlightId}
					index={index}
					onWillTransition={handleWillTransition}
					title={currentTitle}
					subtitle={currentSubTitle}
					totalPanels={totalPanels}
					reverseTransition={reverseTransition}
				>
					{panel && panel.children ? (
						<div className="enact-fit" key={`panel${prevIndex}`}>
							{panel.children}
						</div>
					) : null}
				</Wrapped>
			</WizardPanelsContext.Provider>
		);
	};

	WizardPanelsProvider.propTypes =  /** @lends sandstone/WizardPanels.WizardPanelsRouter.prototype */  {
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
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

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
		rtl: PropTypes.bool,

		/**
		* The "default" subtitle for WizardPanels if subtitle isn't explicitly set in
		* {@link sandstone/WizardPanels.Panel|Panel}.
		* @example
		* 	<WizardPanels subtitle="Subtitle">
		*		<WizardPanels.Panel>
		*			lorem ipsum ...
		*		</WizardPanels.Panel>
		*	</WizardPanels>
		*
		* @type {String}
		* @private
		*/
		subtitle: PropTypes.string,

		/**
		* The "default" title for WizardPanels if title isn't explicitly set in
		* {@link sandstone/WizardPanels.Panel|Panel}.
		* @example
		* 	<WizardPanels title="Title">
		*		<WizardPanels.Panel>
		*			lorem ipsum ...
		*		</WizardPanels.Panel>
		*	</WizardPanels>
		*
		* @type {String}
		* @private
		*/
		title: PropTypes.string
	};

	WizardPanelsProvider.defaultProps = {
		index: 0,
		subtitle: '',
		title: ''
	};

	return WizardPanelsProvider;
}

export default WizardPanelsRouter;
export {
	WizardPanelsRouter
};
