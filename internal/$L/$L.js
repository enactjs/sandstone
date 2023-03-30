/* global ILIB_SANDSTONE_PATH */

import {getIStringFromBundle} from '@enact/i18n/src/resBundle';
import ResBundle from 'ilib/lib/ResBundle';

// The ilib.ResBundle for the active locale used by $L
let resBundle;

/**
 * Returns the current ilib.ResBundle
 *
 * @returns {ilib.ResBundle} Current ResBundle
 */
function getResBundle () {
	return resBundle;
}

/**
 * Creates a new ilib.ResBundle for string translation
 *
 * @param  {ilib.Locale} locale Locale for ResBundle
 *
 * @returns {Promise|ResBundle} Resolves with a new ilib.ResBundle
 */
function createResBundle (options) {
	let opts = options;

	if (typeof ILIB_SANDSTONE_PATH !== 'undefined') {
		opts.basePath = ILIB_SANDSTONE_PATH;
	}

	if (!opts.onLoad) return;
	console.log("sandstone:::: internal/$L createResBundle!!!, options ", options);
	// eslint-disable-next-line no-new
	new ResBundle({
		...opts,
		onLoad: (bundle) => {
			console.log("sandstone:::: internal/$L onLoad!!!, bundle ", bundle);
			setResBundle(bundle || null);
			opts.onLoad(bundle || null);
		}
	});
}

/**
 * Deletes the current bundle object of strings.
 * @returns {undefined}
 */
function clearResBundle () {
	delete ResBundle.strings;
	delete ResBundle.sysres;
	resBundle = null;
}

/**
 * Set the locale for the strings that $L loads. This may reload the
 * string resources if necessary.
 *
 * @param {string} spec the locale specifier
 * @returns {ilib.ResBundle} Current ResBundle
 */
function setResBundle (bundle) {
	console.log("setResBundle! ", bundle);
	return (resBundle = bundle);
}

async function toIString (str) {
	let rb = getResBundle();

	console.log("sandstone/internal/$L ", str, "rb ? ", rb);
	if (!rb) {
		let promise = new Promise((resolve, reject) => {
			createResBundle({
				sync: false,
				onLoad: resolve
			});
		});

		let result = await promise;
		rb = getResBundle();
		console.log("toIString, rb ?", rb);
	}

	let string = getIStringFromBundle(str, rb);
	console.log("returning string ", string);

	return string;
}

/**
 * Maps a string or key/value object to a translated string for the current locale.
 *
 * @function
 * @memberof i18n/$L
 * @param  {String|Object} str Source string
 *
 * @returns {String} The translated string
 */
function $L (str) {
	return new Promise((resolve, reject) => {
		toIString(str).then((result) => {
			console.log("Resolving $L ", result);
			resolve(String(result));
		}, reject);
	});
}

export default $L;
export {
	$L,
	clearResBundle,
	createResBundle,
	setResBundle
};
