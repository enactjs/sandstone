import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

const CachedContext = React.createContext();

const CachedChildrenContextDecorator = (property) => {
	// eslint-disable-next-line no-shadow
	function CachedChildrenContextDecorator ({children}) {
		const context = React.useContext(CachedContext);

		return context && context[property] || children;
	}

	return CachedChildrenContextDecorator;
};

const CachedPropContextDecorator = ({filterProps}) => {
	// eslint-disable-next-line no-shadow
	function CachedPropContextDecorator ({cached, children}) {
		if (cached) {
			return (
				<CachedContext.Consumer>
					{(props) => {
						const cachedProps = {};

						for (const key in props) {
							if (filterProps.indexOf(key) >= 0) {
								cachedProps[key] = props[key];
							}
						}

						return children ? children(cachedProps) : null;
					}}
				</CachedContext.Consumer>
			);
		} else {
			return children && typeof children === 'function' ? children({}) : null;
		}
	}

	CachedPropContextDecorator.propTypes = /** @lends sandstone/ImageItem.CachedPropContextDecorator.prototype */ {
		/**
		 * Cache React elements.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		cached: PropTypes.bool
	};

	CachedPropContextDecorator.defaultProps = {
		cached: true
	};

	return CachedPropContextDecorator;
};

/**
 * Default config for `CachedDecorator`.
 *
 * @memberof ui/ImageItem.CachedDecorator
 * @hocconfig
 * @private
 */
const defaultConfig = {
	/**
	 * The array includes the key strings of the context object
	 * which will be used as children prop.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	filterChildren: [],

	/**
	 * The array includes the key strings of the context object
	 * which will be passed as a prop in a React element.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	filterProps: []
};

/**
 * A higher-order component that caches React elements, but allows context values to re-render.
 *
 * Example:
 * ```
 * const ImageItemDecorator = compose(
 * 	CachedDecorator({filterChildren: ['children', 'label']}),
 * 	MarqueeController({marqueeOnFocus: true}),
 * 	Spottable,
 * 	Skinnable
 * );
 * ```
 *
 * @class CachedDecorator
 * @memberof ui/ImageItem
 * @hoc
 * @private
 */
const CachedDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {filterChildren} = config;

	// eslint-disable-next-line no-shadow
	function CachedDecorator ({cached, ...rest}) {
		const element = React.useRef(null);

		if (!cached) {
			return <Wrapped {...rest} />;
		}

		const cachedProps = {};
		const updatedProps = {};

		for (const key in rest) {
			if (filterChildren.indexOf(key) >= 0) {
				const CachedContextProp = CachedChildrenContextDecorator(key);
				cachedProps[key] = <CachedContextProp>{rest[key]}</CachedContextProp>;
			} else {
				updatedProps[key] = rest[key];
			}
		}

		element.current = element.current || (
			<Wrapped
				{...cachedProps}
				{...updatedProps}
			/>
		);

		return (
			<CachedContext.Provider value={rest}>
				{element.current}
			</CachedContext.Provider>
		);
	}

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
	CachedContext,
	CachedPropContextDecorator,
	CachedDecorator,
	CachedChildrenContextDecorator
};
