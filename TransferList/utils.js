export function handleSpotlightDown(ev, orientation, list, moveInSecond, elements, index) {
	if (orientation === 'vertical' && list === 'first') moveInSecond();
	if (elements.length - 1 !== index && orientation === 'horizontal') return;
	if (list === 'first' && orientation === 'vertical') return;
	ev.preventDefault();
	ev.stopPropagation();
}
export function handleSpotlightLeft(ev, orientation, list, moveInFirst, index) {
	if (orientation === 'horizontal' && list === 'second') moveInFirst();
	if (index !== 0 || orientation === 'horizontal') return;
	ev.preventDefault();
	ev.stopPropagation();
}
export function handleSpotlightRight(ev, orientation, list, moveInSecond, elements, index) {
	if (orientation === 'horizontal' && list === 'first') moveInSecond();
	if (elements.length - 1 !== index || orientation === 'horizontal') return;
	ev.preventDefault();
	ev.stopPropagation();
}
export function handleSpotlightUp(ev, orientation, list, moveInFirst, index) {
	if (orientation === 'vertical' && list === 'second') moveInFirst();
	if (index !== 0 && orientation === 'horizontal') return;
	if (list === 'second' && orientation === 'vertical') return;
	ev.preventDefault();
	ev.stopPropagation();
}
export function handleKeyDownCapture(ev, selected, selectedItems, orientation, reorderList, list, index, element) {
	if (!selected || selectedItems.length > 1) return;
	if (orientation !== 'vertical') {
		if (ev.key === 'ArrowUp') {
			reorderList(list, index, -1, element);
		} else if (ev.key === 'ArrowDown') {
			reorderList(list, index, 1, element);
		}
	} else if (orientation !== 'horizontal') {
		if (ev.key === 'ArrowLeft') {
			reorderList(list, index, -2, element);
		} else if (ev.key === 'ArrowRight') {
			reorderList(list, index, 2, element);
		} else if (ev.key === 'ArrowUp') {
			reorderList(list, index, -1, element);
		} else if (ev.key === 'ArrowDown') {
			reorderList(list, index, 1, element);
		}
	}
}

export function applyDropBorder(element, ev, isVertical, isDefaultListComponent, currentElement, isAboveDropPosition, css) {
	const isAboveCurrentElement = ev.offsetY < currentElement.current.offsetHeight / 3;
	const isBelowCurrentElement = !isAboveCurrentElement;
	if (startDragElement.current !== element && (!isVertical || !isDefaultListComponent)) {
		if ((ev.offsetY < currentElement.current.offsetHeight / 3 || isAboveCurrentElement) && !isBelowCurrentElement) {
			currentElement.current.classList.add(`${css.overAbove}`);
			currentElement.current.classList.remove(`${css.overBelow}`);
			isAboveDropPosition.current = true;
		} else {
			currentElement.current.classList.add(`${css.overBelow}`);
			currentElement.current.classList.remove(`${css.overAbove}`);
			isAboveDropPosition.current = false;
		}
	} else if (startDragElement.current !== element) {
		if ((ev.offsetX < currentElement.current.offsetWidth / 3 || isAboveCurrentElement) && !isBelowCurrentElement) {
			currentElement.current.classList.add(`${css.overLeft}`);
			currentElement.current.classList.remove(`${css.overRight}`);
			isAboveDropPosition.current = true;
		} else {
			currentElement.current.classList.add(`${css.overRight}`);
			currentElement.current.classList.remove(`${css.overLeft}`);
			isAboveDropPosition.current = false;
		}
	}
}