import Spotlight from '@enact/spotlight';
import {ScrollContext as uiScrollContext} from '@enact/ui/Scrollable';
import {useContext} from 'react';

import {ScrollContext} from './Scrollable';

const useScrollbar = (props) => {
	const {mutableRef: {current: {isContent}}} = useContext(ScrollContext);
	const {mutableRef: uiMutableRef, uiChildContainerRef} = useContext(uiScrollContext);
	const {isUpdatedScrollThumb} = uiMutableRef.current;

	const scrollbarProps = {
		cbAlertThumb:
		 alertThumbAfterRendered
	};

	// Functions

	function alertThumb () {
		const bounds = uiMutableRef.current.getScrollBounds();

		uiMutableRef.current.showThumb(bounds);
		uiMutableRef.current.startHidingThumb();
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
