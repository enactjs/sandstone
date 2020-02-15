import Spotlight from '@enact/spotlight';
import {ScrollContext as uiScrollContext} from '@enact/ui/Scrollable';
import {useContext} from 'react';

import {ScrollContext} from './Scrollable';

const useScrollbar = (props) => {
	const {mutableRef: {current: {isContent}}, uiScrollAdapter} = useContext(ScrollContext);
	const {mutableRef: {current: {isUpdatedScrollThumb}}, uiChildContainerRef} = useContext(uiScrollContext);

	const scrollbarProps = {
		cbAlertThumb:
		 alertThumbAfterRendered
	};

	// Functions

	function alertThumb () {
		const bounds = uiScrollAdapter.current.getScrollBounds();

		uiScrollAdapter.current.showThumb(bounds);
		uiScrollAdapter.current.startHidingThumb();
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
