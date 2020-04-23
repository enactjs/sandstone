/* eslint-disable react/jsx-no-bind */
import classnames from 'classnames/bind';
import React, {useMemo, useState} from 'react';

import Button from '../Button';

import css from './ScrollToTopButton.module.less';

const cx = classnames.bind(css);

const useScrollToTop = (scrollContainerHandleCurrent, showScrollToTopButton) => {
	const [state, setState] = useState(false);
	const ScrollTopButton = useMemo(() => {
		const classes = cx({
			scrollToTopButton: true,
			showing: showScrollToTopButton && state
		});

		// TODO: This embedded button may be a bit too :yuck:
		// TODO: RTL & scrollbars are not accounted for
		// eslint-disable-next-line enact/display-name
		return (() => (
			<Button
				className={classes}
				icon="arrowlargeup"
				onClick={() => scrollContainerHandleCurrent.scrollTo({
					position: {x: 0, y: 0},
					animate: true
				})}
			>
				Scroll to top
			</Button>)
		);
	}, [scrollContainerHandleCurrent, state, showScrollToTopButton]);

	return {
		ScrollToTopButton: ScrollTopButton,
		// TODO: Better check on when to show back to top?
		updateScrollToTop: ({y}) => setState(y > 0)
	};
};

export default useScrollToTop;
