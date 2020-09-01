import React from 'react';
import {scaleToRem} from '@enact/ui/resolution';

import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import {FlexiblePopupPanels, Panel, Header} from '../../../../FlexiblePopupPanels';

import {withConfig, withProps} from './utils';

const stamp = (howMany, fn) => (new Array(howMany)).fill().map(fn);

// Wrapping the real component so `scaleToRem` is called within render rather than in module scope
function FlexPopupPanels (props) {
	const blockStyles = {
		backgroundColor: '#58a',
		border: `${scaleToRem(6)} solid #6ac`,
		borderRadius: scaleToRem(6)
	};

	const blocks = {
		fullWidth: <div style={{...blockStyles, height: scaleToRem(99)}} />,
		fat: <div style={{...blockStyles, height: scaleToRem(99), width: scaleToRem(900)}} />,
		medium: <div style={{...blockStyles, height: scaleToRem(900), width: scaleToRem(900)}} />,
		skinny: <div style={{...blockStyles, height: scaleToRem(600), width: scaleToRem(99)}} />,
		small: <div style={{...blockStyles, height: scaleToRem(300), width: scaleToRem(300)}} />
	};

	return (
		<FlexiblePopupPanels {...props}>
			{props.children ? props.children : [
				<Panel key="panelIndex0">
					<Header title="Panel 1 - With Scroller" type="mini" />
					<Scroller style={{width: scaleToRem(900)}}>
						<Item>Single Item</Item>
					</Scroller>
				</Panel>,
				<Panel key="panelIndex1">
					<Header title="Panel 2 - With Big Scroller" type="mini" />
					<Scroller style={{width: scaleToRem(900)}}>
						{stamp(20, (i, idx) => <Item key={`item${idx}`}>Item {idx + 1}</Item>)}
					</Scroller>
				</Panel>,
				<Panel key="panelIndex2">
					<Header title="Panel 3 - Medium Block" type="mini" />
					{blocks.medium}
				</Panel>,
				<Panel key="panelIndex3">
					<Header title="Panel 4 - Small Block" type="mini" />
					{blocks.small}
				</Panel>,
				<Panel key="panelIndex4">
					<Header title="Panel 5 - Skinny Block" type="mini" />
					{blocks.skinny}
				</Panel>,
				<Panel key="panelIndex5">
					<Header title="Panel 6 - Fat Block" type="mini" />
					{blocks.fat}
				</Panel>,
				<Panel key="panelIndex6" size="small">
					<Header title="Panel 7 - small size" type="mini" />
					{blocks.fullWidth}
				</Panel>,
				<Panel key="panelIndex7" size="large">
					<Header title="Panel 8 - large size" type="mini" />
					{blocks.fullWidth}
				</Panel>
			]}
		</FlexiblePopupPanels>
	);
}

const EachPanel = withConfig(
	{wrapper: {full: true}},
	[
		{
			title: 'with standard Panel Components',
			component: <FlexPopupPanels open />
		},
		{
			title: 'with transparent scrim',
			component: <FlexPopupPanels open scrimType="transparent" />
		},
		{
			title: 'with standard Panel Components index 1',
			component: <FlexPopupPanels open index={1} />,
			wrapper: {full: true}
		},
		// Display 'Panel 3'
		{
			title: 'with standard Panel Components index 2',
			component: <FlexPopupPanels open index={2} />,
			wrapper: {full: true}
		},
		// Display 'Panel 4'
		{
			title: 'with standard Panel Components index 3',
			component: <FlexPopupPanels open index={3} />,
			wrapper: {full: true}
		},
		// Display 'Panel 5'
		{
			title: 'with standard Panel Components index 4',
			component: <FlexPopupPanels open index={4} />,
			wrapper: {full: true}
		},
		// Display 'Panel 6'
		{
			title: 'with standard Panel Components index 5',
			component: <FlexPopupPanels open index={5} />,
			wrapper: {full: true}
		},
		// Display 'Panel 7'
		{
			title: 'with standard Panel Components index 6',
			component: <FlexPopupPanels open index={6} />,
			wrapper: {full: true}
		},
		// Display 'Panel 8'
		{
			title: 'with standard Panel Components index 7',
			component: <FlexPopupPanels open index={7} />,
			wrapper: {full: true}
		}
	]
);

const FlexiblePopupPanelsTests = [
	{
		component: <FlexPopupPanels open>{null}</FlexPopupPanels>,
		wrapper: {full: true}
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

export default FlexiblePopupPanelsTests;
