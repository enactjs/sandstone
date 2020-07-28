/**
 * Get the item node contained in the current contentRef from target.
 * It could be the target itself or the ancestor node of the target.
 *
 * @function
 * @param {Node} contentRef VirtualList content node
 * @param {Node} target Event target or next candidate target
 *
 * @returns {Node} itemNode in the current contentRef
 * @private
 */
const getTargetItemNode = (contentRef, target) => {
	if (!target || !contentRef) {
		return null;
	}
	// To support nested VirtualList, need to get the nearest item node from contentRef.
	let itemNode = target;
	let parentNode = target && target.parentNode;
	while (contentRef && parentNode && contentRef !== parentNode.parentNode) {
		itemNode = parentNode;
		parentNode = parentNode.parentNode;
	}
	return itemNode;
};

/**
 * Convert index value from string to number
 *
 * @function
 * @param {String} index index value from dataset.
 *
 * @returns {Number} Index value converted to a value greater than or equal to 0.
 * @private
 */
const getNumberValue = (index) => {
	// using '+ operator' for string > number conversion based on performance: https://jsperf.com/convert-string-to-number-techniques/7
	let number = +index;
	// should return -1 if index is not a number or a negative value
	return number >= 0 ? number : -1;
};

/**
 * Convert index value from string to number
 *
 * @function
 *
 * @returns {Number} Function that do nothing.
 * @private
 */
const nop = () => {};

export {
	getTargetItemNode,
	getNumberValue,
	nop
};
