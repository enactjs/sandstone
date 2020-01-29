import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {isRtlText} from '@enact/i18n/util';
import {Layout, Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import ComponentOverride from '@enact/ui/ComponentOverride';

import Heading from '../Heading';
import Skinnable from '../Skinnable';

import css from './Header.module.less';

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

		// WIP - Controls the visibility of the input field.
		inputOpen: PropTypes.bool,

		/**
		 * Determines what triggers the header content to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @default 'hover'
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render']),

		/**
		 * Text displayed below the title.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * @type {String}
		 */
		subtitle: PropTypes.string,

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
		 * @type {String}
		 */
		title: PropTypes.string,

		/**
		 * Set the type of header to be used.
		 *
		 * @type {('compact'|'dense'|'standard')}
		 * @default 'standard'
		 */
		type: PropTypes.oneOf(['standard', 'compact', 'walkthrough'])
	},

	defaultProps: {
		marqueeOn: 'render',
		type: 'standard'
	},

	styles: {
		css,
		className: 'header'
	},

	computed: {
		className: ({centered, children, type, styler}) => styler.append({centered, withNav: Boolean(children)}, type),
		direction: ({title, subtitle}) => isRtlText(title) || isRtlText(subtitle) ? 'rtl' : 'ltr',
		titleOrInput: ({centered, headerInput, marqueeOn, title, direction, inputOpen}) => {
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

			if (headerInput) {
				return (
					<div className={css.headerInput}>
						<Transition visible={inputOpen} className={css.inputTransition}>
							<ComponentOverride
								component={headerInput}
								css={css}
								size="large"
							/>
						</Transition>
						{titleComponent}
					</div>
				);
			} else {
				return titleComponent;
			}
		}
	},

	render: ({children, className, direction, marqueeOn, subtitle, centered, slotAbove, slotAfter, slotBefore, titleOrInput, type, styler, ...rest}) => {
		delete rest.headerInput;
		delete rest.inputOpen;
		delete rest.title;

		const rootProps = {
			component: 'header',
			...rest
		};  // Props to spread onto whichever element is rendered as the root node of this component

		const TitlesCells = (
			<React.Fragment>
				{(type === 'walkthrough' ? (slotAfter || slotBefore) : slotBefore) ? <Cell shrink className={css.slotBefore}>{slotBefore}</Cell> : null}
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
				{(type === 'walkthrough' ? (slotAfter || slotBefore) : slotAfter) ? <Cell shrink className={css.slotAfter}>{slotAfter}</Cell> : null}
			</React.Fragment>
		);

		if (slotAbove || children) {
			return (
				<Layout orientation="vertical" {...rootProps} className={className}>
					<Cell shrink={(type === 'walkthrough')} className={css.titlesCell}>
						{slotAbove ? <div className={css.slotAbove}>{slotAbove}</div> : null}
						<Layout className={css.titlesRow} align="center">{TitlesCells}</Layout>
					</Cell>
					{children ? <Cell shrink className={css.slotBelow}>{children}</Cell> : null}
				</Layout>
			);
		} else {
			// The className here has special handling, so the titlesRow is always applied to the
			// correct element, whether that happens to be the root, like below, for efficiency, or
			// in the full header context like above.
			return (
				<Layout
					{...rootProps}
					className={styler.join(className, css.titlesRow)}
					align="center"
				>
					{TitlesCells}
				</Layout>
			);
		}
	}
});

// Note that we only export this (even as HeaderBase). HeaderBase is not useful on its own.
const Header = Slottable({slots: ['headerInput', '', 'title', 'subtitle', 'slotAbove', 'slotAfter', 'slotBefore']}, Skinnable(HeaderBase));

// Set up Header so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
Header.defaultSlot = 'header';

export default Header;
export {Header, HeaderBase};
