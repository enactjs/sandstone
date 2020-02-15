import Spotlight from '@enact/spotlight';
import {ScrollContext as uiScrollContext} from '@enact/ui/Scrollable';
import utilDOM from '@enact/ui/Scrollable/utilDOM';
import {useContext, useEffect, useRef} from 'react';

import {ScrollContext} from '../Scrollable';

const useSpotlightConfig = (props) => {
	const {scrollMutableRef: {current: {lastFocusedIndex}}} = useContext(ScrollContext);

	// Hooks

	useEffect(() => {
		const lastFocusedPersist = () => {
			if (lastFocusedIndex != null) {
				return {
					container: false,
					element: true,
					key: lastFocusedIndex
				};
			}
		};

		function configureSpotlight () {
			const {spacing, spotlightId} = props;

			Spotlight.set(spotlightId, {
				enterTo: 'last-focused',
				/*
				 * Returns the data-index as the key for last focused
				 */
				lastFocusedPersist,
				/*
				 * Restores the data-index into the placeholder if its the only element. Tries to find a
				 * matching child otherwise.
				 */
				lastFocusedRestore,
				/*
				 * Directs spotlight focus to favor straight elements that are within range of `spacing`
				 * over oblique elements, like scroll buttons.
				 */
				obliqueMultiplier: spacing > 0 ? spacing : 1
			});
		}

		configureSpotlight();
	}, [lastFocusedIndex, props, props.spotlightId]);

	// Functions

	/*
	 * Restores the data-index into the placeholder if it exists. Tries to find a matching child
	 * otherwise.
	 */
	function lastFocusedRestore ({key}, all) {
		const placeholder = all.find(el => 'vlPlaceholder' in el.dataset);

		if (placeholder) {
			placeholder.dataset.index = key;

			return placeholder;
		}

		return all.reduce((focused, node) => {
			return focused || Number(node.dataset.index) === key && node;
		}, null);
	}
};

const getNumberValue = (index) => index | 0;

const useSpotlightRestore = (props) => {
	const {scrollMutableRef: listMutableRef} = useContext(ScrollContext);
	const {uiChildContainerRef} = useContext(uiScrollContext);

	// Mutable value

	const scrollMutableRef = useRef({
		preservedIndex: false,
		restoreLastFocused: false
	});

	// Hooks

	useEffect(restoreFocus);

	// Functions

	function handlePlaceholderFocus (ev) {
		const placeholder = ev.currentTarget;

		if (placeholder) {
			const index = placeholder.dataset.index;

			if (index) {
				scrollMutableRef.current.preservedIndex = getNumberValue(index);
				scrollMutableRef.current.restoreLastFocused = true;
			}
		}
	}

	function isPlaceholderFocused () {
		const current = Spotlight.getCurrent();

		if (current && current.dataset.vlPlaceholder && utilDOM.containsDangerously(uiChildContainerRef.current, current)) {
			return true;
		}

		return false;
	}

	function restoreFocus () {
		if (
			scrollMutableRef.current.restoreLastFocused &&
			!isPlaceholderFocused()
		) {
			const
				{spotlightId} = props,
				node = uiChildContainerRef.current.querySelector(
					`[data-spotlight-id="${spotlightId}"] [data-index="${scrollMutableRef.current.preservedIndex}"]`
				);

			if (node) {
				// if we're supposed to restore focus and virtual list has positioned a set of items
				// that includes lastFocusedIndex, clear the indicator
				scrollMutableRef.current.restoreLastFocused = false;

				// try to focus the last focused item
				listMutableRef.current.isScrolledByJump = true;
				const foundLastFocused = Spotlight.focus(node);
				listMutableRef.current.isScrolledByJump = false;

				// but if that fails (because it isn't found or is disabled), focus the container so
				// spotlight isn't lost
				if (!foundLastFocused) {
					scrollMutableRef.current.restoreLastFocused = true;
					Spotlight.focus(spotlightId);
				}
			}
		}
	}

	function handleRestoreLastFocus ({firstIndex, lastIndex}) {
		if (scrollMutableRef.current.restoreLastFocused && scrollMutableRef.current.preservedIndex >= firstIndex && scrollMutableRef.current.preservedIndex <= lastIndex) {
			restoreFocus();
		}
	}

	function updateStatesAndBounds ({dataSize, moreInfo, numOfItems}) {
		return (scrollMutableRef.current.restoreLastFocused && numOfItems > 0 && scrollMutableRef.current.preservedIndex < dataSize && (
			scrollMutableRef.current.preservedIndex < moreInfo.firstVisibleIndex || scrollMutableRef.current.preservedIndex > moreInfo.lastVisibleIndex
		));
	}

	function setPreservedIndex (index) {
		scrollMutableRef.current.preservedIndex = index;
		scrollMutableRef.current.restoreLastFocused = true;
	}

	// Return

	return {
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		setPreservedIndex,
		updateStatesAndBounds
	};
};

export {
	useSpotlightConfig,
	useSpotlightRestore
};
