/* global document */

// This must be passed to/called within browser.execute to obtain a proper reference to document
function getFocusedText () {
	// Text but dropping non-ASCII characters (like icons)
	return document.activeElement.textContent.replace(/[^\x00-\x7F]/g, '');
}

module.exports = {
	getFocusedText
};
