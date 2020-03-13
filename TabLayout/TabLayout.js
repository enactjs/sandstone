/**
 * Provides an Sandstone-themed TabLayout.
 *
 * @module sandstone/TabLayout
 * @exports TabLayout
 */

import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Changeable} from '@enact/ui/Changeable';
import {Cell, Layout} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import ViewManager from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import TabGroup from './TabGroup';

import componentCss from './TabLayout.module.less';

/**
 * Tabbed Layout component.
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
		 * List of tabs to display.
		 *
		 * Each object in the array of tabs should include a `title` property and, optionally, an
		 * `icon` property (see: {@link sandstone/Icon.IconBase.children}). If an icon is not
		 * supplied for any tabs, no icons will be displayed when collapsed.
		 *
		 * @type {Object[]}
		 * @required
		 * @public
		 */
		tabs: PropTypes.array.isRequired,

		/**
		 * List of content to be rendered for each tab.
		 *
		 * The number of children should match the number of tabs.
		 *
		 * @type {Node[]}
		 * @public
		 */
		children: PropTypes.arrayOf(PropTypes.node),

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
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical'])
	},

	defaultProps: {
		index: 0,
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		className: 'tabLayout enact-fit'
	},

	handlers: {
		onSelect: handle(
			adaptEvent(({selected}) => ({index: selected}), forward('onSelect'))
		)
	},

	computed: {
		className: ({collapsed, orientation, styler}) => styler.append(
			{collapsed: orientation === 'vertical' && collapsed},
			orientation
		),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical',
		// limit to 5 tabs for horizontal orientation
		tabs: ({orientation, tabs}) => {
			return orientation === 'horizontal' && tabs.length > 5 ? tabs.slice(0, 5) : tabs;
		}
	},

	render: ({children, collapsed, css, index, onCollapse, onExpand, onSelect, orientation, tabOrientation, tabs, ...rest}) => {
		const tabSize = collapsed ? 450 : 855;
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

export default TabLayout;
export {
	TabLayout,
	TabLayoutBase
};
