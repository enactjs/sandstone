import Spotlight from '@enact/spotlight';

const useScrollbar = (props, instances, context) => {
	const {scrollContainerHandle} = instances;
	const {isContent} = context;

	const scrollbarProps = {
		cbAlertThumb: alertThumbAfterRendered
	};

	// Functions

	function alertThumb () {
		const bounds = scrollContainerHandle.current.getScrollBounds();

		scrollContainerHandle.current.showThumb(bounds);
		scrollContainerHandle.current.startHidingThumb();
	}

	function alertThumbAfterRendered () {
		const spotItem = Spotlight.getCurrent();

		if (!Spotlight.getPointerMode() && isContent(spotItem) && scrollContainerHandle.current.isUpdatedScrollThumb) {
			alertThumb();
		}
	}

	// Return

	return {
		alertThumb,
		scrollbarProps
	};
};

export default useScrollbar;
export {
	useScrollbar
};
