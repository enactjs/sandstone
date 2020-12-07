import hoc from '@enact/core/hoc';
import React from 'react';
import pick from 'ramda/src/pick';
import omit from 'ramda/src/omit';

const PanelsStateContext = React.createContext(null);

const sharedContextProps = [
	'backButtonAriaLabel',
	'backButtonBackgroundOpacity',
	'closeButtonAriaLabel',
	'closeButtonBackgroundOpacity',
	'noBackButton',
	'noCloseButton',
	'onBack',
	'onClose'
];

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

function useContextAsDefaults (props) {
	const ctx = React.useContext(PanelsStateContext);

	const contextProps = {...ctx, ...getSharedProps(props)};

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
	// Array of prop names to add to the Wrapped component.
	props: []
};

const ContextAsDefaults = hoc(defaultConfig, (config, Wrapped) => {
	// eslint-disable-next-line no-shadow
	return function ContextAsDefaults (props) {
		const sharedProps = getSharedProps(props);

		const {contextProps, provideContextAsDefaults} = useContextAsDefaults(props, sharedProps);

		// The following generates a complete list of all of the props expected by Wrapped
		// Using `pick`, add the specifically requested shared context props
		// Using `omit`, exclude all of the shared props
		return provideContextAsDefaults(
			<Wrapped
				{...pick(config.props, contextProps)}
				{...omit(sharedContextProps, props)}
			/>
		);
	};
});

export {
	ContextAsDefaults,
	useContextAsDefaults,
	getSharedProps,
	deleteSharedProps
};
