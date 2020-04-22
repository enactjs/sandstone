import handle, {adaptEvent, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Group from '@enact/ui/Group';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import DebounceDecorator from '../internal/DebounceDecorator';
import Icon from '../Icon';
import Button from '../Button';
import Skinnable from '../Skinnable';
import Scroller from '../Scroller';

import componentCss from './TabGroup.module.less';

const TabBase = kind({
	name: 'Tab',

	propTypes: {
		collapsed: PropTypes.bool,
		css: PropTypes.object,
		icon: PropTypes.string,
		index: PropTypes.number,
		onFocusTab: PropTypes.func,
		selected: PropTypes.bool
	},

	styles: {
		css: componentCss,
		className: 'tab'
	},

	handlers: {
		onFocus: handle(
			forward('onFocus'),
			() => !Spotlight.getPointerMode(),
			adaptEvent(
				(ev, {index}) => ({selected: index}),
				forward('onFocusTab')
			)
		)
	},

	render: ({children, css, ...rest}) => {
		delete rest.index;
		delete rest.onFocusTab;

		return (
			<Button
				{...rest}
				collapsable
				minWidth={false}
				backgroundOpacity="transparent"
				css={css}
			>
				{children}
			</Button>
		);
	}
});

const Tab = Skinnable(TabBase);

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
		onFocusTab: PropTypes.func,
		onSelect: PropTypes.func,
		orientation: PropTypes.string,
		selectedIndex: PropTypes.number
	},

	styles: {
		css: componentCss,
		className: 'tabGroup'
	},

	computed: {
		children: ({onFocusTab, tabs}) => tabs.map(({children, title, ...rest}, i) => {
			return {
				key: `tabs${i}`,
				children: title || children,
				onFocusTab,
				...rest
			};
		}),
		className: ({collapsed, styler}) => styler.append({collapsed}),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => !tab.icon).length
	},

	render: ({children, collapsed, noIcons, onBlur, onFocus, onSelect, selectedIndex, ...rest}) => {
		delete rest.onFocusTab;
		delete rest.tabs;

		return (
			<Scroller
				{...rest}
				onBlur={onBlur}
				onFocus={onFocus}
				horizontalScrollbar="hidden"
				verticalScrollbar="hidden"
			>
				{noIcons ? (
					<TabBase icon="list" collapsed />
				) : (
					<Group
						childComponent={Tab}
						component="div"
						indexProp="index"
						itemProps={{collapsed}}
						onSelect={onSelect}
						select="radio"
						selected={selectedIndex}
						selectedProp="selected"
					>
						{children}
					</Group>
				)}
			</Scroller>
		);
	}
});

const TabGroupDecorator = compose(
	SpotlightContainerDecorator({enterTo: 'last-focused'}),
	DebounceDecorator({cancel: 'onBlur', debounce: 'onFocusTab', delay: 300})
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
