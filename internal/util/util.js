import equals from 'ramda/src/equals';
import {memo} from 'react';

/**
 * Removes voice control related props from `props` and returns them in a new object.
 *
 * @function
 * @param   {Object}    props    Props object
 *
 * @returns {Object}             voice control related props
 * @memberof sandstone/internal/util
 * @private
 */
const extractVoiceProps = function (props) {
	const obj = {};
	Object.keys(props).forEach(key => {
		if (key.indexOf('data-webos-voice-') === 0) {
			obj[key] = props[key];
			delete props[key];
		}
	});

	return obj;
};

/**
 * Compares two children and returns true if they are equivalent, false otherwise.
 *
 * @function
 * @param   {children}    a    children props
*  @param   {children}    b    children props
 *
 * @returns {Boolean}          `true` if same
 * @memberof sandstone/internal/util
 * @private
 */
const compareChildren = (a, b) => {
	if (!a || !b || a.length !== b.length) return false;

	let type = null;
	for (let i = 0; i < a.length; i++) {
		type = type || typeof a[i];
		if (type === 'string') {
			if (a[i] !== b[i]) {
				return false;
			}
		} else if (!equals(a[i], b[i])) {
			return false;
		}
	}

	return true;
};

/**
 * Updates component only when given props are not shallowly equivalent, not updating otherwise.
 *
 * @function
 * @param   {any}    wrapped    A component
*  @param   {Array}  propKeys   Prop keys to compare
 *
 * @returns {any}               Conditionally memoized component
 * @memberof sandstone/internal/util
 * @private
 */
const onlyUpdateForProps = (wrapped, propKeys) => memo(wrapped, (prevProps, nextProps) => {
	const hasOwn = Object.prototype.hasOwnProperty;

	if (Array.isArray(propKeys)) {
		return propKeys.every((key) => hasOwn.call(prevProps, key) && hasOwn.call(nextProps, key) && Object.is(prevProps[key], nextProps[key]));
	}

	return false;
});

export {
	compareChildren,
	extractVoiceProps,
	onlyUpdateForProps
};
