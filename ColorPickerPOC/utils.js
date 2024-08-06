function rgbStringToHex (rgbString) {
	if (rgbString.indexOf("rgb(") !== 0) return false;

	let a = rgbString.substring(4).split(","); // an array ("204","204","153)")
	if (a.length < 3) return false; // still something wrong with the string

	for (let i = 0; i < 3; i++) {
		a[i] = parseInt(a[i]).toString(16); // parse integer, convert integer to hex string
		a[i] = ((a[i].length === 1) ? "0" : "") + a[i].substring(0, 2);
		// pad single digit hex numbers with a leading 0
	}
	return ("#" + a[0] + a[1] + a[2]).toUpperCase();
}

function rgbToHex (r, g, b) {
	return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

const getHexColorFromGradient = (canvasRef, x, y) => {
	const ctx = canvasRef.current.getContext('2d');
	const imageData = ctx.getImageData(x, y, 1, 1);
	return rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
};

const generateOppositeColor = (hexColor) => {
	hexColor = hexColor.replace('#', '');

	const bigint = parseInt(hexColor, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	return luminance > 128 ? '#101720CC' : '#FFFFFFCC';
};

const hexToRGB = (hexColor) => {
	let internalColor = hexColor.replace('#', '').split('');

	return {
		red: parseInt(internalColor[0] + internalColor[1], 16),
		green: parseInt(internalColor[2] + internalColor[3], 16),
		blue: parseInt(internalColor[4] + internalColor[5], 16)
	};
};

const rgbObjectToHex = (rgbColor) => {
	let {red, green, blue} = rgbColor;
	red = red < 16 ? `0${red.toString(16)}` : red.toString(16);
	green = green < 16 ? `0${green.toString(16)}` : green.toString(16);
	blue = blue < 16 ? `0${blue.toString(16)}` : blue.toString(16);

	return `#${red}${green}${blue}`;
};

export {
	generateOppositeColor,
	getHexColorFromGradient,
	hexToRGB,
	rgbObjectToHex,
	rgbStringToHex
};
