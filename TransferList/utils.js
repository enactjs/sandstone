
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

// Rearrange items in the same list
export const rearrangeList = (dragOverElementIndex, isAbove, itemIndex, list, listName, setNewList) => {
	const draggedItem = list[itemIndex];
	// Determines the position for the item if it is dropped above the hovered item
	const elementAbove = dragOverElementIndex < itemIndex ? dragOverElementIndex : dragOverElementIndex - 1;
	// Determines the position for the item if it is dropped below the hovered item
	const elementBelow = dragOverElementIndex > itemIndex ? dragOverElementIndex : dragOverElementIndex + 1;
	// Determines the exact position for the dropped item
	const elementPosition = isAbove ? elementAbove : elementBelow;

	// Removes item from its list
	list.splice(itemIndex, 1);
	// Add the item on the new position
	list.splice(elementPosition, 0, draggedItem);
	setNewList(list);
};
