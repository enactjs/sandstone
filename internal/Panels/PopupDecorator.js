import {forward, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import Pause from '@enact/spotlight/Pause';
import IdProvider from '@enact/ui/internal/IdProvider';
import classnames from 'classnames';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../../Skinnable';
import Popup from '../../Popup';

import CancelDecorator from './CancelDecorator';

// List all of the props from Popup that we want to move from this component's root onto Popup.
const popupPropList = ['noAutoDismiss', 'onKeyDown', 'onShow', 'open', 'position', 'spotlightId'];

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
	 * Support accessibility options.
	 *
	 * If true, the aria-live and role in Popup are `null`.
	 *
	 * @type {Boolean}
	 * @default false
	 * @memberof sandstone/Panels.PopupDecorator.defaultConfig
	 */
	noAlertRole: false,

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
	const {className: cfgClassName, css, noAlertRole, panelArranger, panelType} = config;
	const CancelableWrapped = CancelDecorator({cancel: 'onBack'}, Wrapped);

	class Decorator extends React.Component {
		static displayName = 'PopupDecorator';

		static propTypes = /** @lends sandstone/Panels.PopupDecorator.prototype */ {
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
			 * Instructs the Popup to fill the entire height of the screen.
			 *
			 * Normally, the popup will flex in height to match the size of the content until the
			 * screen bounds are met. Use this if you require a full-height popup but don't have
			 * enough content to fill the space or you want a component to stretch to the edges.
			 *
			 * @type {Boolean}
			 * @public
			 */
			fullHeight: PropTypes.bool,

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
			 * Scrim type.
			 *
			 * @type {('transparent'|'translucent'|'none')}
			 * @default 'translucent'
			 * @public
			 */
			scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),

			/**
			 * Restricts or prioritizes navigation when focus attempts to leave the popup.
			 *
			 * @type {('self-first'|'self-only')}
			 * @default 'self-only'
			 * @public
			 */
			spotlightRestrict: PropTypes.oneOf(['self-first', 'self-only']),

			/**
			 * Size of the popup.
			 *
			 * @type {('narrow'|'half')}
			 * @default 'narrow'
			 * @private
			 */
			width: PropTypes.oneOf(['narrow', 'half'])
		};

		static defaultProps = {
			fullHeight: false,
			index: 0,
			noAnimation: false,
			position: 'right',
			scrimType: 'translucent',
			spotlightRestrict: 'self-only',
			width: 'narrow'
		};

		constructor () {
			super();
			this.paused = new Pause('PopupDecorator');
		};

		pause = () => this.paused.pause();

		resume = () => this.paused.resume();

		handle = handle.bind(this);

		handleHide = this.handle(
			forward('onHide'),
			this.resume
		);

		handleTransition = this.handle(
			forward('onTransition'),
			this.resume
		);

		handleWillTransition = this.handle(
			forward('onWillTransition'),
			this.pause
		);

		render () {
			const {children, className, fullHeight, generateId, id, index, noAnimation, onBack, onClose, scrimType, spotlightRestrict, width, ...rest} = this.props;
			const classes = classnames(css[cfgClassName], css[width], css[fullHeight]);
			const count = React.Children.count(children);
			const popupSpotlightRestrict = scrimType !== 'none' ? 'self-only' : spotlightRestrict;
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
				<Popup
					{...popupProps}
					className={classes}
					data-index={index}
					id={id}
					css={css}
					no5WayClose
					noAlertRole={noAlertRole}
					noAnimation={noAnimation}
					onClose={onClose}
					onHide={this.handleHide}
					scrimType={scrimType}
					spotlightRestrict={popupSpotlightRestrict}
				>
					<CancelableWrapped
						{...rest}
						arranger={panelArranger}
						className={css.viewport}
						generateId={generateId}
						id={`${id}_panels`}
						index={index}
						noAnimation={noAnimation}
						onBack={onBack}
						onClose={onClose}
						onTransition={this.handleTransition}
						onWillTransition={this.handleWillTransition}
						type={panelType}
					>
						{children}
					</CancelableWrapped>
				</Popup>
			);
		};
	};

	return IdProvider(
		Skinnable(
			Decorator
		)
	);
});

export default PopupDecorator;
export {PopupDecorator};
