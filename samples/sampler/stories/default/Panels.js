import {number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Header, Panels, Panel} from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Image} from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {GridListImageItem} from '@enact/sandstone/GridListImageItem';
import {scale} from '@enact/ui/resolution';
import {Scroller} from '@enact/sandstone/Scroller';
import {TabLayout} from '@enact/sandstone/TabLayout';

// Used to render VirtualGridList into Panels
const renderItem = ({index, ...rest}) => {
	// const {text, subText, source} = items[index];
	const text = `Item ${index}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${index}`,
		caption = 'Sample list';

	return (
		<GridListImageItem
			{...rest}
			caption={text}
			source={source}
			subCaption={caption}
		/>
	);
};

//Used to render TabLayout into Panels
const tabsWithIcons = [
	{children: 'Home', icon: 'home'},
	{children: 'Button', icon: 'image'},
	{children: 'Item', icon: 'resumeplay'}
];

const tabsWithoutIcons = [
	{children: 'Home'},
	{children: 'Button'},
	{children: 'Item'}
];

const tabSelections = {
	'with icons': tabsWithIcons,
	'without icons': tabsWithoutIcons
};


Header.displayName = 'Panels';


storiesOf('Sandstone', module)
	.add(
		'Panels',
		() => {
			// hooks
			const initialState = 0;
			const [index, setState] = React.useState(initialState);
			const story = (
				<Panels index={index}>
					<Panel>
						<Header title="Panel with Item view">
							<Button
								backgroundOpacity="transparent"
								icon="arrowlargeright"
								minWidth={false}
								slot="slotAfter"
								onClick={() => setState(index + 1)}
							/>
						</Header>
						<BodyText>Example text inside an Panel Body</BodyText>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
					</Panel>
					<Panel>
						<Header>
							<title>
								VirtualGridList Panel
							</title>
							<Button
								backgroundOpacity="transparent"
								icon="arrowlargeleft"
								minWidth={false}
								slot="slotBefore"
								onClick={() => setState(index - 1)}
							/>
							<Button
								backgroundOpacity="transparent"
								icon="arrowlargeright"
								minWidth={false}
								slot="slotAfter"
								onClick={() => setState(index + 1)}
							/>
						</Header>
						<VirtualGridList
							dataSize={100}
							itemRenderer={renderItem}
							itemSize={{
								minWidth: ri.scale(640),
								minHeight: ri.scale(540)
							}}
						/>
					</Panel>
					<Panel>
						<Header>
							<title>
								Sandstone TabLayout
							</title>
							<subtitle>
								Basic TabLayout
							</subtitle>
							<Button
								backgroundOpacity="transparent"
								icon="arrowlargeleft"
								minWidth={false}
								slot="slotBefore"
								onClick={() => setState(index - 1)}
							/>
						</Header>
						<TabLayout
							tabs={tabSelections['with icons']}
						>
							<React.Fragment>
								<Icon>home</Icon>Home
								<Scroller style={{height: scale(1000)}}>
									<Image
										caption="Image"
										src="http://placehold.it/360x240/"
										style={{marginTop: '24px'}}
									/>
									<Image
										caption="Image"
										src="http://placehold.it/360x240/"
										style={{marginTop: '24px'}}
									/>
									<Image
										caption="Image"
										src="http://placehold.it/360x240/"
										style={{marginTop: '24px'}}
									/>
									<Image
										caption="Image"
										src="http://placehold.it/360x240/"
										style={{marginTop: '24px'}}
									/>
									<Image
										caption="Image"
										src="http://placehold.it/360x240/"
										style={{marginTop: '24px'}}
									/>
									<Image
										caption="Image"
										src="http://placehold.it/360x240/"
										style={{marginTop: '24px'}}
									/>
								</Scroller>
							</React.Fragment>
							<React.Fragment>
								<Button icon="image">Button!</Button>
								<Button icon="image">Button!</Button>
								<Button icon="image">Button!</Button>
								<Button icon="image">Button!</Button>
							</React.Fragment>
							<React.Fragment>
								<Item slotBefore={<Icon>resumeplay</Icon>}>Hello Item</Item>
							</React.Fragment>
							<React.Fragment>
								<div>
									<Icon>resumeplay</Icon>
									A simple view with no associated tab
								</div>
							</React.Fragment>
						</TabLayout>
					</Panel>
				</Panels>
			);
			return story;
		},
		{
			props: {
				noPanels: true
			}
		}
	);
