export const ADD_ITEM = 'ADD_ITEM';
export const CHANGE_DATASIZE = 'CHANGE_DATASIZE';
export const CHANGE_MINHEIGHT = 'CHANGE_MINHEIGHT';
export const CHANGE_MINWIDTH = 'CHANGE_MINWIDTH';
export const CHANGE_SPACING = 'CHANGE_SPACING';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_SELECTED_ITEM = 'DELETE_SELECTED_ITEM';
export const SELECT_ALL = 'SELECT_ALL';
export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECTION_ENABLE = 'SELECTION_ENABLE';
export const SET_DATA = 'SET_DATA';

export const addItem = (item) => {
	return {
		item,
		type: ADD_ITEM
	};
};

export const changeDataSize = (size) => {
	return {
		size,
		type: CHANGE_DATASIZE
	};
};

export const changeMinHeight = (size) => {
	return {
		size,
		type: CHANGE_MINHEIGHT
	};
};

export const changeMinWidth = (size) => {
	return {
		size,
		type: CHANGE_MINWIDTH
	};
};

export const changeSpacing = (size) => {
	return {
		size,
		type: CHANGE_SPACING
	};
};

export const deleteItem = () => {
	return {
		type: DELETE_ITEM
	};
};

export const deleteSelectedItem = () => {
	return {
		type: DELETE_SELECTED_ITEM
	};
};

export const selectAll = () => {
	return {
		type: SELECT_ALL
	};
};

export const selectItem = (index) => {
	return {
		index,
		type: SELECT_ITEM
	};
};

export const selectionEnable = () => {
	return {
		type: SELECTION_ENABLE
	};
};

export const setData = (index, item) => {
	return {
		index,
		item,
		type: SET_DATA
	};
};
