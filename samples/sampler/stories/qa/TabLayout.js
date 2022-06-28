/* eslint-disable react/jsx-no-bind */
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {range, select} from '@enact/storybook-utils/addons/controls';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import TabLayout, {TabLayoutBase, Tab} from '@enact/sandstone/TabLayout';
import {Component, useState} from 'react';

import icons from '../helper/icons';

TabLayout.displayName = 'TabLayout';
const Config = mergeComponentMetadata('TabLayout', TabLayoutBase, TabLayout);

const tabsWithIcons = [
	{title: 'Home', icon: 'home'},
	{title: 'Button', icon: 'gear'},
	{title: 'Item', icon: 'trash'}
];

class AddingTabSample extends Component {
	constructor (props) {
		super(props);

		this.state = {
			active: false,
			index: 0
		};
	}

	componentDidMount () {
		this.id = setInterval(() => {
			this.setState((state) => ({
				active: !state.active,
				// modeling updating the index when the tabs change
				index: state.active ? state.index - 1 : state.index + 1
			}));
		}, 3000);
	}

	componentWillUnmount () {
		clearInterval(this.id);
	}

	handleSelect = ({index}) => this.setState({index});

	render () {
		return (
			<TabLayout onSelect={this.handleSelect} index={this.state.index}>
				{this.state.active ? (
					<TabLayout.Tab title="added" icon="home">
						<BodyText>
							If this button is focused when the tab is removed, spotlight will be lost.
						</BodyText>
						<Button>Added button</Button>
					</TabLayout.Tab>
				) : null}
				<TabLayout.Tab title="one" icon="star">
					<Button>Button 1</Button>
				</TabLayout.Tab>
			</TabLayout>
		);
	}
}

export default {
	title: 'Sandstone/TabLayout',
	component: 'TabLayout'
};

export const WithVariableNumberOfTabs = (args) => {
	const tabs = args['Number of Tabs'];

	return (
		<Panel>
			<Header title="TabLayout" subtitle="With variable number of tabs" />
			<TabLayout
				orientation={args['orientation']}
			>
				{Array.from({length: tabs}, (v, i) => (
					<TabLayout.Tab title={`Tab ${i}`} icon={icons[i % icons.length]} key={`tab${i}`}>
						<Scroller key={'view' + i}>
							<Button>Tab {i} Top</Button>
							<BodyText>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ante sit amet dui
								cursus tempus ut nec nisl. In scelerisque, nunc in interdum varius, dolor magna
								auctor tellus, quis mattis mauris lectus vel metus. Maecenas tempus quam ac
								dignissim gravida. Integer ut posuere sapien. Duis consequat vitae libero nec
								posuere. Curabitur sagittis mauris vel massa cursus, et mollis est malesuada.
								Vestibulum ante libero, gravida id purus eget, varius porttitor ipsum. Suspendisse
								quis consequat sem, eget gravida est. Morbi pulvinar diam vel mattis lacinia.
								Integer eget est quis augue tincidunt tincidunt quis at nisi. Duis at massa nunc.
								Cras malesuada, sem quis aliquet vulputate, ante ipsum congue ante, eu volutpat
								ipsum sem posuere ante. Suspendisse potenti. Nullam in lacinia mi.
							</BodyText>
							<BodyText>
								Donec ac ultricies nunc, quis pharetra orci. Mauris semper blandit sodales. Morbi eu
								mollis eros. Fusce id lacinia massa. Nam vitae eleifend arcu. Ut ex leo, semper at
								lectus ullamcorper, congue dignissim nunc. Etiam volutpat est mauris. Nullam ut
								tellus vehicula, tempus urna ac, gravida urna. Nunc diam lorem, dictum consectetur
								libero vitae, aliquet tristique nibh. Maecenas tellus nibh, convallis et consectetur
								at, semper ac lacus. Quisque efficitur id risus eget fringilla. Vestibulum ac nibh
								viverra, efficitur tortor vitae, auctor eros. Nulla sit amet sagittis libero, a
								rhoncus nulla. Phasellus vitae tellus ut enim porttitor congue. Vestibulum ante
								ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
							</BodyText>
							<BodyText>
								Vivamus at augue eget justo finibus commodo ut a urna. Pellentesque eu tempus
								libero, a tristique risus. Sed vel posuere elit. Nulla faucibus nisl turpis, id
								ultricies massa rutrum sit amet. Suspendisse aliquet suscipit convallis. Quisque
								convallis, ipsum nec feugiat vulputate, mi dolor posuere nisi, vel iaculis urna
								lacus sit amet massa. Ut a velit urna. Morbi id massa dui. Class aptent taciti
								sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer
								pharetra eros eget turpis maximus, in fermentum nisl bibendum. Phasellus mattis urna
								et libero malesuada, sed rutrum dolor dignissim.
							</BodyText>
							<BodyText>
								Sed vel nunc lobortis lectus tincidunt viverra. Nullam lobortis eros vel congue
								pellentesque. Donec faucibus felis non neque volutpat dapibus. Nam id mi vel ligula
								maximus imperdiet at eget sapien. Duis in eros lobortis, maximus risus commodo,
								dignissim erat. Suspendisse semper magna leo, eget tincidunt est laoreet non.
								Phasellus nec posuere ipsum, at egestas urna. Fusce pellentesque finibus magna, eget
								hendrerit enim aliquam condimentum.
							</BodyText>
							<BodyText>
								Donec at dolor eget ante faucibus gravida a eget erat. In vehicula nibh eu venenatis
								ullamcorper. Nulla nisl justo, tempus vitae felis et, molestie posuere augue. Morbi
								pellentesque lacinia lacus quis bibendum. Integer nec nisi id mauris gravida
								scelerisque eu eu nibh. Sed accumsan ut ligula at aliquam. Quisque odio ex, viverra
								sit amet lectus scelerisque, sollicitudin ornare ante. Vestibulum arcu augue,
								vehicula vel pellentesque sed, aliquam ut nunc.
							</BodyText>
							<Button>Tab {i} Bottom</Button>
						</Scroller>
					</TabLayout.Tab>
				))}
			</TabLayout>
		</Panel>
	);
};

range('Number of Tabs', WithVariableNumberOfTabs, {groupId: 'TabLayout'}, {min: 0, max: 20, step: 1}, 3);
select('orientation', WithVariableNumberOfTabs, ['vertical', 'horizontal'], TabLayout, 'vertical');

WithVariableNumberOfTabs.storyName = 'With variable number of tabs';
WithVariableNumberOfTabs.parameters = {
	props: {
		noPanel: true
	}
};

export const WithTabsWithoutIcons = (args) => {
	const tabs = args['Number of Tabs'];

	return (
		<Panel>
			<Header title="TabLayout" subtitle="With tabs without icons" />
			<TabLayout
				orientation={args['orientation']}
			>
				{Array.from({length: tabs}, (v, i) => (
					<TabLayout.Tab title={`Tab ${i}`} key={`tab${i}`}>
						<Scroller key={'view' + i}>
							<Button>Tab {i} Top</Button>
							<BodyText>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ante sit amet dui
								cursus tempus ut nec nisl. In scelerisque, nunc in interdum varius, dolor magna
								auctor tellus, quis mattis mauris lectus vel metus. Maecenas tempus quam ac
								dignissim gravida. Integer ut posuere sapien. Duis consequat vitae libero nec
								posuere. Curabitur sagittis mauris vel massa cursus, et mollis est malesuada.
								Vestibulum ante libero, gravida id purus eget, varius porttitor ipsum. Suspendisse
								quis consequat sem, eget gravida est. Morbi pulvinar diam vel mattis lacinia.
								Integer eget est quis augue tincidunt tincidunt quis at nisi. Duis at massa nunc.
								Cras malesuada, sem quis aliquet vulputate, ante ipsum congue ante, eu volutpat
								ipsum sem posuere ante. Suspendisse potenti. Nullam in lacinia mi.
							</BodyText>
							<BodyText>
								Donec ac ultricies nunc, quis pharetra orci. Mauris semper blandit sodales. Morbi eu
								mollis eros. Fusce id lacinia massa. Nam vitae eleifend arcu. Ut ex leo, semper at
								lectus ullamcorper, congue dignissim nunc. Etiam volutpat est mauris. Nullam ut
								tellus vehicula, tempus urna ac, gravida urna. Nunc diam lorem, dictum consectetur
								libero vitae, aliquet tristique nibh. Maecenas tellus nibh, convallis et consectetur
								at, semper ac lacus. Quisque efficitur id risus eget fringilla. Vestibulum ac nibh
								viverra, efficitur tortor vitae, auctor eros. Nulla sit amet sagittis libero, a
								rhoncus nulla. Phasellus vitae tellus ut enim porttitor congue. Vestibulum ante
								ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
							</BodyText>
							<BodyText>
								Vivamus at augue eget justo finibus commodo ut a urna. Pellentesque eu tempus
								libero, a tristique risus. Sed vel posuere elit. Nulla faucibus nisl turpis, id
								ultricies massa rutrum sit amet. Suspendisse aliquet suscipit convallis. Quisque
								convallis, ipsum nec feugiat vulputate, mi dolor posuere nisi, vel iaculis urna
								lacus sit amet massa. Ut a velit urna. Morbi id massa dui. Class aptent taciti
								sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer
								pharetra eros eget turpis maximus, in fermentum nisl bibendum. Phasellus mattis urna
								et libero malesuada, sed rutrum dolor dignissim.
							</BodyText>
							<BodyText>
								Sed vel nunc lobortis lectus tincidunt viverra. Nullam lobortis eros vel congue
								pellentesque. Donec faucibus felis non neque volutpat dapibus. Nam id mi vel ligula
								maximus imperdiet at eget sapien. Duis in eros lobortis, maximus risus commodo,
								dignissim erat. Suspendisse semper magna leo, eget tincidunt est laoreet non.
								Phasellus nec posuere ipsum, at egestas urna. Fusce pellentesque finibus magna, eget
								hendrerit enim aliquam condimentum.
							</BodyText>
							<BodyText>
								Donec at dolor eget ante faucibus gravida a eget erat. In vehicula nibh eu venenatis
								ullamcorper. Nulla nisl justo, tempus vitae felis et, molestie posuere augue. Morbi
								pellentesque lacinia lacus quis bibendum. Integer nec nisi id mauris gravida
								scelerisque eu eu nibh. Sed accumsan ut ligula at aliquam. Quisque odio ex, viverra
								sit amet lectus scelerisque, sollicitudin ornare ante. Vestibulum arcu augue,
								vehicula vel pellentesque sed, aliquam ut nunc.
							</BodyText>
							<Button>Tab {i} Bottom</Button>
						</Scroller>
					</TabLayout.Tab>
				))}
			</TabLayout>
		</Panel>
	);
};

range('Number of Tabs', WithTabsWithoutIcons, {groupId: 'TabLayout'}, {min: 0, max: 20, step: 1}, 3);
select('orientation', WithTabsWithoutIcons, ['vertical', 'horizontal'], TabLayout, 'vertical');

WithTabsWithoutIcons.storyName = 'With tabs without icons';
WithTabsWithoutIcons.parameters = {
	props: {
		noPanel: true
	}
};

export const WithDisabledTabs = (args) => {
	const tabs = args['Number of Tabs'];

	return (
		<Panel>
			<Header title="TabLayout" subtitle="With disabled tabs" />
			<TabLayout
				orientation={args['orientation']}
			>
				{Array.from({length: tabs}, (v, i) => (
					<TabLayout.Tab
						disabled={i % 2 === 1}
						icon={icons[i % icons.length]}
						title={`Tab ${i}`}
						key={`tab${i}`}
					>
						<Scroller key={'view' + i}>
							<Button>Tab {i} Top</Button>
							<BodyText>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ante sit amet dui
								cursus tempus ut nec nisl. In scelerisque, nunc in interdum varius, dolor magna
								auctor tellus, quis mattis mauris lectus vel metus. Maecenas tempus quam ac
								dignissim gravida. Integer ut posuere sapien. Duis consequat vitae libero nec
								posuere. Curabitur sagittis mauris vel massa cursus, et mollis est malesuada.
								Vestibulum ante libero, gravida id purus eget, varius porttitor ipsum. Suspendisse
								quis consequat sem, eget gravida est. Morbi pulvinar diam vel mattis lacinia.
								Integer eget est quis augue tincidunt tincidunt quis at nisi. Duis at massa nunc.
								Cras malesuada, sem quis aliquet vulputate, ante ipsum congue ante, eu volutpat
								ipsum sem posuere ante. Suspendisse potenti. Nullam in lacinia mi.
							</BodyText>
							<BodyText>
								Donec ac ultricies nunc, quis pharetra orci. Mauris semper blandit sodales. Morbi eu
								mollis eros. Fusce id lacinia massa. Nam vitae eleifend arcu. Ut ex leo, semper at
								lectus ullamcorper, congue dignissim nunc. Etiam volutpat est mauris. Nullam ut
								tellus vehicula, tempus urna ac, gravida urna. Nunc diam lorem, dictum consectetur
								libero vitae, aliquet tristique nibh. Maecenas tellus nibh, convallis et consectetur
								at, semper ac lacus. Quisque efficitur id risus eget fringilla. Vestibulum ac nibh
								viverra, efficitur tortor vitae, auctor eros. Nulla sit amet sagittis libero, a
								rhoncus nulla. Phasellus vitae tellus ut enim porttitor congue. Vestibulum ante
								ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
							</BodyText>
							<BodyText>
								Vivamus at augue eget justo finibus commodo ut a urna. Pellentesque eu tempus
								libero, a tristique risus. Sed vel posuere elit. Nulla faucibus nisl turpis, id
								ultricies massa rutrum sit amet. Suspendisse aliquet suscipit convallis. Quisque
								convallis, ipsum nec feugiat vulputate, mi dolor posuere nisi, vel iaculis urna
								lacus sit amet massa. Ut a velit urna. Morbi id massa dui. Class aptent taciti
								sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer
								pharetra eros eget turpis maximus, in fermentum nisl bibendum. Phasellus mattis urna
								et libero malesuada, sed rutrum dolor dignissim.
							</BodyText>
							<BodyText>
								Sed vel nunc lobortis lectus tincidunt viverra. Nullam lobortis eros vel congue
								pellentesque. Donec faucibus felis non neque volutpat dapibus. Nam id mi vel ligula
								maximus imperdiet at eget sapien. Duis in eros lobortis, maximus risus commodo,
								dignissim erat. Suspendisse semper magna leo, eget tincidunt est laoreet non.
								Phasellus nec posuere ipsum, at egestas urna. Fusce pellentesque finibus magna, eget
								hendrerit enim aliquam condimentum.
							</BodyText>
							<BodyText>
								Donec at dolor eget ante faucibus gravida a eget erat. In vehicula nibh eu venenatis
								ullamcorper. Nulla nisl justo, tempus vitae felis et, molestie posuere augue. Morbi
								pellentesque lacinia lacus quis bibendum. Integer nec nisi id mauris gravida
								scelerisque eu eu nibh. Sed accumsan ut ligula at aliquam. Quisque odio ex, viverra
								sit amet lectus scelerisque, sollicitudin ornare ante. Vestibulum arcu augue,
								vehicula vel pellentesque sed, aliquam ut nunc.
							</BodyText>
							<Button>Tab {i} Bottom</Button>
						</Scroller>
					</TabLayout.Tab>
				))}
			</TabLayout>
		</Panel>
	);
};

range('Number of Tabs', WithDisabledTabs, {groupId: 'TabLayout'}, {min: 0, max: 20, step: 1}, 3);
select('orientation', WithDisabledTabs, ['vertical', 'horizontal'], TabLayout, 'vertical');

WithDisabledTabs.storyName = 'With disabled tabs';
WithDisabledTabs.parameters = {
	props: {
		noPanel: true
	}
};

export const WithAllDisabledTabs = (args) => {
	const tabs = args['Number of Tabs'];

	return (
		<Panel>
			<Header title="TabLayout" subtitle="With all disabled tabs" />
			<TabLayout
				orientation={args['orientation']}
			>
				{Array.from({length: tabs}, (v, i) => (
					<TabLayout.Tab disabled icon={icons[i % icons.length]} title={`Tab ${i}`} key={`tab${i}`}>
						<Scroller key={'view' + i}>
							<Button>Tab {i} Top</Button>
							<BodyText>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ante sit amet dui
								cursus tempus ut nec nisl. In scelerisque, nunc in interdum varius, dolor magna
								auctor tellus, quis mattis mauris lectus vel metus. Maecenas tempus quam ac
								dignissim gravida. Integer ut posuere sapien. Duis consequat vitae libero nec
								posuere. Curabitur sagittis mauris vel massa cursus, et mollis est malesuada.
								Vestibulum ante libero, gravida id purus eget, varius porttitor ipsum. Suspendisse
								quis consequat sem, eget gravida est. Morbi pulvinar diam vel mattis lacinia.
								Integer eget est quis augue tincidunt tincidunt quis at nisi. Duis at massa nunc.
								Cras malesuada, sem quis aliquet vulputate, ante ipsum congue ante, eu volutpat
								ipsum sem posuere ante. Suspendisse potenti. Nullam in lacinia mi.
							</BodyText>
							<BodyText>
								Donec ac ultricies nunc, quis pharetra orci. Mauris semper blandit sodales. Morbi eu
								mollis eros. Fusce id lacinia massa. Nam vitae eleifend arcu. Ut ex leo, semper at
								lectus ullamcorper, congue dignissim nunc. Etiam volutpat est mauris. Nullam ut
								tellus vehicula, tempus urna ac, gravida urna. Nunc diam lorem, dictum consectetur
								libero vitae, aliquet tristique nibh. Maecenas tellus nibh, convallis et consectetur
								at, semper ac lacus. Quisque efficitur id risus eget fringilla. Vestibulum ac nibh
								viverra, efficitur tortor vitae, auctor eros. Nulla sit amet sagittis libero, a
								rhoncus nulla. Phasellus vitae tellus ut enim porttitor congue. Vestibulum ante
								ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
							</BodyText>
							<BodyText>
								Vivamus at augue eget justo finibus commodo ut a urna. Pellentesque eu tempus
								libero, a tristique risus. Sed vel posuere elit. Nulla faucibus nisl turpis, id
								ultricies massa rutrum sit amet. Suspendisse aliquet suscipit convallis. Quisque
								convallis, ipsum nec feugiat vulputate, mi dolor posuere nisi, vel iaculis urna
								lacus sit amet massa. Ut a velit urna. Morbi id massa dui. Class aptent taciti
								sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer
								pharetra eros eget turpis maximus, in fermentum nisl bibendum. Phasellus mattis urna
								et libero malesuada, sed rutrum dolor dignissim.
							</BodyText>
							<BodyText>
								Sed vel nunc lobortis lectus tincidunt viverra. Nullam lobortis eros vel congue
								pellentesque. Donec faucibus felis non neque volutpat dapibus. Nam id mi vel ligula
								maximus imperdiet at eget sapien. Duis in eros lobortis, maximus risus commodo,
								dignissim erat. Suspendisse semper magna leo, eget tincidunt est laoreet non.
								Phasellus nec posuere ipsum, at egestas urna. Fusce pellentesque finibus magna, eget
								hendrerit enim aliquam condimentum.
							</BodyText>
							<BodyText>
								Donec at dolor eget ante faucibus gravida a eget erat. In vehicula nibh eu venenatis
								ullamcorper. Nulla nisl justo, tempus vitae felis et, molestie posuere augue. Morbi
								pellentesque lacinia lacus quis bibendum. Integer nec nisi id mauris gravida
								scelerisque eu eu nibh. Sed accumsan ut ligula at aliquam. Quisque odio ex, viverra
								sit amet lectus scelerisque, sollicitudin ornare ante. Vestibulum arcu augue,
								vehicula vel pellentesque sed, aliquam ut nunc.
							</BodyText>
							<Button>Tab {i} Bottom</Button>
						</Scroller>
					</TabLayout.Tab>
				))}
			</TabLayout>
		</Panel>
	);
};

range('Number of Tabs', WithAllDisabledTabs, {groupId: 'TabLayout'}, {min: 0, max: 20, step: 1}, 3);
select('orientation', WithAllDisabledTabs, ['vertical', 'horizontal'], TabLayout, 'vertical');

WithAllDisabledTabs.storyName = 'With all disabled tabs';
WithAllDisabledTabs.parameters = {
	props: {
		noPanel: true
	}
};

export const WithAddingRemovingATab = () => (
	<Panel>
		<Header title="TabLayout" subtitle="With adding/removing a tab" />
		<AddingTabSample />
	</Panel>
);

WithAddingRemovingATab.storyName = 'With adding/removing a tab';
WithAddingRemovingATab.parameters = {
	props: {
		noPanel: true
	},
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithControlledIndex = (args) => {
	const [selected, setSelected] = useState(1);

	return (
		<Panel>
			<Header title="Sandstone TabLayout" subtitle="Controlled Index" />
			<TabLayout
				index={selected}
				onSelect={({index}) => setSelected(index)}
				orientation={args['orientation']}
			>
				<Tab title={tabsWithIcons[0].title} icon={tabsWithIcons[0].icon}>
					<Button icon="demosync" onClick={() => setSelected(1)}>
						Change to 2nd tab
					</Button>
				</Tab>
				<Tab title={tabsWithIcons[1].title} icon={tabsWithIcons[1].icon}>
					<Button icon="demosync" onClick={() => setSelected(2)}>
						Change to 3rd tab
					</Button>
					<Button icon="demosync" onClick={() => setTimeout(() => setSelected(2), 2000)}>
						Delayed change to 3rd tab
					</Button>
				</Tab>
				<Tab title={tabsWithIcons[2].title} icon={tabsWithIcons[2].icon}>
					<Item onClick={() => setSelected(1)}>Change to 2nd tab</Item>
				</Tab>
			</TabLayout>
		</Panel>
	);
};

select('orientation', WithControlledIndex, ['vertical', 'horizontal'], Config);

WithControlledIndex.storyName = 'With controlled index';
WithControlledIndex.parameters = {
	props: {
		noPanel: true
	}
};

export const WithInputField = () => {
	return (
		<Panel>
			<Header title="TabLayout" subtitle="With InputField" />
			<TabLayout>
				<Tab title="Tab 0">
					<InputField defaultValue="value" />
				</Tab>
			</TabLayout>
		</Panel>
	);
};

WithInputField.storyName = 'With InputField';
