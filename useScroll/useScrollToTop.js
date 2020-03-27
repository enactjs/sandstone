/* eslint-disable react/jsx-no-bind */
import React, {useMemo, useState} from 'react';

import Button from '../Button';

const useScrollToTop = (scrollContainerHandleCurrent, showScrollToTopButton) => {
	const [state, setState] = useState(false);
	const ScrollTopButton = useMemo(() => (
		<Button
			icon="arrowlargeup"
			onClick={() => scrollContainerHandleCurrent.scrollTo({
				position: {x: 0, y: 0},
				animate: true
			})}
			style={{
				position: 'absolute',
				bottom: 0,
				right: 0,
				opacity: showScrollToTopButton && state ? 1 : 0
			}}
		>
			Scroll to top
		</Button>
	), [scrollContainerHandleCurrent, state, showScrollToTopButton]);

	return {
		ScrollToTopButton: ScrollTopButton,
		// TODO: Better check on when to show back to top?
		setScrollButtonVisible: ({y}) => setState(y > 0)
	};
}

export default useScrollToTop;
