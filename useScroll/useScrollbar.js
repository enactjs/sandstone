import Spotlight from '@enact/spotlight';
import {constants} from '@enact/ui/Scrollable';
import ri from '@enact/ui/resolution';

const {paginationPageMultiplier} = constants;
const defaultScrollDistance = 168;	// TODO : Change to the value decided by UX.

const useScrollbar = (props, instances, context) => {
	const {scrollContainerHandle} = instances;
	const {isContent} = context;

	const scrollbarProps = {
		cbAlertThumb: alertThumbAfterRendered,
		onInteractionForScroll
	};

	// Functions
	function onInteractionForScroll ({inputType, isForward, isPagination, isVerticalScrollBar}) {
		const
			{wheelDirection} = uiScrollAdapter.current,
			bounds = uiScrollAdapter.current.getScrollBounds(),
			direction = isForward ? 1 : -1,
			pageSize = isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth,
			distance = isPagination ? (pageSize * paginationPageMultiplier) : defaultScrollDistance;

		uiScrollAdapter.current.lastInputType = inputType;

		if (direction !== wheelDirection) {
			uiScrollAdapter.current.isScrollAnimationTargetAccumulated = false;
			uiScrollAdapter.current.wheelDirection = direction;
		}

		uiScrollAdapter.current.scrollToAccumulatedTarget(direction * ri.scale(distance), isVerticalScrollBar, props.overscrollEffectOn.scrollbarButton);
	}

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
