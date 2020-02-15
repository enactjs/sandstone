import utilEvent from '@enact/ui/Scrollable/utilEvent';
import {useRef} from 'react';

const useEventKey = () => {
	// Mutable value

	const scrollMutableRef = useRef({
		fn: null
	});

	// Functions

	function addGlobalKeyDownEventListener (fn) {
		scrollMutableRef.current.fn = fn;
		utilEvent('keydown').addEventListener(document, scrollMutableRef.current.fn, {capture: true});
	}

	function removeGlobalKeyDownEventListener () {
		utilEvent('keydown').removeEventListener(document, scrollMutableRef.current.fn, {capture: true});
		scrollMutableRef.current.fn = null;
	}

	// Return

	return {
		addGlobalKeyDownEventListener,
		removeGlobalKeyDownEventListener
	};
};

export default useEventKey;
export {
	useEventKey
};
