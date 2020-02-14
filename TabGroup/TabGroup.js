/**
 * Provides an Sandstone-themed tab group.
 *
 * @module sandstone/TabGroup
 * @exports TabGroup
 * @exports TabGroupBase
 */
import {Cell, Layout} from '@enact/ui/Layout';
import Group from '@enact/ui/Group';
import kind from '@enact/core/kind';
import Button from '../Button';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';
import Spottable from '@enact/spotlight/Spottable';

import Skinnable from '../Skinnable';

import componentCss from './TabGroup.module.less';

const TabBase = kind({
	name: 'Tab',

	propTypes: {
		css: PropTypes.object,
		icon: PropTypes.string,
		minimized: PropTypes.bool,
		onClick: PropTypes.func,
		orientation: PropTypes.string,
		selected: PropTypes.bool
	},

	styles: {
		css: componentCss,
		className: 'tab'
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected}),
		tabLabel: ({children, css, icon, minimized, orientation, selected}) => {
			let inline;
			if (orientation === 'vertical') {
				inline = true;
			}

			return (
				<div className={css.labeledIcon}>
					<Button
						backgroundOpacity="transparent"
						icon={icon}
						inline={inline}
						selected={selected}
					>
						{minimized ? null : children}
					</Button>
				</div>
			);
		}
	},

	render: ({onClick, orientation, style = {}, tabLabel, ...rest}) => {
		delete rest.selected;

		if (orientation === 'vertical') {
			style.textAlign = 'center';
		}
		return (
			<Cell {...rest} style={style} shrink onClick={onClick}>
				{tabLabel}
			</Cell>
		);
	}
});
const Tab = Skinnable(Spottable(TabBase));

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
		children: ({tabs}) => tabs.map((tab, i) => {
			tab.key = 'tab' + i;
			tab.children = tab.title || tab.children;
			delete tab.title;
			return tab;
		})
	},

	render: ({className, css, minimized, orientation, selectedIndex, style, ...rest}) => {
		delete rest.tabs;

		return (
			<Layout orientation={orientation} className={className} align="start" style={style}>
				<Cell>
					<Layout
						{...rest}
						className={css.tabGroup}
						align="start"
						childComponent={Tab}
						component={Group}
						itemProps={{
							minimized,
							orientation
						}}
						orientation={orientation}
						select="radio"
						selected={selectedIndex}
						selectedProp="selected"
					/>
				</Cell>
			</Layout>
		);
	}
});

TabGroupBase.defaultSlot = 'tabs';

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = Skinnable(Slottable({slots: ['tabs']}, TabGroupBase));

export default TabGroup;
export {
	TabGroup,
	TabGroupBase
};
