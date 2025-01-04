/*
 * This module loads Sandstone's locale specific fonts.
 *
 * _This is not intended to be directly included by external developers._ The purpose of this is to
 * override the existing "Sandstone" font family with a new typeface, conditionally when the system
 * locale matches the corresponding locale for the font (defined in this component's code).
 *
 */
let {addLocalizedFont, generateFontRules, generateFontOverrideRules} = require('@enact/ui/internal/localized-fonts');

const fontName = 'Sandstone';

// Locale Configuration Block
//
// "Shape" of the object below is as follows: [square brackets indicate optional elements]
// fonts = {
// 	locale|language|region: {
// 		regular: 'font name',
// 		[bold: 'font name',]
// 		[light: 'font name',]
// 		[unicodeRange: 'U+600-6FF,U+FE70-FEFE']
// 	},
// 	'ur': {
// 		regular: 'LG Smart UI Urdu',
// 		unicodeRange:
// 			'U+600-6FF,' +
// 			'U+FE70-FEFE,' +
// 			'U+FB50-FDFF'
// 	}
// };
const fonts = {
	'bn': {
		regular: 'LG Smart UI Bengali'
	},
	'gu': {
		regular: 'LG Smart UI Gujarati'
	},
	'hi' : {
		regular: 'LG Smart UI Devanagari'
	},
	'ja': {
		regular: 'LG Smart UI JP'
	},
	'kn': {
		regular: 'LG Smart UI Kannada'
	},
	'pa': {
		regular: 'LG Smart UI Gurmukhi'
	},
	'ta': {
		regular: 'LG Smart UI Tamil'
	},
	'te': {
		regular: 'LG Smart UI Telugu'
	},
	'ur': {
		regular: ['LG Smart UI Urdu', 'LGSmartUIUrdu'] // This needs 2 references because the "full name" differs from the "family name". To target this font file directly in all OSs we must also include the "postscript name" in addition to the "full name".
	},
	'zh-Hans': {
		regular: 'LG Smart UI SC'
	}
};

// Duplications and alternate locale names
fonts['as'] = fonts['bn'];
fonts['mr'] = fonts['hi'];
fonts['en-JP'] = fonts['ja'];

addLocalizedFont(fontName, fonts);

module.exports = generateFontRules;
module.exports.fontGenerator = generateFontRules;
module.exports.fontOverrideGenerator = generateFontOverrideRules;
module.exports.generateFontRules = generateFontRules;
