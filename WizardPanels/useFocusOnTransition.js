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
		(ev, props, {timer}) => {
			clearTimeout(timer.id);
			const current = Spotlight.getCurrent();
			if (!Spotlight.getPointerMode() && current) {
				current.blur();
			}
		}
	)
};

function useFocusOnTransition (config) {
	const {current: timer} = React.useRef({id: null});
	const [complete, setTransition] = React.useState(false);
	const handlers = useHandlers(transitionHandlers, config, {setTransition, timer});

	React.useEffect(() => {
		if (complete) {
			// FIXME: onTransition fires while the departing view still exists so focusing the Panel
			// will generally result in focusing a component in the deparating view because it is
			// first in DOM order.
			//
			// Deferring a tick allows that view to be removed but this is not an ideal solution.
			timer.id = setTimeout(() => {
				const current = Spotlight.getCurrent();
				if (config.spotlightId && !current) {
					Spotlight.focus(config.spotlightId);
				}
			}, 16);
		}

		return () => clearTimeout(timer.id);
	}, [complete, config.spotlightId, timer]);

	return handlers;
}

export default useFocusOnTransition;
export {
	useFocusOnTransition
};
