/**
 * Sandstone styled Dropdown components
 *
 * @example
 * <Dropdown
 * 		defaultSelected={2}
 *		inline
 *		title="Options"
 * >
 *   {['Option 1', 'Option 2', 'Option 3', 'Option 4']}
 * </Dropdown>
 *
 * @module sandstone/Dropdown
 * @exports Dropdown
 * @exports DropdownBase
 * @exports DropdownBaseDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import {handle, forward, forProp, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import ForwardRef from '@enact/ui/ForwardRef';
import IdProvider from '@enact/ui/internal/IdProvider';
import Pure from '@enact/ui/internal/Pure';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import warning from 'warning';

import $L from '../internal/$L';
import Button from '../Button';
import ContextualPopupDecorator from '../ContextualPopupDecorator';
import {compareChildren} from '../internal/util';
import Heading from '../Heading';

import DropdownList, {isSelectedValid} from './DropdownList';

import css from './Dropdown.module.less';

const DropdownButtonBase = kind({
	name: 'DropdownButtonBase',

	propTypes: {
		forwardRef: EnactPropTypes.ref
	},

	render: ({forwardRef, ...props}) => (
		<Button
			{...props}
			css={css}
			ref={forwardRef}
			iconPosition="after"
		/>
	)
});

const DropdownButton = ContextualPopupDecorator(
	{noArrow: true},
	ForwardRef(
		DropdownButtonBase
	)
);
DropdownButton.displayName = 'DropdownButton';

/**
 * A stateless Dropdown component.
 *
 * @class DropdownBase
 * @memberof sandstone/Dropdown
 * @extends sandstone/Button.Button
 * @extends sandstone/ContextualPopupDecorator.ContextualPopupDecorator
 * @omit popupComponent
 * @ui
 * @public
 */
const DropdownBase = kind({
	name: 'Dropdown',

	propTypes: /** @lends sandstone/Dropdown.DropdownBase.prototype */ {
		/**
		 * Items to be displayed in the `Dropdown` when `open`.
		 *
		 * Takes either an array of strings or an array of objects. When strings, the values will be
		 * used in the generated components as the readable text. When objects, the properties will
		 * be passed onto an `Item` component; `children` as well as a unique `key` properties are
		 * required.
		 *
		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
		 * @public
		 */
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.shape({
				children: EnactPropTypes.renderable.isRequired,
				key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
			}))
		]),

		/**
		 * Placement of the Dropdown.
		 *
		 * @type {('above'|'below')}
		 * @default 'below'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'below']),

		/**
		 * Disables Dropdown, making it non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The `id` of Dropdown referred to when generating id for `'title'`.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		 * Called when the Dropdown is closing.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called when the Dropdown is opening.
		 *
		 * @type {Function}
		 * @public
		 */
		onOpen: PropTypes.func,

		/**
		 * Called when an item is selected.
		 *
		 * The event payload will be an object with the following members:
		 * * `data` - The value for the option as received in the `children` prop
		 * * `selected` - Number representing the selected option, 0 indexed
		 *
		 * @type {Function}
		 * @public
		 */
		onSelect: PropTypes.func,

		/**
		 * Displays the items.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Text displayed in the Dropdown when nothing is selected.
		 *
		 * The placeholder will be replaced by the selected item.
		 *
		 * @type {String}
		 * @default 'No selection'
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * Indicates the locale's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Index of the selected item.
		 *
		 * @type {Number}
		 * @public
		 */
		selected: PropTypes.number,

		/**
		 * The size of the Dropdown's [Button]{@link sandstone/Button.Button} component.
		 *
		 * @type {('large'|'small')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOf(['large', 'small']),

		/**
		 * Primary title text of the Dropdown.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Width of the Dropdown.
		 *
		 * @type {('huge'|'large'|'x-large'|'medium'|'small'|'tiny')}
		 * @default 'medium'
		 * @public
		 */
		width: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'x-large', 'huge'])
	},

	defaultProps: {
		direction: 'below',
		open: false,
		size: 'small',
		width: 'medium'
	},

	handlers: {
		onSelect: handle(
			forward('onSelect'),
			forward('onClose')
		),
		onOpen: handle(
			forward('onClick'),
			not(forProp('disabled', true)),
			not(forProp('open', true)),
			forward('onOpen')
		)
	},

	styles: {
		css,
		className: 'dropdown'
	},

	computed: {
		ariaLabelledBy: ({id, title}) => (title ? `${id}_title` : void 0),
		children: ({children, selected}) => {
			if (!Array.isArray(children)) return [];

			return children.map((child, i) => {
				const aria = {
					role: 'checkbox',
					'aria-checked': selected === i
				};

				warning(
					child != null,
					`Unsupported null or undefined child provided at index ${i} which will not be visible when rendered.`
				);

				if (typeof child === 'string') {
					return {
						...aria,
						children: child,
						key: `item_${child}`
					};
				}

				return {
					...aria,
					...child
				};
			});
		},
		className: ({width, styler}) => styler.append(`${width}Width`),
		direction: ({direction}) => `${direction} center`,
		placeholder: ({children, placeholder = $L('No selection'), selected}) => {
			if (isSelectedValid({children, selected})) {
				const child = children[selected];
				return typeof child === 'object' ? child.children : child;
			}

			return placeholder;
		},
		title: ({id, title}) => (title &&
			<Heading
				className={css.title}
				id={`${id}_title`}
				size="tiny"
			>
				{title}
			</Heading>
		)
	},

	render: ({ariaLabelledBy, children, direction, disabled, onClose, onOpen, onSelect, open, placeholder, selected, size, title, width, ...rest}) => {
		delete rest.rtl;

		const ariaProps = extractAriaProps(rest);
		const popupProps = {'aria-live': null, children, onSelect, selected, width, role: null};

		// `ui/Group`/`ui/Repeater` will throw an error if empty so we disable the Dropdown and
		// prevent Dropdown to open if there are no children.
		const hasChildren = children.length > 0;
		const openDropdown = hasChildren && !disabled && open;

		return (
			<div role="region" aria-labelledby={ariaLabelledBy} {...rest}>
				{title}
				<DropdownButton
					direction={direction}
					disabled={hasChildren ? disabled : true}
					focusEffect="static"
					icon={openDropdown ? 'arrowlargeup' : 'arrowlargedown'}
					popupProps={popupProps}
					popupComponent={DropdownList}
					onClick={onOpen}
					onClose={onClose}
					open={openDropdown}
					size={size}
					spotlightRestrict="self-only"
					{...ariaProps}
				>
					{placeholder}
				</DropdownButton>
			</div>
		);
	}
});

/**
 * Applies Sandstone specific behaviors and functionality to
 * [DropdownBase]{@link sandstone/Dropdown.DropdownBase}.
 *
 * @hoc
 * @memberof sandstone/Dropdown
 * @mixes ui/Changeable.Changeable
 * @mixes ui/Toggleable.Toggleable
 * @omit selected
 * @omit defaultSelected
 * @omit value
 * @omit defaultValue
 * @omit onChange
 * @public
 */
const DropdownDecorator = compose(
	Pure({
		propComparators: {
			children: compareChildren
		}
	}),
	I18nContextDecorator({
		rtlProp: 'rtl'
	}),
	IdProvider({
		generateProp: null,
		prefix: 'd_'
	}),
	Changeable({
		change: 'onSelect',
		prop: 'selected'
	}),
	Toggleable({
		activate: 'onOpen',
		deactivate: 'onClose',
		prop: 'open',
		toggle: null
	})
);

/**
 * Displays the items.
 *
 * @name open
 * @memberof sandstone/Dropdown.DropdownDecorator.prototype
 * @type {Boolean}
 * @default false
 * @public
 */

/**
 * Index of the selected item.
 *
 * @name selected
 * @memberof sandstone/Dropdown.DropdownDecorator.prototype
 * @type {Number}
 * @public
 */

/**
 * The initial selected index when `selected` is not defined.
 *
 * @name defaultSelected
 * @memberof sandstone/Dropdown.DropdownDecorator.prototype
 * @type {Number}
 * @public
 */

/**
 * A Sandstone Dropdown component.
 *
 * By default, `Dropdown` maintains the state of its `selected` property. Supply the
 * `defaultSelected` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `selected` at creation time and update it in response to
 * `onSelected` events.
 *
 * @class Dropdown
 * @memberof sandstone/Dropdown
 * @extends sandstone/Dropdown.DropdownBase
 * @ui
 * @public
 */
const DropdownWithoutContainer = DropdownDecorator(DropdownBase);
const Dropdown = SpotlightContainerDecorator({}, DropdownDecorator(DropdownBase));

export default Dropdown;
export {
	Dropdown,
	DropdownBase,
	DropdownDecorator,
	DropdownWithoutContainer
};
