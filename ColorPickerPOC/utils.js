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

const hexToRGB = (hexColor) => {
	let internalColor = hexColor.replace('#', '').split('');

	return {
		red: parseInt(internalColor[0] + internalColor[1], 16),
		green: parseInt(internalColor[2] + internalColor[3], 16),
		blue: parseInt(internalColor[4] + internalColor[5], 16)
	};
};

const hslToHex = ({h, s, l}) => {
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
	} else if (300 <= h && h <= 360) {
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

const hslToRGBString = ({h, s, l}) => {
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
	} else if (300 <= h && h <= 360) {
		r = c; g = 0; b = x;
	}

	// Having obtained RGB, convert channels to hex
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);
	return r + ',' + g + ',' + b;
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
	hexToHSL,
	hexToRGB,
	hslToHex,
	hslToRGBString,
	rgbObjectToHex,
	rgbStringToHex
};
