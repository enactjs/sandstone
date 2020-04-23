/**
 * Provides a Sandstone-themed TabLayout.
 *
 * @module sandstone/TabLayout
 * @exports TabLayout
 * @exports Tab
 */

import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Changeable} from '@enact/ui/Changeable';
import {Cell, Layout} from '@enact/ui/Layout';
import deprecate from '@enact/core/internal/deprecate';
import Toggleable from '@enact/ui/Toggleable';
import ViewManager from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import TabGroup from './TabGroup';
import Tab from './Tab';

import componentCss from './TabLayout.module.less';

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

		/**
		 * Specify dimensions for the layout areas.
		 *
		 * All 4 combinations must me supplied: each of the elements, tabs and content in both
		 * collapsed and expanded state.
		 *
		 * @type {Object}
		 * @default {
		 * 	tabs: {
		 * 		collapsed: 450,
		 * 		normal: 855
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
				expanded: PropTypes.number.isRequired,
				normal: PropTypes.number.isRequired
			}).isRequired,
			tabs: PropTypes.shape({
				collapsed: PropTypes.number.isRequired,
				normal: PropTypes.number.isRequired
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
		 * Orientation of the tabs.
		 *
		 * Horizontal tabs support a maximum of five tabs.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * List of tabs to display.
		 *
		 * Each object in the array of tabs should include a `title` property and, optionally, an
		 * `icon` property (see: {@link sandstone/Icon.IconBase.children}). If an icon is not
		 * supplied for any tabs, no icons will be displayed when collapsed.
		 *
		 * @type {Object[]}
		 * @deprecated To be removed in 1.0.0-beta.1. Use
		 *	[Tab.title]{@link sandstone/TabLayout.Tab.title} instead.
		 * @public
		 */
		tabs: PropTypes.array
	},

	defaultProps: {
		dimensions: {
			tabs: {
				collapsed: 450,
				normal: 855
			},
			content: {
				expanded: null,
				normal: null
			}
		},
		index: 0,
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		className: 'tabLayout enact-fit',
		publicClassNames: ['tabLayout', 'tabs', 'content']
	},

	handlers: {
		onSelect: handle(
			adaptEvent(({selected}) => ({index: selected}), forward('onSelect'))
		)
	},

	computed: {
		children: ({children, tabs}) => {
			if (tabs) {
				deprecate({
					name: 'sandstone/TabLayout.TabLayout.tabs',
					until: '1.0.0-beta.1'
				});
				return children;
			} else {
				return React.Children.map(children, (child) => {
					return <React.Fragment>{child.props.children}</React.Fragment>;
				});
			}
		},
		className: ({collapsed, orientation, styler}) => styler.append(
			{collapsed: orientation === 'vertical' && collapsed},
			orientation
		),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical',
		// limit to 5 tabs for horizontal orientation
		tabs: ({children, orientation, tabs}) => {
			let outTabs = tabs || React.Children.map(children, (child) => {
				const {icon, title} = child.props;
				return {icon, title};
			});
			return orientation === 'horizontal' && outTabs.length > 5 ? outTabs.slice(0, 5) : outTabs;
		}
	},

	render: ({children, collapsed, css, dimensions, index, onCollapse, onExpand, onSelect, orientation, tabOrientation, tabs, ...rest}) => {
		const tabSize = (collapsed ? dimensions.tabs.collapsed : dimensions.tabs.normal);
		const contentSize = (collapsed ? dimensions.content.expanded : dimensions.content.normal);
		return (
			<Layout {...rest} orientation={tabOrientation}>
				<Cell className={css.tabs} size={tabSize}>
					<TabGroup
						collapsed={collapsed}
						onFocus={onExpand}
						onFocusTab={onSelect}
						onSelect={onSelect}
						orientation={orientation}
						selectedIndex={index}
						tabs={tabs}
					/>
				</Cell>
				<Cell
					size={contentSize}
					className={css.content}
					component={ViewManager}
					index={index}
					noAnimation
					onFocus={onCollapse}
					orientation={orientation}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

const TabLayoutDecorator = compose(
	Toggleable({prop: 'collapsed', activate: 'onCollapse', deactivate: 'onExpand'}),
	Changeable({prop: 'index', change: 'onSelect'})
);

// Currently not documenting the base output since it's not exported
const TabLayout = TabLayoutDecorator(TabLayoutBase);

/**
 * A shortcut to access {@link sandstone/TabLayout.Tab}
 *
 * @name Tab
 * @static
 * @memberof sandstone/TabLayout.TabLayout
 */
TabLayout.Tab = Tab;

export default TabLayout;
export {
	TabLayout,
	TabLayoutBase,
	TabLayoutDecorator,
	Tab
};
