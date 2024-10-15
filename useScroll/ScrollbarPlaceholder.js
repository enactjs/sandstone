import Spotlight from '@enact/spotlight';
import Spottable from '@enact/spotlight/Spottable';
import {useCallback, useEffect, useState} from 'react';

const SpotlightPlaceholder = Spottable('div');

/**
 * ScrollbarPlaceholder component.
 *
 * @class ScrollbarPlaceholder
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const ScrollbarPlaceholder = () => {
	const [showPlaceholder, setShowPlaceholder] = useState(true);

	useEffect(() => {
		if (showPlaceholder) {
			setShowPlaceholder(false);
		}
	}, [showPlaceholder]);

	const resetFocus = useCallback(() => {
		setTimeout(() => {
			if (!Spotlight.getPointerMode() && !Spotlight.getCurrent()) {
				if (!Spotlight.isPaused()) {
					Spotlight.focus(Spotlight.getActiveContainer(), {toOuterContainer:true});
				} else {
					setTimeout(() => {
						if (!Spotlight.getPointerMode() && !Spotlight.getCurrent() && !Spotlight.isPaused()) {
							Spotlight.focus(Spotlight.getActiveContainer(), {toOuterContainer:true});
						}
					}, 400); // Wait again for finishing animation (ex. panel transition).
				}
			}
		}, 0); // Wait for unmounting placeholder node.
	}, []);

	return (showPlaceholder ? (<SpotlightPlaceholder aria-hidden onSpotlightDisappear={resetFocus} data-spotlight-ignore-restore />) : null);
};

ScrollbarPlaceholder.displayName = 'ScrollbarPlaceholder';

export default ScrollbarPlaceholder;
export {
	ScrollbarPlaceholder
};
