import React from 'react';

const useEventHandlers = (length, initial = false) => {
	const [values, setValue] = React.useState(() => (new Array(length)).fill(initial));

	const handler = (index, bool) => () => setValue([
		...values.slice(0, index),
		bool,
		...values.slice(index + 1)
	]);

	return [values, handler];
};

export default useEventHandlers;
export {
	useEventHandlers
};
