import {scaleToRem} from '@enact/ui/resolution';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '../../../../PopupTabLayout';
import BodyText from '../../../../BodyText';
import {Header} from '../../../../Panels';
import React from 'react';

const Block = ({style, ...rest}) => {
	const blockStyles = ({height = 99, width = 99} = {}) => ({
		backgroundColor: '#58a',
		border: `${scaleToRem(6)} solid #6ac`,
		borderRadius: scaleToRem(6),
		height: scaleToRem(height),
		width: scaleToRem(width)
	});

	return (
		<div {...rest} style={blockStyles(style)} />
	);
};

const SimpleTab = ({title, icon, style}) => (
	<Tab title={title} icon={icon}>
		<TabPanels>
			<TabPanel>
				<Header title={title} type="compact" />
				<BodyText>{`View ${title}`}</BodyText>
				{style ? <Block style={style} /> : null}
			</TabPanel>
		</TabPanels>
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

const tabWithSizedBlockSmall = SimpleTab({title: 'Small', icon: 'stop', style: {}});
const tabWithSizedBlockLarge = SimpleTab({title: 'Large', icon: 'stop', style: {height: 900, width: 900}});
const tabWithSizedBlockSkinny = SimpleTab({title: 'Skinny', icon: 'stop', style: {height: 900}});
const tabWithSizedBlockFat = SimpleTab({title: 'Fat', icon: 'stop', style: {width: 1500}});
const tabWithSizedBlockTall = SimpleTab({title: 'Tall', icon: 'stop', style: {height: 9600, width: 500}});

const PopupTabLayoutTests = [
	{
		component: <PopupTabLayout open>{tabs}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open scrimType="transparent">{tabs}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{tabsWithIcons}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{someTabsWithIcons}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{oneTabWithIcons}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open collapsed>{tabs}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open collapsed>{tabsWithIcons}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open collapsed>{someTabsWithIcons}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open collapsed>{oneTabWithIcons}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{tabWithSizedBlockSmall}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{tabWithSizedBlockLarge}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{tabWithSizedBlockSkinny}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{tabWithSizedBlockFat}</PopupTabLayout>,
		wrapper: {full: true}
	},
	{
		component: <PopupTabLayout open>{tabWithSizedBlockTall}</PopupTabLayout>,
		wrapper: {full: true}
	}
];
export default PopupTabLayoutTests;
