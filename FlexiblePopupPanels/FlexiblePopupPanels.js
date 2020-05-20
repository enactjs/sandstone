/**
 * Provides Sandstone styled flexible-width, popup-styled Panels component.
 *
 * @module sandstone/FlexiblePopupPanels
 * @exports FlexiblePopupPanels
 * @exports Panel
 * @exports Header
 */

import kind from '@enact/core/kind';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import $L from '../internal/$L';
import Button from '../Button';
import {FadeAndSlideArranger, PanelsStateContext, PopupDecorator, Viewport} from '../internal/Panels';
import {deleteSharedProps, getSharedProps, useContextAsDefaults} from '../internal/Panels/util';
import {PanelBase as DefaultPanel, PanelDecorator as DefaultPanelDecorator} from '../Panels/Panel';
import DefaultHeader from '../Panels/Header';

import css from './FlexiblePopupPanels.module.less';

const FlexiblePopupPanelsDecorator = compose(
	PopupDecorator({
		className: 'flexiblePopupPanels',
		css,
		panelArranger: FadeAndSlideArranger,
		panelType: 'flexiblePopup'
	})
);

const NavigationButton = kind({
	name: 'NavigationButton',

	propTypes: {
		button: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.element,
			PropTypes.function
		]),
		onClick: PropTypes.func,
		visible: PropTypes.bool
	},

	render: ({button, visible, ...rest}) => {

		if ((React.isValidElement(button)) && visible) {

			Object.keys(button.props).forEach(key => {
				// Using the provided prop values as defaults for any button.props value that is
				// strictly undefined. This follows React's convention for default props in which a
				// default is used when a prop is either explicitly undefined or omitted and
				// therefore implicitly undefined.
				//
				// eslint-disable-next-line no-undefined
				if (button.props[key] !== undefined) {
					rest[key] = button.props[key];
				}
			});

			const Type = button.type;
			return (
				<Type {...rest} />
			);
		} else if (
			// Explicitly disabled via false/null or visible is set to false
			(button === false || button === null || !visible) ||
			// Using the default config and hidden at this time
			// eslint-disable-next-line no-undefined
			(button === undefined && !visible)
		) {
			return null;
		}

		const Component = typeof button === 'function' ? button : Button;

		return (
			<Component {...rest} />
		);
	}
});

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the left
 * or right side of the screen inside a popup. This panel flexes both horizontally and vertically,
 * with the Header positioned outside the Panel background area. This is typically used for a single
 * setting or control at a time, for maximum background area viewing.
 *
 * @class FlexiblePopupPanels
 * @memberof sandstone/FlexiblePopupPanels
 * @ui
 * @public
 */
const FlexiblePopupPanels = FlexiblePopupPanelsDecorator(Viewport);

/**
 * The standard view container used inside a [FlexiblePopupPanels]{@link sandstone/FlexiblePopupPanels.FlexiblePopupPanels} view
 * manager instance.
 *
 * @class Panel
 * @extends sandstone/Panels.Panel
 * @memberof sandstone/FlexiblePopupPanels
 * @ui
 * @public
 */

const PanelBase = kind({
	name: 'Panel',

	contextType: PanelsStateContext,

	propTypes: /** @lends sandstone/FlexiblePopupPanels.Panel.prototype */ {
		backButton: PropTypes.any,
		nextButton: PropTypes.any,

		/**
		* Omits the next button component.
		*
		* @type {Boolean}
		* @public
		*/
		noNextButton: PropTypes.bool,

		/**
		* Omits the previous button component.
		*
		* @type {Boolean}
		* @public
		*/
		noPrevButton: PropTypes.bool
	},

	handlers: {
		handleNextClick: () => {
			// go to next panel
		}
	},

	computed: {
		children: ({backButton, children, handleNextClick, nextButton, noNextButton, ...rest}) => {
			const sharedProps = getSharedProps(rest);
			const {noBackButton, onBack} = sharedProps;

			return (
				<Row>
					{!noBackButton ?
						<Cell align="center" shrink>
							<NavigationButton
								backgroundOpacity="transparent"
								button={backButton}
								icon="arrowlargeleft"
								iconPosition="after"
								minWidth={false}
								onClick={onBack}
								size="small"
								visible
							/>
						</Cell> :
						null
					}
					<Cell className={css.viewport} shrink>{children}</Cell>
					{!noNextButton ?
						<Cell align="center" shrink>
							<NavigationButton
								backgroundOpacity="transparent"
								button={nextButton}
								icon="arrowlargeright"
								iconPosition="after"
								minWidth={false}
								onClick={handleNextClick}
								size="small"
								visible
							/>
						</Cell> :
						null
					}
				</Row>
			);
		}
	},

	render: (props) => {
		deleteSharedProps(props);
		delete props.handleNextClick;

		return (<DefaultPanel {...props} css={css} />);
	}
});

const ContextAsDefaultsPanel = (Wrapped) => {
	// eslint-disable-next-line no-shadow
	return function ContextAsDefaultsPanel (props) {
		const {contextProps, provideContextAsDefaults} = useContextAsDefaults(props);

		return provideContextAsDefaults(
			<Wrapped
				{...contextProps}
				{...props}
			/>
		);
	};
};

const PanelDecorator = compose(
	DefaultPanelDecorator,
	ContextAsDefaultsPanel
);

const Panel = PanelDecorator(PanelBase);

/**
 * A shortcut to access {@link sandstone/FlexiblePopupPanels.Panel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/FlexiblePopupPanels.FlexiblePopupPanels
 */
FlexiblePopupPanels.Panel = Panel;

const ContextAsDefaultsHeader = (Wrapped) => {
	// eslint-disable-next-line no-shadow
	return function ContextAsDefaultsPanel (props) {
		const {contextProps, provideContextAsDefaults} = useContextAsDefaults(props);

		return provideContextAsDefaults(
			<Wrapped
				{...contextProps}
				{...props}
			/>
		);
	};
};

/**
 * A header component for a Panel with a `title` and `subtitle`, supporting several configurable
 * [`slots`]{@link ui/Slottable.Slottable} for components.
 *
 * @class Header
 * @extends sandstone/Panels.Header
 * @memberof sandstone/FlexiblePopupPanels
 * @ui
 * @public
 */
const HeaderBase = kind({
	name: 'Header',

	propTypes: /** @lends sandstone/FlexiblePopupPanels.Header.prototype */ {
		/**
		 * Hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Background opacity of the application close button.
		 *
		 * @type {('opaque'|'transparent')}
		 * @default 'transparent'
		 * @public
		 */
		closeButtonBackgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func
	},

	computed: {
		backButtonAriaLabel: ({closeButtonAriaLabel}) => closeButtonAriaLabel == null ? $L('Exit app') : closeButtonAriaLabel,
		backButtonBackgroundOpacity: ({closeButtonBackgroundOpacity}) => closeButtonBackgroundOpacity,
		onBack: ({onClose}) => onClose
	},

	render: (props) => (
		<DefaultHeader
			css={css}
			type="mini"
			{...props}
			noCloseButton
		/>
	)
});

const Header = ContextAsDefaultsHeader(HeaderBase);

// Relay the defaultSlot property to our version of Header
Header.defaultSlot = DefaultHeader.defaultSlot;

/**
 * A shortcut to access {@link sandstone/FlexiblePopupPanels.Header}
 *
 * @name Header
 * @static
 * @memberof sandstone/FlexiblePopupPanels.FlexiblePopupPanels
 */
FlexiblePopupPanels.Header = Header;

// Directly set the defaultProps for position to the left side so it initially draws on the correct
// side. The real default is assigned in PopupDecorator, but should still be overridable by an app.
FlexiblePopupPanels.defaultProps = {
	...FlexiblePopupPanels.defaultProps,
	position: 'left'
};

export default FlexiblePopupPanels;
export {
	FlexiblePopupPanels,
	Header,
	Panel
};
