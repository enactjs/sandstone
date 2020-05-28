import hoc from '@enact/core/hoc';
import React from 'react';

const ImageItemContext = React.createContext({text: '', subText: ''});

const CachedContextDecorator = (property) => ({context: Context, children}) => {
	const context = React.useContext(Context);

	return context && context[property] || children;
};

const CachedDecorator = hoc((config, Wrapped) => {
	return ({cache, ...rest}) => {
		const element = React.useRef(null);

		return cache ?
			<ImageItemContext.Provider value={rest}>
				{(element.current = element.current || (
					<Wrapped
						{...rest}
						context={ImageItemContext}
					/>
				))}
			</ImageItemContext.Provider> :
			<Wrapped {...rest} context={ImageItemContext} />;
	};
});

export default CachedDecorator;
export {
    CachedDecorator,
    CachedContextDecorator
}
