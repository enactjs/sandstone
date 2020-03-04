import equals from 'ramda/src/equals';

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

export {
	compareChildren,
	extractVoiceProps
};
