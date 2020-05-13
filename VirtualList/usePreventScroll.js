import utilEvent from '@enact/ui/useScroll/utilEvent';
import {useEffect} from 'react';

const usePreventScroll = (props, instances) => {
	// Hooks

	useEffect(() => {
		const {rtl, scrollMode} = props;
		const {scrollContentRef} = instances;
		const scrollContentNode = scrollContentRef.current;

		if (scrollMode === 'translate' && scrollContentNode) {
			const preventScroll = () => {
				scrollContentNode.scrollTop = 0;
				scrollContentNode.scrollLeft = rtl ? scrollContentNode.scrollWidth : 0;
			};

			utilEvent('scroll').addEventListener(scrollContentNode, preventScroll);

			return () => {
				// remove a function for preventing native scrolling by Spotlight
				utilEvent('scroll').removeEventListener(scrollContentNode, preventScroll);
			};
		}
	}, [props, instances]);
};

export default usePreventScroll;
export {
	usePreventScroll
};
