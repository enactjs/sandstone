export const setData = (dataSize, isDisabled) => {
	return {
		type: 'SET_DATA',
		dataSize,
		isDisabled
	};
};
