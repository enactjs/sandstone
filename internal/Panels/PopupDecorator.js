import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import IdProvider from '@enact/ui/internal/IdProvider';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../../Skinnable';
import Popup from '../../Popup';

import CancelDecorator from './CancelDecorator';

// List all of the props from Popup that we want to move from this component's root onto Popup.
const popupPropList = ['noAutoDismiss', 'onHide', 'onKeyDown', 'onShow', 'open',
	'position', 'scrimType', 'spotlightId', 'spotlightRestrict'];

// TODO: Figure out how to document private sub-module members

/**
 * Default config for {@link sandstone/Panels.PopupDecorator}
 * @hocconfig
 * @memberof sandstone/Panels.PopupDecorator
 * @private
 */
const defaultConfig = {
	/**
	 * Classes to be added to the root node
	 *
	 * @type {String}
	 * @default null
	 * @memberof sandstone/Panels.PopupDecorator.defaultConfig
	 */
	className: null,

	/**
	 * Class name module map
	 *
	 * @type {Object}
	 * @default null
	 * @memberof sandstone/Panels.PopupDecorator.defaultConfig
	 */
	css: null,

	/**
	 * Arranger for Panels
	 *
	 * @type {Object}
	 * @default null
	 * @memberof sandstone/Panels.PopupDecorator.defaultConfig
	 */
	panelArranger: null
};


/**
 * A higher-order component that puts a Panels component into a Popup.
 *
 * @class PopupDecorator
 * @type {Function}
 * @hoc
 * @private
 * @memberof sandstone/Panels
 */
const PopupDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {className: cfgClassName, css, panelArranger, panelType} = config;

	const Decorator = kind({
		name: 'PopupDecorator',

		propTypes: /** @lends sandstone/Panels.PopupDecorator.prototype */ {
			/**
			 * An object containing properties to be passed to each child.
			 *
			 * @type {Object}
			 * @public
			 */
			childProps: PropTypes.object,

			/**
			 * Panels to be rendered
			 *
			 * @type {Node}
			 */
			children: PropTypes.node,

			/**
			 * Function that generates unique identifiers for Panel instances
			 *
			 * @type {Function}
			 * @required
			 * @private
			 */
			generateId: PropTypes.func,

			/**
			 * Unique identifier for the Panels instance
			 *
			 * @type {String}
			 * @public
			 */
			id: PropTypes.string,

			/**
			 * Index of the active panel
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			index: PropTypes.number,

			/**
			 * Disable transitions.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			noAnimation: PropTypes.bool,

			/**
			 * Called with cancel/back key events.
			 *
			 * @type {Function}
			 * @public
			 */
			onBack: PropTypes.func,

			/**
			 * Called when closing this Panels instance.
			 *
			 * @type {Function}
			 * @public
			 */
			onClose: PropTypes.func,

			/**
			 * Position of the Popup on the screen.
			 *
			 * @type {('left'|'right')}
			 * @default 'right'
			 * @public
			 */
			// Intentionally excluded 'bottom', 'center', 'fullscreen', and 'top' as those aren't configured for this component at this time.
			position: PropTypes.oneOf(['left', 'right']),

			/**
			 * Size of the popup.
			 *
			 * @type {('thin'|'half')}
			 * @default 'thin'
			 * @private
			 */
			size: PropTypes.oneOf(['thin', 'half'])
		},

		defaultProps: {
			index: 0,
			noAnimation: false,
			position: 'right',
			size: 'thin'
		},

		styles: {
			css,
			className: cfgClassName
		},

		computed: {
			className: ({size, styler}) => styler.append(size)
		},

		render: ({children, className, generateId, id, index, noAnimation, onBack, onClose, ...rest}) => {
			const count = React.Children.count(children);
			invariant(
				index === 0 && count === 0 || index < count,
				`Panels index, ${index}, is invalid for number of children, ${count}`
			);

			// Extract all popup props
			const popupProps = {};
			for (const prop in rest) {
				if (popupPropList.indexOf(prop) >= 0) {
					popupProps[prop] = rest[prop];
					delete rest[prop];
				}
			}

			return (
				<Popup {...popupProps} className={className} data-index={index} id={id} css={css} noAnimation={noAnimation} onClose={onClose}>
					<Wrapped
						{...rest}
						arranger={panelArranger}
						generateId={generateId}
						id={`${id}_panels`}
						index={index}
						noAnimation={noAnimation}
						onBack={onBack}
						onClose={onClose}
						type={panelType}
					>
						{children}
					</Wrapped>
				</Popup>
			);
		}
	});

	return CancelDecorator(
		{cancel: 'onBack'},
		IdProvider(
			Skinnable(
				Decorator
			)
		)
	);
});

export default PopupDecorator;
export {PopupDecorator};
