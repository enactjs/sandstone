import handle, {adaptEvent, forProp, forward, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Group from '@enact/ui/Group';
import {useId} from '@enact/ui/internal/IdProvider';
import {Cell, Layout} from '@enact/ui/Layout';
import {useToggle} from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import DebounceDecorator from '../internal/DebounceDecorator';
import Button from '../Button';
import Skinnable from '../Skinnable';
import Scroller from '../Scroller';

import componentCss from './TabGroup.module.less';

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
		selected: PropTypes.bool,
		size: PropTypes.number
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
		className: ({orientation, styler}) => styler.append(orientation)
	},

	render: ({children, css, orientation, size, ...rest}) => {
		delete rest.index;
		delete rest.onFocusTab;

		const commonProps = {
			collapsable: true,
			minWidth: false,
			backgroundOpacity: 'transparent',
			css,
			children
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
					<Cell shrink>
						<Button
							{...rest}
							{...commonProps}
						/>
					</Cell>
				);
			}
		}
	}
});

const Tab = Skinnable(TabBase);

const SpotlightContainerGroup = SpotlightContainerDecorator(
	{
		// using default-element so we always land on the selected tab in order to avoid changing
		// the view when re-entering the tab group
		defaultElement: `.${componentCss.selected}`,
		// favor last focused when set but fall back to the selected tab
		enterTo: 'last-focused'
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
		tabSize: PropTypes.number,
		tabsSpotlightId: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'tabGroup'
	},

	computed: {
		children: ({onFocusTab, tabs}) => tabs.map(tab => {
			if (tab) {
				const {icon, title, ...rest} = tab;
				return {
					...rest,
					key: `tabs_${title + (icon ? icon : '')}`,
					children: title,
					onFocusTab
				};
			} else {
				return null;
			}
		}).filter(tab => tab != null),
		className: ({collapsed, orientation, styler}) => styler.append({collapsed}, orientation),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => !tab.icon).length
	},

	render: ({children, collapsed, noIcons, onBlur, onBlurList, onFocus, onSelect, orientation, selectedIndex, tabSize, tabsSpotlightId, ...rest}) => {
		delete rest.onFocusTab;
		delete rest.tabs;

		const isHorizontal = orientation === 'horizontal';
		const scrollerProps = !isHorizontal ? {
			horizontalScrollbar: 'hidden',
			verticalScrollbar: 'hidden'
		} : null;
		const Component = isHorizontal ? 'div' : Scroller;

		return (
			<Component
				{...rest}
				onBlur={onBlur}
				onFocus={onFocus}
				{...scrollerProps}
			>
				{noIcons ? (
					<TabBase icon="list" collapsed onSpotlightDisappear={onBlurList} />
				) : (
					<SpotlightContainerGroup
						childComponent={Tab}
						className={componentCss.tabs}
						component={Layout}
						indexProp="index"
						itemProps={{collapsed, orientation, size: tabSize}}
						onSelect={onSelect}
						orientation={orientation}
						select="radio"
						selected={selectedIndex}
						selectedProp="selected"
						spotlightId={tabsSpotlightId}
					>
						{children}
					</SpotlightContainerGroup>
				)}
				{isHorizontal ? <hr className={componentCss.horizontalLine} /> : null}
			</Component>
		);
	}
});

const RefocusDecorator = Wrapped => {
	// eslint-disable-next-line no-shadow
	function RefocusDecorator ({id, ...rest}) {
		const {generateId} = useId({prefix: 'sand-tablayout-'});
		const refocus = useToggle();

		// generate an id for the component (and a derived id for the tabs) so we can refocus them
		id = id || generateId('tabgroup-');
		const tabsSpotlightId = `${id}-tabs`;

		// after the single tab has been replaced by the list, focus the list (which will choose the
		// selected item) and reset the refocus flag
		React.useEffect(() => {
			if (!refocus.selected) return;

			// restrict the refocus to only 5-way and only when nothing else gained focus in the
			// interim and when Spotlight was not paused by something else.
			if (!Spotlight.getCurrent() && !Spotlight.getPointerMode() && !Spotlight.isPaused()) {
				Spotlight.focus(tabsSpotlightId);
			}
			refocus.deactivate();
		}, [refocus, tabsSpotlightId]);

		return (
			<Wrapped
				{...rest}
				id={id}
				onBlurList={refocus.activate}
				tabsSpotlightId={tabsSpotlightId}
			/>
		);
	}

	RefocusDecorator.propTypes = {
		id: PropTypes.string
	};

	return RefocusDecorator;
};

const TabGroupDecorator = compose(
	DebounceDecorator({cancel: 'onBlur', debounce: 'onFocusTab', delay: 300}),
	RefocusDecorator
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
