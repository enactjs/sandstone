import {getDirection} from '@enact/spotlight';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import {utilDOM} from '@enact/ui/useScroll/utilDOM';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import {useEffect, useRef} from 'react';

const useEventKey = (props, instances) => {
	// Mutable value

	const mutableRef = useRef({
		fn: null
	});

	// Hooks

	useEffect(() => {
		const {scrollContainerRef} = instances;

		function handleKeyDown (ev) {
			if (ev.repeat) {
				const direction = getDirection(ev.keyCode);

				if (direction) {
					const candidate = getTargetByDirectionFromElement(direction, ev.target);

					if (!utilDOM.containsDangerously(ev.currentTarget, candidate)) { // if the candidate is out of a scroller
						ev.preventDefault();
						ev.stopPropagation();
					}
				}
			}
		}

		utilEvent('keydown').addEventListener(scrollContainerRef.current, handleKeyDown);

		return () => {
			utilEvent('keydown').removeEventListener(scrollContainerRef.current, handleKeyDown);
		};
	}, [instances]);

	// Functions

	function addGlobalKeyDownEventListener (fn) {
		mutableRef.current.fn = fn;
		utilEvent('keydown').addEventListener(document, mutableRef.current.fn, {capture: true});
	}

	function removeGlobalKeyDownEventListener () {
		utilEvent('keydown').removeEventListener(document, mutableRef.current.fn, {capture: true});
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
