import {spottableClass} from '@enact/spotlight/Spottable';

/**
 * @private
 */
const getNumberValue = (index) => (
	// using 'bitwise or' for string > number conversion based on performance: https://jsperf.com/convert-string-to-number-techniques/7
	index | 0
);

/**
 * @private
 */
const getIndex = (node) => getNumberValue(node.dataset.index || node.parentNode.closest(`.${spottableClass}`).dataset.index);

export {
	getIndex,
	getNumberValue
};
