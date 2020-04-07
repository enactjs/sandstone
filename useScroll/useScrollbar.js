import {constants} from '@enact/ui/useScroll';

const {paginationPageMultiplier} = constants;
const arrowKeyMultiplier = 0.2;

const useScrollbar = (props, instances) => {
	const {scrollContainerHandle} = instances;

	const scrollbarProps = {
		cbAlertThumb: alertThumbAfterRendered,
		onInteractionForScroll
	};

	// Functions
	function onInteractionForScroll ({inputType, isForward, isPagination, isVerticalScrollBar}) {
		const
			{wheelDirection} = scrollContainerHandle.current,
			bounds = scrollContainerHandle.current.getScrollBounds(),
			direction = isForward ? 1 : -1,
			pageSize = isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth,
			distance = pageSize * (isPagination ? paginationPageMultiplier : arrowKeyMultiplier);

		scrollContainerHandle.current.lastInputType = inputType;

		if (direction !== wheelDirection) {
			scrollContainerHandle.current.isScrollAnimationTargetAccumulated = false;
			scrollContainerHandle.current.wheelDirection = direction;
		}

		scrollContainerHandle.current.scrollToAccumulatedTarget(direction * distance, isVerticalScrollBar, props.overscrollEffectOn.scrollbarButton);
	}

	function alertThumb () {
		const bounds = scrollContainerHandle.current.getScrollBounds();

		scrollContainerHandle.current.showThumb(bounds);
		scrollContainerHandle.current.startHidingThumb();
	}

	function alertThumbAfterRendered () {
		if (scrollContainerHandle.current.isUpdatedScrollThumb) {
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
