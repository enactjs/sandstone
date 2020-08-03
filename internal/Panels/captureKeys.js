import handle, {forKey, preventDefault, stop, stopImmediate} from '@enact/core/handle';
import onWindowReady from '@enact/core/snapshot';

// Utility to return true if any of the handlers returns true
const any = (...handlers) => (...args) => handlers.find(fn => fn(...args)) != null;

let capturing = false;

// If capturing, prevent default behaviors and stop all event propagation
const handleGlobalKeyDownCapture = handle(
	() => capturing,
	any(
		forKey('cancel'),
		forKey('left'),
		forKey('right'),
		forKey('up'),
		forKey('down'),
		forKey('enter')
	),
	preventDefault,
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
