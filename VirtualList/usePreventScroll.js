import utilEvent from '@enact/ui/Scrollable/utilEvent';
import {useEffect} from 'react';

const usePreventScroll = (props, instances, context) => {
	const {scrollContentRef} = instances;
	const {type} = context;

	// Hooks

	useEffect(() => {
		const {rtl} = props;
		const scrollContentNode = scrollContentRef.current;

		if (type === 'JS' && scrollContentNode) {
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
	}, [props, type]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default usePreventScroll;
export {
	usePreventScroll
};
