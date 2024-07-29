import Panels, {Panel, Header} from '../../../../Panels';

// Panel components to show in the Panels
const PanelComponents = [
	<Panel key="p1">Hello</Panel>,
	<Panel key="p2"><Header title="Hello" />The body</Panel>,
	<Panel key="p3">Panel 3</Panel>
];

const PanelsTests = [
	{
		component: <Panels />,
		wrapper: {full: true}
	},
	{
		title: 'with standard Panel Components',
		component: <Panels>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		title: 'with standard Panel Components index 1',
		component: <Panels index={1}>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	// Display 'Panel 3'
	{
		title: 'with standard Panel Components index 2',
		component: <Panels index={2}>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		title: 'with header and no close button',
		component: <Panels index={1} noCloseButton>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		title: 'with header and no back button',
		component: <Panels index={1} noBackButton>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		title: 'with opaque back and close button',
		component: <Panels index={1} backButtonBackgroundOpacity="opaque" closeButtonBackgroundOpacity="opaque">{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	// RTL
	{
		locale: 'ar-SA',
		component: <Panels />,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components',
		component: <Panels>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 1',
		component: <Panels index={1}>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	// Display 'Panel 3'
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with standard Panel Components index 2',
		component: <Panels index={2}>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with header and no close button',
		component: <Panels index={1} noCloseButton>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with header and no back button',
		component: <Panels index={1} noBackButton>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		title: 'locale = ar-SA, with opaque back and close button',
		component: <Panels index={1} backButtonBackgroundOpacity="opaque" closeButtonBackgroundOpacity="opaque">{PanelComponents}</Panels>,
		wrapper: {full: true}
	}
];
export default PanelsTests;
