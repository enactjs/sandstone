import {Panel, Header, AlwaysViewingPanels} from '../../../../Panels';
import React from 'react';

// Panel components to show in the Panels
const PanelComponents = [
	<Panel key="p1">Hello</Panel>,
	<Panel key="p2"><Header title="Hello" />The body</Panel>,
	<Panel key="p3">Panel 3</Panel>
];

const AlwaysViewingPanelsTests = [
	{
		component: <AlwaysViewingPanels />,
		wrapper: {full: true}
	},
	{
		component: <AlwaysViewingPanels noCloseButton />,
		wrapper: {full: true}
	},
	{
		title: 'AlwaysViewingPanels with standard Panel Components',
		component: <AlwaysViewingPanels>{PanelComponents}</AlwaysViewingPanels>,
		wrapper: {full: true}
	},
	{
		title: 'AlwaysViewingPanels with standard Panel Components index 1',
		component: <AlwaysViewingPanels index={1}>{PanelComponents}</AlwaysViewingPanels>,
		wrapper: {full: true}
	},
	{
		title: 'AlwaysViewingPanels with standard Panel Components index 2',
		component: <AlwaysViewingPanels index={2}>{PanelComponents}</AlwaysViewingPanels>,
		wrapper: {full: true}
	},
	// RTL
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, AlwaysViewingPanels default',
		component: <AlwaysViewingPanels />,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, AlwaysViewingPanels noCloseButton',
		component: <AlwaysViewingPanels noCloseButton />,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, AlwaysViewingPanels with standard Panel Components',
		component: <AlwaysViewingPanels>{PanelComponents}</AlwaysViewingPanels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, AlwaysViewingPanels with standard Panel Components index 1',
		component: <AlwaysViewingPanels index={1}>{PanelComponents}</AlwaysViewingPanels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, AlwaysViewingPanels with standard Panel Components index 2',
		component: <AlwaysViewingPanels index={2}>{PanelComponents}</AlwaysViewingPanels>,
		wrapper: {full: true}
	}
];

export default AlwaysViewingPanelsTests;
