import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../Button';

const NavigationButton = kind({
	name: 'NavigationButton',

	propTypes: {
		component: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.element,
			PropTypes.func
		]),
		onClick: PropTypes.func,
		visible: PropTypes.bool
	},

	render: ({component, visible, ...rest}) => {

		if (React.isValidElement(component)) {
			extractAriaProps(rest);

			Object.keys(component.props).forEach(key => {
				// Using the provided prop values as defaults for any component.props value that is
				// strictly undefined. This follows React's convention for default props in which a
				// default is used when a prop is either explicitly undefined or omitted and
				// therefore implicitly undefined.
				if (typeof component.props[key] !== 'undefined') {
					rest[key] = component.props[key];
				}
			});

			const Type = component.type;
			return (
				<Type {...rest} />
			);
		} else if (
			// Explicitly disabled via false/null or visible is set to false
			(component === false || component === null) ||
			// Using the default config and hidden at this time
			(typeof component === 'undefined' && !visible)
		) {
			return null;
		}

		const Component = (typeof component === 'function') ? component : Button;

		return (
			<Component {...rest} />
		);
	}
});

export default NavigationButton;
export {
	NavigationButton
};
