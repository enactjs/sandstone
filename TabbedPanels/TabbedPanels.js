/**
 * Provides an Sandstone-themed TabbedPanels.
 *
 * @module sandstone/TabbedPanels
 * @exports TabbedPanels
 */
import {adaptEvent, forward, handle} from '@enact/core/handle';
import {Cell, Layout} from '@enact/ui/Layout';
import {Changeable} from '@enact/ui/Changeable';
import Slottable from '@enact/ui/Slottable';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import TabGroup from '../TabGroup/TabGroup';
import {Panels} from '../Panels';

import componentCss from './TabbedPanels.module.less';

/**
 * Tabbed Panels component.
 *
 * @class TabbedPanels
 * @memberof sandstone/TabbedPanels
 * @ui
 * @public
 */
const TabbedPanelsBase = kind({
	name: 'TabbedPanels',
	propTypes: /** @lends sandstone/TabbedPanels.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The currently selected tab.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Collapse the vertical tab list into icons only.
		 *
		 * Only applies to `orientation="vertical"`.  If the tabs do not include icons, a single
		 * collapsed icon will be shown.
		 *
		 * @type {Boolean}
		 * @public
		 */
		minimized: PropTypes.bool,

		/**
		 * Orientation of the tabs.
		 *
		 * Horizontal tabs support a maximum of five tabs.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * List of tabs to display.
		 *
		 * Each object in the array of tabs should include a `title` property and, optionally, an
		 * `icon` property (see: {@link sandstone/Icon.IconBase.children}). If an icon is not
		 * supplied for the first tab, no icons will be displayed when minimized.
		 *
		 * @type {Object[]}
		 * @public
		 */
		tabs: PropTypes.array
	},
	defaultProps: {
		index: 0,
		orientation: 'vertical'
	},
	styles: {
		css: componentCss,
		className: 'tabbedPanels enact-fit'
	},
	handlers: {
		onSelect: handle(
			adaptEvent(({selected}) => ({index: selected}), forward('onSelect'))
		)
	},
	computed: {
		children: ({children, tabs}) => {
			// if there are children use them
			if (children) {
				return children;
			}
			// otherwise try to make children from the tabs' view and viewProps
			if (tabs) {
				return tabs.map((tab, index) => {
					const {view: View, viewProps} = tab;
					return <View key={index} {...viewProps} />;
				});
			}
		},
		className: ({minimized, orientation, styler}) => styler.append({minimized, orientation}),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical',
		// limit to 5 tabs for horizontal orientation
		tabs: ({orientation, tabs}) => orientation === 'horizontal' && tabs.length > 5 ? [...tabs].slice(0, 5) : tabs
	},
	render: ({children, css, index, minimized, onSelect, orientation, tabOrientation, tabs, ...rest}) => {
		return (
			<Layout {...rest} orientation={tabOrientation}>
				<Cell shrink>
					<TabGroup
						className={css.tabs}
						minimized={minimized}
						onSelect={onSelect}
						orientation={orientation}
						tabs={tabs}
						selectedIndex={index}
					/>
				</Cell>
				<Cell
					className={css.panels}
					component={Panels}
					noCloseButton
					orientation={orientation}
					index={index}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

const TabbedPanelsDecorator = compose(
	Slottable({slots: ['tabs', 'afterTabs', 'beforeTabs']}),
	Changeable({prop: 'index', change: 'onSelect'})
);

// Currently not documenting the base output since it's not exported
const TabbedPanels = TabbedPanelsDecorator(TabbedPanelsBase);

export default TabbedPanels;
export {
	TabbedPanels,
	TabbedPanelsBase
};
