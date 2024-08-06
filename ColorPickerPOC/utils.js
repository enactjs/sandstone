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

const generateOppositeColor = (hexColor) => {
	hexColor = hexColor.replace('#', '');

	const bigint = parseInt(hexColor, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	return luminance > 128 ? '#101720CC' : '#FFFFFFCC';
};

export {
	generateOppositeColor,
	rgbStringToHex
};
