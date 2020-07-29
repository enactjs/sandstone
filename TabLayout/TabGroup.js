import handle, {adaptEvent, forProp, forward, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Group from '@enact/ui/Group';
import {Cell, Layout} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import DebounceDecorator from '../internal/DebounceDecorator';
import Button from '../Button';
import Skinnable from '../Skinnable';
import Scroller from '../Scroller';
import Sprite from '../Sprite';

import componentCss from './TabGroup.module.less';

const MAX_TABS_BEFORE_SCROLLING = 7;

// Since Button and Cell both have a `size` prop, TabButton is required to relay the Button.size to Button, rather than Cell.
// eslint-disable-next-line enact/prop-types
const TabButton = ({buttonSize, ...rest}) => (<Button size={buttonSize} {...rest} css={componentCss} />);

const TabBase = kind({
	name: 'Tab',

	propTypes: {
		collapsed: PropTypes.bool,
		css: PropTypes.object,
		icon: PropTypes.string,
		index: PropTypes.number,
		onFocusTab: PropTypes.func,
		orientation: PropTypes.string,
		stopped: PropTypes.bool,
		selected: PropTypes.bool,
		size: PropTypes.number,
		sprite: PropTypes.object
	},

	defaultProps: {
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		className: 'tab'
	},

	handlers: {
		onFocus: handle(
			forward('onFocus'),
			not(forProp('disabled', true)),
			() => !Spotlight.getPointerMode(),
			adaptEvent(
				(ev, {index}) => ({selected: index}),
				forward('onFocusTab')
			)
		)
	},

	computed: {
		className: ({orientation, styler}) => styler.append(orientation),
		iconComponent: ({sprite, stopped}) => {
			if (sprite) {
				return (<Sprite stopped={stopped} {...sprite} />);
			}
		}
	},

	render: ({children, collapsed, css, orientation, size, ...rest}) => {
		delete rest.index;
		delete rest.onFocusTab;
		delete rest.stopped;
		delete rest.sprite;

		if (collapsed) children = null;

		const commonProps = {
			backgroundOpacity: 'transparent',
			children,
			collapsable: true,
			css,
			focusEffect: 'static',
			minWidth: false,
			role: null
		};

		switch (orientation) {
			// Horizontal Cell sizing can auto-size width or be set to a finite value, stretching the Button.
			case 'horizontal': {
				return (
					<Cell
						{...rest}
						size={size}
						component={TabButton}
						{...commonProps}
					/>
				);
			}
			case 'vertical': {
				// Vertical sizing depends on Button establishing the dimensions of the Cell.
				return (
					<Button
						{...rest}
						{...commonProps}
					/>
				);
			}
		}
	}
});

const Tab = Toggleable({prop: 'stopped', activate: 'onBlur', deactivate: 'onFocus'}, Skinnable(TabBase));

const GroupComponent = SpotlightContainerDecorator(
	{
		// using default-element so we always land on the selected tab in order to avoid changing
		// the view when re-entering the tab group
		defaultElement: `.${componentCss.selected}`,
		enterTo: 'default-element',
		partition: true,
		// When swapping from unscrolled to scrolled tab group, the container config is lost so this
		// preserves it across unmounts / remounts
		preserveId: true
	},
	Group
);

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

	functional: true,

	propTypes: /** @lends sandstone/TabGroup.TabGroup.prototype */ {
		tabs: PropTypes.array.isRequired,
		collapsed: PropTypes.bool,
		css: PropTypes.object,
		onBlur: PropTypes.func,
		onBlurList: PropTypes.func,
		onFocus: PropTypes.func,
		onFocusTab: PropTypes.func,
		onSelect: PropTypes.func,
		orientation: PropTypes.string,
		selectedIndex: PropTypes.number,
		spotlightDisabled: PropTypes.bool,
		spotlightId: PropTypes.string,
		tabSize: PropTypes.number
	},

	styles: {
		css: componentCss,
		className: 'tabGroup'
	},

	computed: {
		tabsDisabled: ({tabs}) => tabs.find(tab => tab && !tab.disabled) == null,
		className: ({collapsed, orientation, styler}) => styler.append({collapsed}, orientation),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => (!tab.icon && !tab.sprite)).length
	},

	render: ({collapsed, noIcons, onBlur, onBlurList, onFocus, onFocusTab, onSelect, orientation, selectedIndex, spotlightId, spotlightDisabled, tabs, tabSize, tabsDisabled, ...rest}) => {
		delete rest.children;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const itemProps = React.useMemo(() => ({collapsed, orientation, size: tabSize}), [collapsed, orientation, tabSize]);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const children = React.useMemo(() => tabs.map(tab => {
			if (tab) {
				// eslint-disable-next-line no-shadow
				const {icon, title, tabKey, sprite, ...rest} = tab;
				const key = tabKey || tabKey === 0 ? tabKey : `tabs_${title + (typeof icon === 'string' ? icon : '')}`;

				return {
					children: title,
					icon,
					key,
					onFocusTab,
					defaultStopped: Boolean(sprite),
					sprite,
					...rest
				};
			} else {
				return null;
			}
		}).filter(tab => tab != null), [onFocusTab, tabs]);

		const isHorizontal = orientation === 'horizontal';
		const groupComponent = (isHorizontal ? Layout : 'div'); // Only horizontal needs the arrangement capabilities of `Layout`
		// Only vertical with more than MAX_TABS should use scroller
		const useScroller = (!isHorizontal && children.length > MAX_TABS_BEFORE_SCROLLING);
		const scrollerProps = useScroller ? {
			horizontalScrollbar: 'hidden',
			verticalScrollbar: 'hidden'
		} : null;
		const Component = useScroller ? Scroller : 'div';

		return (
			<Component
				{...rest}
				onBlur={onBlur}
				onFocus={onFocus}
				{...scrollerProps}
			>
				{noIcons ? (
					<TabBase
						icon="list"
						collapsed
						disabled={tabsDisabled}
						onSpotlightDisappear={onBlurList}
						spotlightDisabled={spotlightDisabled}
					/>
				) : (
					<GroupComponent
						childComponent={Tab}
						className={componentCss.tabs}
						component={groupComponent}
						indexProp="index"
						itemProps={itemProps}
						onSelect={onSelect}
						orientation={orientation}
						select="radio"
						selected={selectedIndex}
						selectedProp="selected"
						spotlightId={spotlightId}
						spotlightDisabled={spotlightDisabled}
					>
						{children}
					</GroupComponent>
				)}
				{isHorizontal ? <hr className={componentCss.horizontalLine} /> : null}
			</Component>
		);
	}
});

const TabGroupDecorator = compose(
	DebounceDecorator({cancel: 'onBlur', debounce: 'onFocusTab', delay: 300})
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
