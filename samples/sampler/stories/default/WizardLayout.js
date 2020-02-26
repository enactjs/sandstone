import {action} from '@enact/storybook-utils/addons/actions';
import {text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import {Image} from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Panel} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import {WizardLayout} from '@enact/sandstone/WizardLayout';

WizardLayout.displayName = 'WizardLayout';

storiesOf('Sandstone', module)
	.add(
		'WizardLayout',
		() => (
			<Panel>
				<WizardLayout
					onSelect={action('onSelect')}
					buttons={[(<Button>Yes</Button>), (<Button>No</Button>)]}
					footer={text('footer', WizardLayout, 'Footer area')}
					titles={[
						{title: 'Step 1', subtitle: 'Step 1 subtitle'},
						{title: 'Step 2', subtitle: 'Step 2 subtitle'},
						{title: 'Step 3', subtitle: 'Step 3 subtitle'}
					]}
				>
					<Panel>
						<Scroller style={{height: '500px'}}>
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
					</Panel>
					<Panel>
						<Button icon="image">Button!</Button>
						<Button icon="image">Button!</Button>
						<Button icon="image">Button!</Button>
						<Button icon="image">Button!</Button>
					</Panel>
					<Panel>
						<Item slotBefore={<Icon>resumeplay</Icon>}>Hello Item</Item>
					</Panel>
					<Panel>
						<div>
							<Icon>resumeplay</Icon>
							A simple view with no associated tab
						</div>
					</Panel>
				</WizardLayout>
			</Panel>
		),
		{
			props: {
				noPanel: true
			}
		}
	);
