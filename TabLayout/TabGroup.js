/**
 * Provides an Sandstone-themed tab group.
 *
 * @module sandstone/TabGroup
 * @exports TabGroup
 */
import kind from '@enact/core/kind';
import {Cell, Layout} from '@enact/ui/Layout';
import Group from '@enact/ui/Group';
import Slottable from '@enact/ui/Slottable';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Button from '../Button';
import Scroller from '../Scroller';

const TabBase = kind({
	name: 'Tab',

	propTypes: {
		icon: PropTypes.string,
		collapsed: PropTypes.bool,
		selected: PropTypes.bool
	},

	render: ({children, icon, collapsed, selected, style = {}, ...rest}) => {
		delete rest.selected;

		return (
			<Cell
				{...rest}
				backgroundOpacity="transparent"
				component={Button}
				icon={icon}
				selected={selected}
				shrink
				style={style}
			>
				{collapsed ? null : children}
			</Cell>
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
		orientation: PropTypes.string,
		selectedIndex: PropTypes.number
	},

	computed: {
		children: ({tabs}) => [...tabs].map((tab, i) => {
			tab.key = 'tab' + i;
			tab.children = tab.title || tab.children;
			delete tab.title;
			return tab;
		}),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => !tab.icon).length
	},

	render: ({collapsed, noIcons, orientation, selectedIndex, ...rest}) => {
		delete rest.tabs;

		return (
			<Scroller>
				{noIcons ?
					<Button icon="list" /> :
					<Layout
						{...rest}
						align="start"
						childComponent={TabBase}
						component={Group}
						itemProps={{
							collapsed: orientation === 'vertical' ? collapsed : false,
							orientation
						}}
						orientation={orientation}
						select="radio"
						selected={selectedIndex}
						selectedProp="selected"
					/>
				}
			</Scroller>
		);
	}
});

TabGroupBase.defaultSlot = 'tabs';

const TabGroupDecorator = compose(
	Slottable({slots: ['tabs']}),
	SpotlightContainerDecorator
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
