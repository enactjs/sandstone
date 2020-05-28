import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

const CachedContext = React.createContext();

const CachedContextDecorator = (property) => ({children}) => {
	const context = React.useContext(CachedContext);

	return context && context[property] || children;
};

const CachedDecorator = hoc((config, Wrapped) => {
	// eslint-disable-next-line no-shadow
	function CachedDecorator ({cached, ...rest}) {
		const element = React.useRef(null);

		if (!cached) {
			return <Wrapped {...rest} />;
		}

		const updated = {};

		for (const key in rest) {
			const CachedContextProp = CachedContextDecorator(key);
			updated[key] = <CachedContextProp>{rest[key]}</CachedContextProp>;
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

	CachedDecorator.propTypes = /** @lends sandstone/ImageItem.CachedDecorator.prototype */ {
		/**
		 * Cache React elements.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		cached: PropTypes.bool
	};

	CachedDecorator.defaultProps = {
		cached: true
	};

	return CachedDecorator;
});

export default CachedDecorator;
export {
	CachedDecorator,
	CachedContextDecorator
};
