import Spotlight from '@enact/spotlight';
import {ScrollContext as uiScrollContext} from '@enact/ui/Scrollable';
import {useContext} from 'react';

import {ScrollContext} from './Scrollable';

const useScrollbar = () => {
	const {mutableRef: {current: {isContent}}} = useContext(ScrollContext);
	const {mutableRef: uiScrollMutableRef, uiChildContainerRef} = useContext(uiScrollContext);
	const {isUpdatedScrollThumb} = uiScrollMutableRef.current;

	const scrollbarProps = {
		cbAlertThumb:
		alertThumbAfterRendered
	};

	// Functions

	function alertThumb () {
		const bounds = uiScrollMutableRef.current.getScrollBounds();

		uiScrollMutableRef.current.showThumb(bounds);
		uiScrollMutableRef.current.startHidingThumb();
	}

	function alertThumbAfterRendered () {
		const spotItem = Spotlight.getCurrent();

		if (!Spotlight.getPointerMode() && isContent(uiChildContainerRef, spotItem) && isUpdatedScrollThumb) {
			alertThumb();
		}
	}

	// Return

	return {
		alertThumb,
		scrollbarProps
	};
};

export default useScrollbar;
export {
	useScrollbar
};
