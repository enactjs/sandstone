import {useRef} from 'react';

const useThemeScrollContentHandle = () => {
	// Mutable value

	const themeScrollContentHandle = useRef({
		calculatePositionOnFocus: null,
		focusByIndex: null,
		focusOnNode: null,
		getScrollBounds: null,
		getScrollPositionTarget: null,
		setContainerDisabled: null,
		setLastFocusedNode: null,
		shouldPreventOverscrollEffect: null,
		shouldPreventScrollByFocus: null
	});

	// Functions

	const setThemeScrollContentHandle = (handle) => {
		themeScrollContentHandle.current = handle;
	};

	// Return

	return [themeScrollContentHandle, setThemeScrollContentHandle];
};

export {
	useThemeScrollContentHandle
};
