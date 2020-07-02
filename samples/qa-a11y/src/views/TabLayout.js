import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import Image from '@enact/sandstone/Image';
import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {scaleToRem} from '@enact/ui/resolution';
import React from 'react';

const tabsWithIcons = [
	{title: 'Home', icon: 'home'},
	{title: 'Button', icon: 'gear'},
	{title: 'Item', icon: 'trash'}
];

class TabLayoutView extends React.Component {
	constructor (props) {
		super(props);
		this.images = new Array(20).fill().map( (_, i) =>
			<Image
				key={`image${i}`}
				caption="Image"
				src="http://placehold.it/360x240/"
				style={{marginBottom: scaleToRem(96)}}
			/>
		);
	}

	images = []

	render () {
		return (
			<>
				<Header title="Sandstone TabLayout" subtitle="Basic TabLayout" />
				<TabLayout>
					<Tab
						title={tabsWithIcons[0].title}
						icon={tabsWithIcons[0].icon}
					>
						<Scroller>
							{this.images}
						</Scroller>
					</Tab>
					<Tab
						title={tabsWithIcons[1].title}
						icon={tabsWithIcons[1].icon}
					>
						<Button icon="demosync">Button 1</Button>
						<Button icon="demosync">Button 2</Button>
						<Button icon="demosync">Button 3</Button>
						<Button icon="demosync">Button 4</Button>
					</Tab>
					<Tab
						title={tabsWithIcons[2].title}
						icon={tabsWithIcons[2].icon}
					>
						<Item slotBefore={<Icon>playcircle</Icon>}>Single Item</Item>
					</Tab>
				</TabLayout>
			</>
		);
	}
}

export default TabLayoutView;
