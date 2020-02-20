const convertToPasswordFormat = (value) => {
	if (value && value.length > 0) return new Array(value.length).fill('*');
	return '';
};

export {convertToPasswordFormat};
