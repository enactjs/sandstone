import handle, {preventDefault, stop, stopImmediate} from '@enact/core/handle';
import onWindowReady from '@enact/core/snapshot';

let capturing = false;

const handleGlobalKeyDownCapture = handle(
	() => capturing,
	// prevent keyUp, keyPress
	preventDefault,
	// stop propagation
	stop,
	stopImmediate
);

onWindowReady(() => {
	// have to attach a handler immediately in order to get in before core/dispatcher and then use a
	// module-scoped flag to check further processing. Handling both down (for the key event and
	// click emulation) and up (for cancelable).
	document.addEventListener('keydown', handleGlobalKeyDownCapture, {capture: true});
	document.addEventListener('keyup', handleGlobalKeyDownCapture, {capture: true});
});

function startCapture () {
	capturing = true;
}

function stopCapture () {
	capturing = false;
}

export {
	startCapture,
	stopCapture
};
