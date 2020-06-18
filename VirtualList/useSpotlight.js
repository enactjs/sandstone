import Spotlight from '@enact/spotlight';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import {useEffect, useRef} from 'react';

const useSpotlightConfig = (props, instances) => {
	// Hooks

	useEffect(() => {
		const {spottable: {current: {lastFocusedIndex}}} = instances;

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
	}, [props, instances]);

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

const useSpotlightRestore = (props, instances, context) => {
	const {scrollContentRef, spottable} = instances;
	const {focusByIndex, getItemNode} = context;

	// Mutable value

	const mutableRef = useRef({
		preservedIndex: false,
		lastSpotlightDirection: null,
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
				mutableRef.current.preservedIndex = getNumberValue(index);
				mutableRef.current.lastSpotlightDirection = null;
				mutableRef.current.restoreLastFocused = true;
			}
		}
	}

	function isPlaceholderFocused () {
		const current = Spotlight.getCurrent();

		if (current && current.dataset.vlPlaceholder && utilDOM.containsDangerously(scrollContentRef.current, current)) {
			return true;
		}

		return false;
	}

	function restoreFocus () {
		if (
			mutableRef.current.restoreLastFocused &&
			!isPlaceholderFocused()
		) {
			const
				{spotlightId} = props,
				itemNode = getItemNode(mutableRef.current.preservedIndex);

			if (itemNode) {
				// if we're supposed to restore focus and virtual list has positioned a set of items
				// that includes lastFocusedIndex, clear the indicator
				mutableRef.current.restoreLastFocused = false;

				// try to focus the last focused item
				spottable.current.isScrolledByJump = true;
				const foundLastFocused = focusByIndex(mutableRef.current.preservedIndex, mutableRef.current.lastSpotlightDirection);
				spottable.current.isScrolledByJump = false;

				// but if that fails (because it isn't found or is disabled), focus the container so
				// spotlight isn't lost
				if (!foundLastFocused) {
					mutableRef.current.restoreLastFocused = true;
					Spotlight.focus(spotlightId);
				}
			}
		}
	}

	function handleRestoreLastFocus ({firstIndex, lastIndex}) {
		if (mutableRef.current.restoreLastFocused && mutableRef.current.preservedIndex >= firstIndex && mutableRef.current.preservedIndex <= lastIndex) {
			restoreFocus();
		}
	}

	function updateStatesAndBounds ({dataSize, moreInfo, numOfItems}) {
		return (mutableRef.current.restoreLastFocused && numOfItems > 0 && mutableRef.current.preservedIndex < dataSize && (
			mutableRef.current.preservedIndex < moreInfo.firstVisibleIndex || mutableRef.current.preservedIndex > moreInfo.lastVisibleIndex
		));
	}

	function setPreservedIndex (index, direction = null) {
		mutableRef.current.preservedIndex = index;
		mutableRef.current.lastSpotlightDirection = direction;
		mutableRef.current.restoreLastFocused = true;
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
