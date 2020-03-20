import hoc from '@enact/core/hoc';
import React, {useContext, useState} from 'react';

const ScrollPositionContext = React.createContext(null);

const defaultConfig = {
	/**
	 * The name of the prop in the context that will be filled with the result of the
	 * transform function.
	 * @private
	 */
	valueProp: 'collapsed',

	/**
	 * A function that takes the scroll position and ID of a scroller and produces a value
	 * to be set into `valueProp`.
	 * @private
	 */
	transform: ({y}) => (y > 184)
};

/**
 * Creates a context provider that monitors for `onScroll` events, transforms the results and makes
 * the transformation result available to `useScrollPosition`.
 * @private
 */
const ScrollPositionDecorator = hoc(defaultConfig, (configHoc, Wrapped) => {
	const valueProp = configHoc.valueProp;

	const ScrollPositionProvider = (props) => {
		const [state, setState] = useState(false);
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
	};
	ScrollPositionProvider.displayName = 'ScrollPositionDecorator';
	return ScrollPositionProvider;
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
