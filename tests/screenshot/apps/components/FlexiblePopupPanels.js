import React from 'react';
import {scaleToRem} from '@enact/ui/resolution';

import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import {FlexiblePopupPanels, Panel, Header} from '../../../../Panels';


const stamp = (howMany, fn) => (new Array(howMany)).fill().map(fn);

const blockStyles = {
	backgroundColor: '#58a',
	border: `${scaleToRem(6)} solid #6ac`,
	borderRadius: scaleToRem(6)
};

const blocks = {
	fat: <div style={{...blockStyles, height: scaleToRem(99), width: scaleToRem(900)}} />,
	medium: <div style={{...blockStyles, height: scaleToRem(900), width: scaleToRem(900)}} />,
	skinny: <div style={{...blockStyles, height: scaleToRem(600), width: scaleToRem(99)}} />,
	small: <div style={{...blockStyles, height: scaleToRem(300), width: scaleToRem(300)}} />
};

// Panel components to show in the Panels
const PanelComponents = [
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
		<Header title="Panel 4 - Small Block with extra long title for testing marquee behavior" type="mini" />
		{blocks.small}
	</Panel>,
	<Panel key="panelIndex4">
		<Header title="Panel 5 - Skinny Block" type="mini" />
		{blocks.skinny}
	</Panel>,
	<Panel key="panelIndex5">
		<Header title="Panel 6 - Fat Block" type="mini" />
		{blocks.fat}
	</Panel>
];

const FlexiblePopupPanelsTests = [
	{
		component: <FlexiblePopupPanels open />,
		wrapper: {full: true}
	},
	{
		title: 'with standard Panel Components',
		component: <FlexiblePopupPanels open>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	{
		title: 'with standard Panel Components index 1',
		component: <FlexiblePopupPanels open index={1}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 3'
	{
		title: 'with standard Panel Components index 2',
		component: <FlexiblePopupPanels open index={2}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 4'
	{
		title: 'with standard Panel Components index 3',
		component: <FlexiblePopupPanels open index={3}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 5'
	{
		title: 'with standard Panel Components index 4',
		component: <FlexiblePopupPanels open index={4}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 6'
	{
		title: 'with standard Panel Components index 5',
		component: <FlexiblePopupPanels open index={5}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// RTL
	{
		locale: 'ar-SA',
		component: <FlexiblePopupPanels open />,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components',
		component: <FlexiblePopupPanels open>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 1',
		component: <FlexiblePopupPanels open index={1}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 3'
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 2',
		component: <FlexiblePopupPanels open index={2}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 4'
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 3',
		component: <FlexiblePopupPanels open index={3}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 5'
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 4',
		component: <FlexiblePopupPanels open index={4}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	},
	// Display 'Panel 6'
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 5',
		component: <FlexiblePopupPanels open index={5}>{PanelComponents}</FlexiblePopupPanels>,
		wrapper: {full: true}
	}
];
export default FlexiblePopupPanelsTests;
