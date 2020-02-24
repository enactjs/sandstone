import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import ContextualPopupDecorator from '../ContextualPopupDecorator';
import Skinnable from '../Skinnable';

import css from './ContextualMenuDecorator.module.less';

/**
 * Default config for {@link sandstone/ContextualMenuDecorator.ContextualMenuDecorator}
 *
 * @type {Object}
 * @hocconfig
 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator
 */
const defaultConfig = {
	/**
	 * Disables passing the `skin` prop to the wrapped component.
	 *
	 * @see {@link sandstone/Skinnable.Skinnable.skin}
	 * @type {Boolean}
	 * @default false
	 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator.defaultConfig
	 * @public
	 */
	noSkin: false,

	/**
	 * The prop in which to pass the value of `open` state of ContextualMenuDecorator to the
	 * wrapped component.
	 *
	 * @type {String}
	 * @default 'selected'
	 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator.defaultConfig
	 * @public
	 */
	openProp: 'selected'
};

const ContextualMenuDecorator = hoc(defaultConfig, (config, Wrapped) => {
	// we might not need Skinnable at all here. If we want to skin the popup and it's defined as a
	// private component in this module, we can wrap it with skinnable and style it as needed there.
	const Component = Skinnable(
		ContextualPopupDecorator(
			{...config, noArrow: true},
			Wrapped
		)
	);

	return kind({
		name: 'ContextualMenuDecorator',

		propTypes: {
			direction: PropTypes.oneOf(),
			popupClassName: PropTypes.string
		},

		defaultProps: {
			direction: 'below'
		},

		styles: {
			css
		},

		computed: {
			// expect we'll be able to drop this when we add the private popupComponent
			// implementation with the Repeater for the items since the popup class could be set
			// on the component by itself
			popupClassName: ({popupClassName, styler}) => styler.join(
				'popup',
				popupClassName
			)
		},

		render: (props) => {
			return <Component {...props} />;
		}
	});
});

export default ContextualMenuDecorator;
export {
	ContextualMenuDecorator
};
