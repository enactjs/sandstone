import {adaptEvent, forward, handle} from '@enact/core/handle';
import {Cell, Layout} from '@enact/ui/Layout';
import {Changeable} from '@enact/ui/Changeable';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';

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
		css: PropTypes.object,
		index: PropTypes.number,
		minimized: PropTypes.bool,
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),
		tabs: PropTypes.oneOfType([TabGroup])
	},
	defaultProps: {
		index: 0
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
		className: ({css, orientation, styler}) => styler.append(orientation === 'vertical' ? css.column : ''),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical'
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

// Currently not documenting the base output since it's not exported from index.js
const TabbedPanels = Slottable(
	{slots: ['tabs', 'afterTabs', 'beforeTabs']},
	Changeable(
		{prop: 'index', change: 'onSelect'},
		TabbedPanelsBase
	)
);

export default TabbedPanels;
export {
	TabbedPanels,
	TabbedPanelsBase
};
