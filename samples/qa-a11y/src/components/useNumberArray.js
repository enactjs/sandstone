import React from 'react';

const useNumberArray = (num) => {
	const [numbers, setNumber] = React.useState(() => (new Array(num)).fill(0));

	const handler = (index, number) => () => setNumber([
		...numbers.slice(0, index),
		number,
		...numbers.slice(index + 1)
	]);

	return [numbers, handler];
};

export default useNumberArray;
export {
	useNumberArray
};
