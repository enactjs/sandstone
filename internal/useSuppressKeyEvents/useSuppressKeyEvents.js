import handle, {preventDefault, stopImmediate} from '@enact/core/handle';

const clear = handle(
	handle.log('prevented'),
	// prevent keyUp, keyPress
	preventDefault,
	// stop propagation
	stopImmediate
);

function start () {
	document.addEventListener('keydown', clear, {capture: true});
}

function stop () {
	document.removeEventListener('keydown', clear, {capture: true});
}

function useSuppressKeyEvents () {
	return {
		start,
		stop
	};
}

export default useSuppressKeyEvents;
export {
	useSuppressKeyEvents,
	stop
};
