import handle, {forward} from '@enact/core/handle';
import useHandlers from '@enact/core/useHandlers';
import Spotlight from '@enact/spotlight';
import {useRef} from 'react';

const transitionHandlers = {
	onTransition: handle(
		forward('onTransition'),
		(ev, {spotlightId}, {current}) => {
			current.timerId = setTimeout(() => {
				const currentSpotlight = Spotlight.getCurrent();
				if (spotlightId && !currentSpotlight) {
					Spotlight.focus(spotlightId);
				}
			}, 16);
		}
	),
	onWillTransition: handle(
		forward('onWillTransition'),
		(ev, props, {current}) => {
			clearTimeout(current.timerId);
			current.timerId = null;
			const currentSpotlight = Spotlight.getCurrent();
			if (!Spotlight.getPointerMode() && currentSpotlight) {
				currentSpotlight.blur();
			}
		}
	)
};

function useFocusOnTransition (config) {
	const {current} = useRef({timerId: null});
	const handlers = useHandlers(transitionHandlers, config, {current});

	return handlers;
}

export default useFocusOnTransition;
export {
	useFocusOnTransition
};
