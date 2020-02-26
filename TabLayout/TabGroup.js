/**
 * Provides an Sandstone-themed tab group.
 *
 * @module sandstone/TabGroup
 * @exports TabGroup
 */
import kind from '@enact/core/kind';
import Group from '@enact/ui/Group';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Icon from '../Icon';
import Item from '../Item';
import Scroller from '../Scroller';

const TabBase = kind({
	name: 'Tab',

	propTypes: {
		icon: PropTypes.string,
		selected: PropTypes.bool
	},

	render: ({children, icon, ...rest}) => {

		return (
			<Item
				{...rest}
			>
				{icon ? (
					<Icon slot="slotBefore">{icon}</Icon>
				) : null}
				{children}
			</Item>
		);
	}
});

/**
 * A group of tabs
 *
 * @class TabGroup
 * @memberof sandstone/TabLayout
 * @ui
 * @private
 */
const TabGroupBase = kind({
	name: 'TabGroup',

	propTypes: /** @lends sandstone/TabGroup.TabGroup.prototype */ {
		tabs: PropTypes.array.isRequired,
		collapsed: PropTypes.bool,
		css: PropTypes.object,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		orientation: PropTypes.string,
		selectedIndex: PropTypes.number
	},

	computed: {
		children: ({tabs}) => tabs.map(({children, title, ...rest}, i) => {
			return {
				key: `tabs${i}`,
				children: title || children,
				...rest
			};
		}),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => !tab.icon).length
	},

	render: ({noIcons, onBlur, onFocus, selectedIndex, ...rest}) => {
		delete rest.collapsed;
		delete rest.tabs;

		return (
			<Scroller onBlur={onBlur} onFocus={onFocus}>
				{noIcons ? (
					<Item>
						<Icon slot="slotBefore">list</Icon>
					</Item>
				) : (
					<Group
						{...rest}
						childComponent={TabBase}
						component="div"
						select="radio"
						selected={selectedIndex}
						selectedProp="selected"
					/>
				)}
			</Scroller>
		);
	}
});

const TabGroupDecorator = compose(
	SpotlightContainerDecorator({enterTo: 'last-focused'})
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
