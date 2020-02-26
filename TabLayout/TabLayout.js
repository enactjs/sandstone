/**
 * Provides an Sandstone-themed TabLayout.
 *
 * @module sandstone/TabLayout
 * @exports TabLayout
 */
import {adaptEvent, forward, handle} from '@enact/core/handle';
import {Cell, Layout} from '@enact/ui/Layout';
import {Changeable} from '@enact/ui/Changeable';
import Toggleable from '@enact/ui/Toggleable';
import ViewManager from '@enact/ui/ViewManager';
import kind from '@enact/core/kind';
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
		 * [`Panel`s]{@link sandstone/Panels.Panel} to be rendered
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Collapse the vertical tab list into icons only.
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
		 * Calls onBlur when focus is blurred from the tabs.
		 * This collapses the vertical tab.
		 *
		 * @type {Function}
		 * @public
		 */
		onCollapse: PropTypes.func,

		/**
		 * Calls onFocus when focus is blurred from the tabs.
		 * This expands the vertical tab.
		 *
		 * @type {Function}
		 * @public
		 */
		onExpand: PropTypes.func,

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
		className: ({collapsed, orientation, styler}) => styler.append({collapsed: orientation === 'vertical' && collapsed}, orientation),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical',
		// limit to 5 tabs for horizontal orientation
		tabs: ({orientation, tabs}) => orientation === 'horizontal' && tabs.length > 5 ? tabs.slice(0, 5) : tabs
	},

	render: ({children, collapsed, css, index, onCollapse, onExpand, onSelect, orientation, tabOrientation, tabs, ...rest}) => {
		const tabSize = collapsed ? 450 : 855;

		return (
			<Layout {...rest} orientation={tabOrientation}>
				<Cell className={css.tabs} size={tabSize}>
					<TabGroup
						collapsed={collapsed}
						onFocus={onExpand}
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
					onFocus={onCollapse}
					orientation={orientation}
					noAnimation
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
