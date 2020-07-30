import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import compose from 'ramda/src/compose';

import {Header, Panels, Panel} from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Image} from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {scale} from '@enact/ui/resolution';
import {Scroller} from '@enact/sandstone/Scroller';
import {TabLayout} from '@enact/sandstone/TabLayout';

const Config = mergeComponentMetadata('Panels', Panels);

// Used to render VirtualGridList into Panels
const renderItem = ({index, ...rest}) => { // eslint-disable-line enact/prop-types
	const text = `Item ${index}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${index}`,
		caption = 'Sample list';

	return (
		<ImageItem {...rest} src={source} label={caption}>
			{text}
		</ImageItem>
	);
};

Panels.displayName = 'Panels';

storiesOf('Sandstone', module)
	.add(
		'Panels',
		() => {
			// hooks
			const initialState = 0;
			const [panelIndex, setState] = React.useState(initialState);
			const forward = () => setState(panelIndex + 1);
			const backward = () => setState(panelIndex - 1);

			const handleBack = compose(backward, action('onBack'));

			const story = (
				<Panels
					backButtonBackgroundOpacity={select('backButtonBackgroundOpacity', ['opaque', 'transparent'], Config, 'transparent')}
					closeButtonBackgroundOpacity={select('closeButtonBackgroundOpacity', ['opaque', 'transparent'], Config, 'transparent')}
					index={panelIndex}
					noAnimation={boolean('noAnimation', Panels, false)}
					noBackButton={boolean('noBackButton', Panels, false)}
					noCloseButton={boolean('noCloseButton', Panels, false)}
					onBack={handleBack}
					onClose={action('onClose')}
					onTransition={action('onTransition')}
					onWillTransition={action('onWillTransition')}
				>
					<Panel>
						<Header title="Panel with Items">
							<Button
								icon="arrowlargeright"
								iconFlip="auto"
								size="small"
								slot="slotAfter"
								onClick={forward} // eslint-disable-line react/jsx-no-bind
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
						<Header title="Panel with VirtualGridList">
							<Button
								icon="arrowlargeright"
								iconFlip="auto"
								size="small"
								slot="slotAfter"
								onClick={forward} // eslint-disable-line react/jsx-no-bind
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
						<Header title="Panel with TabLayout" />
						<TabLayout>
							<TabLayout.Tab title="Home" icon="home">
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
							</TabLayout.Tab>
							<TabLayout.Tab title="Button" icon="demosync">
								<Button icon="demosync">Button!</Button>
								<Button icon="demosync">Button!</Button>
								<Button icon="demosync">Button!</Button>
								<Button icon="demosync">Button!</Button>
							</TabLayout.Tab>
							<TabLayout.Tab title="Item" icon="playcircle">
								<Item slotBefore={<Icon>playcircle</Icon>}>Hello Item</Item>
							</TabLayout.Tab>
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
