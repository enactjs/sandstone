import handle, {adaptEvent, forProp, forward, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Cell, Layout} from '@enact/ui/Layout';
import Group from '@enact/ui/Group';
import {useId} from '@enact/ui/internal/IdProvider';
import Spotlight from '@enact/spotlight';
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
					<Cell>
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
		selectedIndex: PropTypes.number,
		tabSize: PropTypes.number
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
		className: ({collapsed, orientation, styler}) => styler.append({collapsed}, orientation),
		// check if there's no tab icons
		noIcons: ({collapsed, orientation, tabs}) => orientation === 'vertical' && collapsed && tabs.filter((tab) => !tab.icon).length
	},

	render: ({children, collapsed, noIcons, onBlur, onFocus, onSelect, orientation, selectedIndex, tabSize, ...rest}) => {
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
					<TabBase icon="list" collapsed />
				) : (
					<Group
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
					>
						{children}
					</Group>
				)}
				{isHorizontal ? <hr className={componentCss.horizontalLine} /> : null}
			</Component>
		);
	}
});

const ConfigureSpotlightDecorator = (Wrapped) => {
	// eslint-disable-next-line no-shadow
	function ConfigureSpotlightDecorator ({orientation, spotlightId, ...rest}) {
		const id = useId({prefix: 'tabGroup-'});
		const vertical = orientation === 'vertical';

		// use or generate a spotlightId so we can configure it below
		if (vertical) {
			spotlightId = spotlightId || id.generateId();

			// push spotlightId back onto props so it can be spread onto Wrapped only when vertical
			rest.spotlightId = spotlightId;
		}

		// Configure Scroller's spotlight container immediately on mount to enforce focus rules
		React.useLayoutEffect(() => {
			if (vertical) {
				Spotlight.set(spotlightId, {
					// favor last focused when set but fall back to the selected tab
					enterTo: 'last-focused',
					defaultElement: `.${componentCss.selected}`
				});
			}
		}, [vertical, spotlightId]);

		return <Wrapped {...rest} orientation={orientation} />;
	}

	ConfigureSpotlightDecorator.propTypes = {
		orientation: PropTypes.string,
		spotlightId: PropTypes.string
	};

	return ConfigureSpotlightDecorator;
};

const TabGroupDecorator = compose(
	ConfigureSpotlightDecorator,
	DebounceDecorator({cancel: 'onBlur', debounce: 'onFocusTab', delay: 300})
);

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup
};
