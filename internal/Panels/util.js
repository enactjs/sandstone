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
	return Object.keys(source).reduce(
		(o, k) => {
			assignIfDefined(k, o, source);
			return o;
		}, {}
	);
};

// const deleteEmpty = (source) => {
// 	Object.keys(source).forEach(key => {
// 		if (!defined(source[key])) {
// 			delete source[key];
// 		}
// 	});
// };

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

function useContextAsDefaultProps (props) {
	const ctx = React.useContext(PanelsStateContext);

	const incomingShared = filterEmpty(getSharedProps(props));
	// Add shared props to context
	Object.assign(ctx, incomingShared);

	return filterEmpty(ctx);
}

const defaultConfig = {
	// Array of prop names to include into the context injection
	// Used for props that aren't in the shared set, but should
	// still be available for access in the context.
	include: null
};

//
//
//
// I need to relay a new context out through each usage, without hard coding hierarchic levels
//
//
//




const AddContext = hoc(defaultConfig, (config, Wrapped) => {
	// eslint-disable-next-line no-shadow
	return function AddContext (props) {
		const ctx = getSharedProps(props);

		if (config.include && config.include.forEach) {
			config.include.forEach( p => assignIfDefined(p, ctx, props) );
		}

		// console.log('ContextAsDefaultProps ctx:', ctx);
		return (
			<PanelsStateContext.Provider value={ctx}>
				<Wrapped {...props} />
			</PanelsStateContext.Provider>
		);
	};
});

export {
	AddContext,
	useContextAsDefaultProps,
	PanelsStateContext,
	getSharedProps,
	deleteSharedProps,
	// deleteEmpty,
	filterEmpty
};
