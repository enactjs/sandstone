import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

const CacheReactElementContext = React.createContext();

const CacheReactElementWithChildrenContextDecorator = (property) => {
	// eslint-disable-next-line no-shadow
	function CacheReactElementWithChildrenContextDecorator ({children}) {
		const context = React.useContext(CacheReactElementContext);

		return context && context[property] || children;
	}

	return CacheReactElementWithChildrenContextDecorator;
};

const CacheReactElementWithPropContextDecorator = ({filterProps}) => {
	function CacheReactElementWithPropContext ({cached, children}) {
		if (cached) {
			return (
				<CacheReactElementContext.Consumer>
					{(props) => {
						const cachedProps = {};

						for (const key in props) {
							if (filterProps.indexOf(key) >= 0) {
								cachedProps[key] = props[key];
							}
						}

						return children ? children(cachedProps) : null;
					}}
				</CacheReactElementContext.Consumer>
			);
		} else {
			return children && typeof children === 'function' ? children({}) : null;
		}
	}

	CacheReactElementWithPropContext.propTypes = /** @lends sandstone/ImageItem.CacheReactElementWithPropContextDecorator.prototype */ {
		/**
		 * Cache React elements.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		cached: PropTypes.bool
	};

	CacheReactElementWithPropContext.defaultProps = {
		cached: true
	};

	return CacheReactElementWithPropContext;
};

/**
 * Default config for `CacheReactElementDecorator`.
 *
 * @memberof ui/ImageItem.CacheReactElementDecorator
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
	filterChildren: []
};

/**
 * A higher-order component that caches React elements, but allows context values to re-render.
 *
 * Example:
 * ```
 * const ImageItemDecorator = compose(
 * 	CacheReactElementDecorator({filterChildren: ['children', 'label']}),
 * 	MarqueeController({marqueeOnFocus: true}),
 * 	Spottable,
 * 	Skinnable
 * );
 * ```
 *
 * @class CacheReactElementDecorator
 * @memberof ui/ImageItem
 * @hoc
 * @private
 */
const CacheReactElementDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {filterChildren} = config;

	// eslint-disable-next-line no-shadow
	function CacheReactElementDecorator ({cached, ...rest}) {
		const element = React.useRef(null);

		if (!cached) {
			return <Wrapped {...rest} />;
		}

		const cachedProps = {};
		const updatedProps = {};

		for (const key in rest) {
			if (filterChildren.indexOf(key) >= 0) {
				const CachedContextProp = CacheReactElementWithChildrenContextDecorator(key);
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
			<CacheReactElementContext.Provider value={rest}>
				{element.current}
			</CacheReactElementContext.Provider>
		);
	}

	CacheReactElementDecorator.propTypes = /** @lends sandstone/ImageItem.CacheReactElementDecorator.prototype */ {
		/**
		 * Cache React elements.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		cached: PropTypes.bool
	};

	CacheReactElementDecorator.defaultProps = {
		cached: true
	};

	return CacheReactElementDecorator;
});

export default CacheReactElementDecorator;
export {
	CacheReactElementContext,
	CacheReactElementDecorator,
	CacheReactElementWithChildrenContextDecorator,
	CacheReactElementWithPropContextDecorator
};
