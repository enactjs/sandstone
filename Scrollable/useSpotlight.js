import {ScrollContext as uiScrollContext} from '@enact/ui/Scrollable';
import {useContext, useEffect} from 'react';

import {SharedState} from '../internal/SharedStateDecorator/SharedStateDecorator';


const useSpotlightRestore = (props) => {
	const {mutableRef: uiMutableRef} = useContext(uiScrollContext);
	const context = useContext(SharedState);

	// Hooks

	useEffect(() => {
		// Only intended to be used within componentDidMount, this method will fetch the last stored
		// scroll position from SharedState and scroll (without animation) to that position
		function restoreScrollPosition () {
			const {id} = props;
			if (id && context && context.get) {
				const scrollPosition = context.get(`${id}.scrollPosition`);

				if (scrollPosition) {
					uiMutableRef.current.scrollTo({
						position: scrollPosition,
						animate: false
					});
				}
			}
		}

		restoreScrollPosition();
	}, [context, props, uiMutableRef]);
};

export {
	useSpotlightRestore
};
