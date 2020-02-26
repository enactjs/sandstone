import {action} from '@enact/storybook-utils/addons/actions';
// import {select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {scale} from '@enact/ui/resolution';
import Button from '@enact/sandstone/Button';
import {Image} from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import {TabLayout} from '@enact/sandstone/TabLayout';

TabLayout.displayName = 'TabLayout';

// `paddingBottom: '56.25%'` is a trick to impose 16:9 aspect ratio on the component, since padding percentage is based on the width, not the height.

storiesOf('Sandstone', module)
	.add(
		'TabLayout',
		() => (
			<Panel>
				<Header title="Sandstone TabLayout" subtitle="Basic TabLayout" />
				<TabLayout
					onSelect={action('onSelect')}
					// leaving this knob out for now until we build out horizontal tabs
					// orientation={select('orientation', ['vertical', 'horizontal'], TabLayout, 'vertical')}
					tabs={[
						{children: 'Home', icon: 'home'},
						{children: 'Button', icon: 'image'},
						{children: 'Item', icon: 'resumeplay'}
					]}
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
		),
		{
			props: {
				noPanel: true
			}
		}
	);
