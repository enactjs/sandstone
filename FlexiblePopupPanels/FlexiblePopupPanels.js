/**
 * Provides Sandstone styled flexible-width, popup-styled Panels component.
 *
 * @module sandstone/FlexiblePopupPanels
 * @exports FlexiblePopupPanels
 * @exports Panel
 * @exports Header
 */

import handle, {adaptEvent, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import $L from '../internal/$L';
import Button from '../Button';
import {FadeAndSlideArranger, PanelsStateContext, PopupDecorator, Viewport} from '../internal/Panels';
import {ContextAsDefaults} from '../internal/Panels/util';
import {PanelBase as DefaultPanel, PanelDecorator} from '../Panels/Panel';
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
const FlexiblePopupPanelsBase = kind({
	name: 'FlexiblePopupPanels',

	propTypes: {
		/**
		 * Specifies when and how to show `nextButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `nextButton` on every `FlexiblePopupPanels.Panel` except the last,
		 * * `'always'`will display `nextButton` button on every Panel in the `FlexiblePopupPanels.Panel`
		 * * `'never'` will always hide the `nextButton` on the every `FlexiblePopupPanels.Panel`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this
		 * case, a customized `nextButton` on WizardPanel.Panel will take precedence over the
		 * `nextButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		* Called when the index value is changed.
		*
		* @type {Function}
		* @param {Object} event
		* @public
		*/
		onChange: PropTypes.func,

		/**
		 * Specifies when and how to show `prevButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `prevButton` on every `FlexiblePopupPanels.Panel` except the first,
		 * * `'always'`will display `prevButton` button on every Panel in the `FlexiblePopupPanels.Panel`
		 * * `'never'` will always hide the `prevButton` on the every `FlexiblePopupPanels.Panel`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this case,
		 * if user provides a customized `prevButton` on WizardPanel.Panel will take precedence over the `prevButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never'])
	},

	defaultProps: {
		nextButtonVisibility: 'auto',
		prevButtonVisibility: 'auto'
	},

	computed: {
		children: ({children, nextButtonVisibility, onChange, prevButtonVisibility}) => React.Children.map(children, (child) => {
			if (child) {
				const props = {
					nextButtonVisibility,
					onChange,
					prevButtonVisibility
				};

				return React.cloneElement(child, props);
			} else {
				return null;
			}
		}),
		onBack: ({onChange}) => onChange
	},

	render: (props) => {
		delete props.nextButtonVisibility;
		delete props.onChange;
		delete props.prevButtonVisibility;

		return (<Viewport {...props} />);
	}
});

const FlexiblePopupPanels = FlexiblePopupPanelsDecorator(FlexiblePopupPanelsBase);

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

		/**
		 * The button to use in place of the standard next button.
		 *
		 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of
		 * [`nextButtonVisibility`]{@link sandstone/FlexiblePopupPanels.FlexiblePopupPanels#nextButtonVisibility}.
		 *
		 * Example:
		 * ```
		 * nextButton={<Button icon="closex" aria-label="Quit">Close</Button>}
		 * ```
		 *
		 * @name nextButton
		 * @memberof sandstone/FlexiblePopupPanels.Panel.prototype
		 * @type {Boolean|Component}
		 * @public
		 */
		nextButton: PropTypes.any,

		/**
		 * Specifies when and how to show `nextButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `nextButton` on every `FlexiblePopupPanels.Panel` except the last,
		 * * `'always'`will display `nextButton` button on every Panel in the `FlexiblePopupPanels.Panel`
		 * * `'never'` will always hide the `nextButton` on the every `FlexiblePopupPanels.Panel`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this
		 * case, a customized `nextButton` on WizardPanel.Panel will take precedence over the
		 * `nextButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @private
		 */
		nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		 * Called when the index value is changed.
		 *
		 * @type {Function}
		 * @private
		 */
		onChange: PropTypes.func,

		/**
		 * The button to use in place of the standard prev button.
		 *
		 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of
		 * [`prevButtonVisibility`]{@link sandstone/FlexiblePopupPanels.FlexiblePopupPanels#prevButtonVisibility}.
		 *
		 * Example:
		 * ```
		 * prevButton={<Button icon="closex" aria-label="Back">Back</Button>}
		 * ```
		 *
		 * @name PrevButton
		 * @memberof sandstone/FlexiblePopupPanels.Panel.prototype
		 * @type {Boolean|Component}
		 * @public
		 */
		prevButton: PropTypes.any,

		/**
		 * Specifies when and how to show `prevButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `prevButton` on every `FlexiblePopupPanels.Panel` except the first,
		 * * `'always'`will display `prevButton` button on every Panel in the `FlexiblePopupPanels.Panel`
		 * * `'never'` will always hide the `prevButton` on the every `FlexiblePopupPanels.Panel`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this case,
		 * if user provides a customized `prevButton` on WizardPanel.Panel will take precedence over the `prevButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @private
		 */
		prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never'])
	},

	handlers: {
		handleDecrement: handle(
			adaptEvent(
				(ev, props, {index}) => {
					const prevIndex = index > 0 ? (index - 1) : index;
					return ({index: prevIndex});
				},
				forward('onChange')
			)
		),
		handleIncrement: handle(
			adaptEvent(
				(ev, props, {count, index}) => {
					const nextIndex = index < (count - 1) ? index + 1 : index;
					return ({index: nextIndex});
				},
				forward('onChange')
			)
		)
	},

	computed: {
		children: ({
			children,
			handleDecrement,
			handleIncrement,
			nextButton,
			nextButtonVisibility,
			prevButton,
			prevButtonVisibility
		}, {count, index}) => {
			const isPrevButtonVisible = prevButtonVisibility === 'always' || (prevButtonVisibility === 'auto' && index !== 0);
			const isNextButtonVisible = nextButtonVisibility === 'always' || (nextButtonVisibility === 'auto' && index < count - 1);

			return (
				<Row>
					<Cell align="center" shrink>
						<NavigationButton
							backgroundOpacity="transparent"
							button={prevButton}
							icon="arrowlargeleft"
							onClick={handleDecrement}
							size="small"
							visible={isPrevButtonVisible}
						/>
					</Cell>
					<Cell className={css.content} shrink>{children}</Cell>
					<Cell align="center" shrink>
						<NavigationButton
							backgroundOpacity="transparent"
							button={nextButton}
							icon="arrowlargeright"
							onClick={handleIncrement}
							size="small"
							visible={isNextButtonVisible}
						/>
					</Cell>
				</Row>
			);
		}
	},

	render: (props) => {
		delete props.handleDecrement;
		delete props.handleIncrement;
		delete props.nextButton;
		delete props.nextButtonVisibility;
		delete props.onChange;
		delete props.prevButton;
		delete props.prevButtonVisibility;

		return (<DefaultPanel {...props} css={css} />);
	}
});

const Panel = PanelDecorator(PanelBase);

/**
 * A shortcut to access {@link sandstone/FlexiblePopupPanels.Panel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/FlexiblePopupPanels.FlexiblePopupPanels
 */
FlexiblePopupPanels.Panel = Panel;

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

	contextType: PanelsStateContext,

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
		 * Omits the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func
	},

	styles: {
		css,
		className: 'header'
	},

	computed: {
		backButtonAriaLabel: ({closeButtonAriaLabel}) => closeButtonAriaLabel == null ? $L('Exit app') : closeButtonAriaLabel,
		backButtonBackgroundOpacity: ({closeButtonBackgroundOpacity}) => closeButtonBackgroundOpacity,
		className: ({styler}, {index}) => styler.append({'showBack': index > 0}),
		noBackButton: ({noCloseButton}) => noCloseButton,
		onBack: ({onClose}) => onClose
	},

	render: (props) => (
		<DefaultHeader
			type="mini"
			{...props}
			noCloseButton
		/>
	)
});

const Header = ContextAsDefaults({
	props: ['closeButtonAriaLabel', 'closeButtonBackgroundOpacity', 'noCloseButton', 'onClose']
}, HeaderBase);

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
