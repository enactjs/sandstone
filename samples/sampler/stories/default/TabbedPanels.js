import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import {Image} from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Panel} from '@enact/sandstone/Panels';
import {TabbedPanels} from '@enact/sandstone/TabbedPanels';

TabbedPanels.displayName = 'TabbedPanels';

// `paddingBottom: '56.25%'` is a trick to impose 16:9 aspect ratio on the component, since padding percentage is based on the width, not the height.

storiesOf('Sandstone', module)
	.add(
		'TabbedPanels',
		() => (
			<div style={{paddingBottom: '56.25%'}}>
				<TabbedPanels
					onClick={action('onClick')}
					// index={Number(select('index', ['0', '1', '2', '3'], TabbedPanels, '0'))}
					minimized={boolean('minimized', TabbedPanels)}
					onSelect={action('onSelect')}
					orientation={select('orientation', ['vertical', 'horizontal'], TabbedPanels, 'vertical')}
					tabs={[
						{title: 'Home', icon: 'home'},
						{title: 'Button', icon: 'image'},
						{title: 'Item', icon: 'resumeplay'}
					]}
				>
					<Panel>
						<Icon>home</Icon>Home
						<div>
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
						</div>
					</Panel>
					<Panel>
						<Button icon="image">Button!</Button>
					</Panel>
					<Panel className="enact-fit">
						<div>
							<Item slotBefore={<Icon>resumeplay</Icon>}>Hello Item</Item>
						</div>
					</Panel>
					<Panel>
						<div>
							<Icon>resumeplay</Icon>
							A simple view with no associated tab
						</div>
					</Panel>
				</TabbedPanels>
			</div>
		),
		{
			text: 'Basic TabbedPanels'
		}
	);
