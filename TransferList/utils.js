
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
export const rearrangeList = (dragOverElementIndex, itemIndex, list, setNewList) => {
	const draggedItem = list[itemIndex];
	list.splice(itemIndex, 1);
	list.splice(dragOverElementIndex, 0, draggedItem);
	setNewList(list);
};
