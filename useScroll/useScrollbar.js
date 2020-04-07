import ri from '@enact/ui/resolution';
import {constants} from '@enact/ui/useScroll';

const {paginationPageMultiplier} = constants;
const defaultScrollDistance = 168;	// TODO : Change to the value decided by UX.

const useScrollbar = (props, instances) => {
	const {scrollContainerHandle} = instances;

	const scrollbarProps = {
		cbAlertScrollbarTrack: alertScrollbarTrackAfterRendered,
		onInteractionForScroll
	};

	// Functions
	function onInteractionForScroll ({inputType, isForward, isPagination, isVerticalScrollBar}) {
		const
			{wheelDirection} = scrollContainerHandle.current,
			bounds = scrollContainerHandle.current.getScrollBounds(),
			direction = isForward ? 1 : -1,
			pageSize = isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth,
			distance = isPagination ? (pageSize * paginationPageMultiplier) : defaultScrollDistance;

		scrollContainerHandle.current.lastInputType = inputType;

		if (direction !== wheelDirection) {
			scrollContainerHandle.current.isScrollAnimationTargetAccumulated = false;
			scrollContainerHandle.current.wheelDirection = direction;
		}

		scrollContainerHandle.current.scrollToAccumulatedTarget(direction * ri.scale(distance), isVerticalScrollBar, props.overscrollEffectOn.scrollbarButton);
	}

	function alertScrollbarTrack () {
		const bounds = scrollContainerHandle.current.getScrollBounds();

		scrollContainerHandle.current.showScrollbarTrack(bounds);
		scrollContainerHandle.current.startHidingScrollbarTrack();
	}

	function alertScrollbarTrackAfterRendered () {
		if (scrollContainerHandle.current.isUpdatedScrollbarTrack) {
			alertScrollbarTrack();
		}
	}

	// Return

	return {
		alertScrollbarTrack,
		scrollbarProps
	};
};

export default useScrollbar;
export {
	useScrollbar
};
