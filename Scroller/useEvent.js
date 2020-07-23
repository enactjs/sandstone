import utilEvent from '@enact/ui/useScroll/utilEvent';
import {useRef} from 'react';

const useEventKey = () => {
	// Mutable value

	const mutableRef = useRef({
		fn: null
	});

	// Functions

	function addGlobalKeyDownEventListener (fn) {
		mutableRef.current.fn = fn;
		utilEvent('keydown').addEventListener(document, mutableRef.current.fn);
	}

	function removeGlobalKeyDownEventListener () {
		utilEvent('keydown').removeEventListener(document, mutableRef.current.fn);
		mutableRef.current.fn = null;
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
