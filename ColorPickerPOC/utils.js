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
	hexToRGB,
	rgbObjectToHex,
	rgbStringToHex
};
