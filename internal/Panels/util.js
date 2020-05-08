// import {addInternalProp} from '@enact/core/kind/util';
import pick from 'ramda/src/pick';

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

// Accepts an object, returning only the keys that were defined
const filterEmpty = (source) => {
	return Object.keys(source).reduce(
		(o, k) => {
			if (typeof source[k] !== 'undefined') {
				//
				// An idea to sort of _privatize_ the props that come in from context, so they don't
				// auto-spread down onto DOM nodes without being explicitly called out.
				//
				// addInternalProp(o, k, source[k]);
				o[k] = source[k];
			}
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

export {
	getSharedProps,
	deleteSharedProps,
	filterEmpty
};
