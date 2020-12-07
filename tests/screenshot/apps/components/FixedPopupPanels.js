import React from 'react';

import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import {FixedPopupPanels, Panel, Header} from '../../../../FixedPopupPanels';

import {withConfig, withProps} from './utils';

const stamp = (howMany, fn) => (new Array(howMany)).fill().map(fn);

// Wrapping the real component so `scaleToRem` is called within render rather than in module scope
function FixPopupPanels (props) {
	return (
		<FixedPopupPanels open {...props}>
			{props.children ? props.children : [
				<Panel key="panelIndex0">
					<Header title="Panel 1 - With Scroller" />
					<Item>Single Item</Item>
				</Panel>,
				<Panel key="panelIndex1">
					<Header title="Panel 2 - With Big Scroller" />
					<Scroller>
						{stamp(20, (i, idx) => <Item key={`item${idx}`}>Item {idx + 1}</Item>)}
					</Scroller>
				</Panel>
			]}
		</FixedPopupPanels>
	);
}

const EachPanel = withConfig(
	{wrapper: {full: true}},
	[
		{
			title: 'with standard Panel Components',
			component: <FixPopupPanels />
		},
		{
			title: 'with transparent scrim',
			component: <FixPopupPanels scrimType="transparent" />
		},
		{
			title: 'with standard Panel Components index 1',
			component: <FixPopupPanels index={1} />
		},
		{
			title: 'with half width',
			component: <FixPopupPanels width="half" />
		}
	]
);

const FixedPopupPanelsTests = [
	{
		wrapper: {full: true},
		component: <FixPopupPanels>{null}</FixPopupPanels>
	},
	...EachPanel,
	...withProps(
		{fullHeight: true},
		EachPanel.map(o => ({...o, title: `${o.title} fullHeight`}))
	),
	...withConfig(
		{locale: 'ar-SA'},
		EachPanel.map(o => ({...o, title: `locale = ar-SA, ${o.title}`}))
	)
];

export default FixedPopupPanelsTests;
