import handle, {forward, returnsTrue} from '@enact/core/handle';
import useHandlers from '@enact/core/useHandlers';

import useSuppressKeyEvents from '../useSuppressKeyEvents';

const callContext = (method) => (ev, props, context) => context[method](ev, props);
const transitionHandlers = {
	onTransition: handle(
		returnsTrue(callContext('stop')),
		forward('onTransition')
	),
	onWillTransition: handle(
		returnsTrue(callContext('start')),
		forward('onWillTransition')
	)
};

// We don't typically accept the entire props object in a hook but this one exists solely to adapt
// the transition events to the useSuppressKeyEvents hook so it seemed warranted.
function useSuppressKeysDuringTransition (props) {
	const suppress = useSuppressKeyEvents();
	const handlers = useHandlers(transitionHandlers, props, suppress);

	return handlers;
}

export default useSuppressKeysDuringTransition;
export {
	useSuppressKeysDuringTransition
};
