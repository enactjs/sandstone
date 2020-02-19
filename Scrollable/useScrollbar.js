import Spotlight from '@enact/spotlight';
import {constants} from '@enact/ui/Scrollable';

const {paginationPageMultiplier} = constants;

// When user press arrow keys, scroll distance of Chrome browser is 40px.
// 42 is the number which is a multiple of 6 to support 4k.
const defaultScrollDistance = 42;

const useScrollbar = (props, instances, context) => {
	const {uiScrollAdapter} = instances;
	const {isContent} = context;

	const scrollbarProps = {
		cbAlertThumb: alertThumbAfterRendered,
		onInteractionForScroll
	};

	// Functions
	function onInteractionForScroll ({inputType, isPagination, isPreviousScroll, isVerticalScrollBar}) {
		const
			{wheelDirection} = uiScrollAdapter.current,
			bounds = uiScrollAdapter.current.getScrollBounds(),
			direction = isPreviousScroll ? -1 : 1,
			singlePageDistance = isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth,
			distance = isPagination ? (singlePageDistance * paginationPageMultiplier) : defaultScrollDistance;

		uiScrollAdapter.current.lastInputType = inputType;

		if (direction !== wheelDirection) {
			uiScrollAdapter.current.isScrollAnimationTargetAccumulated = false;
			uiScrollAdapter.current.wheelDirection = direction;
		}

		uiScrollAdapter.current.scrollToAccumulatedTarget(direction * distance, isVerticalScrollBar, props.overscrollEffectOn.scrollbarButton);
	}

	function alertThumb () {
		const bounds = uiScrollAdapter.current.getScrollBounds();

		uiScrollAdapter.current.showThumb(bounds);
		uiScrollAdapter.current.startHidingThumb();
	}

	function alertThumbAfterRendered () {
		const spotItem = Spotlight.getCurrent();

		if (!Spotlight.getPointerMode() && isContent(spotItem) && uiScrollAdapter.current.isUpdatedScrollThumb) {
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
