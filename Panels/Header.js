import EnactPropTypes from '@enact/core/internal/prop-types';
import {forward, forProp, handle, not, adaptEvent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {isRtlText} from '@enact/i18n/util';
import {getDirection, Spotlight} from '@enact/spotlight';
import {getLastPointerPosition, hasPointerMoved} from '@enact/spotlight/src/pointer';
import {getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import {Row, Cell} from '@enact/ui/Layout';
import {useMeasurable} from '@enact/ui/Measurable';
import Slottable from '@enact/ui/Slottable';
import Toggleable from '@enact/ui/Toggleable';
import {unit} from '@enact/ui/resolution';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Heading from '../Heading';
import {useScrollPosition} from '../useScroll/useScrollPosition';
import WindowEventable from '../internal/WindowEventable';

import {PanelsStateContext} from '../internal/Panels';
import {useContextAsDefaults} from '../internal/Panels/util';

import componentCss from './Header.module.less';

const isBackButton = ({target: node}) => node && node.classList.contains(componentCss.back);
const isNewPointerPosition = ({clientX, clientY}) => hasPointerMoved(clientX, clientY);
const forwardHideBack = adaptEvent(() => ({type: 'onHideBack'}), forward('onHideBack'));
const forwardShowBack = adaptEvent(() => ({type: 'onShowBack'}), forward('onShowBack'));

const hasChildren = (children) => (React.Children.toArray(children).filter(Boolean).length > 0);

// Hides the back button when 5-way navigation when in pointer mode and the target would not be the
// back button.
const handleWindowKeyPress = handle(
	Spotlight.getPointerMode,
	forProp('backButtonAvailable', true),
	({keyCode}) => {
		const current = Spotlight.getCurrent();
		const target = getTargetByDirectionFromPosition(getDirection(keyCode), getLastPointerPosition());

		// when in pointer mode and back button is visible but focused, if 5-way would blur the back
		// button, it should hide the back button.
		if (isBackButton({target: current})) {
			return target && target !== current;
		}

		// when in pointer mode and back button is visible but not focused, if 5-way would not focus
		// the back button, it should hide the back button
		return !isBackButton({target});
	},
	forwardHideBack
);

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


	propTypes: /** @lends sandstone/Panels.Header.prototype */ {
		/**
		 * The animation arranger used to transition title and subtitle changes.
		 *
		 * Only supported when `type="wizard"`.
		 *
		 * @type {ui/ViewManager.Arranger}
		 * @private
		 */
		arranger: shape,

		/**
		 * Sets the hint string read when focusing the back button.
		 *
		 * @type {String}
		 * @default 'Go to previous'
		 * @public
		 */
		backButtonAriaLabel: PropTypes.string,

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
		 * Background opacity of the application back button.
		 *
		 * @type {('opaque'|'transparent')}
		 * @default 'transparent'
		 * @public
		 */
		backButtonBackgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

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
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `header` - The root class name
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
		 * Minimizes the Header to only show the header components in order to feature the panel
		 * content more prominately.
		 *
		 * Has no effect on `type="compact"`. When a `Header` is used inside a
		 * [`Panel`]{@link sandstone/Panels.Panel} with `featureContent` set it will automatically
		 * collapse unless overridden by this prop.
		 *
		 * @type {Boolean}
		 * @private
		 */
		featureContent: PropTypes.bool,

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
		 * Called when the user leaves the header to hide the back button.
		 *
		 * @type {Function}
		 * @public
		 */
		onHideBack: PropTypes.func,

		/**
		 * Called when the user enters the header to show the back button.
		 *
		 * @type {Function}
		 * @public
		 */
		onShowBack: PropTypes.func,

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
		 * The method which receives the reference node to the slotAfter element, used to determine
		 * the `slotSize`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		slotAfterRef: EnactPropTypes.ref,

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
		 * The method which receives the reference node to the slotBefore element, used to determine
		 * the `slotSize`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		slotBeforeRef: EnactPropTypes.ref,

		/**
		 * The size for slotBefore and slotAfter.
		 * This size is set by HeaderMeasurementDecorator for consistent title centering.
		 *
		 * @type {String}
		 * @private
		 */
		slotSize: PropTypes.string,

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
		 * The method which receives the reference node to the title element, used to determine
		 * the `titleMeasurements`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		titleRef: EnactPropTypes.ref,

		/**
		 * Set the type of header to be used.
		 *
		 * @type {('compact'|'mini'|'standard'|'wizard')}
		 * @default 'standard'
		 */
		type: PropTypes.oneOf(['standard', 'compact', 'wizard', 'mini'])
	},

	defaultProps: {
		marqueeOn: 'render',
		type: 'standard'
	},

	styles: {
		css: componentCss,
		className: 'header',
		publicClassNames: ['header']
	},

	handlers: {
		onBlur: handle(
			isBackButton,
			not(Spotlight.getPointerMode),
			forwardHideBack
		),
		onMouseEnter: handle(
			forward('onMouseEnter'),
			Spotlight.getPointerMode,
			forwardShowBack
		),
		onMouseLeave: handle(
			forward('onMouseLeave'),
			Spotlight.getPointerMode,
			forwardHideBack
		),
		onMouseMove: handle(
			forward('onMouseMove'),
			isNewPointerPosition,
			forwardShowBack
		)
	},

	computed: {
		className: ({backButtonAvailable, featureContent, hover, noBackButton, entering, centered, children, type, styler}) => styler.append(
			{
				featureContent,
				centered,
				// This likely doesn't need to be as verbose as it is, with the first 2 conditionals
				showBack: (backButtonAvailable && !noBackButton && (hover || entering)),
				withChildren: hasChildren(children)
			},
			type
		),
		titleCell: ({arranger, centered, css, marqueeOn, subtitle, title, type}) => {
			const direction = isRtlText(title) || isRtlText(subtitle) ? 'rtl' : 'ltr';

			const titleHeading = (
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

			const subtitleHeading = (
				<Heading
					size="subtitle"
					spacing="auto"
					marqueeDisabled={type === 'wizard'}
					marqueeOn={marqueeOn}
					forceDirection={direction}
					alignment={centered ? 'center' : null}
					className={css.subtitle}
				>
					{subtitle}
				</Heading>
			);

			// WizardPanels uses an animated title but that isn't supported for other types
			if (arranger && type === 'wizard') {
				return (
					<Cell className={css.titleCell} component={ViewManager} arranger={arranger} duration={500} index={0}>
						<div className={css.titleContainer} key={title + subtitle}>
							{titleHeading}
							{subtitleHeading}
						</div>
					</Cell>
				);
			}

			return (
				<Cell className={css.titleCell}>
					{titleHeading}
					{subtitleHeading}
				</Cell>
			);
		}
	},

	render: ({
		backButtonAriaLabel,
		backButtonAvailable,
		backButtonBackgroundOpacity,
		centered,
		children,
		closeButtonAriaLabel,
		closeButtonBackgroundOpacity,
		css,
		hover,
		noBackButton,
		noCloseButton,
		onBack,
		onClose,
		slotAbove,
		slotAfter,
		slotAfterRef,
		slotBefore,
		slotBeforeRef,
		slotSize,
		titleCell,
		titleRef,
		...rest
	}) => {
		delete rest.arranger;
		delete rest.entering;
		delete rest.featureContent;
		delete rest.marqueeOn;
		delete rest.onHideBack;
		delete rest.onShowBack;
		delete rest.subtitle;
		delete rest.title;
		delete rest.type;

		// Set up the back button
		const backButton = (backButtonAvailable && !noBackButton ? (
			<div className={css.backContainer}>
				<Button
					aria-label={backButtonAriaLabel == null ? $L('Go to previous') : backButtonAriaLabel}
					backgroundOpacity={backButtonBackgroundOpacity}
					className={css.back}
					icon="arrowhookleft"
					onClick={onBack}
					size="small"
					spotlightDisabled={!(backButtonAvailable && !noBackButton && hover)}
				/>
			</div>
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

		// Only provide the synced cell size if the title should be centered, beyond that case,
		// the cell sizes don't need to be synced.
		const syncCellSize = (centered ? slotSize : null);

		// The side Cells are always present, even if empty, to support the measurement ref.
		return (
			<header {...rest}>
				{slotAbove ? <nav className={css.slotAbove}>{slotAbove}</nav> : null}
				<Row className={css.titlesRow} align="center" ref={titleRef}>
					<Cell className={css.slotBefore} shrink={!syncCellSize} size={syncCellSize}>
						<span ref={slotBeforeRef} className={css.slotSizer}>
							{backButton}{slotBefore}
						</span>
					</Cell>
					{titleCell}
					<Cell className={css.slotAfter} shrink={!syncCellSize} size={syncCellSize}>
						<span ref={slotAfterRef} className={css.slotSizer}>
							{slotAfter}{closeButton}
						</span>
					</Cell>
				</Row>
				{hasChildren(children) ? <nav className={css.slotBelow}>{children}</nav> : null}
			</header>
		);
	}
});

// Customized ContextAsDefaults HOC to incorporate the backButtonAvaialble prop feature
const ContextAsDefaultsHeader = (Wrapped) => {
	// eslint-disable-next-line no-shadow
	return function ContextAsDefaultsHeader (props) {
		const {contextProps, provideContextAsDefaults} = useContextAsDefaults(props);
		const {index, type: panelsType} = React.useContext(PanelsStateContext);

		const backButtonAvailable = (index > 0 && panelsType !== 'wizard' || panelsType === 'flexiblePopup');

		return provideContextAsDefaults(
			<Wrapped
				{...contextProps}
				{...props}
				backButtonAvailable={backButtonAvailable}
			/>
		);
	};
};

const CollapsingHeaderDecorator = (Wrapped) => {
	return function CollapsingHeaderDecorator (props) { // eslint-disable-line no-shadow
		const {shouldFeatureContent} = useScrollPosition() || {};
		return <Wrapped featureContent={shouldFeatureContent} {...props} />;
	};
};

const HeaderMeasurementDecorator = (Wrapped) => {
	return function HeaderMeasurementDecorator (props) { // eslint-disable-line no-shadow
		const {ref: slotBeforeRef, measurement: {width: slotBeforeWidth = 0} = {}} = useMeasurable() || {};
		const {ref: slotAfterRef, measurement: {width: slotAfterWidth = 0} = {}} = useMeasurable() || {};
		const [{slotSize, prevSlotBeforeWidth, prevSlotAfterWidth}, setSlotSize] = React.useState({});

		// If the slot width has changed, re-run this.
		if (slotBeforeWidth !== prevSlotBeforeWidth || slotAfterWidth !== prevSlotAfterWidth) {
			const largestSlotSize = Math.max(slotBeforeWidth, slotAfterWidth);

			// And only do this the largest slot is a different value this time around.
			if (slotSize !== largestSlotSize) {
				setSlotSize({
					slotSize: largestSlotSize,
					prevSlotBeforeWidth: slotBeforeWidth,
					prevSlotAfterWidth: slotAfterWidth
				});
			}
		}

		const measurableProps = {
			slotBeforeRef,
			slotAfterRef,
			slotSize: unit(slotSize, 'rem')
		};

		return <Wrapped {...props} {...measurableProps} />;
	};
};

const HeaderDecorator = compose(
	Slottable({slots: ['title', 'subtitle', 'slotAbove', 'slotAfter', 'slotBefore']}),
	ContextAsDefaultsHeader,
	CollapsingHeaderDecorator,
	HeaderMeasurementDecorator,
	Toggleable({prop: 'hover', activate: 'onShowBack', deactivate: 'onHideBack', toggle: null}),
	WindowEventable({globalNode: 'document', onKeyDown: handleWindowKeyPress})
);

// Note that we only export this (even as HeaderBase). HeaderBase is not useful on its own.
const Header = HeaderDecorator(HeaderBase);

// Set up Header so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
Header.defaultSlot = 'header';

export default Header;
export {Header, HeaderBase};
