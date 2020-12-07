import {Job} from '@enact/core/util';
import ri from '@enact/ui/resolution';
import {constants} from '@enact/ui/useScroll';
import {useCallback, useEffect, useRef} from 'react';

const
	{overscrollTypeDone, overscrollTypeNone, overscrollTypeOnce} = constants,
	overscrollTransitionPrefix = '--scroll-overscroll-transition-',
	overscrollTranslatePrefix = '--scroll-overscroll-translate-',
	overscrollTransitionStart = 'transform 300ms cubic-bezier(0.5, 1, 0.89, 1)',
	overscrollTransitionEnd = 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
	overscrollMaxTranslate = ri.scale(180),
	overscrollTimeout = 220;

const useOverscrollEffect = (props, instances) => {
	const {scrollContainerHandle, scrollContentRef} = instances;

	// Mutable value

	const mutableRef = useRef({
		overscrollJobs: {
			horizontal: {before: null, after: null},
			vertical: {before: null, after: null}
		}
	});

	// Hooks

	const applyOverscrollEffect = useCallback((orientation, edge, type, ratio) => {
		const isHorizontal = orientation === 'horizontal';

		if (scrollContentRef.current) {
			const
				effectSize = ratio * (edge === 'before' ? 1 : -1) * (isHorizontal && scrollContainerHandle.current.rtl ? -1 : 1) * overscrollMaxTranslate,
				translate = `translate${isHorizontal ? 'X' : 'Y'}(${effectSize}px)`,
				transition = ratio !== 0 ? overscrollTransitionStart : overscrollTransitionEnd;

			scrollContentRef.current.style.setProperty(overscrollTranslatePrefix + orientation, translate);
			scrollContentRef.current.style.setProperty(overscrollTransitionPrefix + orientation, transition);

			if (type === overscrollTypeOnce) {
				mutableRef.current.overscrollJobs[orientation][edge].start(orientation, edge, overscrollTypeDone, 0);
			}
		}
	}, [scrollContainerHandle, scrollContentRef]);

	useEffect(() => {
		function createOverscrollJob (orientation, edge) {
			if (!mutableRef.current.overscrollJobs[orientation][edge]) {
				mutableRef.current.overscrollJobs[orientation][edge] = new Job(applyOverscrollEffect, overscrollTimeout);
			}
		}

		function stopOverscrollJob (orientation, edge) {
			const job = mutableRef.current.overscrollJobs[orientation][edge];

			if (job) {
				job.stop();
			}
		}

		createOverscrollJob('horizontal', 'before');
		createOverscrollJob('horizontal', 'after');
		createOverscrollJob('vertical', 'before');
		createOverscrollJob('vertical', 'after');

		return () => {
			stopOverscrollJob('horizontal', 'before');
			stopOverscrollJob('horizontal', 'after');
			stopOverscrollJob('vertical', 'before');
			stopOverscrollJob('vertical', 'after');
		};
	}, [applyOverscrollEffect]);

	// Functions

	function clearOverscrollEffect (orientation, edge) {
		mutableRef.current.overscrollJobs[orientation][edge].startAfter(overscrollTimeout, orientation, edge, overscrollTypeNone, 0);
		scrollContainerHandle.current.setOverscrollStatus(orientation, edge, overscrollTypeNone, 0);
	}

	function checkAndApplyOverscrollEffectByDirection (direction) {
		const
			orientation = (direction === 'up' || direction === 'down') ? 'vertical' : 'horizontal',
			bounds = scrollContainerHandle.current.getScrollBounds(),
			scrollability = orientation === 'vertical' ? scrollContainerHandle.current.canScrollVertically(bounds) : scrollContainerHandle.current.canScrollHorizontally(bounds);

		if (scrollability) {
			const
				isRtl = scrollContainerHandle.current.rtl,
				edge = (direction === 'up' || !isRtl && direction === 'left' || isRtl && direction === 'right') ? 'before' : 'after';

			scrollContainerHandle.current.checkAndApplyOverscrollEffect(orientation, edge, overscrollTypeOnce);
		}
	}

	// Return

	return {
		applyOverscrollEffect,
		checkAndApplyOverscrollEffectByDirection,
		clearOverscrollEffect
	};
};

export default useOverscrollEffect;
export {
	useOverscrollEffect
};
