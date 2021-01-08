import React from 'react';

const useArrayState = (length, initialValue = false) => {
	const [values, setValue] = React.useState(() => (new Array(length)).fill(initialValue));

	const handler = (index, bool) => () => setValue([
		...values.slice(0, index),
		bool,
		...values.slice(index + 1)
	]);

	return [values, handler];
};

export default useArrayState;
export {
	useArrayState
};
