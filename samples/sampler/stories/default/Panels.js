import {number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Header, Panels, Panel} from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {GridListImageItem} from '@enact/sandstone/GridListImageItem';

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


Header.displayName = 'Panels';


storiesOf('Sandstone', module)
	.add(
		'Panels',
		() => {
			const story = (
				// hooks
				<Panels index={number('index', {}, {range: true, min: 0, max: 2, step: 1}, 0)}>
					<Panel>
						<Header type="compact">
							<title>
								List View Title
							</title>
							<subtitle>
								A panel type for List views
							</subtitle>
							<Button
								backgroundOpacity="transparent"
								icon="arrowlargeleft"
								minWidth={false}
								slot="slotBefore"
							/>
						</Header>
						<BodyText>Example text inside an OptionPanels Panel</BodyText>
						<Item>Example Item 2</Item>
						<Item>Example Item 2</Item>
						<Item>Example Item 3</Item>
					</Panel>
					<Panel>
						<Header title="Panel with Item view" />
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
						<Header>VirtualGridList Panel</Header>
						<VirtualGridList
							dataSize={100}
							itemRenderer={renderItem}
							itemSize={{
								minWidth: ri.scale(640),
								minHeight: ri.scale(540)
							}}
						/>
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
