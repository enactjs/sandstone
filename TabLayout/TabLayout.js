/**
 * Provides a Sandstone-themed TabLayout.
 *
 * @module sandstone/TabLayout
 * @exports TabLayout
 * @exports TabLayoutBase
 * @exports TabLayoutContext
 * @exports TabLayoutDecorator
 * @exports Tab
 */

import {adaptEvent, forward, forwardCustom, forwardWithPrevent, forProp, handle, not} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import kind from '@enact/core/kind';
import {cap, mapAndFilterChildren} from '@enact/core/util';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Changeable} from '@enact/ui/Changeable';
import {Cell, Layout} from '@enact/ui/Layout';
import {scaleToRem} from '@enact/ui/resolution';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import ViewManager from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {createContext, Fragment} from 'react';

import {getLastInputType} from '../ThemeDecorator';

import RefocusDecorator, {getNavigableFilter, getTabsSpotlightId} from './RefocusDecorator';
import TabGroup from './TabGroup';
import Tab from './Tab';

import componentCss from './TabLayout.module.less';
import popupTabLayoutComponentCss from '../PopupTabLayout/PopupTabLayout.module.less';

const TabLayoutContext = createContext(null);

const TouchableCell = Touchable(Cell);

const isTouchMode = () => (getLastInputType() === 'touch');

/**
 * Tabbed Layout component.
 *
 * Example:
 *
 * ```jsx
 * 	<TabLayout>
 * 		<Tab title="Tab One">
 * 			<Item>Hello</Item>
 * 		</Tab>
 * 		<Tab title="Tab Two">
 * 			<Item>Goodbye</Item>
 * 		</Tab>
 * 	</TabLayout>
 * ```
 *
 * @class TabLayout
 * @memberof sandstone/TabLayout
 * @ui
 * @public
 */
const TabLayoutBase = kind({
	name: 'TabLayout',

	propTypes: /** @lends sandstone/TabLayout.TabLayout.prototype */ {
		/**
		 * Sets where this component should attach its tabs and animations.
		 *
		 * "left" and "right" represent true screen left and screen right, while "start" represents
		 * screen left in LTR and screen right in RTL. "end" is the reverse: screen right for LTR
		 * and screen left for RTL.
		 *
		 * @type {('left'|'right'|'start'|'end')}
		 * @default 'start'
		 * @private
		 */
		anchorTo: PropTypes.oneOf(['left', 'right', 'start', 'end']),

		/**
		 * Collection of [Tabs]{@link sandstone/TabLayout.Tab} to render.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Collapses the vertical tab list into icons only.
		 *
		 * Only applies to `orientation="vertical"`.  If the tabs do not include icons, a single
		 * collapsed icon will be shown.
		 *
		 * @type {Boolean}
		 * @public
		 */
		collapsed: PropTypes.bool,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		'data-spotlight-id': PropTypes.string,

		/**
		 * Specify dimensions for the layout areas.
		 *
		 * All 4 combinations must me supplied: each of the elements, tabs and content in both
		 * collapsed and expanded state.
		 *
		 * @type {{tabs: {collapsed: Number, normal: Number}, content: {expanded: number, normal: number}}}
		 * @default {
		 * 	tabs: {
		 * 		collapsed: 228,
		 * 		normal: 882
		 * 	},
		 * 	content: {
		 * 		expanded: null,
		 * 		normal: null
		 * 	}
		 * }
		 * @private
		 */
		dimensions: PropTypes.shape({
			content: PropTypes.shape({
				expanded: PropTypes.number,
				normal: PropTypes.number
			}).isRequired,
			tabs: PropTypes.shape({
				collapsed: PropTypes.number,
				normal: PropTypes.number
			}).isRequired
		}),

		/**
		 * The currently selected tab.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Called when the tabs are collapsed.
		 *
		 * @type {Function}
		 * @public
		 */
		onCollapse: PropTypes.func,

		/**
		 * Called when the tabs are expanded.
		 *
		 * @type {Function}
		 * @public
		 */
		onExpand: PropTypes.func,

		/**
		 * Called when a tab is selected
		 *
		 * @type {Function}
		 * @public
		*/
		onSelect: PropTypes.func,

		/**
		 * Called when the tab collapse or expand animation completes.
		 *
		 * Event payload includes:
		 * * `type` - Always set to "onTabAnimationEnd"
		 * * `collapsed` - `true` when the tabs are collapsed
		 *
		 * @type {Function}
		 * @public
		 */
		onTabAnimationEnd: PropTypes.func,

		/**
		 * Orientation of the tabs.
		 *
		 * Horizontal tabs support a maximum of six tabs.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Assign a custom size to horizontal tabs.
		 *
		 * Tabs in the horizontal orientation automatically stretch to fill the available width.
		 * Leave this prop blank to use the default auto-sizing behavior.
		 * Tabs may also be set to a finite width using this property. This accepts numeric pixel
		 * values. Be mindful of the value you provide as values that are too wide will run off the
		 * edge of the screen.
		 *
		 * Only applies to `orientation="horizontal"` at this time.
		 *
		 * @type {Number}
		 * @public
		 */
		tabSize: PropTypes.number,

		/**
		 * Type of TabLayout.
		 *
		 * @type {('normal'|'popup')}
		 * @default 'normal'
		 * @private
		 */
		type: PropTypes.oneOf(['normal', 'popup'])
	},

	defaultProps: {
		anchorTo: 'start',
		dimensions: {
			tabs: {
				collapsed: 216,
				normal: 882
			},
			content: {
				expanded: null,
				normal: null
			}
		},
		index: 0,
		orientation: 'vertical',
		type: 'normal'
	},

	styles: {
		css: componentCss,
		className: 'tabLayout',
		publicClassNames: ['bg', 'button', 'client', 'collapsed', 'content', 'selected', 'tab', 'tabGroup', 'tabLayout', 'tabs', 'tabsExpanded', 'vertical']
	},

	handlers: {
		onKeyDown: (ev, props) => {
			const {keyCode, target} = ev;
			const {collapsed, orientation, 'data-spotlight-id': spotlightId} = props;
			const direction = getDirection(keyCode);

			if (forwardWithPrevent('onKeyDown', ev, props) && direction && collapsed && orientation === 'vertical' && document.querySelector(`[data-spotlight-id='${spotlightId}']`).contains(target)) {
				Spotlight.setPointerMode(false);
				ev.preventDefault();

				if (Spotlight.move(direction)) {
					ev.stopPropagation();
				} else if (document.querySelector(`[data-spotlight-id='${spotlightId}'] .${componentCss.content}`).contains(target)) {
					Spotlight.set(spotlightId, {navigableFilter: null});
					const nextTarget = getTargetByDirectionFromElement(direction, target);
					Spotlight.set(spotlightId, {navigableFilter: getNavigableFilter(spotlightId, collapsed)});

					if (nextTarget && document.querySelector(`.${componentCss.tabs}`).contains(nextTarget)) {
						forward('onExpand', ev, props);
					}
				}
			}
		},
		onKeyUp: (ev, props) => {
			const {keyCode, target} = ev;
			const {collapsed, 'data-spotlight-id': spotlightId, type} = props;
			const popupPanelRef = document.querySelector(`[data-spotlight-id='${spotlightId}'] .${popupTabLayoutComponentCss.panel}`);

			if (forwardWithPrevent('onKeyUp', ev, props) && type === 'popup' && is('cancel')(keyCode) && popupPanelRef.contains(target) && popupPanelRef.dataset.index === '0') {
				if (collapsed) {
					forward('onExpand', ev, props);
				}
				Spotlight.move('left');
				ev.stopPropagation();
			}
		},
		onSelect: handle(
			forwardCustom('onSelect', ({selected}) => ({index: selected}))
		),
		handleTabsTransitionEnd: handle(
			forward('onTransitionEnd'),
			forProp('orientation', 'vertical'),
			// Validate the transition is from the root node
			(ev) => ev.target.classList.contains(componentCss.tabs),
			adaptEvent(
				(ev, {collapsed}) => ({type: 'onTabAnimationEnd', collapsed: Boolean(collapsed)}),
				forward('onTabAnimationEnd')
			)
		),
		handleFlick: ({direction, velocityX}, {collapsed, onCollapse, onExpand}) => {
			// See the global class 'spotlight-input-touch' to check the input type is touch
			if (isTouchMode() && direction === 'horizontal') {
				if (!collapsed && velocityX < 0) {
					onCollapse();
				} else if (collapsed && velocityX > 0) {
					onExpand();
				}
			}
		},
		handleClick: handle(
			isTouchMode,
			forward('onExpand')
		),
		handleFocus: handle(
			not(isTouchMode),
			forward('onExpand')
		),
		handleEnter: (ev, props) => {
			const {index, previousIndex} = ev;

			if (index > previousIndex) {
				forward('onCollapse', ev, props);
			}
		}
	},

	computed: {
		children: ({children}) => mapAndFilterChildren(children, (child) => (
			<Fragment>{child.props.children}</Fragment>
		)),
		className: ({collapsed, anchorTo, orientation, styler}) => styler.append(
			{collapsed: orientation === 'vertical' && collapsed},
			`anchor${cap(anchorTo)}`,
			orientation
		),
		style: ({dimensions, orientation, style}) => ({
			...style,
			'--tablayout-expand-collapse-diff': ((orientation === 'vertical') ? scaleToRem(dimensions.tabs.normal - dimensions.tabs.collapsed) : 0)
		}),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical',
		// limit to 6 tabs for horizontal orientation
		tabs: ({children, orientation}) => {
			const tabs = mapAndFilterChildren(children, (child) => (
				Object.keys(child.props)
					.filter((prop) => prop !== 'children' && prop !== 'id')
					.reduce((obj, key) => ({...obj, [key]: child.props[key]}), {})
			));
			return orientation === 'horizontal' && tabs.length > 6 ? tabs.slice(0, 6) : tabs;
		}
	},

	render: ({children, collapsed, css, 'data-spotlight-id': spotlightId, dimensions, handleClick, handleEnter, handleFlick, handleFocus, handleTabsTransitionEnd, index, onCollapse, onSelect, orientation, tabOrientation, tabSize, tabs, type, ...rest}) => {
		delete rest.anchorTo;
		delete rest.onExpand;
		delete rest.onTabAnimationEnd;

		const contentSize = (collapsed ? dimensions.content.expanded : dimensions.content.normal);
		const isVertical = orientation === 'vertical';
		const ContentCell = isVertical ? TouchableCell : Cell;
		const contentCellProps = isVertical ? {onFlick: handleFlick} : null;

		// Props that are shared between both of the rendered TabGroup components
		const tabGroupProps = {
			css,
			onClick: (collapsed ? handleClick : null),
			onFocus: (collapsed ? handleFocus : null),
			onFocusTab: onSelect,
			onSelect,
			orientation,
			selectedIndex: index,
			tabs
		};

		// In vertical orientation, render two sets of tabs, one just icons, one with icons and text.
		return (
			<TabLayoutContext.Provider value={handleEnter}>
				<Layout {...rest} orientation={tabOrientation} data-spotlight-id={spotlightId}>
					<Cell className={css.tabs} shrink onTransitionEnd={handleTabsTransitionEnd}>
						<TabGroup
							{...tabGroupProps}
							collapsed={isVertical}
							spotlightId={getTabsSpotlightId(spotlightId, isVertical)}
							tabSize={!isVertical ? tabSize : null}
							spotlightDisabled={!collapsed && isVertical}
						/>
					</Cell>
					{isVertical ? <Cell
						className={css.tabs + ' ' + css.tabsExpanded}
						size={dimensions.tabs.normal}
					>
						<TabGroup
							{...tabGroupProps}
							spotlightId={getTabsSpotlightId(spotlightId, false)}
							spotlightDisabled={collapsed}
						/>
					</Cell> : null}
					<ContentCell
						size={isVertical ? contentSize : null}
						className={css.content}
						component={ViewManager}
						index={index}
						noAnimation
						onFocus={(type === 'normal' && !collapsed) ? onCollapse : null}
						orientation={orientation}
						{...contentCellProps}
					>
						{children}
					</ContentCell>
				</Layout>
			</TabLayoutContext.Provider>
		);
	}
});

const TabLayoutDecorator = compose(
	Toggleable({prop: 'collapsed', activate: 'onCollapse', deactivate: 'onExpand'}),
	Changeable({prop: 'index', change: 'onSelect'}),
	RefocusDecorator,
	SpotlightContainerDecorator({
		// using last-focused so we return to the last focused if it exists but fall through to
		// default element if no focus has ocurred yet (e.g. on mount)
		enterTo: 'last-focused',
		// favor the content when collapsed and the tabs otherwise
		defaultElement: [`.${componentCss.horizontal} .${componentCss.tabs} *`, `.${componentCss.collapsed} .${componentCss.content} *`, `.${componentCss.tabsExpanded} *`]
	})
);

// Currently not documenting the base output since it's not exported
const TabLayout = TabLayoutDecorator(TabLayoutBase);

/**
 * A shortcut to access {@link sandstone/TabLayout.Tab}
 *
 * @name Tab
 * @type {sandstone/TabLayout.Tab}
 * @static
 * @memberof sandstone/TabLayout.TabLayout
 */
TabLayout.Tab = Tab;

export default TabLayout;
export {
	TabLayout,
	TabLayoutBase,
	TabLayoutContext,
	TabLayoutDecorator,
	Tab
};
