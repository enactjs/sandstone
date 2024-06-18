export const hexToRGB = (color) => {
	const hexColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

	if (hexColor) {
		const red = parseInt(hexColor[1], 16);
		const green = parseInt(hexColor[2], 16);
		const blue = parseInt(hexColor[3], 16);

		return `${red}, ${green}, ${blue}`;
	}

	return null;
};
