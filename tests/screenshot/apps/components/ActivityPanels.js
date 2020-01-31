import {Panel, Header, ActivityPanels} from '../../../../Panels';
import React from 'react';

// Panel components to show in the Panels
const PanelComponents = [
	<Panel key="p1">Hello</Panel>,
	<Panel key="p2"><Header title="Hello" />The body</Panel>,
	<Panel key="p3">Panel 3</Panel>
];

const ActivityPanelsTests = [
	{
		component: <ActivityPanels />,
		wrapper: {full: true}
	},
	{
		component: <ActivityPanels noCloseButton />,
		wrapper: {full: true}
	},
	{
		title: 'ActivityPanels with standard Panel Components',
		component: <ActivityPanels>{PanelComponents}</ActivityPanels>,
		wrapper: {full: true}
	},
	{
		title: 'ActivityPanels with standard Panel Components index 1',
		component: <ActivityPanels index={1}>{PanelComponents}</ActivityPanels>,
		wrapper: {full: true}
	},
	{
		title: 'ActivityPanels with standard Panel Components index 2',
		component: <ActivityPanels index={2}>{PanelComponents}</ActivityPanels>,
		wrapper: {full: true}
	},
	// RTL
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, ActivityPanels default',
		component: <ActivityPanels />,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, ActivityPanels noCloseButton',
		component: <ActivityPanels noCloseButton />,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, ActivityPanels with standard Panel Components',
		component: <ActivityPanels>{PanelComponents}</ActivityPanels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, ActivityPanels with standard Panel Components index 1',
		component: <ActivityPanels index={1}>{PanelComponents}</ActivityPanels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, ActivityPanels with standard Panel Components index 2',
		component: <ActivityPanels index={2}>{PanelComponents}</ActivityPanels>,
		wrapper: {full: true}
	}
];

export default ActivityPanelsTests;
