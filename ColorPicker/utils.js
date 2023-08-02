/**
 * Checks for valid hex color, otherwise returns the black color.
 *
 * @param {String} hex	Hex color
 * @returns {String} Valid hex color
 * @private
 */
const checkHex = (hex) => {
	if (/^#[0-9A-F]{3,6}$/i.test(hex)) return hex;
	return '#000000';
};

/**
 * Converts hex color to hue, saturation, and lightness values.
 *
 * @param {String} hexColor
 * @returns {{s: number, h: number, l: number}}	HSL values
 * @private
 */
const hexToHSL = (hexColor) => {
	const hex = checkHex(hexColor);
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 7) {
		r = parseInt(hex.slice(1, 3), 16);
		g = parseInt(hex.slice(3, 5), 16);
		b = parseInt(hex.slice(5), 16);
	}

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
 *  Converts hue, saturation, and lightness values to hex color.
 *
 * @param {Number} h	Hue value
 * @param {Number} s	Saturation value
 * @param {Number} l	Lightness value
 * @returns {string}	6-digit hex color
 * @private
 */
const HSLToHex = (h, s, l) => {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

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
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}
	// Having obtained RGB, convert channels to hex
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

export {
	hexToHSL,
	HSLToHex
};
