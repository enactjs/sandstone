import {TabLayout, Tab} from '../../../../TabLayout';

const SimpleTab = (props) => (
	<Tab {...props}>
		<div>{`View ${props.title}`}</div>
	</Tab>
);

const tabs = [
	SimpleTab({title: 'One'}),
	SimpleTab({title: 'Two'}),
	SimpleTab({title: 'Three'}),
	SimpleTab({title: 'Four'}),
	SimpleTab({title: 'Five'}),
	SimpleTab({title: 'Six'})
];

const tabsWithIcons = [
	SimpleTab({title: 'One', icon: 'star'}),
	SimpleTab({title: 'Two', icon: 'home'}),
	SimpleTab({title: 'Three', icon: 'plug'}),
	SimpleTab({title: 'Four', icon: 'lock'}),
	SimpleTab({title: 'Five', icon: 'info'}),
	SimpleTab({title: 'Six', icon: 'picture'})
];

const oneTabWithIcons = [
	SimpleTab({title: 'One', icon: 'star'}),
	SimpleTab({title: 'Two'}),
	SimpleTab({title: 'Three'}),
	SimpleTab({title: 'Four'}),
	SimpleTab({title: 'Five'}),
	SimpleTab({title: 'Six'})
];

const someTabsWithIcons = [
	SimpleTab({title: 'One', icon: 'star'}),
	SimpleTab({title: 'Two'}),
	SimpleTab({title: 'Three', icon: 'plug'}),
	SimpleTab({title: 'Four', icon: 'lock'}),
	SimpleTab({title: 'Five'}),
	SimpleTab({title: 'Six', icon: 'picture'})
];

const tabsWithIconsDisabled = [
	SimpleTab({title: 'One', icon: 'star'}),
	SimpleTab({disabled: true, title: 'Two', icon: 'home'}),
	SimpleTab({title: 'Three', icon: 'plug'}),
	SimpleTab({title: 'Four', icon: 'lock'}),
	SimpleTab({title: 'Five', icon: 'info'}),
	SimpleTab({title: 'Six', icon: 'picture'})
];



const TabLayoutTests = [
	{
		component: <TabLayout>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout selected={0}>{tabs}</TabLayout>,
		wrapper: {full: true},
		focus: true
	},
	{
		component: <TabLayout>{tabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout selected={0}>{tabsWithIcons}</TabLayout>,
		wrapper: {full: true},
		focus: true
	},
	{
		component: <TabLayout>{someTabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout>{oneTabWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed selected={0}>{tabs}</TabLayout>,
		wrapper: {full: true},
		focus: true
	},
	{
		component: <TabLayout collapsed>{tabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{someTabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{oneTabWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{tabsWithIconsDisabled}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed selected={0}>{tabsWithIconsDisabled}</TabLayout>,
		wrapper: {full: true},
		focus: true
	},
	{
		component: <TabLayout orientation="horizontal">{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout orientation="horizontal" selected={3}>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout anchorTo="left">{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout anchorTo="right">{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout anchorTo="start">{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout anchorTo="end">{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout
			dimensions={{
				tabs: {
					collapsed: 300,
					normal: 900
				},
				content: {
					expanded: null,
					normal: null
				}
			}}
		>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout
			dimensions={{
				tabs: {
					collapsed: 300,
					normal: 800
				},
				content: {
					expanded: null,
					normal: null
				}
			}}
		>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout tabSize={500}>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout type="popup">{tabs}</TabLayout>,
		wrapper: {full: true}
	},

	// *************************************************************
	// RTL
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <TabLayout selected={1}>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		component: <TabLayout selected={1}>{tabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		component: <TabLayout collapsed selected={1}>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		locale: 'ar-SA',
		component: <TabLayout orientation="horizontal" selected={1}>{tabs}</TabLayout>,
		wrapper: {full: true}
	}
];
export default TabLayoutTests;
