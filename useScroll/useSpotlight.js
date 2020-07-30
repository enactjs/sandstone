import {useContext, useEffect} from 'react';

import {SharedState} from '../internal/SharedStateDecorator/SharedStateDecorator';

const useSpotlightRestore = (props, instances) => {
	const {scrollContainerHandle} = instances;
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
					scrollContainerHandle.current.scrollTo({
						position: scrollPosition,
						animate: false
					});
				} else {
					scrollContainerHandle.current.scrollTo({
						position: {x: 0, y: 0},
						animate: false
					});
				}
			}
		}

		restoreScrollPosition();
	}, [props.id]); // eslint-disable-line react-hooks/exhaustive-deps
};

export {
	useSpotlightRestore
};
