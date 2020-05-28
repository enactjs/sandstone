import hoc from '@enact/core/hoc';
import React from 'react';

const CachedContext = React.createContext();

const CachedContextDecorator = (property) => ({children}) => {
	const context = React.useContext(CachedContext);

	return context && context[property] || children;
};

const CachedDecorator = hoc((config, Wrapped) => {
	return ({cached, ...rest}) => {
		const element = React.useRef(null);

		if (!cached) {
			return <Wrapped {...rest} />;
		}

		const updated = {};

		for (const key in rest) {
			const CachedContextProp = CachedContextDecorator(key);
			updated[key] = <CachedContextProp>{rest[key]}</CachedContextProp>;
			console.log(key)
		}

		element.current = element.current || (
			<Wrapped
				{...updated}
				context={CachedContext}
			/>
		);

		return (
			<CachedContext.Provider value={rest}>
				{element.current}
			</CachedContext.Provider>
		);
	};
});

export default CachedDecorator;
export {
    CachedDecorator,
    CachedContextDecorator
}
