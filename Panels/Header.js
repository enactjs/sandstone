import {forwardCustom} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import {isRtlText} from '@enact/i18n/util';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Row, Cell} from '@enact/ui/Layout';
import {useMeasurable} from '@enact/ui/Measurable';
import {unit} from '@enact/ui/resolution';
import Slottable from '@enact/ui/Slottable';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Children, useContext, useState} from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Heading from '../Heading';
import Skinnable from '../Skinnable';

import {PanelsStateContext} from '../internal/Panels';
import {useContextAsDefaults} from '../internal/Panels/util';

import componentCss from './Header.module.less';

const hasChildren = (children) => (Children.toArray(children).filter(Boolean).length > 0);

/**
 * A header component for a Panel with a `title` and `subtitle`, supporting several configurable
 * {@link ui/Slottable.Slottable|slots} for components.
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
		 * @default 'go to previous'
		 * @public
		 */
		backButtonAriaLabel: PropTypes.string,

		/**
		 * Informs Header that the back button as allowed to be shown.
		 *
		 * This does not represent whether it is showing, just whether it can or not.
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
		 * Determines what triggers the header content to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @default 'render'
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
		 * Omits the subtitle area.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noSubtitle: PropTypes.bool,

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
		 * Adds shadow to the text contents.
		 *
		 * @type {Boolean}
		 * @public
		 */
		shadowed: PropTypes.bool,

		/**
		 * A location for arbitrary elements to be placed above the title
		 *
		 * This is a {@link ui/Slottable.Slottable|slot}, so it can be used as a tag-name inside
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
		 * This is a {@link ui/Slottable.Slottable|slot}, so it can be used as a tag-name inside
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
		 * This is a {@link ui/Slottable.Slottable|slot}, so it can be used as a tag-name inside
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
		 * This is a {@link ui/Slottable.Slottable|slot}, so it can be used as a tag-name inside
		 * this component.
		 * If {@link sandstone/Panels.Header.noSubtitle|noSubtitle} is `true`, this prop is ignored.
		 *
		 * @type {String|String[]}
		 */
		subtitle: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		]),

		/**
		 * Subtitle id of the header.
		 *
		 * @type {String}
		 * @private
		 */
		subtitleId: PropTypes.string,

		/**
		 * Title of the header.
		 *
		 * This is a {@link ui/Slottable.Slottable|slot}, so it can be used as a tag-name inside
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
		 * Title id of the header.
		 *
		 * @type {String}
		 * @private
		 */
		titleId: PropTypes.string,

		/**
		 * Set the type of header to be used.
		 *
		 * @type {('compact'|'mini'|'standard'|'wizard')}
		 * @default 'standard'
		 */
		type: PropTypes.oneOf(['compact', 'mini', 'standard', 'wizard'])
	},

	defaultProps: {
		marqueeOn: 'render',
		noSubtitle: false,
		type: 'standard'
	},

	styles: {
		css: componentCss,
		className: 'header',
		publicClassNames: ['header']
	},

	computed: {
		className: ({centered, children, noSubtitle, type, shadowed, styler, subtitle}) => styler.append(
			{
				centered,
				noSubtitle,
				shadowed,
				// This likely doesn't need to be as verbose as it is, with the first 2 conditionals
				withChildren: hasChildren(children),
				withSubtitle: subtitle
			},
			type
		),
		titleCell: ({arranger, centered, css, marqueeOn, noSubtitle, slotAfter, slotBefore, slotSize, subtitle, subtitleId, title, titleId, type}) => {
			const direction = isRtlText(title) || isRtlText(subtitle) ? 'rtl' : 'ltr';

			const titleHeading = (
				<Heading
					{...centered ? {slotSize} : {}}
					id={titleId}
					size="title"
					spacing="auto"
					marqueeOn={marqueeOn}
					forceDirection={direction}
					alignment={centered ? 'center' : null}
					className={css.title}
				>
					{/* WRR-19431: When a panel is added dynamically, a space has been added to set the height of the title when moving to the next panel.*/}
					{(type === 'wizard' && (slotBefore?.props?.visible || slotAfter?.props?.visible) && slotSize === '0rem') ? ' ' : title}
				</Heading>
			);

			const subtitleHeading = (
				<Heading
					{...centered ? {slotSize} : {}}
					id={subtitleId}
					size="subtitle"
					spacing="auto"
					marqueeDisabled={type === 'wizard'}
					marqueeOn={marqueeOn}
					forceDirection={direction}
					alignment={centered ? 'center' : null}
					className={css.subtitle}
				>
					{/* WRR-19431: When a panel is added dynamically, a space has been added to set the height of the subtitle when moving to the next panel.*/}
					{(type === 'wizard' && (slotBefore?.props?.visible || slotAfter?.props?.visible) && slotSize === '0rem') ? ' ' : subtitle}
				</Heading>
			);

			// WizardPanels uses an animated title but that isn't supported for other types
			if (arranger && type === 'wizard') {
				return (
					<Cell className={css.titleCell} component={ViewManager} arranger={arranger} duration={500} index={0}>
						<div className={css.titleContainer} key={title + subtitle}>
							{titleHeading}
							{noSubtitle ? null : subtitleHeading}
						</div>
					</Cell>
				);
			}

			return (
				<Cell className={css.titleCell}>
					{titleHeading}
					{noSubtitle ? null : subtitleHeading}
				</Cell>
			);
		}
	},

	handlers: {
		onBack: forwardCustom('onBack'),
		onClose: forwardCustom('onClose')
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
		noBackButton,
		noCloseButton,
		onBack,
		onClose,
		shadowed,
		slotAbove,
		slotAfter,
		slotAfterRef,
		slotBefore,
		slotBeforeRef,
		slotSize,
		titleCell,
		...rest
	}) => {
		delete rest.arranger;
		delete rest.marqueeOn;
		delete rest.noSubtitle;
		delete rest.subtitle;
		delete rest.subtitleId;
		delete rest.title;
		delete rest.titleId;

		// Set up the back button
		const backButton = (backButtonAvailable && !noBackButton ? (
			<Button
				aria-label={backButtonAriaLabel == null ? $L('go to previous') : backButtonAriaLabel}
				backgroundOpacity={backButtonBackgroundOpacity}
				className={css.back}
				icon="arrowhookleft"
				iconFlip="auto"
				onClick={onBack}
				shadowed={shadowed}
				size="small"
			/>
		) : null);

		// Set up the close button
		const closeButton = (!noCloseButton ? (
			<Button
				aria-label={closeButtonAriaLabel == null ? $L('Exit app') : closeButtonAriaLabel}
				backgroundOpacity={closeButtonBackgroundOpacity}
				className={css.close}
				icon="closex"
				onClick={onClose}
				shadowed={shadowed}
				size="small"
			/>
		) : null);

		// Only provide the synced cell size if the title should be centered, beyond that case,
		// the cell sizes don't need to be synced.
		const syncCellSize = (centered ? slotSize : null);

		// Hide slots for the first render to avoid unexpected positioning when 'centered' is given.
		// After the first render, HeaderMeasurementDecorator measures widths of slots and set right 'slotSize'.
		const hideSlots = {
			opacity: centered && slotSize === '0rem' ? '0' : null
		};

		// The side Cells are always present, even if empty, to support the measurement ref.
		return (
			<header {...rest}>
				{slotAbove ? <nav className={css.slotAbove}>{slotAbove}</nav> : null}
				<Row className={css.titlesRow} align="center">
					<Cell className={css.slotBefore} shrink={!syncCellSize} size={syncCellSize} style={hideSlots}>
						<span ref={slotBeforeRef} className={css.slotSizer}>
							{backButton}{slotBefore}
						</span>
					</Cell>
					{titleCell}
					<Cell className={css.slotAfter} shrink={!syncCellSize} size={syncCellSize} style={hideSlots}>
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

// Customized ContextAsDefaults HOC to incorporate the backButtonAvailable prop feature
const ContextAsDefaultsHeader = (Wrapped) => {
	// eslint-disable-next-line no-shadow
	function ContextAsDefaultsHeader (props) {
		const {contextProps, provideContextAsDefaults} = useContextAsDefaults(props);
		const {type: panelsType} = useContext(PanelsStateContext);
		const {'data-index': index} = props;
		const backButtonAvailable = (index > 0 && panelsType !== 'wizard' || panelsType === 'flexiblePopup');

		return provideContextAsDefaults(
			<Wrapped
				{...contextProps}
				{...props}
				backButtonAvailable={backButtonAvailable}
			/>
		);
	}

	ContextAsDefaultsHeader.propTypes = {
		/**
		 * Used internally to render back button.
		 *
		 * @type {Number}
		 * @private
		 */
		'data-index': PropTypes.number
	};

	return ContextAsDefaultsHeader;
};

const HeaderMeasurementDecorator = (Wrapped) => {
	return function HeaderMeasurementDecorator (props) { // eslint-disable-line no-shadow
		const {ref: slotBeforeRef, measurement: {width: slotBeforeWidth = 0} = {}} = useMeasurable() || {};
		const {ref: slotAfterRef, measurement: {width: slotAfterWidth = 0} = {}} = useMeasurable() || {};
		const [{slotSize, prevSlotBeforeWidth, prevSlotAfterWidth}, setSlotSize] = useState({});

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
	SpotlightContainerDecorator,
	Slottable({slots: ['title', 'subtitle', 'slotAbove', 'slotAfter', 'slotBefore']}),
	ContextAsDefaultsHeader,
	HeaderMeasurementDecorator,
	Skinnable
);

// Note that we only export this (even as HeaderBase). HeaderBase is not useful on its own.
const Header = HeaderDecorator(HeaderBase);

// Set up Header so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
Header.defaultSlot = 'header';

export default Header;
export {Header, HeaderBase};
