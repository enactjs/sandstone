import Spotlight from '@enact/spotlight';
import Spottable from '@enact/spotlight/Spottable';
import {useCallback, useEffect, useState} from 'react';

const SpotlightPlaceholder = Spottable('div');

/**
 * ScrollbarPlaceHolder component.
 *
 * @class ScrollbarPlaceHolder
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const ScrollbarPlaceHolder = () => {
	const [showPlaceHolder, setShowPlaceHolder] = useState(true);

	useEffect(() => {
		if (showPlaceHolder) {
			setShowPlaceHolder(false);
		}
	}, [showPlaceHolder]);

	const resetFocus = useCallback(() => {
		setTimeout(() => {
			if (!Spotlight.getPointerMode() && !Spotlight.getCurrent()) {
				if (!Spotlight.isPaused()) {
					Spotlight.focusFromContainer();
				} else {
					setTimeout(() => {
						if (!Spotlight.getPointerMode() && !Spotlight.getCurrent() && !Spotlight.isPaused()) {
							Spotlight.focusFromContainer();
						}
					}, 400); // Wait again for finishing animation (ex. panel transition).
				}
			}
		}, 0); // Wait for unmounting placeHolder node.
	}, []);

	return (showPlaceHolder ? (<SpotlightPlaceholder onSpotlightDisappear={resetFocus} />) : null);
};

ScrollbarPlaceHolder.displayName = 'ScrollbarPlaceHolder';

export default ScrollbarPlaceHolder;
export {
	ScrollbarPlaceHolder
};
