/**
 * A decorator for adding contextual menus to components.
 *
 * @module sandstone/ContextualMenuDecorator
 * @exports ContextualMenuDecorator
 */

import {handle, forward, forProp} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import Repeater from '@enact/ui/Repeater';
import Toggleable from '@enact/ui/Toggleable';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';

import ContextualPopupDecorator from '../ContextualPopupDecorator';
import Item from '../Item';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

import css from './ContextualMenuDecorator.module.less';

// The maximum number of visible items. More than this number invokes a scroller.
// When updating this value, you must also set the max-items LESS variable.
const MAX_VISIBLE_MENU_ITEMS = 5;

/**
 * Default config for {@link sandstone/ContextualMenuDecorator.ContextualMenuDecorator}
 *
 * @type {Object}
 * @hocconfig
 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator
 */
const defaultConfig = {
	/**
	 * Disables passing the `skin` prop to the wrapped component.
	 *
	 * @see {@link sandstone/Skinnable.Skinnable.skin}
	 * @type {Boolean}
	 * @default false
	 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator.defaultConfig
	 * @public
	 */
	noSkin: false,

	/**
	 * The prop in which to pass the value of `open` state of ContextualMenuDecorator to the
	 * wrapped component.
	 *
	 * @type {String}
	 * @default 'selected'
	 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator.defaultConfig
	 * @public
	 */
	openProp: 'selected'
};

const ScrollingRepeater = ({className, ...rest}) => (
	<Scroller className={className}>
		<Repeater {...rest} />
	</Scroller>
);

const ContextualMenuDecoratorBase = hoc(defaultConfig, (config, Wrapped) => {
	// we might not need Skinnable at all here. If we want to skin the popup and it's defined as a
	// private component in this module, we can wrap it with skinnable and style it as needed there.
	const Component = Skinnable(
		ContextualPopupDecorator(
			{...config, noArrow: true},
			Wrapped
		)
	);

	return kind({
		name: 'ContextualMenuDecorator',

		propTypes: /** @lends sandstone/ContextualMenuDecorator.ContextualMenuDecorator.prototype */ {
			/**
			 * Direction of popup with respect to the wrapped component.
			 *
			 * @type {('above'|'above center'|'above left'|'above right'|'below'|'below center'|'below left'|'below right'|'left middle'|'left top'|'left bottom'|'right middle'|'right top'|'right bottom')}
			 * @default 'below right'
			 * @public
			 */
			direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),

			/**
			 * The items to be displayed in the `ContextualMenuDecorator` when `open`.
			 *
			 * Takes either an array of strings or an array of objects. When strings, the values will be
			 * used in the generated components as the readable text. When objects, the properties will
			 * be passed onto an `Item` component and `children` as well as a unique `key` property are
			 * required.
			 *
			 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
			 * @public
			 */
			menuItems: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.string),
				PropTypes.arrayOf(PropTypes.shape({
					children: PropTypes.string.isRequired,
					key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
				}))
			]),

			/**
			 * Offset from the activator to apply to the position of the popup.
			 *
			 * @type {('none'|'overlap'|'small')}
			 * @default 'overlap'
			 * @public
			 */
			offset: PropTypes.oneOf(['none', 'overlap', 'small']),

			/**
			 * Called when the user has attempted to close the popup.
			 *
			 * This may occur either when the close button is clicked or when spotlight focus
			 * moves outside the boundary of the popup. Setting `spotlightRestrict` to `'self-only'`
			 * will prevent Spotlight focus from leaving the popup.
			 *
			 * @type {Function}
			 * @public
			 */
			onClose: PropTypes.func,

			/**
			 * Called when the popup is opened.
			 *
			 * @type {Function}
			 * @public
			 */
			onOpen: PropTypes.func,

			/**
			 * CSS class name to pass to the
			 * [ContextualPopup]{@link sandstone/ContextualPopupDecorator.ContextualPopup}.
			 *
			 * This is commonly used to set width and height of the popup.
			 *
			 * @type {String}
			 * @public
			 */
			popupClassName: PropTypes.string,

			/**
			 * An object containing properties to be passed to popup component.
			 *
			 * @type {Object}
			 * @public
			 */
			popupProps: PropTypes.object,

			/**
			 * Width of the Popup component.
			 *
			 * When `'auto'` the popup will match the activator's width when `direction` is
			 * `'below'` or `'above'` or a width specified in `popupClassName`.
			 *
			 * @type {('auto'|'large'|'small')}
			 * @default 'auto'
			 * @private
			 */
			popupWidth: PropTypes.oneOf(['auto', 'large', 'small']),

			/**
			 * Set the type of scrim to use
			 *
			 * @type {('holepunch'|'translucent'|'transparent'|'none')}
			 * @default 'holepunch'
			 * @private
			 */
			scrimType: PropTypes.oneOf(['holepunch', 'translucent', 'transparent', 'none']),

			/**
			 * Restricts or prioritizes spotlight navigation.
			 *
			 * Allowed values are:
			 * * `'none'` - Spotlight can move freely within and beyond the popup
			 * * `'self-first'` - Spotlight should prefer components within the popup over
			 *   components beyond the popup, or
			 * * `'self-only'` - Spotlight can only be set within the popup
			 *
			 * @type {('none'|'self-first'|'self-only')}
			 * @default 'self-only'
			 * @public
			 */
			spotlightRestrict: PropTypes.oneOf(['none', 'self-first', 'self-only'])
		},

		defaultProps: {
			direction: 'below right',
			offset: 'overlap',
			popupWidth: 'auto',
			scrimType: 'holepunch',
			spotlightRestrict: 'self-only'
		},

		handlers: {
			onOpen: handle(
				forward('onClick'),
				forProp('open', false),
				forward('onOpen')
			)
		},

		styles: {
			css
		},

		computed: {
			// expect we'll be able to drop this when we add the private popupComponent
			// implementation with the Repeater for the items since the popup class could be set
			// on the component by itself
			popupClassName: ({popupWidth, popupClassName, styler}) => {
				const sizeClass = popupWidth !== 'auto' && popupWidth;
				return styler.join(
					'popup',
					'container',
					popupClassName,
					sizeClass
				);
			},
			popupComponent: ({menuItems}) => (menuItems && menuItems.length > MAX_VISIBLE_MENU_ITEMS ? ScrollingRepeater : Repeater),
			popupProps: ({menuItems, popupProps}) => ({
				'aria-live': null,
				children: menuItems,
				childComponent: Item,
				className: css.innerContainer,
				itemProps: {className: css.item, size: 'small'},
				component: 'div',
				role: null,
				...popupProps
			})
		},

		render: ({onOpen, popupProps, ...rest}) => {
			delete rest.menuItems;
			delete rest.onOpen;
			delete rest.popupWidth;

			return (
				<Component
					{...rest}
					onClick={onOpen}
					popupProps={popupProps}
				/>
			);
		}
	});
});

/**
 * Wraps a component to display a contextual popup menu.
 *
 * @hoc
 * @memberof sandstone/ContextualMenuDecorator
 * @mixes ui/Toggleable.Toggleable
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes sandstone/ContextualPopupDecorator.ContextualPopupDecorator
 * @public
 */
const ContextualMenuDecorator = compose(
	Toggleable({
		activate: 'onOpen',
		deactivate: 'onClose',
		prop: 'open',
		toggle: null
	}),
	ContextualMenuDecoratorBase
);

export default ContextualMenuDecorator;
export {
	ContextualMenuDecorator
};
