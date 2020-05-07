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
			// if (source[k] != null) {
			if (typeof source[k] !== 'undefined') {
				// addInternalProp(o, k, source[k]);
				o[k] = source[k];
			}
			return o;
		}, {}
	);
};

// Remove the context props off the props object, returning the removed elements.
const extractContextProps = (props) => {
	// Clone all of the shared props into a new object
	const p = pick(sharedContextProps, props);
	// Remove these shared props from the props object
	sharedContextProps.forEach(key => {
		delete props[key];
	});
	// for (const key in props) {
	// 	if (sharedContextProps.includes(key)) {
	// 		p[key] = props[key];
	// 		delete props[key];
	// 	}
	// }
	return p;
};

const deleteContextFromProps = (props, context) => {
	// console.groupCollapsed('deleteContextFromProps');
	// const removed = {};
	// const p = Object.assign({}, props);
	for (const key in context) {
		if (props.hasOwnProperty(key)) {
			// console.log('Deleting %s with value "%s" from props', key, props[key]);
			// removed[key] = props[key];
			delete props[key];
			// delete p[key];
		}
	}
	// console.table(removed);
	// console.groupEnd();
	// return p;
};

export {
	extractContextProps,
	deleteContextFromProps,
	filterEmpty
};
