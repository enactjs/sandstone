// Check for lists capacity
export const checkListsCapacity = (currentListForDrop, firstListCopy, listsCapacity, secondListCopy, selectedItems, index = null, list = null) => {
	const listCopy = currentListForDrop === 'first' ? secondListCopy : firstListCopy;

	// If there are selected items and the dragged item is not one of them, cancel the drop
	if (index && list) {
		if (selectedItems.length && selectedItems.findIndex((pair) => pair.element === listCopy[index] && pair.list === list) === -1) return true;
	}

	// Check for min-max lists capacities
	if (currentListForDrop === 'first') {
		if (secondListCopy.length <= listsCapacity.secondListMinCapacity || secondListCopy.length - selectedItems.length < listsCapacity.secondListMinCapacity) return true;
		if (firstListCopy.length >= listsCapacity.firstListMaxCapacity || firstListCopy.length + selectedItems.length > listsCapacity.firstListMaxCapacity) return true;
	} else {
		if (firstListCopy.length <= listsCapacity.firstListMinCapacity || firstListCopy.length - selectedItems.length < listsCapacity.firstListMinCapacity) return true;
		if (secondListCopy.length >= listsCapacity.secondListMaxCapacity || secondListCopy.length + selectedItems.length > listsCapacity.secondListMaxCapacity) return true;
	}

	return false;
};

export const getTouchElementData = (ev, startDragElement) => {
	let element = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).closest('[draggable]');
	const list = element.id.split('-')[1];
	const [startElementIndex, startElementList] = startDragElement.current.id.split('-');
	if (startDragElement.current === element) return null;

	return {element, list, startElementIndex, startElementList};
};

// Get the transferred item and return the index and the list
export const getTransferData = (dataTransferObj) => {
	if (dataTransferObj) {
		const data = dataTransferObj.getData('text/plain');
		const [index, list] = data.split('-');
		return {index, list};
	}
	return null;
};

export const handlePreventDefault = ev => ev.preventDefault();

// Restrict the spotlight only to the component
export const handleSpotlightBounds = ev => {
	ev.preventDefault();
	ev.stopPropagation();
};

export const performMoveOperation = (list, listLocal, listOperation, selectedItems, tempMoveOrCopy, tempMoveOrDelete, tempSelected) => {
	selectedItems.map((item) => {
		if (item.list !== list) return;
		// In case of moving or deleting, remove the item from the second list
		if (listOperation === 'move' || listOperation === 'delete') tempMoveOrDelete.splice(tempMoveOrDelete.findIndex((element) => element === item.element), 1);
		// In case of moving or copying, add the items to the second list
		if (listOperation === 'move' || listOperation === 'copy') {
			// Block duplicated items in the same list
			if  (tempMoveOrCopy.includes(item.element)) return;
			tempMoveOrCopy.push(listLocal[listLocal.findIndex(element => element === item.element)]);
		}
		tempSelected.splice(tempSelected.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
	});
};

export const performSelectAllOperation = (concatList, currentList, listOperation, setFirstList, setFirstListLocal, setSecondList, setSecondListLocal, setSelectedItems) => {
	// If the state is externally controlled, use the provided functions
	const isStateControlledExternally = setFirstList !== null && setSecondList !== null;
	const setFirstListState = isStateControlledExternally ? setFirstList : setFirstListLocal;
	const setSecondListState = isStateControlledExternally ? setSecondList : setSecondListLocal;
	const moveCopyList = currentList === 'first' ? setSecondListState : setFirstListState;
	const moveDeleteList = currentList === 'first' ? setFirstListState : setSecondListState;

	// In case of moving or copying, add all the items from one list to another
	if (listOperation === 'move' || listOperation === 'copy') {
		moveCopyList(concatList);
	}
	// In case of moving or deleting, empty the list from where we are performing actions
	if (listOperation === 'move' || listOperation === 'delete') {
		moveDeleteList([]);
	}

	setSelectedItems([]);
};

// If the state is externally controlled, use the provided functions
export const setItemsState = (setFirstList, setFirstListLocal, setSecondList, setSecondListLocal, setSelectedItems, tempFirst, tempSecond, tempSelected) => {
	if (setFirstList !== null && setSecondList !== null) {
		setFirstList(tempFirst);
		setSecondList(tempSecond);
	} else {
		setFirstListLocal(tempFirst);
		setSecondListLocal(tempSecond);
	}
	setSelectedItems(tempSelected);
};

// Set new position for the items after the drop action
export const setSelectedItemsPosition = (dragOverElement, index, list, listCopy, noMultipleSelect, sameList, selectedItems, setPosition, setSelectedItems) => {
	// Check if the selected item is already present in the selected items array
	const potentialIndex = selectedItems.findIndex((pair) => pair.element === listCopy[index] && pair.list === list);

	if (potentialIndex !== -1) {
		const selectedListCopy = [...selectedItems];
		// If we are allowed to select multiple items, we can store an array of selected items, if not only one item can be selected
		if (!noMultipleSelect) {
			selectedItems.map((item) => {
				selectedListCopy.splice(selectedListCopy.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
			});
		} else {
			selectedListCopy.splice(potentialIndex, 1);
		}
		setSelectedItems(selectedListCopy);
	}

	setPosition({index: ((selectedItems.length / 2) + parseInt(dragOverElement.current)) - 2, list: list, sameList: sameList});
};
