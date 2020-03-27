import utilEvent from '@enact/ui/useScroll/utilEvent';
import {useEffect} from 'react';

const usePreventScroll = (props, instances) => {
	const {scrollMode} = props;
	const {scrollContentRef} = instances;

	// Hooks

	useEffect(() => {
		const {rtl} = props;
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
	}, [props, scrollMode]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default usePreventScroll;
export {
	usePreventScroll
};
