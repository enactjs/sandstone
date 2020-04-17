import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {scale} from '@enact/ui/resolution';
import Button from '@enact/sandstone/Button';
import {Image} from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import {TabLayout, Tab} from '@enact/sandstone/TabLayout';

TabLayout.displayName = 'TabLayout';

// `paddingBottom: '56.25%'` is a trick to impose 16:9 aspect ratio on the component, since padding percentage is based on the width, not the height.

const tabsWithIcons = [
	{title: 'Home', icon: 'home'},
	{title: 'Button', icon: 'image'},
	{title: 'Item', icon: 'resumeplay'}
];

const tabsWithoutIcons = [
	{title: 'Home'},
	{title: 'Button'},
	{title: 'Item'}
];

const tabSelections = {
	'with icons': tabsWithIcons,
	'without icons': tabsWithoutIcons
};

storiesOf('Sandstone', module)
	.add(
		'TabLayout',
		() => {
			const tabs = select('tabs', tabSelections, TabLayout, tabSelections['with icons']);

			return (
				<Panel featureContent={boolean('featureContent', {displayName: 'Panel'}, false)}>
					<Header title="Sandstone TabLayout" subtitle="Basic TabLayout" />
					<TabLayout
						onSelect={action('onSelect')}
						// leaving this knob out for now until we build out horizontal tabs
						// orientation={select('orientation', ['vertical', 'horizontal'], TabLayout, 'vertical')}
					>
						<Tab
							title={tabs[0].title}
							icon={tabs[0].icon}
						>
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
						</Tab>
						<Tab
							title={tabs[1].title}
							icon={tabs[1].icon}
						>
							<Button icon="image">Button!</Button>
							<Button icon="image">Button!</Button>
							<Button icon="image">Button!</Button>
							<Button icon="image">Button!</Button>
						</Tab>
						<Tab
							title={tabs[2].title}
							icon={tabs[2].icon}
						>
							<Item slotBefore={<Icon>resumeplay</Icon>}>Hello Item</Item>
						</Tab>
					</TabLayout>
				</Panel>
			);
		},
		{
			props: {
				noPanel: true
			}
		}
	);
