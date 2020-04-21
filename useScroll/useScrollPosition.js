import hoc from '@enact/core/hoc';
import React, {useContext, useState} from 'react';

const ScrollPositionContext = React.createContext(null);

const defaultConfig = {
	/**
	 * The name of the prop in the context that will be filled with the result of the
	 * transform function.
	 *
	 * @type {string}
	 * @default 'value'
	 * @private
	 */
	valueProp: 'value',

	/**
	 * A function that takes the scroll position and ID of a scroller and produces a value to be set
	 * into `valueProp`. By default, returns the scroll position object received as a parameter.
	 *
	 * @type {Function}
	 * @private
	 */
	transform: obj => (obj)
};

/**
 * Creates a context provider that monitors for `onScroll` events, transforms the results and makes
 * the transformation result available to `useScrollPosition`.
 * @private
 */
const ScrollPositionDecorator = hoc(defaultConfig, (configHoc, Wrapped) => {
	const valueProp = configHoc.valueProp;

	// eslint-disable-next-line no-shadow
	function ScrollPositionDecorator (props) {
		const [state, setState] = useState();
		return (
			<ScrollPositionContext.Provider
				value={{
					[valueProp]: state,
					onScroll: (scroll => setState(configHoc.transform(scroll)))
				}}
			>
				<Wrapped {...props} />
			</ScrollPositionContext.Provider>
		);
	}
	return ScrollPositionDecorator;
});

/**
 * A hook to retrieve the value of the `valueProp` from `ScrollPositionDecorator`.
 * @private
 */
const useScrollPosition = () => useContext(ScrollPositionContext);

export {
	ScrollPositionDecorator,
	useScrollPosition
};
