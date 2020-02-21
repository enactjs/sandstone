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
import Skinnable from '../Skinnable';

import componentCss from './TabGroup.module.less';

const TabBase = kind({
	name: 'Tab',

	propTypes: {
		icon: PropTypes.string,
		minimized: PropTypes.bool,
		orientation: PropTypes.string,
		selected: PropTypes.bool
	},

	styles: {
		css: componentCss,
		className: 'tab'
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected})
	},

	render: ({children, icon, minimized, selected, orientation, style = {}, ...rest}) => {
		delete rest.selected;

		if (orientation === 'vertical') {
			style.textAlign = 'center';
		}
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
				{minimized ? null : children}
			</Cell>
		);
	}
});
const Tab = Skinnable(TabBase);

/**
 * TBD.
 *
 * @class TabGroup
 * @memberof sandstone/TabGroup
 * @mixes sandstone/Skinnable.Skinnable
 * @ui
 * @public
 */
const TabGroupBase = kind({
	name: 'TabGroup',

	propTypes: /** @lends sandstone/TabGroup.TabGroup.prototype */ {
		tabs: PropTypes.array.isRequired,
		css: PropTypes.object,
		minimized: PropTypes.bool,
		orientation: PropTypes.string,
		selectedIndex: PropTypes.number
	},

	styles: {
		css: componentCss,
		className: 'tabBar'
	},

	computed: {
		className: ({orientation, styler}) => styler.append(orientation),
		children: ({tabs}) => [...tabs].map((tab, i) => {
			tab.key = 'tab' + i;
			tab.children = tab.title || tab.children;
			delete tab.title;
			return tab;
		}),
		noIcons: ({minimized, orientation, tabs}) => orientation === 'vertical' && !tabs[0].icon && minimized
	},

	render: ({minimized, noIcons, orientation, selectedIndex, ...rest}) => {
		delete rest.tabs;

		return (
			<Scroller>
				{noIcons ?
					<Button icon="list" /> :
					<Layout
						{...rest}
						align="start"
						childComponent={Tab}
						component={Group}
						itemProps={{
							minimized: orientation === 'vertical' ? minimized : false,
							orientation
						}}
						orientation={orientation}
						select="radio"
						selected={selectedIndex}
						selectedProp="
						selected"
					/>
				}
			</Scroller>
		);
	}
});

TabGroupBase.defaultSlot = 'tabs';

const TabGroupDecorator = compose(
	Skinnable,
	Slottable({slots: ['tabs']}),
	SpotlightContainerDecorator
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
