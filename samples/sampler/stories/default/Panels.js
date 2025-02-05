import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import {Image} from '@enact/sandstone/Image';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {Header, Panels, Panel} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import {TabLayout} from '@enact/sandstone/TabLayout';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {scale} from '@enact/ui/resolution';
import {useState} from 'react';
import compose from 'ramda/src/compose';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('Panels', Panels);
const HeaderConfig = mergeComponentMetadata('Header', Header);

const items = [];

for (let i = 0; i < 100; i++) {
	const text = `Item ${i}`,
		color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16),
		source = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`),
		caption = 'Sample list';
	items.push({text, source, caption});
}

// Used to render VirtualGridList into Panels
// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	const {caption, source, text} = items[index];
	return (
		<ImageItem {...rest} label={caption} src={source}>
			{text}
		</ImageItem>
	);
};

Panels.displayName = 'Panels';

export default {
	title: 'Sandstone/Panels',
	component: 'Panels'
};

export const Panels_ = (args) => {
	// hooks
	const initialState = 0;
	const [panelIndex, setState] = useState(initialState);
	const forward = () => setState(panelIndex + 1);
	const backward = () => setState(panelIndex - 1);

	const handleBack = compose(backward, action('onBack'));

	const story = (
		<Panels
			backButtonBackgroundOpacity={args['backButtonBackgroundOpacity']}
			closeButtonBackgroundOpacity={args['closeButtonBackgroundOpacity']}
			index={panelIndex}
			noAnimation={args['noAnimation']}
			noBackButton={args['noBackButton']}
			noCloseButton={args['noCloseButton']}
			onBack={handleBack}
			onClose={action('onClose')}
			onTransition={action('onTransition')}
			onWillTransition={action('onWillTransition')}
		>
			<Panel>
				<Header
					centered={args['centered']}
					title="Panel with Items"
				>
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
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</Item>
				<Item>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</Item>
				<Item>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</Item>
			</Panel>
			<Panel>
				<Header
					centered={args['centered']}
					title="Panel with VirtualGridList"
				>
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
				<Header
					centered={args['centered']}
					title="Panel with TabLayout"
				>
					<Button
						icon="arrowlargeright"
						iconFlip="auto"
						size="small"
						slot="slotAfter"
						onClick={forward} // eslint-disable-line react/jsx-no-bind
					/>
				</Header>
				<TabLayout>
					<TabLayout.Tab title="Home" icon="home">
						<Icon>home</Icon>Home
						<Scroller style={{height: scale(1000)}}>
							<Image
								caption="Image"
								src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')}
								style={{marginTop: '24px'}}
							/>
							<Image
								caption="Image"
								src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')}
								style={{marginTop: '24px'}}
							/>
							<Image
								caption="Image"
								src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')}
								style={{marginTop: '24px'}}
							/>
							<Image
								caption="Image"
								src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')}
								style={{marginTop: '24px'}}
							/>
							<Image
								caption="Image"
								src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')}
								style={{marginTop: '24px'}}
							/>
							<Image
								caption="Image"
								src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')}
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
			<Panel>

				<Header
					centered={args['centered']}
					title="Panel with Scroller"
				/>
				<Scroller focusableScrollbar="byEnter" verticalScrollbar="visible">
					<div style={{height: ri.scaleToRem(2004)}}>
						<BodyText>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.
							Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
						</BodyText>
					</div>
				</Scroller>
			</Panel>
		</Panels>
	);
	return story;
};

select(
	'backButtonBackgroundOpacity',
	Panels_,
	['opaque', 'transparent'],
	Config,
	'transparent'
);
select(
	'closeButtonBackgroundOpacity',
	Panels_,
	['opaque', 'transparent'],
	Config,
	'transparent'
);
boolean('noAnimation', Panels_, Panels, false);
boolean('noBackButton', Panels_, Panels, false);
boolean('noCloseButton', Panels_, Panels, false);

boolean('centered', Panels_, HeaderConfig);

Panels_.storyName = 'Panels';
Panels_.parameters = {
	props: {
		noPanels: true
	}
};
