import Spotlight from '@enact/spotlight';
import {constants} from '@enact/ui/Scrollable';

const {paginationPageMultiplier} = constants;

const useScrollbar = (props, instances, context) => {
	const {uiScrollAdapter} = instances;
	const {isContent} = context;

	const scrollbarProps = {
		cbAlertThumb: alertThumbAfterRendered,
		onInteractionForScroll: onInteractionForScroll
	};

	// Functions
	function onInteractionForScroll ({isPreviousScrollButton, isVerticalScrollBar, distance}) {
		const
			{wheelDirection} = uiScrollAdapter.current,
			bounds = uiScrollAdapter.current.getScrollBounds(),
			direction = isPreviousScrollButton ? -1 : 1,
			pageDistance = direction * (distance || ((isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth) * paginationPageMultiplier));

		uiScrollAdapter.current.lastInputType = 'scrollbarButton';

		if (direction !== wheelDirection) {
			uiScrollAdapter.current.isScrollAnimationTargetAccumulated = false;
			uiScrollAdapter.current.wheelDirection = direction;
		}

		uiScrollAdapter.current.scrollToAccumulatedTarget(pageDistance, isVerticalScrollBar, props.overscrollEffectOn.scrollbarButton);
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
