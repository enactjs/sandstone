/**
 * Checks whether HEX color is valid.
 *
 * @function
 * @param {String} hex HEX color
 * @returns {Boolean} `false` if valid
 * @private
 */
const checkHex = (hex) => {
	return !/^#[0-9A-F]{6}$/i.test(hex);
};

/**
 * Converts hue, saturation, and lightness values to red, green, and blue values.
 *
 * @function
 * @param {number} h Hue value
 * @param {number} s Saturation value
 * @param {number} l Lightness value
 * @returns {{r: number, g: number, b: number, m: number}} RGB values and lightness adjustment
 * @private
 */
const calculateHslToRgb = ({h, s, l}) => {
	// Ensure h, s,l are within bounds
	h = h % 360; // Wrap-around hue to 0-359
	s = Math.max(0, Math.min(100, s)) / 100; // Clamp saturation to 0-100, then convert to 0-1
	l = Math.max(0, Math.min(100, l)) / 100; // Clamp lightness to 0-100, then convert to 0-1

	const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
	const x = c * (1 - Math.abs((h / 60) % 2 - 1)); // Second largest component
	const m = l - c / 2; // Adjust lightness
	let r = 0, g = 0, b = 0;

	if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if (300 <= h && h <= 360) {
		r = c; g = 0; b = x;
	}

	return {r, g, b, m};
};

/**
 * Converts red, green, and blue string to HEX color.
 *
 * @function
 * @param {string} rgbString
 * @returns {string|boolean} 6-digit HEX color if the input is valid, or `false` if the input is invalid
 * @private
 */
const rgbStringToHex = (rgbString) => {
	// Step 1: Check if the input starts with "rgb("
	if (!rgbString.startsWith("rgb(")) return false;

	// Step 2: Extract the numbers between "rgb(" and ")"
	let a = rgbString.slice(4, -1).split(",").map(s => s.trim());

	// Step 3: Validate that the array has exactly 3 valid RGB values (0–255)
	if (
		a.length !== 3 || // Ensure there are 3 values
		!a.every(v => /^\d+$/.test(v) && +v >= 0 && +v <= 255) // Check for valid digits and range
	) return false;

	// Step 4: Convert each RGB value to a 2-digit hex string
	return "#" + a.map(v => (+v).toString(16).padStart(2, "0")).join("").toUpperCase();
};

/**
 * Converts red, green, and blue values to HEX color.
 *
 * @function
 * @param r {number}
 * @param g {number}
 * @param b {number}
 * @returns {String} 6-digit HEX color
 * @private
 */
const rgbToHex = (r, g, b) => {
	return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
};

/**
 * Extracts color from gradient and converts it to HEX color.
 *
 * @function
 * @param {Object} canvasRef
 * @param {number} x
 * @param {number} y
 * @returns {String} 6-digit HEX color
 * @private
 */
const getHexColorFromGradient = (canvasRef, x, y) => {
	const ctx = canvasRef.current.getContext('2d');
	const imageData = ctx.getImageData(x, y, 1, 1);
	return rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
};

/**
 * Generates complementary HEX color.
 *
 * @function
 * @param {String} hexColor
 * @returns {String} 6-digit HEX color
 * @private
 */
const generateOppositeColor = (hexColor) => {
	hexColor = hexColor.replace('#', '');

	const bigint = parseInt(hexColor, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	return luminance > 128 ? '#101720CC' : '#FFFFFFCC';
};

/**
 * Converts HEX color to hue, saturation, and lightness values.
 *
 * @function
 * @param {String} hexColor
 * @returns {{h: number, s: number, l: number}}	HSL values
 * @private
 */
const hexToHSL = (hexColor) => {
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	r = parseInt(hexColor.slice(1, 3), 16);
	g = parseInt(hexColor.slice(3, 5), 16);
	b = parseInt(hexColor.slice(5), 16);

	// Then convert RGB to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h, s, l;

	if (delta === 0) {
		h = 0;
	} else if (cmax === r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax === g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);

	if (h < 0) {
		h += 360;
	}

	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {h: Math.round(h), s: Math.round(s), l: Math.round(l)};
};

/**
 * Converts HEX color to red, green, and blue values.
 *
 * @function
 * @param {String} hexColor
 * @returns {{red: number, green: number, blue: number}} RGB values
 * @private
 */
const hexToRGB = (hexColor) => {
	let internalColor = hexColor.replace('#', '').split('');

	return {
		red: parseInt(internalColor[0] + internalColor[1], 16),
		green: parseInt(internalColor[2] + internalColor[3], 16),
		blue: parseInt(internalColor[4] + internalColor[5], 16)
	};
};

/**
 *  Converts hue, saturation, and lightness values to HEX color.
 *
 * @function
 * @param {number} h Hue value
 * @param {number} s Saturation value
 * @param {number} l Lightness value
 * @returns {String} 6-digit hex color
 * @private
 */
const hslToHex = ({h, s, l}) => {
	let {r, g, b, m} = calculateHslToRgb({h, s, l});

	// Having obtained RGB, convert channels to HEX
	r = Math.round((r + m) * 255).toString(16);
	g = Math.round((g + m) * 255).toString(16);
	b = Math.round((b + m) * 255).toString(16);

	// Prepend 0s, if necessary
	if (r.length === 1) {
		r = "0" + r;
	}

	if (g.length === 1) {
		g = "0" + g;
	}

	if (b.length === 1) {
		b = "0" + b;
	}

	return "#" + r + g + b;
};

/**
 *  Converts hue, saturation, and lightness values to RGB string.
 *
 * @function
 * @param {number} h Hue value
 * @param {number} s Saturation value
 * @param {number} l Lightness value
 * @returns {String} RGB string
 * @private
 */
const hslToRGBString = ({h, s, l}) => {
	let {r, g, b, m} = calculateHslToRgb({h, s, l});

	// Having obtained RGB, convert channels to RGB string
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return r + ',' + g + ',' + b;
};

/**
 * Converts red, green, and blue values to HEX color.
 *
 * @function
 * @param {{red: number, green: number, blue: number}} rgbColor RGB values
 * @returns {String} 6-digit HEX color
 * @private
 */
const rgbObjectToHex = (rgbColor) => {
	let {red, green, blue} = rgbColor;

	red = red < 16 ? `0${Number(red).toString(16)}` : Number(red).toString(16);
	green = green < 16 ? `0${Number(green).toString(16)}` : Number(green).toString(16);
	blue = blue < 16 ? `0${Number(blue).toString(16)}` : Number(blue).toString(16);

	return `#${red}${green}${blue}`;
};

export {
	checkHex,
	generateOppositeColor,
	getHexColorFromGradient,
	hexToHSL,
	hexToRGB,
	hslToHex,
	hslToRGBString,
	rgbObjectToHex,
	rgbStringToHex
};
