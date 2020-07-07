import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {scaleToRem} from '@enact/ui/resolution';
import Button from '@enact/sandstone/Button';
import ImageItem from '@enact/sandstone/ImageItem';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {TabLayoutBase, Tab} from '@enact/sandstone/TabLayout';

TabLayout.displayName = 'TabLayout';
const Config = mergeComponentMetadata('TabLayout', TabLayoutBase, TabLayout);

// `paddingBottom: '56.25%'` is a trick to impose 16:9 aspect ratio on the component, since padding percentage is based on the width, not the height.

const tabsWithIcons = [
	{title: 'Home', icon: 'home'},
	{title: 'Button', icon: 'gear'},
	{title: 'Item', icon: 'trash'}
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
			const tabs = select('tabs', tabSelections, Config, tabSelections['with icons']);

			const images = new Array(20).fill().map( (_, i) =>
				<ImageItem
					inline
					key={`image${i}`}
					label="ImageItem label"
					src="http://placehold.it/360x240/"
					style={{
						width: scaleToRem(768),
						height: scaleToRem(588)
					}}
				>
					{`ImageItem ${i + 1}`}
				</ImageItem>
			);

			return (
				<Panel>
					<Header title="Sandstone TabLayout" subtitle="Basic TabLayout" />
					<TabLayout
						onSelect={action('onSelect')}
						onTabAnimationEnd={action('onTabAnimationEnd')}
						orientation={select('orientation', ['vertical', 'horizontal'], Config)}
						tabSize={number('tabSize', Config, {range: true, min: 0, max: 960, step: 60}, 0) || null}
					>
						<Tab
							title={tabs[0].title}
							icon={tabs[0].icon}
						>
							<Scroller>
								{images}
							</Scroller>
						</Tab>
						<Tab
							title={tabs[1].title}
							icon={tabs[1].icon}
						>
							<Button icon="demosync">Button 1</Button>
							<Button icon="demosync">Button 2</Button>
							<Button icon="demosync">Button 3</Button>
							<Button icon="demosync">Button 4</Button>
							<Button icon="demosync">Button 5</Button>
						</Tab>
						<Tab
							title={tabs[2].title}
							icon={tabs[2].icon}
						>
							<Item slotBefore={<Icon>playcircle</Icon>}>Single Item</Item>
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
