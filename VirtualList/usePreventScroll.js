import utilEvent from '@enact/ui/useScroll/utilEvent';
import {useEffect} from 'react';

const usePreventScroll = (props, instances) => {
	// Hooks

	useEffect(() => {
		console.log('VirtualList: usePreventScroll: useEffect1: componentDidMount & componentDidUpdate : preventScroll addeventlistener');
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
				console.log('VirtualList: usePreventScroll: useEffect1: componentWillReceiveProps : preventScroll removeeventlistener');
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
