import Spotlight from '@enact/spotlight';
import {useContext} from 'react';

import {ScrollContext} from './Scrollable';

const useScrollbar = (props) => {
	const {isContent, uiScrollAdapter} = useContext(ScrollContext);

	const scrollbarProps = {
		cbAlertThumb: alertThumbAfterRendered
	};

	// Functions

	function alertThumb () {
		const bounds = uiScrollAdapter.current.getScrollBounds();

		uiScrollAdapter.current.showThumb(bounds);
		uiScrollAdapter.current.startHidingThumb();
	}

	function alertThumbAfterRendered () {
		const spotItem = Spotlight.getCurrent();

		if (!Spotlight.getPointerMode() && isContent(spotItem) && uiScrollAdapter.current.isUpdatedScrollThumb) {
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
