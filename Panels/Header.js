import kind from '@enact/core/kind';
import {isRtlText} from '@enact/i18n/util';
import ComponentOverride from '@enact/ui/ComponentOverride';
import {Row, Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Heading from '../Heading';
import Skinnable from '../Skinnable';

import {PanelsStateContext} from './Viewport';

import componentCss from './Header.module.less';

// A conditional method that takes in a prop name (string) and returns a method that when executed
// with props and context as arguments, chooses between the values, preferring the props version if
// it is defined. `null` counts as defined here so it's possible to easily "erase" the context value.
const preferPropOverContext = (prop) => (props, context) => (typeof props[prop] !== 'undefined' ? props[prop] : context[prop]);

/**
 * A header component for a Panel with a `title` and `subtitle`, supporting several configurable
 * [`slots`]{@link ui/Slottable.Slottable} for components.
 *
 * @class Header
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const HeaderBase = kind({
	name: 'Header',

	contextType: PanelsStateContext,

	propTypes: /** @lends sandstone/Panels.Header.prototype */ {
		/**
		 * Informs Header that the back button as allowed to be shown.
		 *
		 * This does not represent whether it is showing, just whether it can or not.
		 *
		 * When a Header is used within [`Panels`]{@link sandstone/Panels.Panels} this property will
		 * be set to `true` when being hovered.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		backButtonAvailable: PropTypes.bool,

		/**
		 * Centers the contents of the Header.
		 *
		 * This setting does not affect `slotBefore` or `slotAfter`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		centered: PropTypes.bool,

		/**
		 * Children provided are added to the header-components area.
		 *
		 * A space for controls which live in the header, apart from the body of the panel view.
		 *
		 * @type {Element|Element[]}
		 */
		children: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]),

		/**
		 * Sets the hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * The background opacity of the application close button.
		 *
		 * * Values: `'translucent'`, `'lightTranslucent'`, `'transparent'`
		 *
		 * @type {String}
		 * @default 'transparent'
		 * @public
		 */
		closeButtonBackgroundOpacity: PropTypes.oneOf(['translucent', 'lightTranslucent', 'transparent']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `header` - The root class name
		 * * `input` - Applied to the `headerInput` element
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * When a Header is used within [`Panels`]{@link sandstone/Panels.Panels} this property will
		 * be set automatically to `true` on render and `false` after animating into view.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		entering: PropTypes.bool,

		/**
		 * [`Input`]{@link sandstone/Input} element that will replace the `title`.
		 *
		 * This is also a [slot]{@link ui/Slottable.Slottable}, so it can be referred
		 * to as if it were JSX.
		 *
		 * Note: Only applies to `type="standard"` headers.
		 *
		 * Example
		 * ```
		 *  <Header>
		 *  	<title>Example Header Title</title>
		 *  	<headerInput>
		 *  		<Input dismissOnEnter />
		 *  	</headerInput>
		 *  	<subtitle>The Adventure Continues</subtitle>
		 *  </Header>
		 * ```
		 *
		 * @type {Node}
		 */
		headerInput: PropTypes.node,

		/**
		 * Sets the "hover" state.
		 *
		 * This is linked to displaying the "back" button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		hover: PropTypes.bool,

		/**
		 * Determines what triggers the header content to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @default 'hover'
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render']),

		/**
		 * Omits the back button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noBackButton: PropTypes.bool,

		/**
		 * Omits the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Called with cancel/back key events.
		 *
		 * @type {Function}
		 * @public
		 */
		onBack: PropTypes.func,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Sets the visibility of the input field
		 *
		 * This prop must be set to true for the input field to appear.
		 *
		 * @type {Boolean}
		 * @public
		 */
		showInput: PropTypes.bool,

		/**
		 * A location for arbitrary elements to be placed above the title
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * ```
		 * <Header>
		 * 	<slotAbove><Button /></slotAbove>
		 * 	<title>My Title</title>
		 * </Header>
		 * ```
		 *
		 * @type {Node}
		 * @public
		 */
		slotAbove: PropTypes.node,

		/**
		 * A location for arbitrary elements to be placed to the right the title in LTR locales and
		 * to the left in RTL locales
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * ```
		 * <Header>
		 * 	<title>My Title</title>
		 * 	<slotAfter><Button /></slotAfter>
		 * </Header>
		 * ```
		 *
		 * @type {Node}
		 * @public
		 */
		slotAfter: PropTypes.node,

		/**
		 * A location for arbitrary elements to be placed to the left the title in LTR locales and
		 * to the right in RTL locales
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * ```
		 * <Header>
		 * 	<slotBefore><Button /></slotBefore>
		 * 	<title>My Title</title>
		 * </Header>
		 * ```
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node,

		/**
		 * Text displayed below the title.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * @type {String|String[]}
		 */
		subtitle: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		]),

		/**
		 * Title of the header.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * Example:
		 * ```
		 *  <Header>
		 *  	<title>Example Header Title</title>
		 *  	<subtitle>The Adventure Continues</subtitle>
		 *  </Header>
		 * ```
		 *
		 * @type {String|String[]}
		 */
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		]),

		/**
		 * Set the type of header to be used.
		 *
		 * @type {('compact'|'dense'|'standard')}
		 * @default 'standard'
		 */
		type: PropTypes.oneOf(['standard', 'compact', 'wizard'])
	},

	defaultProps: {
		backButtonAvailable: false,
		marqueeOn: 'render',
		type: 'standard'
	},

	styles: {
		css: componentCss,
		className: 'header',
		publicClassNames: ['header', 'input']
	},

	computed: {
		className: ({backButtonAvailable, hover, noBackButton, entering, centered, children, slotAbove, type, styler}) => styler.append(
			{
				centered,
				showBack: (backButtonAvailable && !noBackButton && (hover || entering)), // This likely doesn't need to be as verbose as it is, with the first 2 conditionals
				withChildren: (Boolean(children) || Boolean(slotAbove))
			},
			type),
		// This unruly looking pile of props allows these props to override their context equivelents
		closeButtonAriaLabel: preferPropOverContext('closeButtonAriaLabel'),
		closeButtonBackgroundOpacity: preferPropOverContext('closeButtonBackgroundOpacity'),
		noBackButton: preferPropOverContext('noBackButton'),
		noCloseButton: preferPropOverContext('noCloseButton'),
		onBack: preferPropOverContext('onBack'),
		onClose: preferPropOverContext('onClose'),
		direction: ({title, subtitle}) => isRtlText(title) || isRtlText(subtitle) ? 'rtl' : 'ltr',
		line: ({css, type}) => ((type === 'compact') && <Cell shrink component="hr" className={css.line} />)
	},

	render: ({
		backButtonAvailable,
		centered,
		children,
		closeButtonAriaLabel,
		closeButtonBackgroundOpacity,
		css,
		direction,
		headerInput,
		line,
		marqueeOn,
		noBackButton,
		noCloseButton,
		onBack,
		onClose,
		showInput,
		slotAbove,
		slotAfter,
		slotBefore,
		subtitle,
		title,
		type,
		...rest
	}) => {
		delete rest.entering;
		delete rest.hover;

		// Set up the back button
		const backButton = (backButtonAvailable && !noBackButton ? (
			<Button
				backgroundOpacity="transparent"
				className={css.back}
				icon="arrowhookleft"
				onClick={onBack}
				size="large"
			/>
		) : null);

		// Set up the close button
		const closeButton = (!noCloseButton ? (
			<Button
				aria-label={closeButtonAriaLabel == null ? $L('Exit app') : closeButtonAriaLabel}
				backgroundOpacity={closeButtonBackgroundOpacity}
				className={css.close}
				icon="closex"
				onTap={onClose}
				size="small"
			/>
		) : null);

		// Create the Title component
		const titleComponent = (
			<Heading
				aria-label={title}
				size="title"
				spacing="auto"
				marqueeOn={marqueeOn}
				forceDirection={direction}
				alignment={centered ? 'center' : null}
				className={css.title}
			>
				{title}
			</Heading>
		);

		let titleOrInput = titleComponent;

		// If there's a headerInput defined, inject the necessary Input pieces and save that as the titleOrInput variable to be used below.
		if (headerInput) {
			titleOrInput = (
				<div className={css.headerInput}>
					<Transition duration="short" visible={!!showInput} className={css.inputTransition}>
						<ComponentOverride
							component={headerInput}
							className={css.input}
							css={css}
							size="large"
						/>
					</Transition>
					<Transition duration="short" direction="down" visible={!showInput}>
						{titleComponent}
					</Transition>
				</div>
			);
		}

		// In wizard type, if one slot is filled, automatically include the other to keep the title balanced.
		// DEV NOTE: Currently, the width of these is not synced, but can/should be in a future update.
		const bothBeforeAndAfter = (type === 'wizard' && (slotAfter || slotBefore));

		return (
			<header {...rest}>
				{slotAbove ? <nav className={css.slotAbove}>{slotAbove}</nav> : null}
				<Row className={css.titlesRow} align="center">
					{(bothBeforeAndAfter || slotBefore || backButton) ? <Cell shrink className={css.slotBefore}>{backButton}{slotBefore}</Cell> : null}
					<Cell className={css.titleCell}>
						{titleOrInput}
						<Heading
							size="subtitle"
							spacing="auto"
							marqueeOn={marqueeOn}
							forceDirection={direction}
							alignment={centered ? 'center' : null}
							className={css.subtitle}
						>
							{subtitle}
						</Heading>
					</Cell>
					{(bothBeforeAndAfter || slotAfter || closeButton) ? <Cell shrink className={css.slotAfter}>{slotAfter}{closeButton}</Cell> : null}
				</Row>
				{children ? <nav className={css.slotBelow}>{children}</nav> : null}
				{line}
			</header>
		);
	}
});

const HeaderDecorator = compose(
	Slottable({slots: ['headerInput', 'title', 'subtitle', 'slotAbove', 'slotAfter', 'slotBefore']}),
	Skinnable,
	Toggleable({prop: 'hover', activate: 'onMouseEnter', deactivate: 'onMouseLeave'})
);

// Note that we only export this (even as HeaderBase). HeaderBase is not useful on its own.
const Header = HeaderDecorator(HeaderBase);

// Set up Header so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
Header.defaultSlot = 'header';

export default Header;
export {Header, HeaderBase};
