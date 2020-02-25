/**
 * Provides an Sandstone-themed tab group.
 *
 * @module sandstone/TabGroup
 * @exports TabGroup
 */
import handle, {adaptEvent, forward} from '@enact/core/handle';
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

	handlers: {
		onActivate: handle(
			adaptEvent(
				(ev, {'data-index': index}) => ({index}),
				forward('onActivate')
			)
		)
	},

	render: ({children, icon, onActivate, ...rest}) => {

		return (
			<Item {...rest} onFocus={onActivate}>
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
		onActivate: PropTypes.func,
		orientation: PropTypes.string,
		selectedIndex: PropTypes.number
	},

	computed: {
		children: ({onActivate, tabs}) => tabs.map(({children, title, ...rest}, i) => {
			return {
				key: `tabs${i}`,
				children: title || children,
				onActivate,
				...rest
			};
		}),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => !tab.icon).length
	},

	render: ({noIcons, onActivate, selectedIndex, ...rest}) => {
		delete rest.collapsed;
		delete rest.tabs;

		return (
			<Scroller>
				{noIcons ? (
					<Item onFocus={onActivate}>
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
