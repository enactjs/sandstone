/**
 * A pre-set layout composing `TabLayout` and `VirtualGridList`.
 *
 * @module sandstone/TabGridListLayout
 * @exports TabGridListLayout
 * @exports TabGridListItem
 */

import kind from '@enact/core/kind';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import React from 'react';

import {CollapsingHeaderPanel as Panel} from '../Panels';
import TabLayout from '../TabLayout';
import {VirtualGridList} from '../VirtualList';

import componentCss from './TabGridListLayout.module.less';

/**
 * A layout incorporating `TabLayout` and `VirtualGridList`.
 *
 * @class TabGridListLayout
 * @memberof sandstone/TabGridListLayout
 * @ui
 * @public
 */
const TabGridListLayoutBase = kind({
	name: 'TabGridListLayout',

	propTypes: /** @lends sandstone/TabGridListLayout.TabGridListLayout.prototype */ {
		/**
		 * Header for the panel.
		 *
		 * This is usually passed by the [Slottable]{@link ui/Slottable.Slottable} API by using a
		 * [Header]{@link sandstone/Panels.Header} component as a child of the Panel.
		 *
		 * @type {Header}
		 * @public
		 */
		header: PropTypes.node
	},

	styles: {
		css: componentCss,
		className: 'tabGridListLayout'
	},

	computed: {
		children: ({children}) => {
			return React.Children.map(children, (child) => {
				const props = Object.assign({}, child.props);
				delete props.title;
				delete props.icon;
				return <VirtualGridList className={componentCss.list} showScrollToTopButton {...props} />;
			});
		},
		tabs: ({children}) => {
			return React.Children.map(children, (child) => {
				const {icon, title} = child.props;
				return {icon, title};
			});
		}
	},

	render: ({header, ...rest}) => {
		return (
			<Panel header={header}>
				<TabLayout {...rest} />
			</Panel>
		);
	}
});

/**
 * An item for the TabGridList.
 *
 * Configures the tab title and VirtualGridList settings.
 *
 * @class TabGridListItem
 * @memberof sandstone/TabGridListLayout
 * @ui
 * @public
 */
const TabGridListItemBase = kind({
	name: 'TabGridListItem',

	propTypes: /** @lends sandstone/TabGridListLayout.TabGridListItem.prototype */ {
		/**
		 * Size of an item for the VirtualGridList; valid value is an object that has `minWidth`
		 * and `minHeight` as properties.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.itemSize}
		 * @type {Number|ui/VirtualList.gridListItemSizeShape}
		 * @required
		 * @public
		 */
		itemSize: PropTypes.object.isRequired,

		/**
		 * The layout direction of the list.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.direction}
		 * @type {('horizontal'|'vertical')}
		 * @default 'vertical'
		 * @public
		 */
		direction: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Specifies how to show horizontal scrollbar.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.horizontalScrollbar}
		 * @type {('auto'|'visible'|'hidden')}
		 * @default 'auto'
		 * @public
		 */
		horizontalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

		/**
		 * The icon content.
		 *
		 * @see {@link ui/Icon.Icon.children}
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Called when scrolling.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.onScroll}
		 * @type {Function}
		 * @param {Object} event
		 * @param {Number} event.scrollLeft Scroll left value.
		 * @param {Number} event.scrollTop Scroll top value.
		 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
		 * @public
		 */
		onScroll: PropTypes.func,

		/**
		 * Called when scroll starts.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.onScrollStart}
		 * @type {Function}
		 * @param {Object} event
		 * @param {Number} event.scrollLeft Scroll left value.
		 * @param {Number} event.scrollTop Scroll top value.
		 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
		 * @public
		 */
		onScrollStart: PropTypes.func,

		/**
		 * Called when scroll stops.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.onScrollStop}
		 * @type {Function}
		 * @param {Object} event
		 * @param {Number} event.scrollLeft Scroll left value.
		 * @param {Number} event.scrollTop Scroll top value.
		 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
		 * @public
		 */
		onScrollStop: PropTypes.func,

		/**
		 * The ARIA role for the list.
		 *
		 * @type {String}
		 * @default 'list'
		 * @public
		 */
		role: PropTypes.string,

		/**
		 * Specifies how to scroll.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.scrollMode}
		 * @type {('native'|'translate')}
		 * @default 'native'
		 * @public
		 */
		scrollMode: PropTypes.string,

		/**
		 * Title of the tab.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Specifies how to show vertical scrollbar.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.verticalScrollbar}
		 * @type {('auto'|'visible'|'hidden')}
		 * @default 'auto'
		 * @public
		 */
		verticalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

		/**
		 * Wrap focus from end to beginning and vice-versa.
		 *
		 * @see {@link sandstone/VirtualList.VirtualGridList.wrap}
		 * @type {Boolean|'noAnimation'}
		 * @default false
		 * @public
		 */
		wrap: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.oneOf(['noAnimation'])
		])
	},

	render: () => <div>TabGridListItem is only to be used in TabGridListLayout!</div>
});

const TabGridListLayout = Slottable(
	{slots: ['header']},
	TabGridListLayoutBase
);


export default TabGridListLayout;
export {
	TabGridListItemBase,
	TabGridListItemBase as TabGridListItem,
	TabGridListLayout,
	TabGridListLayoutBase
};
