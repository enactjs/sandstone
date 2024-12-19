import handle, {forProp, forward, forwardCustom, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Group from '@enact/ui/Group';
import IdProvider from '@enact/ui/internal/IdProvider';
import {Cell, Layout} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useMemo} from 'react';

import $L from '../internal/$L';
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
		onTabClick: PropTypes.func,
		orientation: PropTypes.string,
		selected: PropTypes.bool,
		size: PropTypes.number,
		sprite: PropTypes.object,
		stopped: PropTypes.bool
	},

	defaultProps: {
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		className: 'tab',
		publicClassNames: ['bg', 'button', 'client', 'selected', 'tab', 'vertical']
	},

	handlers: {
		onClick: handle(
			forward('onClick'),
			not(forProp('disabled', true)),
			forwardCustom('onTabClick', (ev, {index}) => ({selected: index}))
		),
		onFocus: handle(
			forward('onFocus'),
			not(forProp('disabled', true)),
			() => !Spotlight.getPointerMode(),
			forwardCustom('onFocusTab', (ev, {index}) => ({selected: index}))
		)
	},

	computed: {
		className: ({collapsed, orientation, styler}) => styler.append({collapsed}, orientation),
		iconComponent: ({sprite, stopped}) => {
			if (sprite) {
				return (<Sprite stopped={stopped} {...sprite} />);
			}
		}
	},

	render: ({children, collapsed, css, orientation, size, ...rest}) => {
		delete rest.index;
		delete rest.onFocusTab;
		delete rest.onTabClick;
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
			role: 'tab'
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
		id: PropTypes.string,
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
		className: 'tabGroup',
		publicClassNames: ['bg', 'button', 'client', 'selected', 'tab', 'tabGroup', 'vertical']
	},

	computed: {
		className: ({collapsed, orientation, styler}) => styler.append({collapsed}, orientation),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => (!tab.icon && !tab.sprite)).length,
		tabsDisabled: ({tabs}) => tabs.find(tab => tab && !tab.disabled) == null,
		tabsSpotlightDisabled: ({spotlightDisabled, tabs}) => spotlightDisabled || tabs.find(tab => tab && !tab.spotlightDisabled) == null
	},

	render: ({css, collapsed, id, noIcons, onBlur, onBlurList, onFocus, onFocusTab, onSelect, orientation, selectedIndex, spotlightId, spotlightDisabled, tabs, tabSize, tabsDisabled, tabsSpotlightDisabled, ...rest}) => {
		delete rest.children;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const itemProps = useMemo(() => ({css, collapsed, orientation, size: tabSize}), [css, collapsed, orientation, tabSize]);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const children = useMemo(() => tabs.map(tab => {
			if (tab) {
				// eslint-disable-next-line no-shadow
				const {icon, title, tabKey, sprite, ...rest} = tab;
				const key = tabKey || tabKey === 0 ? tabKey : `tabs_${title + (typeof icon === 'string' ? icon : '')}`;

				return {
					children: title,
					defaultStopped: Boolean(sprite),
					icon,
					key,
					onFocusTab,
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
		const useScroller = (children.length > MAX_TABS_BEFORE_SCROLLING);
		const scrollerProps = useScroller ? {
			direction: isHorizontal ? 'horizontal' : 'vertical',
			horizontalScrollbar: 'hidden',
			hoverToScroll: true,
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
						spotlightDisabled={tabsSpotlightDisabled}
					/>
				) : (
					<div role="region" aria-labelledby={`${id}_tabgroup`}>
						<GroupComponent
							id={`${id}_tabgroup`}
							childComponent={Tab}
							aria-label={`${new IString($L('{total} items in total')).format({'total': tabs.length})}`}
							className={componentCss.tabs}
							component={groupComponent}
							indexProp="index"
							itemProps={itemProps}
							onSelect={onSelect}
							orientation={orientation}
							role="tablist"
							select="radio"
							selected={selectedIndex}
							selectedProp="selected"
							spotlightId={spotlightId}
							spotlightDisabled={spotlightDisabled}
						>
							{children}
						</GroupComponent>
					</div>
				)}
				{isHorizontal ? <hr className={componentCss.horizontalLine} /> : null}
			</Component>
		);
	}
});

const TabGroupDecorator = compose(
	DebounceDecorator({cancel: 'onBlur', debounce: 'onFocusTab', delay: 300}),
	IdProvider({
		generateProp: null,
		prefix: 'tg_'
	})
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
