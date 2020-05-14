import hoc from '@enact/core/hoc';
import React from 'react';
import pick from 'ramda/src/pick';

const PanelsStateContext = React.createContext(null);

const sharedContextProps = [
	'backButtonAriaLabel',
	'backButtonBackgroundOpacity',
	'closeButtonAriaLabel',
	'closeButtonBackgroundOpacity',
	'noBackButton',
	'noCloseButton',
	'onBack',
	'onClose',
	'type'
];

const defined = (val) => (typeof val !== 'undefined');

const assignIfDefined = (k, target, source) => (defined(source[k]) && (target[k] = source[k]));

// Accepts an object, returning only the keys that were defined
const filterEmpty = (source) => {
	return Object.keys(source || {}).reduce(
		(o, k) => {
			assignIfDefined(k, o, source);
			return o;
		}, {}
	);
};

// Given a full collection of props, return just the props from the shared list.
const getSharedProps = (props) => {
	return pick(sharedContextProps, props);
};

// Remove these shared props from the props object
const deleteSharedProps = (props) => {
	sharedContextProps.forEach(key => {
		delete props[key];
	});
};

function useContextAsDefaults (props, extraContext) {
	const ctx = React.useContext(PanelsStateContext);

	const contextProps = {...ctx, ...getSharedProps(filterEmpty(props)), ...filterEmpty(extraContext)};

	const provideContextAsDefaults = (children) => {
		return (
			<PanelsStateContext.Provider value={contextProps}>
				{children}
			</PanelsStateContext.Provider>
		);
	};

	return {
		contextProps,
		provideContextAsDefaults
	};
}

const defaultConfig = {
	// Array of prop names to include into the context injection
	// Used for props that aren't in the shared set, but should
	// still be available for access in the context.
	include: null
};

const ContextAsDefaults = hoc(defaultConfig, (config, Wrapped) => {
	// eslint-disable-next-line no-shadow
	return function ContextAsDefaults (props) {
		const sharedProps = getSharedProps(props);

		if (config.include && config.include.forEach) {
			config.include.forEach( p => assignIfDefined(p, sharedProps, props) );
		}

		const {contextProps, provideContextAsDefaults} = useContextAsDefaults(props, sharedProps);

		return provideContextAsDefaults(
			<Wrapped {...contextProps} {...filterEmpty(props)} />
		);
	};
});

export {
	ContextAsDefaults,
	useContextAsDefaults,
	getSharedProps,
	deleteSharedProps,
	filterEmpty
};
