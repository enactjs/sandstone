import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {isRtlText} from '@enact/i18n/util';
import {Row, Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import ComponentOverride from '@enact/ui/ComponentOverride';

import Heading from '../Heading';
import Skinnable from '../Skinnable';

import componentCss from './Header.module.less';

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
		 * Centers the contents of the Header.
		 *
		 * This setting does not affect `slotBefore` or `slotAfter`.
		 *
		 * @type {Boolean}
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
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `header` - The root class name
		 * * `input` - Applied to the `headerInput` element
		 * * `subtitle` - Applied to the `subtitle` element
		 * * `title` - Applied to the `title` element
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

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
		 * Determines what triggers the header content to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @default 'hover'
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render']),

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
		marqueeOn: 'render',
		type: 'standard'
	},

	styles: {
		css: componentCss,
		className: 'header',
		publicClassNames: ['header', 'input', 'subtitle', 'title']
	},

	computed: {
		className: ({centered, children, slotAbove, type, styler}) => styler.append(
			{
				centered,
				withChildren: (Boolean(children) || Boolean(slotAbove))
			},
			type),
		direction: ({title, subtitle}) => isRtlText(title) || isRtlText(subtitle) ? 'rtl' : 'ltr',
		line: ({css, type}) => ((type === 'compact') && <Cell shrink component="hr" className={css.line} />)
	},

	render: ({centered, children, css, direction, headerInput, line, marqueeOn, showInput, slotAbove, slotAfter, slotBefore, subtitle, title, type, ...rest}) => {

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
		const bothBeforeAndAfter = (type === 'wizard' && (Boolean(slotAfter) || Boolean(slotBefore)));

		return (
			<header {...rest}>
				{slotAbove ? <nav className={css.slotAbove}>{slotAbove}</nav> : null}
				<Row className={css.titlesRow} align="center">
					{(bothBeforeAndAfter || slotBefore) ? <Cell className={css.slotBefore} shrink={!bothBeforeAndAfter}>{slotBefore}</Cell> : null}
					<Cell className={css.titleCell} shrink={bothBeforeAndAfter}>
						{titleOrInput}
						<Heading
							size="subtitle"
							spacing="auto"
							marqueeOn={marqueeOn}
							forceDirection={direction}
							alignment={centered || bothBeforeAndAfter ? 'center' : null}
							className={css.subtitle}
						>
							{subtitle}
						</Heading>
					</Cell>
					{(bothBeforeAndAfter || slotAfter) ? <Cell className={css.slotAfter} shrink={!bothBeforeAndAfter}>{slotAfter}</Cell> : null}
				</Row>
				{children ? <nav className={css.slotBelow}>{children}</nav> : null}
				{line}
			</header>
		);
	}
});

// Note that we only export this (even as HeaderBase). HeaderBase is not useful on its own.
const Header = Slottable({slots: ['headerInput', 'title', 'subtitle', 'slotAbove', 'slotAfter', 'slotBefore']}, Skinnable(HeaderBase));

// Set up Header so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
Header.defaultSlot = 'header';

export default Header;
export {Header, HeaderBase};
