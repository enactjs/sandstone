import handle, {forward} from '@enact/core/handle';
import useHandlers from '@enact/core/useHandlers';
import Spotlight from '@enact/spotlight';
import React from 'react';

const transition = (complete) => (ev, props, {setTransition}) => {
	setTransition(complete);
	return true;
};

const transitionHandlers = {
	onTransition: handle(
		forward('onTransition'),
		transition(true)
	),
	onWillTransition: handle(
		forward('onWillTransition'),
		transition(false),
		(ev, props, {current}) => {
			clearTimeout(current.timerId);
			const currentSpotlight = Spotlight.getCurrent();
			if (!Spotlight.getPointerMode() && currentSpotlight) {
				currentSpotlight.blur();
			}
		}
	)
};

function useFocusOnTransition (config) {
	const {current} = React.useRef({timerId: null, index: config.index});
	const [complete, setTransition] = React.useState(false);
	const handlers = useHandlers(transitionHandlers, config, {setTransition, current});
	const focusIndex = current.index !== config.index && config.noAnimation ? config.index : -1;

	React.useEffect(() => {
		if (complete) {
			// FIXME: onTransition fires while the departing view still exists so focusing the Panel
			// will generally result in focusing a component in the departing view because it is
			// first in DOM order.
			//
			// Deferring a tick allows that view to be removed but this is not an ideal solution.
			current.timerId = setTimeout(() => {
				const currentSpotlight = Spotlight.getCurrent();
				if (config.spotlightId && !currentSpotlight) {
					Spotlight.focus(config.spotlightId);
				}
			}, 16);
		}

		return () => clearTimeout(current.timerId);
	}, [complete, config.spotlightId, focusIndex, current]);

	return handlers;
}

export default useFocusOnTransition;
export {
	useFocusOnTransition
};
