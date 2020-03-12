import {useRef} from 'react';

const useThemeScrollContentHandle = () => {
	console.log("ss/useScroll/useThemeScrollContentHandle start===================");
	// Mutable value

	const themeScrollContentHandle = useRef({
		calculatePositionOnFocus: null,
		focusByIndex: null,
		focusOnNode: null,
		getScrollBounds: null,
		setContainerDisabled: null,
		setLastFocusedNode: null,
		shouldPreventOverscrollEffect: null,
		shouldPreventScrollByFocus: null,
		scrollMode: null
	});

	// Functions

	const setThemeScrollContentHandle = (handle) => {
		themeScrollContentHandle.current = handle;
	};

	// Return
	console.log("ss/useScroll/useThemeScrollContentHandle end===================");
	return [themeScrollContentHandle, setThemeScrollContentHandle];
};

export {
	useThemeScrollContentHandle
};
